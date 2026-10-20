# PigmentIQ - Artisan Studio & Color Palette Workbench

> **Created by Md. Shihab Sikder**  
> **Role**: Creative Coder, ML & IoT Enthusiast  
> **Created**: **Saturday, October 17, 2026 • 07:57 PM (GMT+6)**  
> **GitHub**: [github.com/mdshihab56](https://github.com/mdshihab56)

---

##  Overview

**PigmentIQ** (also known as *Artisan Studio & Color Palette Workbench*) is an ultra-fast, stutter-free, professional studio application and color chemistry dashboard engineered for traditional painters, sketch artists, illustrators, and computational designers.

Engineered with **high-performance 120fps hardware-accelerated rendering**, it completely eliminates browser GPU lag while delivering razor-sharp modern aesthetics, custom PC installed font selection, and authentic brand color chemistry.

Whether you work on **stretched canvas, cartridge paper, canvas pads, wood, glass, plastic, or clay**, with **acrylic, oil, watercolor, gouache, pastels, brush pens, markers, or graphite pencils**, PigmentIQ solves the timeless artist problem: *“How do I mix that exact color?”* and *“Which pencil darkness and surface prep do I need?”*

---

##  Key Features

### 1.  Reference Image Palette Extractor & Interactive Eyedropper
- **Upload Any Art Reference**: Drag & drop Pinterest downloads, phone camera photos, or paste directly with `Ctrl + V`.
- **Sample Presets**: Quick-load sunset, botanical watercolor, portrait study, and fluid acrylic artworks.
- **Magnifying Eyedropper Loupe**: Move your cursor or finger across the image with a live magnified circle preview; tap any pixel to sample its exact shade.
- **B&W Value Study Filter**: Toggle with one click to view the tonal contrast and chiaroscuro values across your image.
- **Harmonic Palette Extraction**: Automatically groups dominant colors, highlights, midtones, and deep shadows.

### 2.  Physical Paint Mixing Chemist (Subtractive Pigment Model)
- Unlike digital RGB mixing (which produces muddy grey when mixing yellow and blue), PigmentIQ implements a **subtractive pigment simulation** (Kubelka-Munk spectral approximation) where yellow and blue mix into lush emerald green.
- **Step-by-Step Recipe**: Shows exact tube ingredient parts (e.g., *“3 parts MM-03 Lemon Yellow + 1 part MM-14 Ultramarine Blue + 4 parts MM-01 Titanium White”*).
- **Proportional Mixing Bar**: Visual breakdown of your physical paint portions.
- **Palette Technique Advice**: Explains base tinting, hue shifting, and complementary desaturation.

### 3.  Dedicated Mont Marte Studio & Combo Solver
- **Complete Mont Marte Library**: 42+ genuine shades with authentic codes (`MM-01 Titanium White` through `MM-42 Metallic Copper`).
- **Authentic Details**: Pigment codes (`PW6`, `PY3`, `PB29`, `PG7`), Opacity (`Opaque`, `Semi-Transparent`), and Lightfastness ratings.
- **Kit Presets**: Filter by 12-Piece Starter, 18-Piece Studio, 24-Piece Artist, or 36-Piece Master Series.
- **“When Any Color Doesn't Match” Solver**: Pick any target color on earth or input a HEX code, and the engine calculates the closest 2-paint or 3-paint Mont Marte combination with parts ratios and Delta-E 2000 visual accuracy!

### 4.  Sketch & Graphite Darkness Recommender (9H to 14B & Charcoal)
- **Complete Darkness Spectrum**: 9H, 6H, 4H, 2H, H, F, HB, B, 2B, 3B, 4B, 6B, 8B, 10B, 12B, 14B (Pitt Matt anti-reflective), EE Carbon-Graphite Hybrid, and Charcoal.
- **Value Zone Mapping**: Zone 1 (High Light) to Zone 10 (Maximum Occlusion Shadow).
- **Interactive Darkness Slider**: Slide from 0% (Shadow) to 100% (Highlight) for instant pencil grade recommendations.
- **Preservation Tools Guide**: Proper usage of tortillons, kneaded erasers, mono zero erasers, and workable fixatives.

### 5.  Popular Art Brands Encyclopedia
- Technical breakdowns for:
  - **Camel (Kokuyo Camlin)**: Artists Acrylics, Watercolors, Pastels & Brush Pens.
  - **Doms**: Super Soft Brush Pens, C3 Acrylic Paint Markers, Oil Pastels.
  - **Faber-Castell**: Polychromos, Albrecht Dürer, Pitt Graphite Matt.
  - **Winsor & Newton**: Cotman, Artists' Water Colour, Galeria Acrylics.
  - **Uni POSCA**: PC-1MR through PC-17K Universal Acrylic Markers.
  - **Brustro**: Heavy Body Acrylics, 300 GSM 100% Cotton Rag Papers.
  - **Copic**: Ciao & Sketch Alcohol Markers.
  - **Sakura**: Pigma Micron Archival Pens & Koi Watercolors.

### 6.  Surfaces & Substrates Master Guide
- Comprehensive preparation, priming, compatibility ratings, and varnishing instructions for:
  - **Canvas** (Stretched cotton duck, linen, canvas boards)
  - **Canvas Pads** (Glue-bound primed woven canvas sheets)
  - **Cartridge Papers** (90 GSM to 250 GSM)
  - **Watercolor Papers** (Cold Pressed, Hot Pressed, Rough 300-640 GSM)
  - **Wood & Timber** (Birch plywood, MDF panels, raw pine)
  - **Glass & Mirrors** (Reverse glass, porcelain baking, acrylic markers)
  - **Plastic & Acrylic Sheets** (Perspex, Yupo synthetic paper)
  - **Terracotta & Clay** (Air-dry clay, earthenware flower pots)

### 7.  A4 Color Specification Sheet Exporter (PDF, PNG, JPG)
- **Standard A4 Layout**: Engineered to ISO 216 standard proportions (210 × 297 mm) with print-ready high-resolution rendering.
- **Export Customization Dialog**:
  - **Palette / Study Title**: Custom title for your palette study.
  - **Artist / Creator Name**: Pre-filled with `Md. Shihab Sikder`.
  - **For What I Will Use**: Intended medium and substrate (e.g. *“Acrylic Landscape on Stretched Canvas 300 GSM”*).
  - **SL Number**: Sequential serial tracking number (e.g. `SL-2026-001`).
  - **Format Selection**: Export directly to **A4 PDF** (vector print document), **A4 PNG** (lossless high-res), or **A4 JPG**.
  - **Font Chooser**: Choose between Apple SF Pro, Plus Jakarta Sans, Brass Mono, Monorama, Cascadia Code, JetBrains Mono, or any font installed on your PC!
  - **Watermark (Optional)**: Toggle watermark overlay across the exported document with custom text.
  - **File Destination Setting**: Choose destination folder via the native Windows **Save As** file dialog (`showSaveFilePicker`), or direct browser download.
  - **Default Date & Time Stamp**: Rendered cleanly at the footer right side (`Saturday, October 17, 2026 • 07:57 PM (GMT+6)`).
  - **Live Miniature A4 Preview**: Live thumbnail preview of the generated sheet before downloading!

### 8.  Slide Navigation Drawer
- Smooth Google Material / Apple style side drawer sliding in from the right edge with backdrop blur scrim.
- Clean navigation tabs for Themes, PC Installed Fonts & Scaling, Audio Feedback, and About Creator.
- Fluid, natural scrolling container that adapts effortlessly to any display size.

### 9.  Artisan Audio & Tactile Feedback
- Built-in procedural **Web Audio API** sound synthesizer (zero external audio files needed):
  - **Wooden Easel Tap** (artisan studio feel)
  - **Mechanical Click**
  - **Water Drop** (for watercolorists)
  - **Brush Swish**
  - **Bubble Pop**
  - **Mute Mode**
- Dedicated master volume slider (0-100%) and quick sound toggle button with vector speaker icons.

### 10.  Aesthetic Themes & Customization
- **Atelier Dark** (Default minimalist charcoal)
- **Discord Dark** (Authentic Discord palette: `#313338`, `#2b2d31`, `#5865F2` blurple)
- **Linen Warm** (Warm canvas linen, beige and sepia minimalist)
- **Cyberpunk Neon** (Dark violet and vibrant neon cyan)
- **Sage Garden** (Earthen botanical moss and muted olive)
- **Nordic Frost** (Slate blue and arctic minimalism)
- **Custom Accent Color Picker**: Personalize all buttons and glowing accents with your favorite color!
- **Flat / Material Vector Icons**: 100% crisp vector SVG icons across all tabs and buttons.


## Studio Specification Sheet Exporter

The integrated export engine transforms sampled digital studies into standardized, print-ready studio documentation formatted to the ISO 216 A4 standard (210 × 297 mm).


---

##  How to Run

### Method 1: Double-Click the Batch File (Fastest on Windows)
Simply double-click:
```
Start_App.bat
```
This instantly launches PigmentIQ in your default browser (Chrome, Edge, Firefox, Brave) offline.

### Method 2: Direct Offline Execution (Open with Browser)
Simply double-click:
```
index.html
```
PigmentIQ is engineered with 100% pure vanilla web standards and `FileReader` APIs, meaning it runs **completely offline directly from your local file system** with zero server or node/npm dependencies required!


---

##  Creator & Credits

- **Creator**: Md. Shihab Sikder
- **Title**: Creative Coder, ML & IoT Enthusiast
- **Creation Date & Time**: Saturday, October 17, 2026 • 07:57 PM (GMT+6)
