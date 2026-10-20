/**
 * PigmentIQ — High-Precision 300 DPI A4 Color Specification Sheet Exporter
 * Generates Ultra-Sharp 300 DPI A4 PDF (ISO 216 standard), Lossless PNG, and Maximum-Quality JPG.
 * Canvas resolution: 2480 x 3508 pixels (Universal 300 DPI Print Standard).
 * Author: Md. Shihab Sikder (Creative Coder, ML & IoT Enthusiast)
 */

(function () {
    'use strict';

    // Universal 300 DPI A4 Dimensions (210mm x 297mm at 300 DPI)
    const A4_WIDTH = 2480;
    const A4_HEIGHT = 3508;

    /**
     * Pure JavaScript 300 DPI A4 PDF Generator
     * Embeds a 2480x3508 JPEG into an exact ISO-compliant PDF 1.4 document
     * with standard 72-point A4 MediaBox (595.28 x 841.89 pt).
     */
    function createA4PdfFromJpegBytes(jpegBytes, width, height) {
        const a4Width = 595.28;
        const a4Height = 841.89;

        const contentStream = `q\n${a4Width.toFixed(2)} 0 0 ${a4Height.toFixed(2)} 0 0 cm\n/Im1 Do\nQ\n`;
        const encoder = new TextEncoder();
        const contentStreamBytes = encoder.encode(contentStream);

        const header = encoder.encode('%PDF-1.4\n');
        const obj1 = encoder.encode('1 0 obj\n<<\n  /Type /Catalog\n  /Pages 2 0 R\n>>\nendobj\n');
        const obj2 = encoder.encode('2 0 obj\n<<\n  /Type /Pages\n  /Kids [3 0 R]\n  /Count 1\n>>\nendobj\n');
        const obj3 = encoder.encode(`3 0 obj\n<<\n  /Type /Page\n  /Parent 2 0 R\n  /MediaBox [0 0 ${a4Width} ${a4Height}]\n  /Resources <<\n    /XObject <<\n      /Im1 4 0 R\n    >>\n  >>\n  /Contents 5 0 R\n>>\nendobj\n`);
        const obj4Header = encoder.encode(`4 0 obj\n<<\n  /Type /XObject\n  /Subtype /Image\n  /Width ${width}\n  /Height ${height}\n  /ColorSpace /DeviceRGB\n  /BitsPerComponent 8\n  /Filter /DCTDecode\n  /Length ${jpegBytes.length}\n>>\nstream\n`);
        const obj4Footer = encoder.encode('\nendstream\nendobj\n');
        const obj5 = encoder.encode(`5 0 obj\n<<\n  /Length ${contentStreamBytes.length}\n>>\nstream\n${contentStream}endstream\nendobj\n`);

        let offset = header.length;
        const offsets = [0];

        offsets.push(offset);
        offset += obj1.length;

        offsets.push(offset);
        offset += obj2.length;

        offsets.push(offset);
        offset += obj3.length;

        offsets.push(offset);
        offset += obj4Header.length + jpegBytes.length + obj4Footer.length;

        offsets.push(offset);
        offset += obj5.length;

        const startXref = offset;

        let xref = 'xref\n0 6\n0000000000 65535 f \n';
        for (let i = 1; i <= 5; i++) {
            xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
        }

        const trailer = `trailer\n<<\n  /Size 6\n  /Root 1 0 R\n>>\nstartxref\n${startXref}\n%%EOF\n`;
        const trailerBuf = encoder.encode(xref + trailer);

        const totalLength = header.length + obj1.length + obj2.length + obj3.length +
            obj4Header.length + jpegBytes.length + obj4Footer.length +
            obj5.length + trailerBuf.length;

        const combined = new Uint8Array(totalLength);
        let pos = 0;

        function append(arr) {
            combined.set(arr, pos);
            pos += arr.length;
        }

        append(header);
        append(obj1);
        append(obj2);
        append(obj3);
        append(obj4Header);
        append(jpegBytes);
        append(obj4Footer);
        append(obj5);
        append(trailerBuf);

        return new Blob([combined], { type: 'application/pdf' });
    }

    /**
     * Format a clean, human-readable date & time stamp
     */
    function getDefaultDateTimeStamp() {
        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        const dayName = days[now.getDay()];
        const monthName = months[now.getMonth()];
        const date = now.getDate();
        const year = now.getFullYear();

        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const timeStr = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

        return `${dayName}, ${monthName} ${date}, ${year} • ${timeStr} (GMT+6)`;
    }

    /**
     * Render Dedicated Subtractive Paint Mixing Lab A4 Specification Sheet (300 DPI)
     */
    function renderLabA4Canvas(canvas, ctx, options, fontFamily) {
        const {
            paletteName = 'Subtractive Paint Mixing Lab Blend',
            creatorName = 'Md. Shihab Sikder',
            purpose = 'Stretched Canvas & Canvas Pad Acrylic Studies',
            slNumber = 'SL-' + Date.now().toString().slice(-6),
            dateTimeStamp = getDefaultDateTimeStamp(),
            watermark = false,
            watermarkText = 'PigmentIQ Studio • Md. Shihab Sikder',
            labData = {}
        } = options;

        const wells = labData.wells || [
            { name: 'Tube 1 Base Pigment', hex: '#FFF200', rgb: { r: 255, g: 242, b: 0 }, parts: 3, ratio: 50 },
            { name: 'Tube 2 Chromatic Accent', hex: '#0083B8', rgb: { r: 0, g: 131, b: 184 }, parts: 2, ratio: 33 },
            { name: 'Tube 3 Tint / Opacity Balancer', hex: '#FFFFFF', rgb: { r: 255, g: 255, b: 255 }, parts: 1, ratio: 17 }
        ];

        const mixedColor = labData.mixedColor || {
            hex: '#4CAF50',
            rgb: { r: 76, g: 175, b: 80 }
        };
        const mixedRgb = mixedColor.rgb || (window.ColorMath ? window.ColorMath.hexToRgb(mixedColor.hex) : { r: 76, g: 175, b: 80 });
        const mixedCmyk = window.ColorMath ? window.ColorMath.rgbToCmyk(mixedRgb.r, mixedRgb.g, mixedRgb.b) : { c: 57, m: 0, y: 54, k: 31 };
        const mixedHsl = window.ColorMath ? window.ColorMath.rgbToHsl(mixedRgb.r, mixedRgb.g, mixedRgb.b) : { h: 122, s: 39, l: 49 };

        const nearestMm = labData.nearestMm || (window.MontMarteDB ? window.MontMarteDB.findNearestShade(mixedRgb.r, mixedRgb.g, mixedRgb.b) : {
            color: { code: '18', name: 'Sap Green', pigment: 'PG7, PY83', opacity: 'Semi-Opaque', series: 'Series 1' },
            accuracy: 95
        });
        const mmShade = nearestMm.color || nearestMm.shade || nearestMm;

        // 1. Crisp White Clean Canvas Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, A4_WIDTH, A4_HEIGHT);

        // 2. High-Precision Double Outer Margin Border (ISO Margins)
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 3;
        ctx.strokeRect(80, 80, A4_WIDTH - 160, A4_HEIGHT - 160);

        ctx.strokeStyle = '#f3f4f6';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(92, 92, A4_WIDTH - 184, A4_HEIGHT - 184);

        // 3. Top Accent Color Ribbon
        const ribbonGrad = ctx.createLinearGradient(80, 80, A4_WIDTH - 80, 80);
        ribbonGrad.addColorStop(0, '#0071e3');
        ribbonGrad.addColorStop(0.33, '#10b981');
        ribbonGrad.addColorStop(0.66, '#f59e0b');
        ribbonGrad.addColorStop(1, '#ef4444');
        ctx.fillStyle = ribbonGrad;
        ctx.fillRect(80, 80, A4_WIDTH - 160, 16);

        // Header Section
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 28px ${fontFamily}`;
        ctx.fillText('PIGMENTIQ STUDIO  |  SUBTRACTIVE PAINT LAB SPECIFICATION SHEET', 140, 165);

        ctx.fillStyle = '#64748b';
        ctx.font = `600 24px ${fontFamily}`;
        ctx.textAlign = 'right';
        ctx.fillText('ISO 216 STANDARD A4 (210 × 297 mm)  •  300 DPI PRINT MASTER', A4_WIDTH - 140, 165);
        ctx.textAlign = 'left';

        // Header Divider Line
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(140, 195);
        ctx.lineTo(A4_WIDTH - 140, 195);
        ctx.stroke();

        // Title
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 64px ${fontFamily}`;
        ctx.fillText(paletteName.toUpperCase(), 140, 280);

        // SL Pill Badge
        const slText = `SL NO: ${slNumber}`;
        ctx.font = `bold 26px ${fontFamily}`;
        const slWidth = ctx.measureText(slText).width;
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(A4_WIDTH - 140 - slWidth - 48, 226, slWidth + 48, 60, 12);
        else ctx.rect(A4_WIDTH - 140 - slWidth - 48, 226, slWidth + 48, 60);
        ctx.fill();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.fillText(slText, A4_WIDTH - 140 - slWidth - 24, 267);

        // Metadata Info Bar
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(140, 330, A4_WIDTH - 280, 130, 14);
        else ctx.rect(140, 330, A4_WIDTH - 280, 130);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = `600 22px ${fontFamily}`;
        ctx.fillText('ARTIST / CREATOR', 190, 376);
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 28px ${fontFamily}`;
        ctx.fillText(creatorName, 190, 420);

        ctx.fillStyle = '#64748b';
        ctx.font = `600 22px ${fontFamily}`;
        ctx.fillText('INTENDED MEDIUM & SUBSTRATE', 840, 376);
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 28px ${fontFamily}`;
        ctx.fillText(purpose, 840, 420);

        ctx.fillStyle = '#64748b';
        ctx.font = `600 22px ${fontFamily}`;
        ctx.fillText('COLOR CHEMISTRY SYSTEM', 1680, 376);
        ctx.fillStyle = '#0071e3';
        ctx.font = `bold 28px ${fontFamily}`;
        ctx.fillText('Kubelka-Munk Physical Paint Mixer', 1680, 420);

        // SECTION 1: RESULTING SUBTRACTIVE MIXED COLOR SWATCH
        const resultCardY = 510;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(140, resultCardY, A4_WIDTH - 280, 450, 16);
        else ctx.rect(140, resultCardY, A4_WIDTH - 280, 450);
        ctx.fill();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Big Result Swatch
        ctx.fillStyle = mixedColor.hex || '#4CAF50';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(175, resultCardY + 35, 380, 380, 14);
        else ctx.rect(175, resultCardY + 35, 380, 380);
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Result Details on Right Side
        const resTextX = 600;
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 32px ${fontFamily}`;
        ctx.fillText('RESULTING PHYSICAL PAINT BLEND', resTextX, resultCardY + 80);

        ctx.fillStyle = '#0071e3';
        ctx.font = `bold 62px ${fontFamily}`;
        ctx.fillText((mixedColor.hex || '#4CAF50').toUpperCase(), resTextX, resultCardY + 160);

        ctx.fillStyle = '#334155';
        ctx.font = `600 26px ${fontFamily}`;
        ctx.fillText(`RGB Color Space:   ${mixedRgb.r}, ${mixedRgb.g}, ${mixedRgb.b}`, resTextX, resultCardY + 215);
        ctx.fillText(`CMYK Process:      C:${mixedCmyk.c}%  M:${mixedCmyk.m}%  Y:${mixedCmyk.y}%  K:${mixedCmyk.k}%`, resTextX, resultCardY + 260);
        ctx.fillText(`HSL Metrics:       H:${mixedHsl.h}°  S:${mixedHsl.s}%  L:${mixedHsl.l}% (Luminance)`, resTextX, resultCardY + 305);

        // Nearest Mont Marte Match Badge inside card
        if (mmShade && mmShade.code) {
            ctx.fillStyle = '#ecfdf5';
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(resTextX, resultCardY + 345, A4_WIDTH - 280 - (resTextX - 140) - 40, 68, 10);
            else ctx.rect(resTextX, resultCardY + 345, A4_WIDTH - 280 - (resTextX - 140) - 40, 68);
            ctx.fill();
            ctx.strokeStyle = '#a7f3d0';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = '#065f46';
            ctx.font = `bold 24px ${fontFamily}`;
            ctx.fillText(`Closest Mont Marte Stock Tube: MM-${mmShade.code} ${mmShade.name} (${nearestMm.accuracy || 95}% Visual Proximity)`, resTextX + 24, resultCardY + 388);
        }

        // SECTION 2: DISPENSED PALETTE WELLS & VOLUMETRIC RATIOS
        const wellsY = 1010;
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 32px ${fontFamily}`;
        ctx.fillText('DISPENSED PALETTE WELLS & VOLUMETRIC RATIOS', 140, wellsY);

        ctx.fillStyle = '#64748b';
        ctx.font = `24px ${fontFamily}`;
        ctx.fillText('Three-well subtractive paint formulation based on volumetric parts dispensed on palette:', 140, wellsY + 40);

        // Proportional Bar
        const barY = wellsY + 70;
        const barW = A4_WIDTH - 280;
        const barH = 46;
        let bX = 140;

        const totalParts = wells.reduce((sum, w) => sum + (parseInt(w.parts) || 0), 0) || 1;

        ctx.save();
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(bX, barY, barW, barH, 10);
        else ctx.rect(bX, barY, barW, barH);
        ctx.clip();

        wells.forEach(w => {
            const ratioPct = Math.round(((parseInt(w.parts) || 0) / totalParts) * 100);
            const segW = (ratioPct / 100) * barW;
            ctx.fillStyle = w.hex;
            ctx.fillRect(bX, barY, segW, barH);
            bX += segW;
        });
        ctx.restore();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.strokeRect(140, barY, barW, barH);

        // 3 Tube Well Cards Side-by-Side
        const wellCardsY = barY + 75;
        const cardGap = 36;
        const wellCardW = Math.floor((A4_WIDTH - 280 - (cardGap * 2)) / 3);
        const wellCardH = 480;

        wells.forEach((well, idx) => {
            const wX = 140 + idx * (wellCardW + cardGap);
            const wRgb = well.rgb || (window.ColorMath ? window.ColorMath.hexToRgb(well.hex) : { r: 0, g: 0, b: 0 });
            const partsVal = parseInt(well.parts) || 0;
            const ratioVal = Math.round((partsVal / totalParts) * 100);

            // Card Container
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(wX, wellCardsY, wellCardW, wellCardH, 14);
            else ctx.rect(wX, wellCardsY, wellCardW, wellCardH);
            ctx.fill();
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Swatch Header
            ctx.fillStyle = well.hex;
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(wX + 14, wellCardsY + 14, wellCardW - 28, 180, 10);
            else ctx.rect(wX + 14, wellCardsY + 14, wellCardW - 28, 180);
            ctx.fill();
            ctx.strokeStyle = 'rgba(0,0,0,0.15)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Well Content
            ctx.fillStyle = '#0f172a';
            ctx.font = `bold 28px ${fontFamily}`;
            ctx.fillText(well.name || `Tube Well ${idx + 1}`, wX + 24, wellCardsY + 240);

            ctx.fillStyle = '#0071e3';
            ctx.font = `bold 26px ${fontFamily}`;
            ctx.fillText((well.hex || '#000000').toUpperCase(), wX + 24, wellCardsY + 280);

            ctx.fillStyle = '#475569';
            ctx.font = `600 23px ${fontFamily}`;
            ctx.fillText(`RGB: ${wRgb.r}, ${wRgb.g}, ${wRgb.b}`, wX + 24, wellCardsY + 322);

            ctx.fillStyle = '#0f172a';
            ctx.font = `bold 26px ${fontFamily}`;
            ctx.fillText(`Dispensed: ${partsVal} Part(s)`, wX + 24, wellCardsY + 380);

            ctx.fillStyle = '#64748b';
            ctx.font = `23px ${fontFamily}`;
            ctx.fillText(`Mixing Share: ${ratioVal}% by volume`, wX + 24, wellCardsY + 418);
        });

        // SECTION 3: STEP-BY-STEP PALETTE MIXING & APPLICATION PROTOCOL
        const protoY = 1660;
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(140, protoY, A4_WIDTH - 280, 560, 16);
        else ctx.rect(140, protoY, A4_WIDTH - 280, 560);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 32px ${fontFamily}`;
        ctx.fillText('PHYSICAL PALETTE MIXING & DRYING PROTOCOL', 190, protoY + 70);

        ctx.fillStyle = '#64748b';
        ctx.font = `24px ${fontFamily}`;
        ctx.fillText('Follow this laboratory protocol to achieve chromatic consistency and maximum pigment longevity:', 190, protoY + 112);

        const protocolSteps = [
            `1. Dispense Ratios: Squeeze out ${wells[0].parts || 0} parts Tube 1, ${wells[1].parts || 0} parts Tube 2, and ${wells[2].parts || 0} parts Tube 3 side-by-side onto an airtight stay-wet or glass palette.`,
            '2. Knife Folding Technique: Blend thoroughly using a stainless steel palette knife in firm folding strokes. Avoid whipping to eliminate air micro-bubbles.',
            '3. Wet-to-Dry Emulsion Shift: Acrylic binder appears milky when wet and dries 100% transparent. This mixed swatch will dry ~10-15% darker than fresh wet paint.',
            '4. Glazing & Medium Thinning: To dilute for semi-transparent washes, blend with Gloss Glazing Medium rather than water, which preserves paint film adhesion.',
            '5. Surface Sealing: Once fully cured (72h), protect finished artwork with UV-resistant satin varnish to maintain chromatic saturation permanently.'
        ];

        let pStepY = protoY + 175;
        ctx.fillStyle = '#334155';
        ctx.font = `23px ${fontFamily}`;
        protocolSteps.forEach(step => {
            ctx.fillText(step, 190, pStepY);
            pStepY += 66;
        });

        // SECTION 4: RECOMMENDED SUBSTRATE ADVISOR
        const subY = 2270;
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(140, subY, A4_WIDTH - 280, 260, 16);
        else ctx.rect(140, subY, A4_WIDTH - 280, 260);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 28px ${fontFamily}`;
        ctx.fillText('RECOMMENDED SUBSTRATE & SURFACE PREPARATION', 190, subY + 60);

        ctx.fillStyle = '#334155';
        ctx.font = `23px ${fontFamily}`;
        ctx.fillText('• Stretched Cotton Canvas / Canvas Pads: Prime with 2 cross-hatched coats of acrylic gesso. Sand lightly with 240-grit paper.', 190, subY + 110);
        ctx.fillText('• Cartridge Paper (150-250 GSM): Tape borders with low-tack artist masking tape to prevent cockling before wet washes.', 190, subY + 155);
        ctx.fillText('• Wood & Glass: Degrease with 70% isopropanol. Seal raw timber with clear acrylic dispersion before paint application.', 190, subY + 200);

        // OPTIONAL WATERMARK
        if (watermark && watermarkText) {
            ctx.save();
            ctx.translate(A4_WIDTH / 2, A4_HEIGHT / 2);
            ctx.rotate(-Math.PI / 6);
            ctx.font = `bold 84px ${fontFamily}`;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.textAlign = 'center';
            ctx.fillText(watermarkText.toUpperCase(), 0, 0);
            ctx.fillText(watermarkText.toUpperCase(), 0, -360);
            ctx.fillText(watermarkText.toUpperCase(), 0, 360);
            ctx.restore();
        }

        // FOOTER BAR (WITH TIMESTAMP AT FOOTER RIGHT AS REQUESTED)
        const footerY = A4_HEIGHT - 140;
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(140, footerY);
        ctx.lineTo(A4_WIDTH - 140, footerY);
        ctx.stroke();

        // Footer Left: Creator & Engine Credits
        ctx.fillStyle = '#64748b';
        ctx.font = `22px ${fontFamily}`;
        ctx.textAlign = 'left';
        ctx.fillText('PigmentIQ Pro  •  Subtractive Paint Lab  •  Md. Shihab Sikder (Creative Coder, ML & IoT Enthusiast)  •  github.com/mdshihab56', 140, footerY + 48);

        // Footer Right: Timestamp
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 22px ${fontFamily}`;
        ctx.textAlign = 'right';
        ctx.fillText(dateTimeStamp, A4_WIDTH - 140, footerY + 48);
        ctx.textAlign = 'left';

        return canvas;
    }

    /**
     * Render the 300 DPI A4 Specification Sheet on an HTML5 canvas (2480 x 3508 px)
     */
    function renderA4Canvas(options) {
        const canvas = document.createElement('canvas');
        canvas.width = A4_WIDTH;
        canvas.height = A4_HEIGHT;
        const ctx = canvas.getContext('2d');

        // Enable high-quality sub-pixel rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const {
            paletteName = 'Color Harmony Study',
            creatorName = 'Md. Shihab Sikder',
            purpose = 'Acrylic Landscape on Stretched Canvas 300 GSM',
            slNumber = 'SL-' + Date.now().toString().slice(-6),
            dateTimeStamp = getDefaultDateTimeStamp(),
            fontFamily = "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            watermark = false,
            watermarkText = 'PigmentIQ Studio • Md. Shihab Sikder',
            colors = [],
            activeColor = null,
            recipe = null,
            montMarteMatch = null,
            pencilRec = null,
            referenceImage = null
        } = options;

        // Dedicated Subtractive Paint Mixing Lab branch
        if (options && options.sheetType === 'lab') {
            return renderLabA4Canvas(canvas, ctx, options, fontFamily);
        }

        // 1. Crisp White Clean Studio Canvas Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, A4_WIDTH, A4_HEIGHT);

        // 2. High-Precision Double Outer Margin Border (ISO Margins)
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 3;
        ctx.strokeRect(80, 80, A4_WIDTH - 160, A4_HEIGHT - 160);

        ctx.strokeStyle = '#f3f4f6';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(92, 92, A4_WIDTH - 184, A4_HEIGHT - 184);

        // 3. Top Accent Color Ribbon (Vibrant Master Palette)
        const ribbonGrad = ctx.createLinearGradient(80, 80, A4_WIDTH - 80, 80);
        ribbonGrad.addColorStop(0, '#0071e3');
        ribbonGrad.addColorStop(0.25, '#5e5ce6');
        ribbonGrad.addColorStop(0.5, '#ff2d55');
        ribbonGrad.addColorStop(0.75, '#ff9500');
        ribbonGrad.addColorStop(1, '#34c759');
        ctx.fillStyle = ribbonGrad;
        ctx.fillRect(80, 80, A4_WIDTH - 160, 16);

        // --- HEADER SECTION ---
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 28px ${fontFamily}`;
        ctx.fillText('PIGMENTIQ STUDIO  |  ARTISAN COLOR SPECIFICATION SHEET', 140, 165);

        ctx.fillStyle = '#64748b';
        ctx.font = `600 24px ${fontFamily}`;
        ctx.textAlign = 'right';
        ctx.fillText('ISO 216 STANDARD A4 (210 × 297 mm)  •  300 DPI PRINT MASTER', A4_WIDTH - 140, 165);
        ctx.textAlign = 'left';

        // Header Divider Line
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(140, 195);
        ctx.lineTo(A4_WIDTH - 140, 195);
        ctx.stroke();

        // Palette Title (Large & Bold)
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 64px ${fontFamily}`;
        ctx.fillText(paletteName.toUpperCase(), 140, 280);

        // SL Pill Badge
        const slText = `SL NO: ${slNumber}`;
        ctx.font = `bold 26px ${fontFamily}`;
        const slWidth = ctx.measureText(slText).width;
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(A4_WIDTH - 140 - slWidth - 48, 226, slWidth + 48, 60, 12);
        } else {
            ctx.rect(A4_WIDTH - 140 - slWidth - 48, 226, slWidth + 48, 60);
        }
        ctx.fill();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.fillText(slText, A4_WIDTH - 140 - slWidth - 24, 267);

        // Metadata Info Bar
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(140, 330, A4_WIDTH - 280, 130, 14);
        } else {
            ctx.rect(140, 330, A4_WIDTH - 280, 130);
        }
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Meta Column 1: Artist / Creator
        ctx.fillStyle = '#64748b';
        ctx.font = `600 22px ${fontFamily}`;
        ctx.fillText('ARTIST / CREATOR', 190, 376);
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 28px ${fontFamily}`;
        ctx.fillText(creatorName, 190, 420);

        // Meta Column 2: Intended Use / Medium
        ctx.fillStyle = '#64748b';
        ctx.font = `600 22px ${fontFamily}`;
        ctx.fillText('INTENDED MEDIUM & SUBSTRATE', 840, 376);
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 28px ${fontFamily}`;
        ctx.fillText(purpose, 840, 420);

        // Meta Column 3: Reference System
        ctx.fillStyle = '#64748b';
        ctx.font = `600 22px ${fontFamily}`;
        ctx.fillText('COLOR CHEMISTRY SYSTEM', 1680, 376);
        ctx.fillStyle = '#0071e3';
        ctx.font = `bold 28px ${fontFamily}`;
        ctx.fillText('Kubelka-Munk Subtractive + Mont Marte', 1680, 420);

        // --- PALETTE SWATCHES SECTION ---
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 32px ${fontFamily}`;
        ctx.fillText('EXTRACTED COLOR PALETTE & TONAL VALUES', 140, 540);

        ctx.fillStyle = '#64748b';
        ctx.font = `24px ${fontFamily}`;
        ctx.fillText('High-precision pigment swatches with HEX, RGB, CMYK, Luminance, and nearest Mont Marte Acrylic matches:', 140, 580);

        // Swatch cards grid (Up to 6 dominant swatches)
        const swatchList = colors.length > 0 ? colors.slice(0, 6) : (activeColor ? [activeColor] : []);
        const totalCards = Math.max(swatchList.length, 1);
        const gap = 36;
        const totalAvailW = A4_WIDTH - 280 - (gap * (totalCards - 1));
        const cardWidth = Math.floor(totalAvailW / totalCards);
        const cardHeight = 440;
        const startX = 140;
        const startY = 620;

        swatchList.forEach((col, idx) => {
            const x = startX + idx * (cardWidth + gap);
            const y = startY;

            // Swatch Container Card
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(x, y, cardWidth, cardHeight, 14);
            } else {
                ctx.rect(x, y, cardWidth, cardHeight);
            }
            ctx.fill();
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Swatch Color Fill Block
            ctx.fillStyle = col.hex || '#000000';
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(x + 14, y + 14, cardWidth - 28, 190, 10);
            } else {
                ctx.rect(x + 14, y + 14, cardWidth - 28, 190);
            }
            ctx.fill();
            ctx.strokeStyle = 'rgba(0,0,0,0.12)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Swatch Color Label (HEX)
            ctx.fillStyle = '#0f172a';
            ctx.font = `bold 28px ${fontFamily}`;
            ctx.fillText(col.hex || '#000000', x + 20, y + 250);

            // Swatch RGB
            ctx.fillStyle = '#475569';
            ctx.font = `600 22px ${fontFamily}`;
            ctx.fillText(`RGB: ${col.r}, ${col.g}, ${col.b}`, x + 20, y + 288);

            // Swatch CMYK
            if (window.ColorMath) {
                const cmyk = col.cmyk || window.ColorMath.rgbToCmyk(col.r, col.g, col.b);
                ctx.fillText(`CMYK: ${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%`, x + 20, y + 322);

                const hsl = col.hsl || window.ColorMath.rgbToHsl(col.r, col.g, col.b);
                ctx.fillText(`L: ${hsl.l}%  •  S: ${hsl.s}%`, x + 20, y + 356);
            }

            // Nearest MM Shade
            if (window.MontMarteDB) {
                const mm = window.MontMarteDB.findNearestShade(col.r, col.g, col.b);
                ctx.fillStyle = '#0071e3';
                ctx.font = `bold 22px ${fontFamily}`;
                ctx.fillText(`MM-${mm.color.code} (${mm.accuracy}%)`, x + 20, y + 400);
            }
        });

        // --- SUBTRACTIVE PHYSICAL PAINT MIXING RECIPE BOX ---
        const recipeY = 1120;
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(140, recipeY, A4_WIDTH - 280, 580, 16);
        } else {
            ctx.rect(140, recipeY, A4_WIDTH - 280, 580);
        }
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 36px ${fontFamily}`;
        ctx.fillText('PHYSICAL SUBTRACTIVE PAINT MIXING RECIPE', 190, recipeY + 75);

        ctx.fillStyle = '#64748b';
        ctx.font = `24px ${fontFamily}`;
        ctx.fillText('Formulated using Kubelka-Munk light subtraction formula for artists working with physical paint tubes:', 190, recipeY + 118);

        // Recipe Parts Breakdown
        if (recipe && recipe.ingredients && recipe.ingredients.length > 0) {
            // Proportional Mixing Bar
            let barX = 190;
            const barY = recipeY + 155;
            const barW = A4_WIDTH - 380;
            const barH = 44;

            ctx.save();
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(barX, barY, barW, barH, 10);
            else ctx.rect(barX, barY, barW, barH);
            ctx.clip();

            recipe.ingredients.forEach(ing => {
                const segW = (ing.ratio / 100) * barW;
                ctx.fillStyle = ing.hex;
                ctx.fillRect(barX, barY, segW, barH);
                barX += segW;
            });
            ctx.restore();

            // Recipe Items Grid
            let itemX = 190;
            let itemY = recipeY + 250;
            recipe.ingredients.forEach((ing) => {
                ctx.fillStyle = ing.hex;
                ctx.beginPath();
                ctx.arc(itemX + 16, itemY + 16, 14, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#94a3b8';
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.fillStyle = '#0f172a';
                ctx.font = `bold 26px ${fontFamily}`;
                ctx.fillText(`${ing.parts} part(s) ${ing.name} (${ing.ratio}%)`, itemX + 44, itemY + 25);

                ctx.fillStyle = '#64748b';
                ctx.font = `22px ${fontFamily}`;
                ctx.fillText(`Code: ${ing.code}  •  Role: ${ing.role}`, itemX + 44, itemY + 56);

                itemY += 76;
            });

            // Mixing Instructions Box (Right Side)
            if (recipe.steps && recipe.steps.length > 0) {
                let stepX = 1120;
                let stepY = recipeY + 250;
                ctx.fillStyle = '#0f172a';
                ctx.font = `bold 28px ${fontFamily}`;
                ctx.fillText('STEP-BY-STEP PALETTE PROCEDURE:', stepX, stepY);

                ctx.font = `23px ${fontFamily}`;
                ctx.fillStyle = '#334155';
                recipe.steps.slice(0, 4).forEach((step, sIdx) => {
                    stepY += 52;
                    ctx.fillText(`${sIdx + 1}. ${step}`, stepX, stepY);
                });
            }
        }

        // --- SKETCH PENCIL & MONT MARTE COMBOS SECTION ---
        const guideY = 1760;
        const boxW = (A4_WIDTH - 280 - 48) / 2;
        const boxH = 480;

        // Mont Marte Match Box
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(140, guideY, boxW, boxH, 16);
        else ctx.rect(140, guideY, boxW, boxH);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 30px ${fontFamily}`;
        ctx.fillText('MONT MARTE TUBE MATCH & BLEND', 180, guideY + 68);

        if (montMarteMatch) {
            const mmC = montMarteMatch.shade || montMarteMatch.primary;
            if (mmC) {
                ctx.fillStyle = mmC.hex;
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(180, guideY + 100, 96, 96, 12);
                else ctx.rect(180, guideY + 100, 96, 96);
                ctx.fill();
                ctx.strokeStyle = 'rgba(0,0,0,0.15)';
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.fillStyle = '#0f172a';
                ctx.font = `bold 28px ${fontFamily}`;
                ctx.fillText(`MM-${mmC.code} ${mmC.name}`, 300, guideY + 140);

                ctx.fillStyle = '#64748b';
                ctx.font = `24px ${fontFamily}`;
                ctx.fillText(`Pigment: ${mmC.pigment}  •  Opacity: ${mmC.opacity}`, 300, guideY + 180);

                ctx.fillStyle = '#059669';
                ctx.font = `bold 24px ${fontFamily}`;
                ctx.fillText(`Match Accuracy: ${montMarteMatch.accuracy || 95}% Visual Proximity`, 180, guideY + 250);
            }

            ctx.fillStyle = '#475569';
            ctx.font = `23px ${fontFamily}`;
            ctx.fillText(montMarteMatch.technique || 'Apply with damp filbert brush onto primed canvas.', 180, guideY + 310);
        }

        // Sketch Pencil Box
        const pencilX = 140 + boxW + 48;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(pencilX, guideY, boxW, boxH, 16);
        else ctx.rect(pencilX, guideY, boxW, boxH);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 30px ${fontFamily}`;
        ctx.fillText('SKETCH PENCIL & VALUE DARKNESS', pencilX + 40, guideY + 68);

        if (pencilRec) {
            ctx.fillStyle = '#0f172a';
            ctx.font = `bold 44px ${fontFamily}`;
            ctx.fillText(pencilRec.grade || '2B Soft Medium', pencilX + 40, guideY + 150);

            ctx.fillStyle = '#64748b';
            ctx.font = `24px ${fontFamily}`;
            ctx.fillText(pencilRec.role || 'Shading & Chiaroscuro Volume', pencilX + 40, guideY + 195);

            ctx.fillStyle = '#334155';
            ctx.font = `24px ${fontFamily}`;
            ctx.fillText(pencilRec.technique || 'Use side of lead at 30° angle. Blend with tortillon.', pencilX + 40, guideY + 255);

            ctx.fillStyle = '#94a3b8';
            ctx.font = `italic 22px ${fontFamily}`;
            ctx.fillText('Spectrum: 9H through 14B Pitt Matt Anti-Reflective Carbon', pencilX + 40, guideY + 315);
        }

        // --- SUBSTRATE ADVISOR BAR ---
        const subY = 2300;
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(140, subY, A4_WIDTH - 280, 260, 16);
        else ctx.rect(140, subY, A4_WIDTH - 280, 260);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 28px ${fontFamily}`;
        ctx.fillText('RECOMMENDED SUBSTRATE & SURFACE PREPARATION', 190, subY + 60);

        ctx.fillStyle = '#334155';
        ctx.font = `23px ${fontFamily}`;
        ctx.fillText('• Stretched Cotton Canvas / Canvas Pads: Prime with 2 cross-hatched coats of acrylic gesso. Sand lightly with 240-grit paper.', 190, subY + 110);
        ctx.fillText('• Cartridge Paper (150-250 GSM): Tape borders with low-tack artist masking tape to prevent cockling before wet washes.', 190, subY + 155);
        ctx.fillText('• Wood & Glass: Degrease with 70% isopropanol. Seal raw timber with clear acrylic dispersion before paint application.', 190, subY + 200);

        // --- OPTIONAL WATERMARK ---
        if (watermark && watermarkText) {
            ctx.save();
            ctx.translate(A4_WIDTH / 2, A4_HEIGHT / 2);
            ctx.rotate(-Math.PI / 6);
            ctx.font = `bold 84px ${fontFamily}`;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.textAlign = 'center';
            ctx.fillText(watermarkText.toUpperCase(), 0, 0);
            ctx.fillText(watermarkText.toUpperCase(), 0, -360);
            ctx.fillText(watermarkText.toUpperCase(), 0, 360);
            ctx.restore();
        }

        // --- FOOTER BAR (WITH TIMESTAMP AT FOOTER RIGHT AS REQUESTED) ---
        const footerY = A4_HEIGHT - 140;
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(140, footerY);
        ctx.lineTo(A4_WIDTH - 140, footerY);
        ctx.stroke();

        // Footer Left: Engine & Creator Credits
        ctx.fillStyle = '#64748b';
        ctx.font = `22px ${fontFamily}`;
        ctx.textAlign = 'left';
        ctx.fillText('PigmentIQ Pro  •  Engineered by Md. Shihab Sikder (Creative Coder, ML & IoT Enthusiast)  •  github.com/mdshihab56', 140, footerY + 48);

        // Footer Right: Timestamp (Bold, Date, Day & Time)
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 22px ${fontFamily}`;
        ctx.textAlign = 'right';
        ctx.fillText(dateTimeStamp, A4_WIDTH - 140, footerY + 48);
        ctx.textAlign = 'left';

        return canvas;
    }

    /**
     * Trigger browser file save or native Save File Picker
     */
    async function saveExportBlob(blob, filename, mimeType, useSavePicker = true) {
        if (useSavePicker && 'showSaveFilePicker' in window) {
            try {
                const ext = filename.split('.').pop();
                const handle = await window.showSaveFilePicker({
                    suggestedName: filename,
                    types: [{
                        description: `${ext.toUpperCase()} Specification Document`,
                        accept: { [mimeType]: [`.${ext}`] }
                    }]
                });
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
                return true;
            } catch (err) {
                if (err.name === 'AbortError') return false;
                console.warn('FilePicker error, falling back to standard download:', err);
            }
        }

        // Standard Universal Browser Download fallback
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 300);
        return true;
    }

    /**
     * Master Export Trigger
     */
    async function exportPaletteSheet(options) {
        const format = (options.format || 'pdf').toLowerCase();
        const canvas = renderA4Canvas(options);
        const baseName = (options.paletteName || 'pigmentiq_palette').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
        const filename = `${baseName}_${options.slNumber || 'sheet'}.${format}`;

        if (format === 'png') {
            return new Promise((resolve) => {
                canvas.toBlob(async (blob) => {
                    const ok = await saveExportBlob(blob, filename, 'image/png', options.useSavePicker);
                    resolve({ ok, filename });
                }, 'image/png');
            });
        } else if (format === 'jpg' || format === 'jpeg') {
            return new Promise((resolve) => {
                canvas.toBlob(async (blob) => {
                    const ok = await saveExportBlob(blob, filename, 'image/jpeg', options.useSavePicker);
                    resolve({ ok, filename });
                }, 'image/jpeg', 0.98); // Maximum JPEG quality
            });
        } else if (format === 'pdf') {
            return new Promise((resolve) => {
                const dataUrl = canvas.toDataURL('image/jpeg', 0.98);
                const binaryStr = atob(dataUrl.split(',')[1]);
                const bytes = new Uint8Array(binaryStr.length);
                for (let i = 0; i < binaryStr.length; i++) {
                    bytes[i] = binaryStr.charCodeAt(i);
                }

                const pdfBlob = createA4PdfFromJpegBytes(bytes, A4_WIDTH, A4_HEIGHT);
                saveExportBlob(pdfBlob, filename, 'application/pdf', options.useSavePicker).then(ok => {
                    resolve({ ok, filename });
                });
            });
        }
    }

    /**
     * Direct Print A4 Specification Sheet (Browser Native Print Dialog)
     */
    function directPrintA4(options) {
        return new Promise((resolve) => {
            const canvas = renderA4Canvas(options);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.98);
            const iframe = document.createElement('iframe');
            iframe.style.position = 'fixed';
            iframe.style.right = '0';
            iframe.style.bottom = '0';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = '0';
            iframe.style.zIndex = '-999';
            document.body.appendChild(iframe);

            const doc = iframe.contentWindow.document;
            doc.open();
            doc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${options.paletteName || 'PigmentIQ A4 Specification Sheet'}</title>
                    <style>
                        @page {
                            size: A4 portrait;
                            margin: 0;
                        }
                        body, html {
                            margin: 0;
                            padding: 0;
                            width: 100%;
                            height: 100%;
                            background: #ffffff;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                            display: block;
                        }
                    </style>
                </head>
                <body>
                    <img src="${dataUrl}" id="print-sheet-img" />
                </body>
                </html>
            `);
            doc.close();

            const img = doc.getElementById('print-sheet-img');
            const triggerPrint = () => {
                setTimeout(() => {
                    try {
                        iframe.contentWindow.focus();
                        iframe.contentWindow.print();
                    } catch (e) {
                        console.warn('Iframe print error, falling back to window print:', e);
                        const win = window.open('', '_blank');
                        if (win) {
                            win.document.write(doc.documentElement.outerHTML);
                            win.document.close();
                            win.focus();
                            win.print();
                        }
                    }
                    setTimeout(() => {
                        if (iframe && iframe.parentNode) {
                            iframe.parentNode.removeChild(iframe);
                        }
                        resolve(true);
                    }, 2000);
                }, 300);
            };

            if (img.complete) {
                triggerPrint();
            } else {
                img.onload = triggerPrint;
                img.onerror = () => {
                    if (iframe && iframe.parentNode) iframe.parentNode.removeChild(iframe);
                    resolve(false);
                };
            }
        });
    }

    // Expose public API
    window.ExportManager = {
        renderA4Canvas,
        exportPaletteSheet,
        directPrintA4,
        getDefaultDateTimeStamp,
        A4_WIDTH,
        A4_HEIGHT
    };

})();
