/**
 * PigmentIQ / ChromaAtelier - Surfaces & Substrates Master Guide
 * Comprehensive knowledge base on Canvas, Cartridge Paper, Canvas Pads,
 * Watercolor Paper, Glass, Plastic, Wood, Clay, and Fabrics.
 * Includes preparation, priming, compatible mediums, and varnishing instructions.
 */

const SurfacesDB = [
    {
        id: "canvas",
        name: "Canvas (Stretched & Panels)",
        
        category: "Traditional Fine Art Substrates",
        description: "The timeless standard for master painters. Woven from cotton duck or linen, stretched over kiln-dried pine stretcher bars or mounted on rigid MDF board.",
        variants: [
            { name: "Stretched Cotton Duck", weight: "10oz - 12oz (300-380 GSM)", tooth: "Medium Grain", bestFor: "Acrylics, Oil Painting, Mixed Media Impasto" },
            { name: "Canvas Board / Panel", weight: "Rigid 3mm - 4mm MDF backing", tooth: "Fine to Medium", bestFor: "Plein air studies, heavy palette knife work, students" },
            { name: "Linen Canvas", weight: "Belgian / European flax", tooth: "Ultra-fine to coarse", bestFor: "Archival portraiture, professional masterworks (highest longevity)" }
        ],
        compatibleMediums: [
            { medium: "Acrylic Colours (Heavy Body / Fluid / Satin)", compatibility: "Perfect (100%)", note: "Bonds instantly with universal gesso. Flexible, crack-resistant." },
            { medium: "Oil Colours", compatibility: "Perfect (100%)", note: "Apply over acrylic gesso or traditional oil ground. Never paint directly on raw unprimed canvas." },
            { medium: "Acrylic Paint Markers (Posca, Doms)", compatibility: "Excellent (95%)", note: "Crisp line work and vibrant opaque fills over primed canvas." },
            { medium: "Oil Pastels", compatibility: "Very Good (85%)", note: "Can be blended directly or thinned with odorless mineral spirits on canvas." },
            { medium: "Gouache & Watercolors", compatibility: "Fair (60%)", note: "Requires specialized Watercolor Ground (Absorbent Ground) coated on canvas first." }
        ],
        surfacePrep: [
            "1. Inspect for tautness; insert corner keys if stretched canvas is sagging.",
            "2. If raw canvas: Apply 2 coats of Acrylic Gesso with a wide flat brush in criss-cross strokes.",
            "3. Allow 2-3 hours dry time, lightly sand with 240-grit sandpaper between coats for satin finish.",
            "4. For ultra-smooth portrait surfaces, apply 3 to 4 thin gesso layers followed by 400-grit wet sanding."
        ],
        varnishingTips: "Once fully cured (72h for acrylics, 6-12 months for oils), apply Acrylic Gloss/Satin Varnish with a wide flat wash brush or spray can in dust-free environment."
    },
    {
        id: "canvas-pads",
        name: "Canvas Pads",
        
        category: "Portable Fine Art Substrates",
        description: "Glue-bound or spiral-bound pads containing real woven canvas sheets primed with acrylic gesso. Combines the authentic tooth of stretched canvas with the convenience of paper.",
        variants: [
            { name: "Standard Primed Canvas Sheets", weight: "280 - 300 GSM", tooth: "Medium woven grain", bestFor: "Practice drills, color studies, classroom studies, easy framing in photo frames" }
        ],
        compatibleMediums: [
            { medium: "Acrylic Paints & Gouache", compatibility: "100%", note: "Ready to paint directly out of the pad." },
            { medium: "Oil Paint Studies", compatibility: "95%", note: "Excellent for quick oil sketches; tape edges with blue painter's tape to board." },
            { medium: "Pastel Pencils & Oil Pastels", compatibility: "90%", note: "The woven texture catches pigment brilliantly." }
        ],
        surfacePrep: [
            "1. Peel or cut sheet from pad along the glue line.",
            "2. Tape securely on all four edges to a drawing board using low-tack painter's masking tape to prevent curling.",
            "3. Pre-primed; no additional gesso required unless an ultra-smooth finish is preferred."
        ],
        varnishingTips: "Allow full drying, apply spray varnish or mount onto backing board for framing behind glass."
    },
    {
        id: "cartridge-paper",
        name: "Cartridge & Sketching Paper",
        
        category: "Paper & Boards",
        description: "Uncoated, high-quality drawing paper with subtle tooth. An artist essential for sketching, graphite, charcoal, colored pencils, brush pens, and mixed media.",
        variants: [
            { name: "Lightweight Cartridge", weight: "90 - 120 GSM", tooth: "Very light tooth", bestFor: "Quick gesture sketches, pencil studies, dry pen sketches" },
            { name: "Medium Weight Cartridge", weight: "130 - 160 GSM", tooth: "Medium fine tooth", bestFor: "Graphite pencil shading (HB-10B), colored pencils, soft pastels" },
            { name: "Heavyweight Mixed Media Cartridge", weight: "180 - 250 GSM", tooth: "Sturdy vellum finish", bestFor: "Doms & Camel brush pens, acrylic marker illustrations, light watercolor & gouache" }
        ],
        compatibleMediums: [
            { medium: "Graphite Pencils (HB - 14B) & Charcoal", compatibility: "100%", note: "Paper grain grips carbon and graphite evenly." },
            { medium: "Colored Pencils (Polychromos, Prismacolor)", compatibility: "100%", note: "Supports 4-6 burnished layers without flattening teeth." },
            { medium: "Brush Pens (Doms, Camel) & Fineliners", compatibility: "95%", note: "Glide smoothly with minimal bleed on 160+ GSM." },
            { medium: "Soft Pastels & Conte Crayons", compatibility: "90%", note: "Requires workable fixative between heavy layers." },
            { medium: "Heavy Wet Watercolors", compatibility: "50%", note: "Will buckle unless 200+ GSM and taped down." }
        ],
        surfacePrep: [
            "1. Choose acid-free / archival paper to prevent yellowing over time.",
            "2. For wet washes on 180+ GSM, tape down edges to a stiff MDF board.",
            "3. Keep a clean sheet of scrap paper under your drawing wrist to prevent hand oil transfer."
        ],
        varnishingTips: "Protect pencil & pastel works with 2 misting passes of Workable Art Fixative from 30cm away."
    },
    {
        id: "watercolor-paper",
        name: "Watercolor Paper (Cold, Hot & Rough)",
        
        category: "Paper & Boards",
        description: "Heavy cotton or cellulose paper treated with gelatin/synthetic sizing to control moisture absorption, allowing luminous watercolor pigments to float and bloom.",
        variants: [
            { name: "Cold Pressed (NOT finish)", weight: "300 GSM (140 lb)", tooth: "Distinct dimpled texture", bestFor: "Universal choice - wet-on-wet washes, blooms, dry-brushing" },
            { name: "Hot Pressed (Smooth finish)", weight: "300 GSM (140 lb)", tooth: "Silky smooth plate", bestFor: "Botanical illustrations, fine ink & wash, watercolor pencils, portraits" },
            { name: "Rough", weight: "300 - 640 GSM (300 lb)", tooth: "Deep rugged grain", bestFor: "Dramatic seascapes, granulating pigments, expressive loose strokes" }
        ],
        compatibleMediums: [
            { medium: "Watercolors (Cakes & Tubes)", compatibility: "100%", note: "Optimum capillary flow and pigment luminosity." },
            { medium: "Gouache & Aqua Color", compatibility: "100%", note: "Matte opaque gouache adheres with zero flaking." },
            { medium: "Watercolor Pencils & Brush Pens", compatibility: "98%", note: "Dissolves cleanly into washes." },
            { medium: "Acrylics (Diluted washes / Glazes)", compatibility: "90%", note: "Creates waterproof watercolor-like effects." }
        ],
        surfacePrep: [
            "1. If paper is under 300 GSM, soak in clean water bath for 3 minutes and stretch onto a wooden drawing board using gummed tape.",
            "2. 300 GSM glued watercolor blocks can be painted on directly without pre-stretching.",
            "3. Use artist masking fluid on dry paper to preserve brilliant white highlights."
        ],
        varnishingTips: "Frame behind UV-protective glass with a mat/mount; do not apply liquid varnish directly over traditional watercolors."
    },
    {
        id: "wood",
        name: "Wood Panels & MDF / Pine",
        
        category: "Rigid & Dimensional Substrates",
        description: "Solid birch plywood, basswood cradle panels, MDF boards, and raw pine slabs. Provides a solid, vibration-free surface that never sags under heavy paint or knife work.",
        variants: [
            { name: "Cradled Birch Plywood", weight: "Solid 1/4\" face + pine cradle", tooth: "Ultra-smooth fine grain", bestFor: "Detailed oils, acrylics, resin pours, wood staining" },
            { name: "MDF / Hardboard Panel", weight: "Dense engineered wood", tooth: "Uniform flat surface", bestFor: "Smooth portraiture, palette knife painting, experimental panels" },
            { name: "Raw Pine / Tree Slices", weight: "Natural live-edge log cross-sections", tooth: "Natural grain ridges", bestFor: "Rustic acrylics, pyrography + paint, folk art" }
        ],
        compatibleMediums: [
            { medium: "Acrylic Paints & Gels", compatibility: "100%", note: "Superior adhesion once wood is sized and primed." },
            { medium: "Oil Paints", compatibility: "98%", note: "Gesso-sealed wood prevents oil rotting natural fibers." },
            { medium: "Acrylic Markers (Posca, Doms)", compatibility: "95%", note: "Crisp illustration lines directly on raw or primed wood." },
            { medium: "Wood Stains & Inks", compatibility: "95%", note: "Enhances natural woodgrain under translucent colors." }
        ],
        surfacePrep: [
            "1. Sand thoroughly: Start with 120-grit, progress to 220-grit along the woodgrain direction.",
            "2. Wipe clean of all sawdust using a damp lint-free cloth or tack cloth.",
            "3. Apply 1 coat of Sanding Sealer or PVA size to seal wood pores and prevent tannin discoloration.",
            "4. Apply 2-3 coats of Acrylic Gesso, sanding gently between coats with 320-grit."
        ],
        varnishingTips: "Finish with high-gloss liquid acrylic varnish or clear epoxy resin for an ultra-deep glass-like dimension."
    },
    {
        id: "glass",
        name: "Glass & Mirrors",
        
        category: "Non-Porous Substrates",
        description: "Smooth, non-porous silica glass, glass jars, framed window panes, and decorative mirror surfaces for reverse glass painting and vibrant translucent crafts.",
        variants: [
            { name: "Picture Frame Glass / Sheets", tooth: "Zero tooth (Ultra-slick)", bestFor: "Reverse glass painting, modern signage, stained glass effects" },
            { name: "Glass Bottles & Jars", tooth: "Curved slick surface", bestFor: "Upcycling decor, floral vases, fairy light displays" }
        ],
        compatibleMediums: [
            { medium: "Acrylic Paint Markers (Posca, Doms C3)", compatibility: "95%", note: "Extremely easy control, opaque and vivid. Removable with scraper or permanent if baked/sealed." },
            { medium: "Specialized Glass Paints (Pebeo Vitrea)", compatibility: "100%", note: "Thermal bakeable in kitchen oven for dishwasher durability." },
            { medium: "Acrylics mixed with Glass Medium / GAC 200", compatibility: "90%", note: "Medium promotes adhesion to slick non-porous glass." },
            { medium: "Alcohol Inks", compatibility: "92%", note: "Produces gorgeous stained-glass marbled effects." }
        ],
        surfacePrep: [
            "1. Deep clean glass with 99% Isopropyl Alcohol or glass cleaner to eradicate oils, grease, and fingerprints.",
            "2. Wear latex/nitrile gloves when handling cleaned glass.",
            "3. Avoid sanding unless a frosted effect is desired.",
            "4. For regular acrylic paint, mix paint 1:1 with Acrylic Glass / Gloss Medium."
        ],
        varnishingTips: "For decorative display, seal with crystal clear acrylic spray sealer (2 light mist coats). For bakeable paints, bake at 150°C (300°F) for 40 mins."
    },
    {
        id: "plastic",
        name: "Plastic, Acrylic Sheets (Perspex) & Yupo",
        
        category: "Non-Porous Substrates",
        description: "Polycarbonate, acrylic sheets (Plexiglass), synthetic waterproof Yupo paper, and rigid plastic objects for contemporary fluid art and pop illustrations.",
        variants: [
            { name: "Clear Acrylic Sheets (Perspex)", tooth: "Zero tooth", bestFor: "Floating glass-like artwork, layered 3D acrylic paintings" },
            { name: "Yupo Synthetic Paper", tooth: "Silky polypropylene sheet", bestFor: "Alcohol inks, liquid watercolors, experimental marbling" },
            { name: "Rigid Molded Plastics / Phone Cases", tooth: "Smooth slick polymer", bestFor: "Custom custom illustration, sneaker art, phone cases" }
        ],
        compatibleMediums: [
            { medium: "Acrylic Markers (Posca, Doms)", compatibility: "98%", note: "Direct adherence with vibrant opacity." },
            { medium: "Alcohol Inks (Piñata, Ranger)", compatibility: "100%", note: "Glides and blooms freely on synthetic non-porous Yupo." },
            { medium: "Acrylic Paint (with Plastic Primer)", compatibility: "90%", note: "Apply plastic adhesion promoter or light scuffing first." }
        ],
        surfacePrep: [
            "1. Clean with mild dish soap and warm water. DO NOT use acetone, which melts and fogs acrylic plastics!",
            "2. For rigid plastics to be painted with brush acrylics: Lightly scuff surface with 600-grit sandpaper for mechanical bite.",
            "3. Spray 1 light mist of plastic primer if covering large areas."
        ],
        varnishingTips: "Seal with water-based acrylic aerosol gloss or satin varnish. Avoid harsh solvent lacquers that craze plastic."
    },
    {
        id: "clay-terracotta",
        name: "Terracotta, Bisque & Air-Dry Clay",
        
        category: "Earthen & Sculptural Substrates",
        description: "Porous baked red terracotta pots, unglazed ceramic bisque, and air-dry clay sculptures. Highly porous and absorbs water rapidly.",
        variants: [
            { name: "Terracotta Flower Pots", tooth: "Sandy porous clay", bestFor: "Boho plant pot painting, mandala art, garden ornaments" },
            { name: "Air-Dry Clay Sculptures (DAS / Fimo)", tooth: "Chalky smooth to textured", bestFor: "Miniature figurines, jewelry trays, decorative wall hangings" }
        ],
        compatibleMediums: [
            { medium: "Acrylic Paints (Mont Marte, Camel)", compatibility: "100%", note: "Adheres tenaciously into clay pores." },
            { medium: "Acrylic Paint Markers (Posca, Doms)", compatibility: "98%", note: "Crisp line work and vibrant detail work." },
            { medium: "Gouache Colours", compatibility: "85%", note: "Velvet finish; must be sealed against moisture." }
        ],
        surfacePrep: [
            "1. Wipe dust off with a barely damp sponge and let dry 30 minutes.",
            "2. Clay absorbs moisture fast: seal with 1 coat of diluted acrylic gesso (70% gesso + 30% water) or clear acrylic varnish primer.",
            "3. This prevents the raw clay from draining water out of your acrylic paint too fast."
        ],
        varnishingTips: "Coat with 2-3 layers of exterior gloss varnish if used for outdoor planters, or brush-on polyurethane."
    }
];

window.SurfacesDB = SurfacesDB;

