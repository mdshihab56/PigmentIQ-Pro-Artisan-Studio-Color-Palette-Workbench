/**
 * PigmentIQ / ChromaAtelier - Color Mixing Recipe & Mont Marte Combo Engine
 * Formulates realistic physical paint combinations using subtractive pigment ratios.
 * Calculates exact Mont Marte color number combos to recreate any target shade.
 */

const RecipeEngine = {
    // Generate universal pigment mixing formula from target RGB
    createUniversalRecipe(r, g, b) {
        const hsl = ColorMath.rgbToHsl(r, g, b);
        const cmyk = ColorMath.rgbToCmyk(r, g, b);
        const h = hsl.h, s = hsl.s, l = hsl.l;

        // Base recipe ingredients array: [ { name, code, role, parts, hex } ]
        const ingredients = [];
        const steps = [];

        // Determine main hue category & primary pigment recommendations
        let primaryBase = "";
        let primaryParts = 0;
        let secondaryShift = "";
        let secondaryParts = 0;

        if (s < 12) {
            // Monochromatic / Greyscale / Neutral
            if (l > 85) {
                ingredients.push({ name: "Titanium White", code: "MM-01", role: "Base Opacifier", parts: 8, hex: "#FFFFFF" });
                ingredients.push({ name: "Burnt Umber", code: "MM-20", role: "Gentle Neutralizer", parts: 0.5, hex: "#4E2B1A" });
                ingredients.push({ name: "Ultramarine Blue", code: "MM-14", role: "Cool Balancer", parts: 0.25, hex: "#18206F" });
                steps.push("Start with pure Titanium White on your palette.");
                steps.push("Add a needle-tip dab of Burnt Umber and Ultramarine to cut the stark white glare without turning muddy.");
            } else if (l < 20) {
                ingredients.push({ name: "Burnt Umber", code: "MM-20", role: "Rich Dark Mass", parts: 4, hex: "#4E2B1A" });
                ingredients.push({ name: "Ultramarine Blue", code: "MM-14", role: "Chromatic Darkener", parts: 4, hex: "#18206F" });
                ingredients.push({ name: "Lamp Black", code: "MM-24", role: "Deep Occlusion", parts: 1, hex: "#161616" });
                steps.push("Mix equal parts Burnt Umber and Ultramarine Blue to forge a chromatic black far richer than tube black.");
                steps.push("Add a tiny drop of Lamp Black if pure depth is required.");
            } else {
                ingredients.push({ name: "Titanium White", code: "MM-01", role: "Base Tint", parts: Math.round(l / 12), hex: "#FFFFFF" });
                ingredients.push({ name: "Burnt Umber", code: "MM-20", role: "Warm Shadow", parts: 2, hex: "#4E2B1A" });
                ingredients.push({ name: "Ultramarine Blue", code: "MM-14", role: "Cool Shadow", parts: 2, hex: "#18206F" });
                steps.push("Build a chromatic neutral grey with Ultramarine and Burnt Umber.");
                steps.push("Lighten to target value using Titanium White in stages.");
            }
        } else {
            // Chromatic Hue Analysis
            if (h >= 345 || h < 15) {
                // Red / Crimson
                if (l > 60) {
                    ingredients.push({ name: "Titanium White", code: "MM-01", role: "Tint Base", parts: 5, hex: "#FFFFFF" });
                    ingredients.push({ name: "Brilliant Red", code: "MM-05", role: "Warm Hue", parts: 2, hex: "#E81B23" });
                    ingredients.push({ name: "Crimson", code: "MM-06", role: "Floral Softener", parts: 1, hex: "#9E0E2B" });
                    steps.push("Blend Brilliant Red and Crimson for a vibrant strawberry base.");
                    steps.push("Introduce Titanium White until the soft pastel petal value is attained.");
                } else {
                    ingredients.push({ name: "Brilliant Red", code: "MM-05", role: "Core Scarlet", parts: 4, hex: "#E81B23" });
                    ingredients.push({ name: "Crimson", code: "MM-06", role: "Depth Red", parts: 2, hex: "#9E0E2B" });
                    if (s < 70) ingredients.push({ name: "Viridian Green", code: "MM-17", role: "Complementary Muter", parts: 0.25, hex: "#007F5C" });
                    steps.push("Combine Brilliant Red with Crimson.");
                    if (s < 70) steps.push("Touch with a pinhead speck of Viridian to desaturate the high-chroma flare.");
                }
            } else if (h >= 15 && h < 45) {
                // Orange / Warm Ochre / Terracotta
                if (l < 45) {
                    ingredients.push({ name: "Burnt Sienna", code: "MM-22", role: "Earth Red Base", parts: 4, hex: "#8A3319" });
                    ingredients.push({ name: "Yellow Deep", code: "MM-04", role: "Warm Glow", parts: 2, hex: "#FFAE00" });
                    ingredients.push({ name: "Titanium White", code: "MM-01", role: "Value Lift", parts: 1, hex: "#FFFFFF" });
                    steps.push("Use Burnt Sienna as the warm, earthy anchor.");
                    steps.push("Enrich warmth with Yellow Deep; modulate value with White.");
                } else {
                    ingredients.push({ name: "Yellow Deep", code: "MM-04", role: "Luminous Base", parts: 4, hex: "#FFAE00" });
                    ingredients.push({ name: "Brilliant Red", code: "MM-05", role: "Orange Shift", parts: 2, hex: "#E81B23" });
                    if (l > 65) ingredients.push({ name: "Titanium White", code: "MM-01", role: "Pastel Tint", parts: 3, hex: "#FFFFFF" });
                    steps.push("Start with Yellow Deep on the palette.");
                    steps.push("Fold in Brilliant Red gradually until vibrant orange ignites.");
                }
            } else if (h >= 45 && h < 75) {
                // Yellow / Gold / Mustard
                if (s < 55) {
                    ingredients.push({ name: "Yellow Ochre", code: "MM-19", role: "Earth Gold", parts: 4, hex: "#C68E2D" });
                    ingredients.push({ name: "Lemon Yellow", code: "MM-03", role: "Highlight Pop", parts: 1, hex: "#FFF200" });
                    ingredients.push({ name: "Titanium White", code: "MM-01", role: "Value Balance", parts: 2, hex: "#FFFFFF" });
                    steps.push("Lay down Yellow Ochre as your primary body.");
                    steps.push("Brighten top end with Lemon Yellow; add White to desired opacity.");
                } else {
                    ingredients.push({ name: "Lemon Yellow", code: "MM-03", role: "Luminous Primary", parts: 5, hex: "#FFF200" });
                    ingredients.push({ name: "Yellow Deep", code: "MM-04", role: "Warm Body", parts: 2, hex: "#FFAE00" });
                    steps.push("Combine Lemon Yellow with a touch of Yellow Deep for full sunlight intensity.");
                }
            } else if (h >= 75 && h < 165) {
                // Greens (Lime, Olive, Emerald, Forest)
                if (h < 110) {
                    // Warm Olive / Leaf Green
                    ingredients.push({ name: "Lemon Yellow", code: "MM-03", role: "Bright Base", parts: 4, hex: "#FFF200" });
                    ingredients.push({ name: "Sap Green", code: "MM-18", role: "Natural Foliage", parts: 2, hex: "#4E7927" });
                    ingredients.push({ name: "Cerulean Blue", code: "MM-11", role: "Cool Shadow", parts: 0.5, hex: "#0083B8" });
                    steps.push("Always start with the lighter pigment: Lemon Yellow.");
                    steps.push("Gradually add Sap Green to build natural botanic brilliance.");
                } else {
                    // Cool Emerald / Pine / Teal Green
                    ingredients.push({ name: "Viridian", code: "MM-17", role: "Cool Deep Base", parts: 3, hex: "#007F5C" });
                    ingredients.push({ name: "Lemon Yellow", code: "MM-03", role: "Sunlight Luster", parts: 2, hex: "#FFF200" });
                    ingredients.push({ name: "Cerulean Blue", code: "MM-11", role: "Teal Shift", parts: 1, hex: "#0083B8" });
                    steps.push("Mix Viridian and Cerulean Blue to capture cool cyan water undertones.");
                    steps.push("Adjust chroma using small dabs of Lemon Yellow.");
                }
            } else if (h >= 165 && h < 260) {
                // Cyan / Cerulean / Royal / Ultramarine Blue
                if (h < 205) {
                    // Cyan / Turquoise
                    ingredients.push({ name: "Cerulean Blue", code: "MM-11", role: "Azure Base", parts: 4, hex: "#0083B8" });
                    ingredients.push({ name: "Viridian", code: "MM-17", role: "Cyan Shift", parts: 1, hex: "#007F5C" });
                    ingredients.push({ name: "Titanium White", code: "MM-01", role: "Sky Tint", parts: Math.round(l / 15), hex: "#FFFFFF" });
                    steps.push("Mix Cerulean Blue with a micro-touch of Viridian.");
                    steps.push("Blend in Titanium White to float the vibrant sky tone.");
                } else {
                    // Deep Cobalt / Ultramarine
                    ingredients.push({ name: "Ultramarine Blue", code: "MM-14", role: "Royal Base", parts: 4, hex: "#18206F" });
                    ingredients.push({ name: "Cerulean Blue", code: "MM-11", role: "Brilliance Lift", parts: 2, hex: "#0083B8" });
                    if (l > 50) ingredients.push({ name: "Titanium White", code: "MM-01", role: "Atmospheric Tint", parts: 3, hex: "#FFFFFF" });
                    steps.push("Place Ultramarine Blue as the foundation.");
                    steps.push("Add Cerulean Blue for optical vibrancy, then Titanium White for cloud/horizon depth.");
                }
            } else if (h >= 260 && h < 315) {
                // Purple / Violet / Lavender
                ingredients.push({ name: "Ultramarine Blue", code: "MM-14", role: "Deep Cool Blue", parts: 3, hex: "#18206F" });
                ingredients.push({ name: "Crimson", code: "MM-06", role: "Cool Red", parts: 3, hex: "#9E0E2B" });
                if (l > 50) {
                    ingredients.push({ name: "Titanium White", code: "MM-01", role: "Lavender Lift", parts: 4, hex: "#FFFFFF" });
                    steps.push("CRITICAL ARTIST RULE: Never mix warm red (like Brilliant Red) with blue for purple, or it will turn muddy brown!");
                    steps.push("Mix cool Crimson with Ultramarine Blue to generate a rich violet, then tint with Titanium White for lavender.");
                } else {
                    steps.push("Combine Ultramarine Blue and Crimson in equal measure for a majestic royal velvet purple.");
                }
            } else {
                // Magenta / Rose / Fuchsia
                ingredients.push({ name: "Crimson", code: "MM-06", role: "Cool Foundation", parts: 3, hex: "#9E0E2B" });
                ingredients.push({ name: "Brilliant Red", code: "MM-05", role: "Warm Flare", parts: 1, hex: "#E81B23" });
                ingredients.push({ name: "Titanium White", code: "MM-01", role: "Rose Body", parts: 4, hex: "#FFFFFF" });
                steps.push("Blend Crimson into Titanium White to produce radiant rose pink.");
                steps.push("Add a speck of Brilliant Red to inject coral warmth.");
            }
        }

        return {
            ingredients,
            steps,
            colorProperties: {
                hsl,
                cmyk,
                warmth: (h >= 30 && h <= 150) ? "Warm" : (h >= 160 && h <= 280) ? "Cool" : "Balanced / Neutral",
                chroma: s > 65 ? "High Vibrancy" : s > 30 ? "Medium Satin" : "Muted Earth / Low Chroma"
            }
        };
    },

    // Precision Mont Marte Match & Combo Solver
    // Takes target RGB and finds either the closest direct shade OR computes
    // the optimal 2-paint or 3-paint recipe from Mont Marte's catalog or user's active kit!
    solveMontMarteCombo(r, g, b, activeKitCodes = null) {
        // Pool of available Mont Marte colors
        let pool = MontMarteDB.colors;
        if (activeKitCodes && activeKitCodes.length > 0) {
            const filtered = MontMarteDB.colors.filter(c => activeKitCodes.includes(c.code));
            if (filtered.length >= 2) {
                pool = filtered;
            }
        }

        const targetLab = ColorMath.rgbToLab(r, g, b);

        // 1. Check direct single tube match first
        const directMatch = MontMarteDB.findNearestShade(r, g, b, pool);

        // 2. Compute 2-paint combinatorial search with discrete paint ratios
        // Ratios: [1:1, 2:1, 3:1, 4:1, 5:1, 1:2, 1:3, 1:4, 1:5, 3:2, 2:3]
        const ratios = [
            [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
            [1, 2], [1, 3], [1, 4], [1, 5],
            [3, 2], [2, 3], [4, 3], [3, 4]
        ];

        let bestCombo = null;
        let lowestDeltaE = directMatch.deltaE;

        // Try dual-paint mixes
        for (let i = 0; i < pool.length; i++) {
            const p1 = pool[i];
            for (let j = i + 1; j < pool.length; j++) {
                const p2 = pool[j];

                for (const [r1, r2] of ratios) {
                    const mixedRgb = ColorMath.mixPaints([
                        { r: p1.rgb[0], g: p1.rgb[1], b: p1.rgb[2], parts: r1 },
                        { r: p2.rgb[0], g: p2.rgb[1], b: p2.rgb[2], parts: r2 }
                    ]);

                    const mixLab = ColorMath.rgbToLab(mixedRgb.r, mixedRgb.g, mixedRgb.b);
                    const dE = ColorMath.deltaE2000(targetLab, mixLab);

                    if (dE < lowestDeltaE) {
                        lowestDeltaE = dE;
                        bestCombo = {
                            type: "Dual Blend",
                            paints: [
                                { color: p1, parts: r1 },
                                { color: p2, parts: r2 }
                            ],
                            mixedRgb,
                            deltaE: Math.round(dE * 10) / 10,
                            accuracy: ColorMath.matchAccuracy(dE)
                        };
                    }
                }
            }
        }

        // Try 3-paint mixes with White (MM-01) or Umber (MM-20) if Delta-E is still > 3.5
        const white = pool.find(c => c.code === "01") || MontMarteDB.findColor("01");
        const umber = pool.find(c => c.code === "20") || MontMarteDB.findColor("20");

        if (lowestDeltaE > 3.0 && white) {
            for (let i = 0; i < pool.length; i++) {
                const p1 = pool[i];
                if (p1.code === "01") continue;

                for (let j = i + 1; j < pool.length; j++) {
                    const p2 = pool[j];
                    if (p2.code === "01") continue;

                    // Test with White tinting
                    const tripleRatios = [
                        [2, 1, 1], [1, 2, 1], [2, 2, 1], [1, 1, 2], [2, 1, 3], [1, 2, 3], [3, 1, 2], [1, 3, 2]
                    ];

                    for (const [r1, r2, rW] of tripleRatios) {
                        const mixedRgb = ColorMath.mixPaints([
                            { r: p1.rgb[0], g: p1.rgb[1], b: p1.rgb[2], parts: r1 },
                            { r: p2.rgb[0], g: p2.rgb[1], b: p2.rgb[2], parts: r2 },
                            { r: white.rgb[0], g: white.rgb[1], b: white.rgb[2], parts: rW }
                        ]);

                        const mixLab = ColorMath.rgbToLab(mixedRgb.r, mixedRgb.g, mixedRgb.b);
                        const dE = ColorMath.deltaE2000(targetLab, mixLab);

                        if (dE < lowestDeltaE) {
                            lowestDeltaE = dE;
                            bestCombo = {
                                type: "Triple Studio Blend (with White Tint)",
                                paints: [
                                    { color: p1, parts: r1 },
                                    { color: p2, parts: r2 },
                                    { color: white, parts: rW }
                                ],
                                mixedRgb,
                                deltaE: Math.round(dE * 10) / 10,
                                accuracy: ColorMath.matchAccuracy(dE)
                            };
                        }
                    }
                }
            }
        }

        return {
            targetRgb: { r, g, b },
            targetHex: ColorMath.rgbToHex(r, g, b),
            directMatch,
            recommendedCombo: bestCombo || {
                type: "Closest Single Tube",
                paints: [{ color: directMatch.color, parts: 1 }],
                mixedRgb: { r: directMatch.color.rgb[0], g: directMatch.color.rgb[1], b: directMatch.color.rgb[2] },
                deltaE: directMatch.deltaE,
                accuracy: directMatch.accuracy
            }
        };
    }
};

window.RecipeEngine = RecipeEngine;

