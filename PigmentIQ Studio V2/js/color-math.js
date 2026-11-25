/**
 * PigmentIQ / ChromaAtelier - Color Science & Pigment Chemistry Engine
 * Provides perceptual color spaces (Lab, Delta-E CIE76 & CIE2000),
 * Subtractive pigment mixing simulation, CMYK, HSL, RGB, and physical paint ratio algorithms.
 */

const ColorMath = {
    // Convert Hex to RGB {r, g, b} (0-255)
    hexToRgb(hex) {
        let clean = hex.replace('#', '').trim();
        if (clean.length === 3) {
            clean = clean.split('').map(c => c + c).join('');
        }
        const num = parseInt(clean, 16);
        return {
            r: (num >> 16) & 255,
            g: (num >> 8) & 255,
            b: num & 255
        };
    },

    // Convert RGB {r, g, b} to Hex #RRGGBB
    rgbToHex(r, g, b) {
        const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
        return '#' + [clamp(r), clamp(g), clamp(b)]
            .map(x => x.toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase();
    },

    // Convert RGB to HSL {h: 0-360, s: 0-100, l: 0-100}
    rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    },

    // Convert RGB to HSV {h: 0-360, s: 0-100, v: 0-100}
    rgbToHsv(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const d = max - min;
        let h = 0;
        const s = max === 0 ? 0 : d / max;
        const v = max;

        if (max !== min) {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            v: Math.round(v * 100)
        };
    },

    // Convert RGB to CMYK {c: 0-100, m: 0-100, y: 0-100, k: 0-100}
    rgbToCmyk(r, g, b) {
        const rNorm = r / 255;
        const gNorm = g / 255;
        const bNorm = b / 255;
        const k = 1 - Math.max(rNorm, gNorm, bNorm);
        if (k === 1) {
            return { c: 0, m: 0, y: 0, k: 100 };
        }
        const c = (1 - rNorm - k) / (1 - k);
        const m = (1 - gNorm - k) / (1 - k);
        const y = (1 - bNorm - k) / (1 - k);
        return {
            c: Math.round(c * 100),
            m: Math.round(m * 100),
            y: Math.round(y * 100),
            k: Math.round(k * 100)
        };
    },

    // Convert RGB to CIELAB via XYZ (D65 illuminant, 2-degree standard observer)
    rgbToLab(r, g, b) {
        // sRGB to linear RGB
        let rL = r / 255;
        let gL = g / 255;
        let bL = b / 255;

        rL = rL > 0.04045 ? Math.pow((rL + 0.055) / 1.055, 2.4) : rL / 12.92;
        gL = gL > 0.04045 ? Math.pow((gL + 0.055) / 1.055, 2.4) : gL / 12.92;
        bL = bL > 0.04045 ? Math.pow((bL + 0.055) / 1.055, 2.4) : bL / 12.92;

        // Matrix transform to XYZ (D65)
        let x = (rL * 0.4124564 + gL * 0.3575761 + bL * 0.1804375) / 0.95047;
        let y = (rL * 0.2126729 + gL * 0.7151522 + bL * 0.0721750) / 1.00000;
        let z = (rL * 0.0193339 + gL * 0.1191920 + bL * 0.9503041) / 1.08883;

        const f = (t) => t > 0.008856 ? Math.cbrt(t) : (7.787 * t) + (16 / 116);

        const fx = f(x);
        const fy = f(y);
        const fz = f(z);

        const L = (116 * fy) - 16;
        const a = 500 * (fx - fy);
        const bLab = 200 * (fy - fz);

        return { L, a, b: bLab };
    },

    // Delta-E CIE76 perceptual distance
    deltaE76(lab1, lab2) {
        const dL = lab1.L - lab2.L;
        const da = lab1.a - lab2.a;
        const db = lab1.b - lab2.b;
        return Math.sqrt(dL * dL + da * da + db * db);
    },

    // Delta-E CIE2000 (Industry standard for precision color matching)
    deltaE2000(lab1, lab2) {
        const deg2rad = Math.PI / 180;
        const rad2deg = 180 / Math.PI;

        const L1 = lab1.L, a1 = lab1.a, b1 = lab1.b;
        const L2 = lab2.L, a2 = lab2.a, b2 = lab2.b;

        const C1 = Math.sqrt(a1 * a1 + b1 * b1);
        const C2 = Math.sqrt(a2 * a2 + b2 * b2);
        const C_avg = (C1 + C2) / 2;

        const G = 0.5 * (1 - Math.sqrt(Math.pow(C_avg, 7) / (Math.pow(C_avg, 7) + Math.pow(25, 7))));

        const a1_prime = (1 + G) * a1;
        const a2_prime = (1 + G) * a2;

        const C1_prime = Math.sqrt(a1_prime * a1_prime + b1 * b1);
        const C2_prime = Math.sqrt(a2_prime * a2_prime + b2 * b2);

        let h1_prime = Math.atan2(b1, a1_prime) * rad2deg;
        if (h1_prime < 0) h1_prime += 360;

        let h2_prime = Math.atan2(b2, a2_prime) * rad2deg;
        if (h2_prime < 0) h2_prime += 360;

        const delta_L_prime = L2 - L1;
        const delta_C_prime = C2_prime - C1_prime;

        let delta_h_prime = 0;
        if (C1_prime * C2_prime !== 0) {
            const diff = h2_prime - h1_prime;
            if (Math.abs(diff) <= 180) {
                delta_h_prime = diff;
            } else if (diff > 180) {
                delta_h_prime = diff - 360;
            } else {
                delta_h_prime = diff + 360;
            }
        }

        const delta_H_prime = 2 * Math.sqrt(C1_prime * C2_prime) * Math.sin((delta_h_prime / 2) * deg2rad);

        const L_avg_prime = (L1 + L2) / 2;
        const C_avg_prime = (C1_prime + C2_prime) / 2;

        let h_avg_prime = 0;
        if (C1_prime * C2_prime !== 0) {
            const sum = h1_prime + h2_prime;
            if (Math.abs(h1_prime - h2_prime) <= 180) {
                h_avg_prime = sum / 2;
            } else if (sum < 360) {
                h_avg_prime = (sum + 360) / 2;
            } else {
                h_avg_prime = (sum - 360) / 2;
            }
        }

        const T = 1 - 0.17 * Math.cos((h_avg_prime - 30) * deg2rad)
                    + 0.24 * Math.cos((2 * h_avg_prime) * deg2rad)
                    + 0.32 * Math.cos((3 * h_avg_prime + 6) * deg2rad)
                    - 0.20 * Math.cos((4 * h_avg_prime - 63) * deg2rad);

        const delta_theta = 30 * Math.exp(-Math.pow((h_avg_prime - 275) / 25, 2));
        const R_C = 2 * Math.sqrt(Math.pow(C_avg_prime, 7) / (Math.pow(C_avg_prime, 7) + Math.pow(25, 7)));
        const S_L = 1 + ((0.015 * Math.pow(L_avg_prime - 50, 2)) / Math.sqrt(20 + Math.pow(L_avg_prime - 50, 2)));
        const S_C = 1 + 0.045 * C_avg_prime;
        const S_H = 1 + 0.015 * C_avg_prime * T;
        const R_T = -Math.sin(2 * delta_theta * deg2rad) * R_C;

        const dE = Math.sqrt(
            Math.pow(delta_L_prime / S_L, 2) +
            Math.pow(delta_C_prime / S_C, 2) +
            Math.pow(delta_H_prime / S_H, 2) +
            R_T * (delta_C_prime / S_C) * (delta_H_prime / S_H)
        );

        return dE;
    },

    // Convert Perceptual Delta-E to a user-friendly match score (0 - 100%)
    matchAccuracy(deltaE) {
        if (deltaE <= 1.0) return 99.5;
        if (deltaE <= 2.5) return 98.0 - (deltaE - 1.0) * 4;
        if (deltaE <= 5.0) return 92.0 - (deltaE - 2.5) * 4;
        if (deltaE <= 10.0) return 82.0 - (deltaE - 5.0) * 3;
        if (deltaE <= 20.0) return 67.0 - (deltaE - 10.0) * 2;
        return Math.max(10, Math.round(47.0 - (deltaE - 20.0) * 1.2));
    },

    // Physical Pigment Subtractive Mixing Model (Kubelka-Munk Spectral Approximation)
    // Physical paint blends CMY pigments subtractively:
    // Yellow + Cyan = Green (unlike digital RGB average which makes dull muddy grey)
    mixPaints(paintsWithParts) {
        // paintsWithParts = [ { r, g, b, parts }, ... ]
        let totalParts = 0;
        let cTotal = 0, mTotal = 0, yTotal = 0, kTotal = 0;
        let whiteAmount = 0;

        for (const item of paintsWithParts) {
            const p = item.parts || 1;
            totalParts += p;

            // Check if white or black
            const maxVal = Math.max(item.r, item.g, item.b);
            const minVal = Math.min(item.r, item.g, item.b);
            const isWhite = maxVal > 240 && (maxVal - minVal) < 15;

            if (isWhite) {
                whiteAmount += p;
            }

            // Convert paint to subtractive CMYK
            const cmyk = this.rgbToCmyk(item.r, item.g, item.b);
            cTotal += (cmyk.c / 100) * p;
            mTotal += (cmyk.m / 100) * p;
            yTotal += (cmyk.y / 100) * p;
            kTotal += (cmyk.k / 100) * p;
        }

        if (totalParts === 0) return { r: 255, g: 255, b: 255 };

        let cNorm = cTotal / totalParts;
        let mNorm = mTotal / totalParts;
        let yNorm = yTotal / totalParts;
        let kNorm = kTotal / totalParts;

        // Subtractive CMY to RGB conversion with physical tint curve
        let r = (1 - cNorm) * (1 - kNorm);
        let g = (1 - mNorm) * (1 - kNorm);
        let b = (1 - yNorm) * (1 - kNorm);

        // Enhance physical realism: Yellow (high absorption in blue) + Blue (high absorption in red/green)
        // Adjust for organic pigment brightness
        r = Math.pow(Math.max(0, r), 0.95) * 255;
        g = Math.pow(Math.max(0, g), 0.95) * 255;
        b = Math.pow(Math.max(0, b), 0.95) * 255;

        // Titanium white opacity tint boost
        if (whiteAmount > 0) {
            const wRatio = whiteAmount / totalParts;
            r = r + (255 - r) * (wRatio * 0.85);
            g = g + (255 - g) * (wRatio * 0.85);
            b = b + (255 - b) * (wRatio * 0.85);
        }

        return {
            r: Math.max(0, Math.min(255, Math.round(r))),
            g: Math.max(0, Math.min(255, Math.round(g))),
            b: Math.max(0, Math.min(255, Math.round(b)))
        };
    },

    // Convert RGB to artist value scale (1 to 10 step scale, 1 = Pure White, 10 = Deepest Black)
    rgbToValueScale(r, g, b) {
        // Luminance formula (ITU-R BT.709)
        const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        // Invert so 1 is white, 10 is dark
        const valueNum = 1 + (1 - lum) * 9;
        return {
            num: Math.max(1, Math.min(10, Math.round(valueNum * 10) / 10)),
            lum: Math.round(lum * 100),
            zone: this.getValueZoneName(valueNum)
        };
    },

    getValueZoneName(v) {
        if (v < 2.0) return 'Highlight / Pure White';
        if (v < 3.5) return 'High Light / Tint';
        if (v < 5.0) return 'Light / High Midtone';
        if (v < 6.5) return 'Medium Midtone';
        if (v < 8.0) return 'Low Dark / Core Shadow';
        if (v < 9.5) return 'Deep Dark / Cast Shadow';
        return 'Max Occlusion / Deepest Black';
    }
};

window.ColorMath = ColorMath;

