/**
 * PigmentIQ / ChromaAtelier - Mont Marte Master Color Database
 * Contains authentic Mont Marte shade numbers, pigment designations,
 * lightfastness, opacity ratings, hex values, and standard boxed set mappings.
 */

const MontMarteDB = {
    brand: "Mont Marte",
    description: "Australia's premier global art supplies brand, beloved for vibrant pigments and accessible professional quality.",
    
    // Core Color Shade Library (Signature & Satin Acrylic, Oils & Gouache)
    colors: [
        {
            code: "01",
            number: "MM-01",
            name: "Titanium White",
            hex: "#FFFFFF",
            rgb: [255, 255, 255],
            pigment: "PW6",
            opacity: "Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Cool / Neutral",
            role: "Primary Tinting & Opacifier",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [12, 18, 24, 36, 48]
        },
        {
            code: "02",
            number: "MM-02",
            name: "Zinc White (Mixing White)",
            hex: "#F7FAF8",
            rgb: [247, 250, 248],
            pigment: "PW4",
            opacity: "Semi-Transparent",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Cool",
            role: "Glazing & Gentle Tinting without Chalkiness",
            acrylic: true, oil: true, gouache: false, watercolor: false,
            inSets: [36, 48]
        },
        {
            code: "03",
            number: "MM-03",
            name: "Lemon Yellow",
            hex: "#FFF200",
            rgb: [255, 242, 0],
            pigment: "PY3",
            opacity: "Semi-Opaque",
            lightfastness: "++ (Very Good)",
            series: 1,
            warmth: "Cool Yellow (Greenish undertone)",
            role: "Primary Cool Yellow - Perfect for bright greens",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [12, 18, 24, 36, 48]
        },
        {
            code: "04",
            number: "MM-04",
            name: "Yellow Deep",
            hex: "#FFAE00",
            rgb: [255, 174, 0],
            pigment: "PY83",
            opacity: "Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Warm Yellow (Reddish undertone)",
            role: "Primary Warm Yellow - Lush oranges & sunny tones",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [12, 18, 24, 36, 48]
        },
        {
            code: "05",
            number: "MM-05",
            name: "Brilliant Red",
            hex: "#E81B23",
            rgb: [232, 27, 35],
            pigment: "PR4",
            opacity: "Opaque",
            lightfastness: "++ (Very Good)",
            series: 1,
            warmth: "Warm Red",
            role: "Primary Bright Warm Scarlet",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [12, 18, 24, 36, 48]
        },
        {
            code: "06",
            number: "MM-06",
            name: "Crimson",
            hex: "#9E0E2B",
            rgb: [158, 14, 43],
            pigment: "PR22",
            opacity: "Semi-Transparent",
            lightfastness: "++ (Very Good)",
            series: 2,
            warmth: "Cool Red (Blue undertone)",
            role: "Primary Cool Red - Essential for pure purples & roses",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [12, 18, 24, 36, 48]
        },
        {
            code: "07",
            number: "MM-07",
            name: "Vermilion",
            hex: "#F14B24",
            rgb: [241, 75, 36],
            pigment: "PR4 / PO13",
            opacity: "Opaque",
            lightfastness: "++ (Very Good)",
            series: 1,
            warmth: "Warm Red-Orange",
            role: "Fiery Sunsets & Warm Highlights",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [18, 24, 36, 48]
        },
        {
            code: "08",
            number: "MM-08",
            name: "Carmine",
            hex: "#B2103E",
            rgb: [178, 16, 62],
            pigment: "PR170",
            opacity: "Semi-Opaque",
            lightfastness: "++ (Very Good)",
            series: 2,
            warmth: "Cool Crimson",
            role: "Rich Florals & Velvet Tones",
            acrylic: true, oil: true, gouache: false, watercolor: true,
            inSets: [24, 36, 48]
        },
        {
            code: "09",
            number: "MM-09",
            name: "Magenta",
            hex: "#D62568",
            rgb: [214, 37, 104],
            pigment: "PR122",
            opacity: "Semi-Transparent",
            lightfastness: "+++ (Excellent)",
            series: 2,
            warmth: "True Primary Magenta",
            role: "Color Wheel Primary - Clean violets and orchids",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [24, 36, 48]
        },
        {
            code: "10",
            number: "MM-10",
            name: "Light Purple",
            hex: "#9F70B8",
            rgb: [159, 112, 184],
            pigment: "PV23 / PW6",
            opacity: "Opaque",
            lightfastness: "++ (Very Good)",
            series: 1,
            warmth: "Cool Lavender",
            role: "Pastel florals and twilight skies",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [18, 24, 36, 48]
        },
        {
            code: "11",
            number: "MM-11",
            name: "Cerulean Blue",
            hex: "#0083B8",
            rgb: [0, 131, 184],
            pigment: "PB15:3 / PW6",
            opacity: "Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Cool Blue (Green undertone)",
            role: "Daytime Azure Skies & Tropical Waters",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [12, 18, 24, 36, 48]
        },
        {
            code: "12",
            number: "MM-12",
            name: "Cobalt Blue",
            hex: "#0047AB",
            rgb: [0, 71, 171],
            pigment: "PB28 / PB29",
            opacity: "Semi-Opaque",
            lightfastness: "+++ (Excellent)",
            series: 2,
            warmth: "Neutral Classic Blue",
            role: "Atmospheric Depth & Horizon Haze",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [18, 24, 36, 48]
        },
        {
            code: "13",
            number: "MM-13",
            name: "Phthalo Cyan (Deep Cyan)",
            hex: "#007BA7",
            rgb: [0, 123, 167],
            pigment: "PB15:3",
            opacity: "Transparent",
            lightfastness: "+++ (Excellent)",
            series: 2,
            warmth: "Cool Primary Cyan",
            role: "Staining Powerhouse - Intense clean greens & teals",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [24, 36, 48]
        },
        {
            code: "14",
            number: "MM-14",
            name: "Ultramarine Blue",
            hex: "#18206F",
            rgb: [24, 32, 111],
            pigment: "PB29",
            opacity: "Semi-Transparent",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Warm Blue (Reddish/Violet undertone)",
            role: "Primary Warm Blue - Deep oceans, night skies, shadows",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [12, 18, 24, 36, 48]
        },
        {
            code: "15",
            number: "MM-15",
            name: "Monastral Green",
            hex: "#005F41",
            rgb: [0, 95, 65],
            pigment: "PG7",
            opacity: "Transparent",
            lightfastness: "+++ (Excellent)",
            series: 2,
            warmth: "Cool Emerald Green",
            role: "Intense jewel tinting green",
            acrylic: true, oil: true, gouache: false, watercolor: false,
            inSets: [36, 48]
        },
        {
            code: "16",
            number: "MM-16",
            name: "Phthalo Blue",
            hex: "#000F55",
            rgb: [0, 15, 85],
            pigment: "PB15:1",
            opacity: "Transparent",
            lightfastness: "+++ (Excellent)",
            series: 2,
            warmth: "Cool Green-Blue",
            role: "High Tinting Strength - Midnight skies & shadows",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [18, 24, 36, 48]
        },
        {
            code: "17",
            number: "MM-17",
            name: "Viridian",
            hex: "#007F5C",
            rgb: [0, 127, 92],
            pigment: "PG7",
            opacity: "Semi-Transparent",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Cool Pine Green",
            role: "Classic cool foliage & cool landscape shadows",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [12, 18, 24, 36, 48]
        },
        {
            code: "18",
            number: "MM-18",
            name: "Sap Green",
            hex: "#4E7927",
            rgb: [78, 121, 39],
            pigment: "PG7 / PY83",
            opacity: "Semi-Transparent",
            lightfastness: "++ (Very Good)",
            series: 1,
            warmth: "Warm Olive-Golden Green",
            role: "Natural leaves, grasses, botanicals",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [12, 18, 24, 36, 48]
        },
        {
            code: "19",
            number: "MM-19",
            name: "Yellow Ochre",
            hex: "#C68E2D",
            rgb: [198, 142, 45],
            pigment: "PY42",
            opacity: "Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Warm Earth Yellow",
            role: "Master Earth Tone - Portraits, sands, architectural stone",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [12, 18, 24, 36, 48]
        },
        {
            code: "20",
            number: "MM-20",
            name: "Burnt Umber",
            hex: "#4E2B1A",
            rgb: [78, 43, 26],
            pigment: "PBr7",
            opacity: "Semi-Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Warm Deep Brown",
            role: "Underpainting, rich wood, muted shadows",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [12, 18, 24, 36, 48]
        },
        {
            code: "21",
            number: "MM-21",
            name: "Raw Umber",
            hex: "#5A4935",
            rgb: [90, 73, 53],
            pigment: "PBr7 (Greenish)",
            opacity: "Semi-Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Cool Earth Brown (Green undertone)",
            role: "Atmospheric perspective, dead-coloring grisaille",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [18, 24, 36, 48]
        },
        {
            code: "22",
            number: "MM-22",
            name: "Burnt Sienna",
            hex: "#8A3319",
            rgb: [138, 51, 25],
            pigment: "PR101",
            opacity: "Semi-Transparent",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Warm Fiery Earth Red",
            role: "Skin midtones, terracotta, warm autumn tones",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [12, 18, 24, 36, 48]
        },
        {
            code: "23",
            number: "MM-23",
            name: "Raw Sienna",
            hex: "#B87528",
            rgb: [184, 117, 40],
            pigment: "PBr7 / PY42",
            opacity: "Semi-Transparent",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Warm Golden Clay",
            role: "Warm glazes, sunlit hills, golden fur",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [18, 24, 36, 48]
        },
        {
            code: "24",
            number: "MM-24",
            name: "Lamp Black",
            hex: "#161616",
            rgb: [22, 22, 22],
            pigment: "PBk7",
            opacity: "Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Cool Dense Black",
            role: "Maximum contrast, deep graphic outlines",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [12, 18, 24, 36, 48]
        },
        {
            code: "25",
            number: "MM-25",
            name: "Silver (Metallic)",
            hex: "#C0C0C0",
            rgb: [192, 192, 192],
            pigment: "Mica / Titanium",
            opacity: "Semi-Opaque",
            lightfastness: "+++ (Excellent)",
            series: 2,
            warmth: "Cool Metallic",
            role: "Shimmering highlights & decorative accents",
            acrylic: true, oil: false, gouache: false, watercolor: false,
            inSets: [36, 48]
        },
        {
            code: "26",
            number: "MM-26",
            name: "Gold (Metallic)",
            hex: "#D4AF37",
            rgb: [212, 175, 55],
            pigment: "Mica / Iron Oxide",
            opacity: "Semi-Opaque",
            lightfastness: "+++ (Excellent)",
            series: 2,
            warmth: "Warm Metallic",
            role: "Illuminated details, gilding, ornamental art",
            acrylic: true, oil: false, gouache: false, watercolor: false,
            inSets: [36, 48]
        },
        {
            code: "27",
            number: "MM-27",
            name: "Orange",
            hex: "#FF6600",
            rgb: [255, 102, 0],
            pigment: "PO13 / PY83",
            opacity: "Opaque",
            lightfastness: "++ (Very Good)",
            series: 1,
            warmth: "Warm Vibrant Orange",
            role: "Vibrant tropical accents, marigolds, fruits",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [18, 24, 36, 48]
        },
        {
            code: "28",
            number: "MM-28",
            name: "Flesh Tint / Peach",
            hex: "#FFD0A8",
            rgb: [255, 208, 168],
            pigment: "PW6 / PY42 / PR101",
            opacity: "Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Warm Pastel Skin Base",
            role: "Portrait highlight foundations & soft flora",
            acrylic: true, oil: true, gouache: true, watercolor: false,
            inSets: [24, 36, 48]
        },
        {
            code: "29",
            number: "MM-29",
            name: "Turquoise",
            hex: "#009E96",
            rgb: [0, 158, 150],
            pigment: "PG7 / PB15:3 / PW6",
            opacity: "Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Cool Green-Cyan",
            role: "Seascapes, gemstones, retro accents",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [24, 36, 48]
        },
        {
            code: "30",
            number: "MM-30",
            name: "Emerald Green",
            hex: "#009B55",
            rgb: [0, 155, 85],
            pigment: "PG7 / PY3",
            opacity: "Opaque",
            lightfastness: "++ (Very Good)",
            series: 1,
            warmth: "Cool Bright Green",
            role: "Spring foliage, lush rainforests, bright meadows",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [18, 24, 36, 48]
        },
        {
            code: "31",
            number: "MM-31",
            name: "Olive Green",
            hex: "#556B2F",
            rgb: [85, 107, 47],
            pigment: "PG7 / PY42 / PBk7",
            opacity: "Semi-Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Warm Muted Earth Green",
            role: "Distant trees, dry grass, camouflage shades",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [24, 36, 48]
        },
        {
            code: "32",
            number: "MM-32",
            name: "Paynes Grey",
            hex: "#344152",
            rgb: [52, 65, 82],
            pigment: "PBk7 / PB29 / PR101",
            opacity: "Semi-Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Cool Blue-Grey",
            role: "The Artist's Favorite Shadow - Softer than pure black",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [24, 36, 48]
        },
        {
            code: "33",
            number: "MM-33",
            name: "Neutral Grey",
            hex: "#7A7D84",
            rgb: [122, 125, 132],
            pigment: "PW6 / PBk7",
            opacity: "Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "True Neutral 50% Grey",
            role: "Desaturating high-chroma tones without color shifts",
            acrylic: true, oil: true, gouache: false, watercolor: false,
            inSets: [36, 48]
        },
        {
            code: "34",
            number: "MM-34",
            name: "Mid Green",
            hex: "#2E8B57",
            rgb: [46, 139, 87],
            pigment: "PG7 / PY83",
            opacity: "Semi-Opaque",
            lightfastness: "++ (Very Good)",
            series: 1,
            warmth: "Balanced Green",
            role: "All-purpose landscape foliage",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [12, 18, 24, 36, 48]
        },
        {
            code: "35",
            number: "MM-35",
            name: "Light Green",
            hex: "#66C238",
            rgb: [102, 194, 56],
            pigment: "PY3 / PG7 / PW6",
            opacity: "Opaque",
            lightfastness: "++ (Very Good)",
            series: 1,
            warmth: "Warm Lime Green",
            role: "Sunlit leaves, new shoots, chartreuse accents",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [18, 24, 36, 48]
        },
        {
            code: "36",
            number: "MM-36",
            name: "Rose Pink",
            hex: "#E86F88",
            rgb: [232, 111, 136],
            pigment: "PR122 / PW6",
            opacity: "Opaque",
            lightfastness: "++ (Very Good)",
            series: 1,
            warmth: "Cool Floral Pink",
            role: "Cherry blossoms, petals, confectionery hues",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [24, 36, 48]
        },
        {
            code: "37",
            number: "MM-37",
            name: "Purple / Deep Violet",
            hex: "#501B61",
            rgb: [80, 27, 97],
            pigment: "PV23",
            opacity: "Semi-Transparent",
            lightfastness: "+++ (Excellent)",
            series: 2,
            warmth: "Cool Royal Purple",
            role: "Deep shadows, velvet drapery, twilight horizons",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [18, 24, 36, 48]
        },
        {
            code: "38",
            number: "MM-38",
            name: "Coral Pink",
            hex: "#F26D68",
            rgb: [242, 109, 104],
            pigment: "PR4 / PY3 / PW6",
            opacity: "Opaque",
            lightfastness: "++ (Very Good)",
            series: 1,
            warmth: "Warm Salmon Pink",
            role: "Sunlit skin, tropical corals, sunset reflections",
            acrylic: true, oil: false, gouache: true, watercolor: false,
            inSets: [36, 48]
        },
        {
            code: "39",
            number: "MM-39",
            name: "Sky Blue",
            hex: "#62B5E5",
            rgb: [98, 181, 229],
            pigment: "PB15:3 / PW6",
            opacity: "Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Cool Soft Blue",
            role: "Crisp noon skies, calm lake reflections",
            acrylic: true, oil: true, gouache: true, watercolor: true,
            inSets: [24, 36, 48]
        },
        {
            code: "40",
            number: "MM-40",
            name: "Olive Yellow / Yellow Oxide",
            hex: "#B2993B",
            rgb: [178, 153, 59],
            pigment: "PY42 / PG7",
            opacity: "Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Warm Earth Gold",
            role: "Autumn marshes, dried fields, lichens",
            acrylic: true, oil: true, gouache: false, watercolor: false,
            inSets: [36, 48]
        },
        {
            code: "41",
            number: "MM-41",
            name: "Mars Black",
            hex: "#1F1D1D",
            rgb: [31, 29, 29],
            pigment: "PBk11 (Synthetic Iron Oxide)",
            opacity: "Opaque",
            lightfastness: "+++ (Excellent)",
            series: 1,
            warmth: "Warm Dense Matte Black",
            role: "Fast drying underpainting & intense flat coats",
            acrylic: true, oil: true, gouache: true, watercolor: false,
            inSets: [36, 48]
        },
        {
            code: "42",
            number: "MM-42",
            name: "Copper (Metallic)",
            hex: "#B87333",
            rgb: [184, 115, 51],
            pigment: "Mica / Iron Oxide",
            opacity: "Semi-Opaque",
            lightfastness: "+++ (Excellent)",
            series: 2,
            warmth: "Warm Metallic Earth",
            role: "Warm lustrous accents, bronze and autumn leaves",
            acrylic: true, oil: false, gouache: false, watercolor: false,
            inSets: [36, 48]
        }
    ],

    // Pre-configured kit sets
    presets: {
        set12: {
            title: "Mont Marte 12-Piece Introductory Set",
            codes: ["01", "03", "04", "05", "06", "11", "14", "17", "18", "19", "20", "24"]
        },
        set18: {
            title: "Mont Marte 18-Piece Studio Set",
            codes: ["01", "03", "04", "05", "06", "07", "10", "11", "12", "14", "16", "17", "18", "19", "20", "21", "22", "24"]
        },
        set24: {
            title: "Mont Marte 24-Piece Artist Palette",
            codes: ["01", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "16", "17", "18", "19", "20", "21", "22", "23", "24", "27", "32"]
        },
        set36: {
            title: "Mont Marte 36-Piece Master Series",
            codes: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37"]
        }
    },

    // Lookup color by shade code or number (e.g. "01", "MM-01", 1, "Lemon Yellow")
    findColor(query) {
        if (!query) return null;
        const q = query.toString().trim().toLowerCase();
        const numOnly = q.replace(/[^0-9]/g, '').padStart(2, '0');
        
        return this.colors.find(c => 
            c.code === numOnly ||
            c.number.toLowerCase() === q ||
            c.name.toLowerCase() === q ||
            c.name.toLowerCase().includes(q)
        );
    },

    // Find nearest Mont Marte shade for any given RGB
    findNearestShade(r, g, b, pool = null) {
        const available = pool && pool.length > 0 ? pool : this.colors;
        const targetLab = ColorMath.rgbToLab(r, g, b);

        let bestMatch = null;
        let lowestDeltaE = Infinity;

        for (const item of available) {
            const itemLab = ColorMath.rgbToLab(item.rgb[0], item.rgb[1], item.rgb[2]);
            const dE = ColorMath.deltaE2000(targetLab, itemLab);
            if (dE < lowestDeltaE) {
                lowestDeltaE = dE;
                bestMatch = item;
            }
        }

        return {
            color: bestMatch,
            deltaE: Math.round(lowestDeltaE * 10) / 10,
            accuracy: ColorMath.matchAccuracy(lowestDeltaE)
        };
    }
};

// Compatibility aliases
MontMarteDB.catalog = MontMarteDB.colors;
MontMarteDB.kitPresets = {
    set12: MontMarteDB.presets.set12.codes,
    set18: MontMarteDB.presets.set18.codes,
    set24: MontMarteDB.presets.set24.codes,
    set36: MontMarteDB.presets.set36.codes
};

window.MontMarteDB = MontMarteDB;

