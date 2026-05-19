import { NextResponse } from "next/server";

export const runtime = "nodejs";
// Cache each thumbnail for 1 hour on the server so Instagram's
// short-lived CDN URLs stay fresh.
export const revalidate = 3600;

/**
 * GET /api/ig-thumb?url=<full-instagram-url>
 * Returns { thumbnail: <og:image url> | null }.
 *
 * We fetch the public IG page server-side and extract the OpenGraph image.
 * If Instagram blocks the request (no auth) we return null so the client
 * can render its fallback (local brand photo).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url");
  if (!target) {
    return NextResponse.json({ thumbnail: null, error: "missing url" }, {
      status: 400,
    });
  }

  // Allow only instagram.com (and www.) URLs to prevent SSRF-style abuse
  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return NextResponse.json({ thumbnail: null, error: "invalid url" }, {
      status: 400,
    });
  }
  if (!/^(www\.)?instagram\.com$/.test(parsed.hostname)) {
    return NextResponse.json({ thumbnail: null, error: "not instagram" }, {
      status: 400,
    });
  }

  try {
    const res = await fetch(parsed.toString(), {
      // Identify as a regular browser so Instagram returns the public page
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ thumbnail: null }, { status: 200 });
    }
    const html = await res.text();

    // Look for og:image (or twitter:image as fallback)
    const og =
      html.match(
        /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i
      ) ||
      html.match(
        /<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i
      );

    const thumbnail = og?.[1]
      ? og[1].replace(/&amp;/g, "&")
      : null;

    return NextResponse.json(
      { thumbnail },
      {
        status: 200,
        headers: {
          // Edge caching too
          "Cache-Control":
            "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    console.error("[ig-thumb] fetch error", err);
    return NextResponse.json({ thumbnail: null }, { status: 200 });
  }
}
