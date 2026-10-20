/**
 * PigmentIQ / ChromaAtelier - Image Color Extractor & Eyedropper Engine
 * Extracts dominant palettes, tonal scales, and provides an interactive magnifying loupe
 * to sample exact pixels from uploaded Pinterest art or phone photos.
 */

class ImageExtractor {
    constructor() {
        this.currentImage = null;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.extractedColors = [];
        this.tonalPalette = { highlights: [], midtones: [], shadows: [] };
    }

    // Load image from File or URL
    loadImage(source) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => {
                this.currentImage = img;
                this._processImage();
                resolve({
                    width: img.naturalWidth || img.width,
                    height: img.naturalHeight || img.height,
                    dominant: this.extractedColors,
                    tonal: this.tonalPalette
                });
            };

            img.onerror = (err) => reject(err);

            if (typeof source === 'string') {
                img.src = source;
            } else if (source instanceof File || source instanceof Blob) {
                const reader = new FileReader();
                reader.onload = (e) => { img.src = e.target.result; };
                reader.readAsDataURL(source);
            } else {
                reject(new Error("Unsupported image source"));
            }
        });
    }

    // Process image to extract quantized palette
    _processImage() {
        if (!this.currentImage) return;

        // Downsample for fast responsive clustering
        const maxDim = 250;
        let w = this.currentImage.naturalWidth || this.currentImage.width;
        let h = this.currentImage.naturalHeight || this.currentImage.height;

        if (w > maxDim || h > maxDim) {
            if (w > h) {
                h = Math.round((h * maxDim) / w);
                w = maxDim;
            } else {
                w = Math.round((w * maxDim) / h);
                h = maxDim;
            }
        }

        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx.drawImage(this.currentImage, 0, 0, w, h);

        const imgData = this.ctx.getImageData(0, 0, w, h).data;
        const colorBuckets = {};

        // Sample pixels with quantization (16-step quantization for smooth artist swatches)
        const step = 4; // Sample every 4th pixel for speed
        const qFactor = 16;

        for (let i = 0; i < imgData.length; i += 4 * step) {
            const r = imgData[i];
            const g = imgData[i + 1];
            const b = imgData[i + 2];
            const a = imgData[i + 3];

            // Ignore transparent or nearly transparent pixels
            if (a < 128) continue;

            // Quantize
            const qr = Math.round(r / qFactor) * qFactor;
            const qg = Math.round(g / qFactor) * qFactor;
            const qb = Math.round(b / qFactor) * qFactor;
            const key = `${qr},${qg},${qb}`;

            if (!colorBuckets[key]) {
                colorBuckets[key] = {
                    r: qr, g: qg, b: qb,
                    count: 1,
                    rawR: r, rawG: g, rawB: b
                };
            } else {
                colorBuckets[key].count++;
            }
        }

        // Convert to array and sort by frequency
        let sorted = Object.values(colorBuckets).sort((a, b) => b.count - a.count);

        // Filter for distinct perceptual colors using Delta E
        const distinct = [];
        for (const candidate of sorted) {
            const cLab = ColorMath.rgbToLab(candidate.r, candidate.g, candidate.b);
            let isDistinct = true;

            for (const existing of distinct) {
                const exLab = ColorMath.rgbToLab(existing.r, existing.g, existing.b);
                const dE = ColorMath.deltaE76(cLab, exLab);
                if (dE < 14) { // Perceptual distance threshold for palette diversity
                    isDistinct = false;
                    break;
                }
            }

            if (isDistinct) {
                distinct.push({
                    r: candidate.r,
                    g: candidate.g,
                    b: candidate.b,
                    hex: ColorMath.rgbToHex(candidate.r, candidate.g, candidate.b),
                    hsl: ColorMath.rgbToHsl(candidate.r, candidate.g, candidate.b),
                    count: candidate.count
                });
            }

            if (distinct.length >= 12) break;
        }

        this.extractedColors = distinct;

        // Categorize into Highlights, Midtones, Shadows
        const highlights = [];
        const midtones = [];
        const shadows = [];

        distinct.forEach(c => {
            const lum = c.hsl.l;
            if (lum >= 68) {
                highlights.push(c);
            } else if (lum <= 32) {
                shadows.push(c);
            } else {
                midtones.push(c);
            }
        });

        this.tonalPalette = { highlights, midtones, shadows };
    }

    // Sample exact color at image coordinates (0.0 to 1.0 normalized)
    sampleNormalized(normX, normY) {
        if (!this.currentImage) return null;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const x = Math.max(0, Math.min(w - 1, Math.floor(normX * w)));
        const y = Math.max(0, Math.min(h - 1, Math.floor(normY * h)));

        const pixel = this.ctx.getImageData(x, y, 1, 1).data;
        const r = pixel[0], g = pixel[1], b = pixel[2];

        return {
            r, g, b,
            hex: ColorMath.rgbToHex(r, g, b),
            hsl: ColorMath.rgbToHsl(r, g, b),
            cmyk: ColorMath.rgbToCmyk(r, g, b),
            valueScale: ColorMath.rgbToValueScale(r, g, b)
        };
    }
}

window.ImageExtractor = new ImageExtractor();

