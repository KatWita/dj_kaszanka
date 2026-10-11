"""Build the gallery images and manifest.

For every photo in ORDER (source: scripts/gallery-src/<name>.jpg, the 1280px originals):
  - src/assets/gallery/photos/<name>-640.webp   thumbnail for the grid
  - src/assets/gallery/photos/<name>-1280.webp  large version for the lightbox
  - a tiny blurred placeholder (base64 WebP, ~200 bytes) shown while loading
and writes src/assets/gallery/photos.json (order, size, alt text, placeholder).

Usage (needs pillow):  python3 scripts/generate-gallery.py
"""

import base64
import io
import json
import os

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..")
SRC = os.path.join(ROOT, "scripts", "gallery-src")
OUT = os.path.join(ROOT, "src", "assets", "gallery", "photos")
MANIFEST = os.path.join(ROOT, "src", "assets", "gallery", "photos.json")

# display order + alt text
ORDER = [
    ("disco-7093704", "Crowd dancing in pink stage smoke"),
    ("dj-923165", "DJ performing under a glowing pink star-shaped stage"),
    ("dj-2573925", "Hand on a DJ controller in purple light"),
    ("dj-2715887", "Festival main stage with blue and green lasers"),
    ("dj-7168562", "DJ booth with laptops and flames in the background"),
    ("festival-348378", "Open-air festival stage at sunset"),
    ("music-6924312", "Hands on a DJ mixer under purple light"),
    ("party-1283372", "Crowd with raised hands in green laser light"),
    ("party-4735953", "Packed hall under blue and pink lights"),
    ("pexels-matheus-bertelli-13872120", "DJ on a futuristic stage surrounded by lasers"),
    ("pexels-tom-fisk-1692695", "Aerial view of a festival at night"),
    ("pexels-wendy-wei-1190299", "Crowd facing a stage in blue light"),
    ("pexels-wendy-wei-1306791", "Pyrotechnics over a festival stage at night"),
    ("pexels-wendy-wei-1537636", "Fireworks and lights above a cheering crowd"),
    ("pexels-wendy-wei-1677573", "Laser beams over a packed arena"),
    ("show-1048467", "Concert in front of the illuminated Eiffel Tower"),
]


def save_webp(img, path, width, quality):
    h = round(img.height * width / img.width)
    img.resize((width, h), Image.LANCZOS).save(path, "WEBP", quality=quality, method=6)


def placeholder(img):
    tiny = img.resize((16, max(1, round(img.height * 16 / img.width))), Image.LANCZOS)
    buf = io.BytesIO()
    tiny.save(buf, "WEBP", quality=40)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


def main():
    os.makedirs(OUT, exist_ok=True)
    manifest = []
    for name, alt in ORDER:
        img = Image.open(os.path.join(SRC, f"{name}.jpg")).convert("RGB")
        save_webp(img, os.path.join(OUT, f"{name}-640.webp"), 640, 78)
        save_webp(img, os.path.join(OUT, f"{name}-1280.webp"), min(1280, img.width), 82)
        manifest.append({
            "name": name,
            "alt": alt,
            "width": img.width,
            "height": img.height,
            "placeholder": placeholder(img),
        })
    with open(MANIFEST, "w") as f:
        json.dump(manifest, f, indent=2)
        f.write("\n")
    print(f"{len(manifest)} photos -> {OUT}")


if __name__ == "__main__":
    main()
