/**
 * PigmentIQ / ChromaAtelier - Sketch & Graphite / Charcoal Darkness Database
 * Comprehensive spectrum from 9H through HB to maximum 14B, EE, and Charcoal.
 * Includes value-zone mappings, graphite-to-clay physics, blending guides, and recommendations.
 */

const SketchDB = {
    // Master Pencil Darkness Scale (9H through 14B + Hybrids)
    pencils: [
        {
            grade: "9H",
            name: "Extreme Hard 9H",
            category: "Hard Graphite (H Series)",
            darknessIndex: 1,
            hex: "#EDEDED",
            valueZone: "Zone 1 - Extreme Highlight",
            composition: "90% Fine Clay, 10% Graphite",
            sheen: "Zero Sheen, Very Sharp Edge",
            bestUses: "Precision technical drafting, micro-measurements, surgical guidelines under watercolor that will not bleed."
        },
        {
            grade: "6H",
            name: "Very Hard 6H",
            category: "Hard Graphite (H Series)",
            darknessIndex: 2,
            hex: "#DCDCDC",
            valueZone: "Zone 1.5 - Highlight Tints",
            composition: "80% Clay, 20% Graphite",
            sheen: "None",
            bestUses: "Subtle silverpoint style sketches, ultra-faint initial portrait proportional grids."
        },
        {
            grade: "4H",
            name: "Hard 4H",
            category: "Hard Graphite (H Series)",
            darknessIndex: 3,
            hex: "#C8C8C8",
            valueZone: "Zone 2 - High Light",
            composition: "70% Clay, 30% Graphite",
            sheen: "None",
            bestUses: "Initial lay-in sketch before watercolor/acrylic, feathering highlight gradients on glass and porcelain."
        },
        {
            grade: "2H",
            name: "Light Hard 2H",
            category: "Hard Graphite (H Series)",
            darknessIndex: 4,
            hex: "#B4B4B4",
            valueZone: "Zone 2.5 - Light Tone",
            composition: "60% Clay, 40% Graphite",
            sheen: "Very Low",
            bestUses: "Clean line work, architectural layouts, smooth base layer for pale skin highlights."
        },
        {
            grade: "H",
            name: "Hard H",
            category: "Neutral Transition",
            darknessIndex: 5,
            hex: "#9E9E9E",
            valueZone: "Zone 3 - Light Midtone",
            composition: "55% Clay, 45% Graphite",
            sheen: "Low",
            bestUses: "Subtle shading in light areas, maintaining crisp sharp lines for long sessions without sharpening."
        },
        {
            grade: "F",
            name: "Firm (Fine Point) F",
            category: "Neutral Transition",
            darknessIndex: 5.5,
            hex: "#8F8F8F",
            valueZone: "Zone 3.5 - High Midtone",
            composition: "50% Clay, 50% Graphite",
            sheen: "Low",
            bestUses: "The bridge between H and HB. Formulated to retain a sharp needle point for cross-hatching."
        },
        {
            grade: "HB",
            name: "Hard-Black HB (#2)",
            category: "Universal Neutral",
            darknessIndex: 6,
            hex: "#7D7D7D",
            valueZone: "Zone 4 - Medium Light Midtone",
            composition: "50% Graphite, 50% Clay",
            sheen: "Moderate",
            bestUses: "Universal drafting, basic portrait outlines, gesture drawings, initial volume mapping."
        },
        {
            grade: "B",
            name: "Soft Black B",
            category: "Soft Graphite (B Series)",
            darknessIndex: 7,
            hex: "#6B6B6B",
            valueZone: "Zone 5 - Center Midtone",
            composition: "60% Graphite, 40% Clay",
            sheen: "Moderate",
            bestUses: "First pass of natural shadow mapping, gentle facial contouring, soft cross-hatching."
        },
        {
            grade: "2B",
            name: "Soft 2B",
            category: "Soft Graphite (B Series)",
            darknessIndex: 8,
            hex: "#575757",
            valueZone: "Zone 6 - Medium Midtone",
            composition: "68% Graphite, 32% Clay",
            sheen: "Moderate Graphite Glaze",
            bestUses: "The artist's most versatile pencil. Expressive sketching, drapery folds, iris base tone, soft textures."
        },
        {
            grade: "3B",
            name: "Soft 3B",
            category: "Soft Graphite (B Series)",
            darknessIndex: 8.5,
            hex: "#494949",
            valueZone: "Zone 6.5 - Rich Midtone",
            composition: "73% Graphite, 27% Clay",
            sheen: "Silvery",
            bestUses: "Deepening shadow masses, gradual tonal transitions from cheek to shadow."
        },
        {
            grade: "4B",
            name: "Dark Soft 4B",
            category: "Soft Graphite (B Series)",
            darknessIndex: 9,
            hex: "#3D3D3D",
            valueZone: "Zone 7 - Dark Midtone / Form Shadow",
            composition: "78% Graphite, 22% Clay",
            sheen: "Silvery Metallic",
            bestUses: "Form shadows, dark hair locks, velvety smooth blends with tortillon/blending stump."
        },
        {
            grade: "6B",
            name: "Extra Soft 6B",
            category: "Deep Shadow Graphite",
            darknessIndex: 10,
            hex: "#2F2F2F",
            valueZone: "Zone 8 - Core Shadow",
            composition: "85% Graphite, 15% Clay",
            sheen: "High Graphite Sheen (unless matte line)",
            bestUses: "Deep core shadows, dark pupils, cast shadows, dynamic contrast against white paper."
        },
        {
            grade: "8B",
            name: "Super Dark 8B",
            category: "Deep Shadow Graphite",
            darknessIndex: 11,
            hex: "#222222",
            valueZone: "Zone 8.8 - Deep Cast Shadow",
            composition: "90% Graphite, 10% Clay / Binder",
            sheen: "High Luster",
            bestUses: "Midnight blacks, bold heavy shadows. Keep pressure light to avoid shiny graphite burnishing."
        },
        {
            grade: "10B",
            name: "Ultra Dense 10B",
            category: "Master Shadow Graphite",
            darknessIndex: 12,
            hex: "#191919",
            valueZone: "Zone 9.3 - Maximum Graphite Darkness",
            composition: "94% Soft Graphite, 6% Binder",
            sheen: "Deep Rich Dark",
            bestUses: "Heavy dramatic chiaroscuro shadows, deep background vignettes, velvet textures."
        },
        {
            grade: "12B",
            name: "Extreme Darkness 12B",
            category: "Master Shadow Graphite",
            darknessIndex: 13,
            hex: "#121212",
            valueZone: "Zone 9.7 - Maximum Occlusion",
            composition: "Finely micronized carbon-graphite",
            sheen: "Deep velvety sheen",
            bestUses: "Occlusion cracks, nostril and eyelid crevices, high-contrast darks."
        },
        {
            grade: "14B (Pitt Matt / Mars Lumograph Black)",
            name: "Apex 14B / Matt Black",
            category: "Maximum Density Black",
            darknessIndex: 14,
            hex: "#090909",
            valueZone: "Zone 10 - Total Pure Black",
            composition: "High Carbon Pigment + Graphite Matt Formulation",
            sheen: "Zero Sheen / Deep Matte Black (Anti-Reflective)",
            bestUses: "The darkest possible pencil grade in modern art. Solves the traditional graphite glare issue under studio lights!"
        },
        {
            grade: "EE Pencil",
            name: "EE (Extra Extra Carbon/Graphite Hybrid)",
            category: "Hybrid Specialty",
            darknessIndex: 13.5,
            hex: "#0F0F0F",
            valueZone: "Zone 9.8 - Rich Carbon Black",
            composition: "50% Pure Flake Graphite + 50% Carbon Charcoal",
            sheen: "Satin Semi-Matte",
            bestUses: "Quick live figure drawing, theatrical lighting studies, combines graphite smooth glide with charcoal pitch blackness."
        },
        {
            grade: "Charcoal - Soft / Medium / Hard",
            name: "Willow & Compressed Charcoal",
            category: "Carbon Media",
            darknessIndex: 14,
            hex: "#050505",
            valueZone: "Zone 10 - Absolute Black Light Absorber",
            composition: "100% Carbonized Willow / Compressed Carbon",
            sheen: "100% Matte, Light Absorbing",
            bestUses: "Atmospheric smoky blends, explosive gesture work, dramatic tonal realism, wipes away easily with kneaded eraser."
        }
    ],

    // Recommend pencil based on lightness luminance (0 = Black, 100 = White)
    recommendPencilForLuminance(lum) {
        if (lum >= 92) return {
            grade: "4H / 2H",
            leadType: "Hard Clay-Dense",
            hardness: "High Hardness (Low Graphite)",
            darknessValue: 8,
            reason: "Very light highlights. Use 4H with delicate touch to prevent digging paper grooves.",
            recommendedTechnique: "Ultra-light feathered cross-contour strokes; never press into paper tooth."
        };
        if (lum >= 80) return {
            grade: "2H / H",
            leadType: "Light Firm Graphite",
            hardness: "Medium-Hard",
            darknessValue: 20,
            reason: "Soft high-key tones. Keep strokes uniform with an H grade pencil.",
            recommendedTechnique: "Uniform circular shading with constant light pencil rotation."
        };
        if (lum >= 68) return {
            grade: "HB / F",
            leadType: "Balanced Core",
            hardness: "Standard Neutral",
            darknessValue: 32,
            reason: "Standard light midtones. HB provides clean, easily erasable structural shading.",
            recommendedTechnique: "Clean architectural blocking, gesture lines, and value mapping."
        };
        if (lum >= 52) return {
            grade: "B / 2B",
            leadType: "Soft Flake Graphite",
            hardness: "Soft Natural Glide",
            darknessValue: 48,
            reason: "Natural midtones. 2B glides smoothly and blends with paper tooth effortlessly.",
            recommendedTechnique: "Overlapping hatched tonal passes; blend gently with blending stump."
        };
        if (lum >= 38) return {
            grade: "3B / 4B",
            leadType: "Deep Soft Core",
            hardness: "Extra Soft",
            darknessValue: 62,
            reason: "Form shadows & drapery depth. 4B deposits rich pigment without excessive hand fatigue.",
            recommendedTechnique: "Build darks in successive cross-hatch layers rather than pressing down hard."
        };
        if (lum >= 24) return {
            grade: "6B / 8B",
            leadType: "Heavy Rich Graphite",
            hardness: "Ultra Soft",
            darknessValue: 76,
            reason: "Core shadows and cast shadows. Build darks in cross-hatch layers.",
            recommendedTechnique: "Angle lead for broad strokes; lift specular highlights using kneaded eraser."
        };
        if (lum >= 12) return {
            grade: "10B / 12B",
            leadType: "Dense Micro-Graphite",
            hardness: "Maximum Velvet Soft",
            darknessValue: 88,
            reason: "Near-black occlusion zones. Gives intense depth to hair and deep crevices.",
            recommendedTechnique: "Lay down deep pigment and blend with tortillon; do not rub with bare fingers."
        };
        return {
            grade: "14B / Charcoal / EE",
            leadType: "Matte Carbon / Charcoal Hybrid",
            hardness: "Total Black Absorption",
            darknessValue: 100,
            reason: "Maximum pitch-black depth. Use 14B Pitt Matt or Charcoal to eliminate shiny metallic reflection!",
            recommendedTechnique: "Zero-sheen occlusion shadows; fix with workable matte fixative spray."
        };
    },

    // Blending and preservation tools
    tools: [
        { name: "Blending Stump (Tortillon)", use: "Tightly rolled paper for blending tight graphite gradients without skin grease." },
        { name: "Kneaded Eraser", use: "Malleable putty that lifts graphite gently in dabs to sculpt soft highlights and reflected lights." },
        { name: "Tombow Mono Zero Eraser (2.3mm)", use: "Precision pin-point eraser for cutting razor-sharp hair strands, iris catchlights, and crisp borders." },
        { name: "Chamois Leather / Soft Brush", use: "Glides across charcoal and soft graphite to create photographic atmospheric smoky bokeh." },
        { name: "Workable Matte Fixative", use: "Locks graphite and charcoal layers so you can shade deeper on top without smearing earlier work." }
    ]
};

// Compatibility alias
SketchDB.pencilScale = SketchDB.pencils;

window.SketchDB = SketchDB;

