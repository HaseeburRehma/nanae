import { NextResponse } from "next/server";

export const runtime = "nodejs";
// Refresh the list at most once per hour at the edge
export const revalidate = 3600;

/**
 * Fallback list used if no Graph API token is configured OR the Graph API
 * call fails (e.g. token expired). Keep this in sync with the latest reels
 * manually as a safety net.
 */
const FALLBACK: string[] = [
  "https://www.instagram.com/nanae_service/reel/DYEBMbsMMYM/",
  "https://www.instagram.com/nanae_service/reel/DYPu8-QsLtg/",
  "https://www.instagram.com/nanae_service/reel/DYM1hheSJVm/",
  "https://www.instagram.com/enes_seker/reel/DXsGMtNDKP4/",
  "https://www.instagram.com/enes_seker/reel/DXbco_SDE_s/",
  "https://www.instagram.com/enes_seker/reel/DXfGWoZjOZv/",
];

type GraphMedia = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | "REEL";
  media_product_type?: "FEED" | "REELS" | "STORY";
  permalink: string;
  thumbnail_url?: string;
  media_url?: string;
  timestamp?: string;
};

type GraphResponse = {
  data?: GraphMedia[];
  error?: { message: string; code: number };
};

async function fetchFromGraphApi(
  token: string,
  userId: string,
  limit = 6
): Promise<string[] | null> {
  const url =
    `https://graph.instagram.com/${userId}/media` +
    `?fields=id,media_type,media_product_type,permalink,timestamp` +
    `&limit=24&access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error("[ig-reels] Graph API non-200", res.status);
      return null;
    }
    const json = (await res.json()) as GraphResponse;
    if (json.error) {
      console.error("[ig-reels] Graph API error:", json.error.message);
      return null;
    }
    if (!json.data?.length) return null;

    // Prefer reels; fall back to any video/carousel posts
    const reels = json.data
      .filter(
        (m) =>
          m.media_product_type === "REELS" ||
          m.media_type === "VIDEO" ||
          m.media_type === "REEL"
      )
      .slice(0, limit)
      .map((m) => m.permalink);

    return reels.length > 0 ? reels : null;
  } catch (err) {
    console.error("[ig-reels] Graph API exception", err);
    return null;
  }
}

export async function GET() {
  const token = process.env.IG_ACCESS_TOKEN;
  const userId = process.env.IG_USER_ID;

  if (token && userId) {
    const reels = await fetchFromGraphApi(token, userId);
    if (reels && reels.length > 0) {
      return NextResponse.json(
        { source: "graph", reels },
        {
          headers: {
            "Cache-Control":
              "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
          },
        }
      );
    }
  }

  // Graceful fallback to hard-coded list
  return NextResponse.json(
    { source: "fallback", reels: FALLBACK },
    {
      headers: {
        "Cache-Control":
          "public, max-age=60, s-maxage=300, stale-while-revalidate=3600",
      },
    }
  );
}
