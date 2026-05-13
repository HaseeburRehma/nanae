NANAE — brand photo slots
==========================

Drop the 11 new clean brand photos into THIS folder using the exact filenames
below. The code already references them.

Recommended format: .jpg, ~85 % quality, longest edge ≤ 2000 px
(if your originals are .png, just save them as .jpg under the same name).

# Hero slider + OG image
01-mop-office-white.jpg    ← man in WHITE polo mopping office, yellow ACHTUNG sign
02-mop-office-blue.jpg     ← man in LIGHT BLUE polo mopping office (Contact location)
03-window-squeegee.jpg     ← squeegee on window, white polo (used in About + Hero)
04-window-squeegee-2.jpg   ← (reserve / future use)
05-stairwell-mop.jpg       ← stairwell with grey BEANIE (Hero slide #5)
06-stairwell-mop-cap.jpg   ← stairwell with grey CAP
07-bathroom-mirror.jpg     ← cleaning mirror in bathroom, yellow gloves
08-medical-disinfect.jpg   ← spraying disinfectant on waiting-room chair
09-medical-chairs.jpg      ← wiping chair in Hygiene poster room (Hero slide #4)
10-vacuum-office-blue.jpg  ← vacuuming, light blue polo (Hero slide #2)
11-vacuum-office-white.jpg ← vacuuming, white polo (Contact PAGE hero background)

# Where each image is used in code
Hero slider (5 images, in order): 01, 10, 03, 09, 05
About portrait:                   03
Contact page hero (background):   11
Contact location split image:     02
OG / Twitter card / JSON-LD:      01

You can also add or rearrange in:
- src/components/Hero.tsx               → HERO_IMAGES array
- src/components/About.tsx              → Image src
- src/components/contact-page/ContactHero.tsx  → Image src
- src/components/contact-page/LocationForm.tsx → Image src
- src/app/layout.tsx                    → OG + JSON-LD image url
