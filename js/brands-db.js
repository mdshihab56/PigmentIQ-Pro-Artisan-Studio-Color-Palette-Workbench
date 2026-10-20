/**
 * PigmentIQ / ChromaAtelier - Popular Art Brands & Mediums Encyclopedia
 * Comprehensive database covering Camel, Doms, Faber-Castell, Winsor & Newton,
 * Brustro, Posca, Copic, and Sakura across all art mediums.
 */

const BrandsDB = [
  {
    id: "mont-marte",
    name: "Mont Marte",
    country: "Australia",
    badge: "Creative Essentials",
    description:
      "An Australian art-supplies brand with an extensive range for beginners, hobbyists, students, and practicing artists, including acrylics, watercolours, oils, gouache, pastels, canvases, and tools.",
    mediums: [
      {
        type: "Acrylic Paints",
        formats: "Tubes, bottles, and assorted sets (varies by range)",
        bestSurfaces:
          "Primed canvas, wood panels, heavyweight paper, and other acrylic-ready surfaces",
        finish: "Usually matte to satin depending on product and surface",
        features:
          "Water-based acrylic colours; dry to a water-resistant film. Check individual product labels for finish and permanence.",
        popularShades: [
          "Titanium White",
          "Primary Yellow",
          "Cadmium Red Hue",
          "Ultramarine Blue",
          "Burnt Sienna",
          "Payne's Grey",
        ],
      },
      {
        type: "Watercolours & Gouache",
        formats: "Pans, tubes, and sets (varies by range)",
        bestSurfaces:
          "Watercolour paper; heavyweight mixed-media paper for gouache",
        finish:
          "Watercolour is generally transparent; gouache is typically opaque and matte",
        features:
          "Water-based media suited to washes, layering, illustration, and studies. Product properties vary by range.",
        popularShades: [
          "Lemon Yellow",
          "Permanent Rose",
          "Cerulean Blue",
          "Sap Green",
          "Yellow Ochre",
        ],
      },
      {
        type: "Oil Paints & Pastels",
        formats: "Tubes, sticks, and assorted sets (varies by range)",
        bestSurfaces:
          "Oil-primed or acrylic-primed canvas and boards for oils; pastel paper for pastels",
        finish:
          "Oil colour varies by pigment; pastels are usually soft or waxy depending on type",
        features:
          "Offers options for traditional painting and dry-media work; follow each product's preparation and safety guidance.",
        popularShades: [
          "Ivory Black",
          "Burnt Umber",
          "Prussian Blue",
          "Permanent Green",
        ],
      },
    ],
  },
  {
    id: "camel",
    name: "Camel (Kokuyo Camlin)",
    country: "India / Japan",
    badge: "Everyday Masterpiece",
    description:
      "One of the most trusted and historic art manufacturers in South Asia. Known for exceptionally rich pigment load at accessible prices for students and master painters.",
    mediums: [
      {
        type: "Artists Acrylic Colours",
        formats: "40ml Tubes, 100ml / 500ml Jars",
        bestSurfaces:
          "Canvas, Cartridge Paper (200+ GSM), Wood, Primed Terracotta",
        finish: "Satin-Gloss, flexible water-resistant film",
        features:
          "Quick-drying, 100% acrylic emulsion, non-yellowing, high lightfastness ratings.",
        popularShades: [
          "Cobalt Blue Hue",
          "Sap Green",
          "Permanent Yellow Deep",
          "Crimson Lake",
          "Raw Umber",
          "Titanium White",
        ],
      },
      {
        type: "Artists Water Colours (Tubes & Cakes)",
        formats: "9ml / 12ml Tubes, Half Pans",
        bestSurfaces:
          "Cold Pressed Watercolor Paper (300 GSM), Handmade Cotton Paper",
        finish: "Luminous, transparent matte",
        features:
          "Formulated with pure gum arabic binder. High transparency and excellent flow and blooming characteristics.",
        popularShades: [
          "Gamboge Hue",
          "Prussian Blue",
          "Burnt Sienna",
          "Chinese White",
          "Viridian",
        ],
      },
      {
        type: "Camel Soft Pastels & Oil Pastels",
        formats: "12, 20, 36 Shade Assorted Sets",
        bestSurfaces: "Textured Pastel Paper, Cartridge Paper, Suede Board",
        finish: "Velvety matte (Soft) / Creamy rich wax-oil (Oil)",
        features:
          "High pigment purity. Soft pastels blend smoothly with fingers/stumps; oil pastels resist water and permit sgraffito.",
      },
      {
        type: "Camel Brush Pens",
        formats: "12, 24 Shades with flexible nylon nib",
        bestSurfaces:
          "Smooth Bristol Board, Heavyweight Cartridge, Watercolor paper",
        finish: "Water-soluble, translucent dye-based watercolor ink",
        features:
          "Enables hairline strokes to broad wash blends. Reactivates instantly with water brush.",
      },
    ],
  },
  {
    id: "doms",
    name: "Doms",
    country: "India / Italy (F.I.L.A Group)",
    badge: "Vibrant & Versatile",
    description:
      "Renowned for innovative, vibrant, and extremely smooth art supplies including industry-favorite brush pens, acrylic markers, and colored pencils.",
    mediums: [
      {
        type: "Doms Brush Pens (Super Soft Tip)",
        formats: "14 / 26 Shade Packs with Blender",
        bestSurfaces: "Smooth Cartridge Paper, Mixed Media Sheets, Sketchbooks",
        finish: "Bright, luminous water-soluble ink",
        features:
          "Signature ultra-flexible Japanese-style felt tip. Superb gradient blending, calligraphy, and wash illustrations.",
        popularShades: [
          "Pastel Violet",
          "Sky Blue",
          "Meadow Green",
          "Blush Pink",
          "Apricot",
          "Charcoal Grey",
        ],
      },
      {
        type: "Doms Acrylic Paint Markers (C3 Series)",
        formats: "Extra Fine (0.7mm) & Medium (2mm) reversible bullet nibs",
        bestSurfaces:
          "Glass, Canvas, Smooth Wood, Plastic, Stones, Metal, Shoes",
        finish: "Vibrant opaque matte acrylic film",
        features:
          "Valve-action pump, waterproof once dry, high opacity even on dark surfaces.",
      },
      {
        type: "Doms Super Soft Oil Pastels & Color Pencils",
        formats: "24, 50 Color Sets",
        bestSurfaces: "Cartridge Paper, Kraft Paper, Cardstock",
        finish: "Smooth buttery glide with high color saturation",
        features:
          "Non-toxic, break-resistant lead, rich blending capability without white wax bloom.",
      },
    ],
  },
  {
    id: "faber-castell",
    name: "Faber-Castell",
    country: "Germany (Since 1761)",
    badge: "Pinnacle Precision",
    description:
      "The global gold standard in graphite, colored pencils, and fine drawing media with over two centuries of German precision engineering.",
    mediums: [
      {
        type: "Polychromos Artists' Colour Pencils",
        formats: "12 to 120 Color Sets & Open Stock",
        bestSurfaces:
          "Smooth & Vellum Bristol, Hot Pressed Paper, Wood, Canvas",
        finish: "Wax/Oil hybrid, zero wax bloom, smudge-proof",
        features:
          "Highest ASTM lightfastness (***), 3.8mm SV bonded break-resistant leads, buttery blendability.",
      },
      {
        type: "Albrecht Dürer Artists' Watercolour Pencils",
        formats: "24, 60, 120 Colors",
        bestSurfaces: "100% Cotton 300 GSM Watercolor Paper",
        finish: "Transforms fully into pure watercolor washes when wetted",
        features: "Pigments dissolve completely with no residual pencil lines.",
      },
      {
        type: "Castell 9000 & Pitt Graphite Range",
        formats: "16 Degrees (9H to 9B) & Pitt Graphite Matt (14B)",
        bestSurfaces: "Cartridge Paper, Smooth Bristol, Drawing Pads",
        finish: "Pure graphite with ultra-low reflection on Pitt Matt series",
        features:
          "Finely ground graphite and clay for consistent tone and smooth shading.",
      },
      {
        type: "Pitt Artist Pens (India Ink)",
        formats: "Brush (B), Fineliner (XS, S, F, M, 1.5), Calligraphy (C)",
        bestSurfaces: "All paper types, Bristol, Mixed Media",
        finish: "Waterproof, permanent, highly lightfast archival ink",
        features:
          "Pigmented India ink does not bleed through paper and is odorless.",
      },
    ],
  },
  {
    id: "winsor-newton",
    name: "Winsor & Newton",
    country: "United Kingdom (Since 1832)",
    badge: "Royal Warrant Quality",
    description:
      "The historic English art materials pioneer, creators of the world's most acclaimed watercolor and oil paints.",
    mediums: [
      {
        type: "Cotman & Professional Watercolours",
        formats: "Half Pans, Whole Pans, 8ml / 21ml Tubes",
        bestSurfaces: "Cold Pressed & Rough 300 GSM 100% Cotton Rag Paper",
        finish:
          "Maximum optical clarity, vibrant granulation, transparent washes",
        features:
          "Unmatched single-pigment purity in Professional line; economical high-load Cotman line.",
      },
      {
        type: "Galeria Acrylics",
        formats: "60ml, 120ml, 250ml Tubes & Pots",
        bestSurfaces: "Primed Canvas, Heavy Paper, Board, Masonite",
        finish: "Smooth satin sheen with high pigment retention",
        features: "Free-flowing consistency that retains brush stroke peaks.",
      },
      {
        type: "Winton & Artists' Oil Colours",
        formats: "37ml & 200ml Tubes",
        bestSurfaces: "Linen Canvas, Cotton Duck, Gessoed Hardboard",
        finish: "Lustrous oil finish with rich buttery impasto body",
        features: "Slow open time allowing wet-in-wet blending for days.",
      },
      {
        type: "Promarker & Brushmarker (Alcohol Markers)",
        formats: "Twin-tip: Broad Chisel + Bullet / Flexible Brush",
        bestSurfaces: "Marker Bleedproof Paper, Smooth Cartridge Paper",
        finish: "Streak-free translucent ink with alcohol blending",
        features: "Dual nibs, blendable with translucent layering.",
      },
    ],
  },
  {
    id: "posca",
    name: "Uni POSCA",
    country: "Japan (Mitsubishi Pencil Co.)",
    badge: "The Universal Marker",
    description:
      "The world's benchmark acrylic water-based paint marker. Completely opaque, odorless, and permanently adheres to virtually any surface.",
    mediums: [
      {
        type: "POSCA Acrylic Paint Markers (PC-1MR to PC-17K)",
        formats:
          "0.7mm Extra Fine, 1.3mm Fine, 2.5mm Medium, 8mm Chisel, 15mm Broad",
        bestSurfaces:
          "Canvas, Wood, Glass, Plastic, Metal, Leather, Terracotta, Paper",
        finish: "Vivid, completely opaque matte acrylic finish",
        features:
          "Lightfast, water-resistant once dry, layerable (light over dark!), waterproof on porous materials and fixable on glass/plastic with varnish or baking.",
      },
    ],
  },
  {
    id: "brustro",
    name: "Brustro (Creative Hands)",
    country: "India / International Curation",
    badge: "Contemporary Artist Choice",
    description:
      "Modern premium art supplies brand known for world-class papers, heavy body acrylics, gouache sets, and specialized technical tools.",
    mediums: [
      {
        type: "Artists' Heavy Body Acrylics & Gouache",
        formats: "75ml & 120ml Tubes, Jelly Gouache Sets",
        bestSurfaces:
          "Stretched Canvas, Wood Panels, 300 GSM Mixed Media Paper",
        finish: "Velvet matte (Gouache) / Rich glossy impasto (Heavy Body)",
        features:
          "Dense pigment suspension, high viscosity for palette knife painting.",
      },
      {
        type: "Brustro Professional Papers & Sketchbooks",
        formats:
          "Cold Pressed 300 GSM 100% Cotton, Wirebound Cartridge Pads (160 - 200 GSM)",
        bestSurfaces: "Watercolors, Gouache, Acrylic, Charcoal, Ink",
        finish:
          "Acid-free, chlorine-free, internal and external gelatin sizing",
        features:
          "Withstands multiple washes, scrubbing, and masking fluid without buckling.",
      },
    ],
  },
  {
    id: "copic",
    name: "Copic (Too Corporation)",
    country: "Japan",
    badge: "Illustration Master",
    description:
      "The gold standard alcohol marker for manga artists, concept designers, and fine art illustrators worldwide.",
    mediums: [
      {
        type: "Copic Sketch & Ciao Alcohol Markers",
        formats: "Super Brush Nib + Medium Broad Chisel (358 Colors)",
        bestSurfaces:
          "Bleedproof Marker Paper, Smooth Bristol Board (X-Press It Blending Card)",
        finish: "Flawless airbrush-like gradients and streakless washes",
        features:
          "Refillable ink, replaceable nibs, permanent alcohol-based dye ink that dries acid-free.",
      },
    ],
  },
  {
    id: "sakura",
    name: "Sakura Color Products",
    country: "Japan (Since 1921)",
    badge: "Archival Ink Standard",
    description:
      "Inventors of the world's first oil pastel (Cray-Pas) and the legendary Pigma archival ink.",
    mediums: [
      {
        type: "Pigma Micron Technical & Brush Pens",
        formats: "Nibs: 003 (0.15mm) to 12 (0.70mm), PN, Brush, Graphic",
        bestSurfaces:
          "Cartridge Paper, Watercolor Paper, Bristol Board, Vellum",
        finish:
          "Completely waterproof, chemical-resistant, fade-resistant black/colored ink",
        features:
          "Does not smear when painted over with watercolors or wet mediums.",
      },
      {
        type: "Koi Water Colors & Coloring Brush Pens",
        formats: "Pocket Field Sketch Box sets (12 - 72 colors)",
        bestSurfaces: "Watercolor Paper, Sketch Pads",
        finish: "Vibrant transparent watercolor with instant rewetting",
        features:
          "Includes refillable water brushes and built-in mixing palettes.",
      },
    ],
  },
  {
    id: "keep-smiling",
    name: "Keep Smiling",
    country: "Check individual product packaging",
    badge: "Creative Color Essentials",
    description:
      "Keep Smiling is an art and craft supplies brand associated with creative materials for painting and artistic projects. Product ranges, color availability, and specifications may vary by product.",
    mediums: [
      {
        type: "Painting Colors",
        formats:
          "Refer to individual product packaging for available sizes and sets",
        bestSurfaces: "Use surfaces recommended on the product label",
        finish: "Depends on the specific paint and product range",
        features:
          "Suitable applications and handling instructions vary by formulation. Check the manufacturer's product information before use.",
      },
      {
        type: "Art & Craft Supplies",
        formats: "Refer to the individual product range",
        bestSurfaces: "Depends on the material and intended application",
        finish: "Varies by product",
        features:
          "Explore available creative supplies and follow product-specific usage and safety instructions.",
      },
    ],
  },
  {
    id: "himi-color",
    name: "HIMI",
    country: "China",
    badge: "Jelly Gouache",
    description:
      "HIMI is known for its colorful jelly-style gouache paints, popular among illustrators, students, and artists for their convenient packaging and opaque, matte color effects.",
    mediums: [
      {
        type: "Jelly Gouache",
        formats: "Jelly cups, sets, and assorted color collections",
        bestSurfaces:
          "Watercolor paper, mixed-media paper, and suitable painting surfaces",
        finish: "Typically opaque with a matte appearance",
        features:
          "Water-based gouache designed for colorful illustration, decorative painting, and creative artwork. Follow the specific product label for reactivation, storage, and handling instructions.",
      },
      {
        type: "Gouache Color Sets",
        formats: "Multiple colors in assorted set sizes",
        bestSurfaces: "Paper and surfaces recommended by the manufacturer",
        finish: "Generally matte and opaque",
        features:
          "Useful for illustration, color mixing, studies, and expressive artwork. Exact properties vary by product range.",
      },
    ],
  },
  {
    id: "prismacolor",
    name: "Prismacolor",
    country: "United States",
    badge: "Colored Pencil Art",
    description:
      "Prismacolor is widely recognized for its artist colored pencils, especially for blending, layering, shading, and detailed illustration.",
    mediums: [
      {
        type: "Colored Pencils",
        formats: "Individual pencils, tins, and assorted sets",
        bestSurfaces: "Drawing paper and illustration paper",
        finish: "Layered colored-pencil finish",
        features:
          "Suitable for blending, layering, smooth shading, and detailed color work. Pencil softness and color properties vary by product range.",
      },
      {
        type: "Markers",
        formats: "Individual markers and assorted sets",
        bestSurfaces: "Paper recommended for the particular marker",
        finish: "Varies by marker type",
        features:
          "Useful for illustration and coloring. Check the product label for ink type, compatibility, and suitable surfaces.",
      },
    ],
  },
  {
    id: "royal-talens",
    name: "Royal Talens",
    country: "Netherlands",
    badge: "Artist Color Heritage",
    description:
      "Royal Talens is a Dutch art materials manufacturer known for artist paints and creative products, including its Van Gogh and Rembrandt ranges.",
    mediums: [
      {
        type: "Watercolor",
        formats: "Tubes, pans, and assorted sets",
        bestSurfaces: "Watercolor paper",
        finish: "Varies by pigment and product range",
        features:
          "Suitable for watercolor painting, color studies, and illustration. Pigment characteristics and performance vary by range.",
      },
      {
        type: "Oil and Acrylic",
        formats: "Tubes and assorted sets",
        bestSurfaces: "Primed canvas and compatible painting surfaces",
        finish: "Depends on the paint formulation",
        features:
          "Supports traditional and contemporary painting. Drying time, finish, and pigment properties vary by product.",
      },
    ],
  },
  {
    id: "liquitex",
    name: "Liquitex",
    country: "United States",
    badge: "Acrylic Specialists",
    description:
      "Liquitex is an art materials brand known for acrylic paints and mediums designed for painting, mixed media, and contemporary artwork.",
    mediums: [
      {
        type: "Acrylic Paint",
        formats: "Tubes, bottles, and assorted sets",
        bestSurfaces:
          "Primed canvas, painting board, and compatible mixed-media surfaces",
        finish: "Available in different finishes depending on the range",
        features:
          "Offers acrylic paints with different viscosities and working properties. Coverage, drying behavior, and pigment characteristics vary by product.",
      },
      {
        type: "Acrylic Mediums",
        formats: "Gels, liquids, pastes, and specialty mediums",
        bestSurfaces: "Surfaces compatible with acrylic painting",
        finish: "Varies by medium",
        features:
          "Designed to modify texture, flow, transparency, and other working properties of acrylic paint.",
      },
    ],
  },
];

window.BrandsDB = BrandsDB;
