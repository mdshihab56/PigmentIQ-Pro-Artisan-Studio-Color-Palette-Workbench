/**
 * PigmentIQ / ChromaAtelier - Main Application Controller
 * Handles UI interactions, reactive rendering, palette extraction,
 * Mont Marte kit matching, sketch value analysis, audio feedback, theme persistence,
 *  sliding settings drawer, and A4 Specification Sheet export.
 * Author: Md. Shihab Sikder (github.com/mdshihab56)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Application State
    const AppState = {
        currentTab: 'extractor',
        activeTheme: 'atelier-dark',
        customAccent: '#2997ff',
        activeColor: { r: 214, g: 37, b: 104, hex: '#D62568' }, // Default: Magenta
        activeKitPreset: 'all',
        myKitCodes: new Set(["01", "03", "04", "05", "06", "11", "14", "17", "18", "19", "20", "24"]), // Default 12 set
        isLoupeActive: false,
        isValueStudyActive: false,
        extractedColors: { dominant: [], tonal: { highlights: [], midtones: [], shadows: [] } },
        activeRecipe: null,
        activeMmMatch: null,
        activePencilRec: null
    };

    // DOM Elements Cache
    const elements = {
        navTabs: document.querySelectorAll('.nav-tab-btn'),
        tabContents: document.querySelectorAll('.tab-content'),
        imageInput: document.getElementById('image-upload-input'),
        dropzone: document.getElementById('image-dropzone'),
        previewImage: document.getElementById('art-preview-img'),
        canvasViewport: document.getElementById('canvas-viewport'),
        eyedropperLoupe: document.getElementById('eyedropper-loupe'),
        loupeSwatch: document.getElementById('loupe-swatch'),
        dominantPaletteGrid: document.getElementById('dominant-palette-grid'),
        activeColorBlob: document.getElementById('active-color-blob'),
        activeHexDisplay: document.getElementById('active-hex-display'),
        activeHslDisplay: document.getElementById('active-hsl-display'),
        activeCmykDisplay: document.getElementById('active-cmyk-display'),
        activeValueDisplay: document.getElementById('active-value-display'),
        recipeIngredientsList: document.getElementById('recipe-ingredients-list'),
        mixingRatioBar: document.getElementById('mixing-ratio-bar'),
        mixingStepsList: document.getElementById('mixing-steps-list'),
        activeMmMatchCard: document.getElementById('active-mm-match-card'),
        activePencilRecCard: document.getElementById('active-pencil-rec-card'),
        // Mont Marte Tab Elements
        mmSearchInput: document.getElementById('mm-search-input'),
        mmKitPills: document.querySelectorAll('.kit-pill'),
        mmGrid: document.getElementById('mm-colors-grid'),
        mmCustomPicker: document.getElementById('mm-custom-target-picker'),
        mmCustomHexInput: document.getElementById('mm-custom-hex-input'),
        mmComboResult: document.getElementById('mm-combo-result'),
        // Sketch Tab Elements
        sketchScaleGrid: document.getElementById('sketch-scale-grid'),
        sketchSlider: document.getElementById('sketch-lum-slider'),
        sketchSliderVal: document.getElementById('sketch-slider-val'),
        sketchSliderRec: document.getElementById('sketch-slider-rec'),
        // Brands & Surfaces Elements
        brandsContainer: document.getElementById('brands-encyclopedia-container'),
        surfacesContainer: document.getElementById('surfaces-guide-container'),
        // Settings  Drawer
        btnSettings: document.getElementById('btn-open-settings'),
        btnAudioToggle: document.getElementById('btn-audio-toggle'),
        settingsDrawer: document.getElementById('settings-drawer'),
        settingsDrawerBackdrop: document.getElementById('settings-drawer-backdrop'),
        btnCloseSettings: document.getElementById('btn-close-settings'),
        footerBtnAbout: document.getElementById('footer-btn-open-about'),
        settingsTabButtons: document.querySelectorAll('.settings-tab-btn'),
        settingsPanels: document.querySelectorAll('.settings-panel'),
        themeButtons: document.querySelectorAll('.theme-choice-btn'),
        accentColorPicker: document.getElementById('settings-accent-picker'),
        wallpaperInput: document.getElementById('settings-wallpaper-input'),
        wallpaperClear: document.getElementById('settings-wallpaper-clear'),
        wallpaperStatus: document.getElementById('settings-wallpaper-status'),
        wallpaperPreview: document.getElementById('wallpaper-preview'),
        wallpaperPreviewWrap: document.getElementById('wallpaper-preview-wrap'),
        wallpaperFit: document.getElementById('wallpaper-fit'),
        wallpaperPosition: document.getElementById('wallpaper-position'),
        wallpaperOverlay: document.getElementById('wallpaper-overlay'),
        wallpaperOverlayValue: document.getElementById('wallpaper-overlay-value'),
        wallpaperDim: document.getElementById('wallpaper-dim'),
        wallpaperDimValue: document.getElementById('wallpaper-dim-value'),
        wallpaperBlur: document.getElementById('wallpaper-blur'),
        wallpaperBlurValue: document.getElementById('wallpaper-blur-value'),
        soundTypeButtons: document.querySelectorAll('.sound-choice-btn'),
        volumeSlider: document.getElementById('settings-volume-slider'),
        volumeValueText: document.getElementById('volume-value-text'),
        btnTestSound: document.getElementById('btn-test-sound'),
        btnToggleValueStudy: document.getElementById('btn-toggle-value-study'),
        toastContainer: document.getElementById('toast-container'),
        // Poppins Master Typography & UI Font Scale
        poppinsVariantButtons: document.querySelectorAll('.poppins-variant-btn'),
        fontLivePreview: document.getElementById('font-live-preview'),
        activeFontBadge: document.getElementById('active-font-badge'),
        fontSizeSlider: document.getElementById('settings-font-size-slider'),
        fontSizeText: document.getElementById('font-size-value-text'),
        fontSizeButtons: document.querySelectorAll('.font-size-btn'),
        // Export Feature Elements
        btnHeaderExport: document.getElementById('btn-header-export'),
        btnExportPalette: document.getElementById('btn-export-palette'),
        btnExportMmSheet: document.getElementById('btn-export-mm-sheet'),
        btnExportLabSheet: document.getElementById('btn-export-lab-sheet'),
        exportModal: document.getElementById('export-modal-backdrop'),
        btnCloseExport: document.getElementById('btn-close-export'),
        btnCancelExport: document.getElementById('btn-cancel-export'),
        btnConfirmExport: document.getElementById('btn-confirm-export'),
        exportPaletteName: document.getElementById('export-palette-name'),
        exportCreatorName: document.getElementById('export-creator-name'),
        exportPurpose: document.getElementById('export-purpose'),
        exportSlNumber: document.getElementById('export-sl-number'),
        exportFormatButtons: document.querySelectorAll('.export-format-btn'),
        exportFontSelect: document.getElementById('export-font-select'),
        exportFontCustom: document.getElementById('export-font-custom'),
        exportWatermarkToggle: document.getElementById('export-watermark-toggle'),
        exportWatermarkText: document.getElementById('export-watermark-text'),
        exportPreviewCanvas: document.getElementById('a4-mini-preview-canvas'),
        exportPreviewTimestamp: document.getElementById('export-preview-timestamp'),
        btnExportText: document.getElementById('btn-export-text')
    };

    // --- Audio Feedback Helper ---
    function playTap() {
        if (window.soundEngine) {
            window.soundEngine.playTap();
        }
    }

    // --- Toast Notification Helper ---
    function showToast(message) {
        if (!elements.toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        elements.toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2600);
    }

    // --- Tab Navigation Setup ---
    function switchTab(targetTabId) {
        AppState.currentTab = targetTabId;

        // Toggle Mont Marte dedicated inner scroll on body
        document.body.classList.toggle('tab-montmarte-active', targetTabId === 'montmarte');

        // Update nav buttons
        elements.navTabs.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === targetTabId);
        });

        // Update tab views
        elements.tabContents.forEach(tab => {
            tab.classList.toggle('active', tab.id === `tab-${targetTabId}`);
        });

        // Ensure tab content is fresh & populated
        if (targetTabId === 'brands') renderBrands();
        if (targetTabId === 'surfaces') renderSurfaces();
        if (targetTabId === 'sketch') renderSketchPencils();
        if (targetTabId === 'montmarte') renderMontMarteCatalog();

        playTap();
        const mainContainer = document.querySelector('.app-container');
        if (mainContainer) mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }

    elements.navTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            if (target) switchTab(target);
        });
    });

    const brandHomeLink = document.getElementById('brand-home-link');
    if (brandHomeLink) {
        brandHomeLink.addEventListener('click', () => {
            switchTab('extractor');
        });
    }

    // --- Theme & Settings Setup (wallpaper options are persisted locally) ---
    const wallpaperDefaults = { fit: 'cover', position: 'center', overlay: 38, dim: 100, blur: 0 };
    function readWallpaperOptions() {
        try { return { ...wallpaperDefaults, ...JSON.parse(localStorage.getItem('pigmentiq_wallpaper_options') || '{}') }; }
        catch (_) { return { ...wallpaperDefaults }; }
    }
    function applyWallpaperOptions(options = readWallpaperOptions()) {
        const overlay = Math.max(0, Math.min(75, Number(options.overlay ?? 38)));
        const dim = Math.max(35, Math.min(130, Number(options.dim ?? 100)));
        const blur = Math.max(0, Math.min(8, Number(options.blur ?? 0)));
        document.documentElement.style.setProperty('--wallpaper-overlay', String(overlay / 100));
        document.documentElement.style.setProperty('--wallpaper-dim', String(dim / 100));
        document.documentElement.style.setProperty('--wallpaper-blur', `${blur}px`);
        document.documentElement.style.setProperty('--wallpaper-fit', options.fit || 'cover');
        document.documentElement.style.setProperty('--wallpaper-position', options.position || 'center');
        if (elements.wallpaperFit) elements.wallpaperFit.value = options.fit || 'cover';
        if (elements.wallpaperPosition) elements.wallpaperPosition.value = options.position || 'center';
        if (elements.wallpaperOverlay) elements.wallpaperOverlay.value = overlay;
        if (elements.wallpaperOverlayValue) elements.wallpaperOverlayValue.textContent = `${overlay}%`;
        if (elements.wallpaperDim) elements.wallpaperDim.value = dim;
        if (elements.wallpaperDimValue) elements.wallpaperDimValue.textContent = `${dim}%`;
        if (elements.wallpaperBlur) elements.wallpaperBlur.value = blur;
        if (elements.wallpaperBlurValue) elements.wallpaperBlurValue.textContent = `${blur}px`;
    }
    function saveWallpaperOptions() {
        const options = {
            fit: elements.wallpaperFit?.value || 'cover',
            position: elements.wallpaperPosition?.value || 'center',
            overlay: Number(elements.wallpaperOverlay?.value ?? 38),
            dim: Number(elements.wallpaperDim?.value ?? 100),
            blur: Number(elements.wallpaperBlur?.value ?? 0)
        };
        try { localStorage.setItem('pigmentiq_wallpaper_options', JSON.stringify(options)); } catch (_) {}
        applyWallpaperOptions(options);
    }
    function applyWallpaper(dataUrl, statusText = 'Background image applied.') {
        if (dataUrl) {
            document.documentElement.style.setProperty('--app-wallpaper', `url("${dataUrl}")`);
            document.documentElement.classList.add('has-wallpaper');
            if (elements.wallpaperPreview) elements.wallpaperPreview.src = dataUrl;
            if (elements.wallpaperPreviewWrap) elements.wallpaperPreviewWrap.hidden = false;
            if (elements.wallpaperStatus) elements.wallpaperStatus.textContent = statusText;
        } else {
            document.documentElement.style.removeProperty('--app-wallpaper');
            document.documentElement.classList.remove('has-wallpaper');
            if (elements.wallpaperPreview) elements.wallpaperPreview.removeAttribute('src');
            if (elements.wallpaperPreviewWrap) elements.wallpaperPreviewWrap.hidden = true;
            if (elements.wallpaperStatus) elements.wallpaperStatus.textContent = 'Plain studio background is active.';
        }
    }
    function wallpaperAccentFromImage(dataUrl) {
        const img = new Image();
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas'); canvas.width = 24; canvas.height = 24;
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                ctx.drawImage(img, 0, 0, 24, 24);
                const pixels = ctx.getImageData(0, 0, 24, 24).data;
                let r = 0, g = 0, b = 0, n = 0;
                for (let i = 0; i < pixels.length; i += 4) {
                    const max = Math.max(pixels[i], pixels[i + 1], pixels[i + 2]);
                    const min = Math.min(pixels[i], pixels[i + 1], pixels[i + 2]);
                    if (max - min < 18 || max < 35 || max > 242) continue;
                    r += pixels[i]; g += pixels[i + 1]; b += pixels[i + 2]; n++;
                }
                if (!n) return;
                const hex = '#' + [r/n, g/n, b/n].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
                setAccentColor(hex);
                if (elements.accentColorPicker) elements.accentColorPicker.value = hex;
            } catch (_) { /* Keep the selected image even if color sampling is unavailable. */ }
        };
        img.src = dataUrl;
    }
    function loadSavedWallpaper() {
        applyWallpaperOptions();
        try {
            const saved = localStorage.getItem('pigmentiq_wallpaper');
            if (saved) applyWallpaper(saved, 'Saved background image is active.');
        } catch (_) { if (elements.wallpaperStatus) elements.wallpaperStatus.textContent = 'Could not load saved background; choose the image again.'; }
    }
    if (elements.wallpaperInput) elements.wallpaperInput.addEventListener('change', () => {
        const file = elements.wallpaperInput.files && elements.wallpaperInput.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) { if (elements.wallpaperStatus) elements.wallpaperStatus.textContent = 'Please choose an image file.'; return; }
        if (file.size > 15 * 1024 * 1024) { if (elements.wallpaperStatus) elements.wallpaperStatus.textContent = 'Please choose an image under 15 MB for smooth local processing.'; return; }
        if (elements.wallpaperStatus) elements.wallpaperStatus.textContent = 'Optimizing your background image…';
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                const maxW = 1600, maxH = 1200, scale = Math.min(1, maxW / img.width, maxH / img.height);
                const canvas = document.createElement('canvas');
                canvas.width = Math.max(1, Math.round(img.width * scale)); canvas.height = Math.max(1, Math.round(img.height * scale));
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const optimized = canvas.toDataURL('image/jpeg', 0.76);
                try {
                    localStorage.setItem('pigmentiq_wallpaper', optimized);
                    applyWallpaper(optimized, 'Background saved on this device. Accent colors are being matched…');
                    wallpaperAccentFromImage(optimized);
                } catch (_) { if (elements.wallpaperStatus) elements.wallpaperStatus.textContent = 'Browser storage is full. Remove the old background or choose a smaller image.'; }
            };
            img.onerror = () => { if (elements.wallpaperStatus) elements.wallpaperStatus.textContent = 'That image could not be opened. Try a JPG, PNG, or WebP image.'; };
            img.src = reader.result;
        };
        reader.onerror = () => { if (elements.wallpaperStatus) elements.wallpaperStatus.textContent = 'Could not read that file. Please try again.'; };
        reader.readAsDataURL(file);
    });
    [elements.wallpaperFit, elements.wallpaperPosition].forEach(control => control && control.addEventListener('change', saveWallpaperOptions));
    [elements.wallpaperOverlay, elements.wallpaperDim, elements.wallpaperBlur].forEach(control => control && control.addEventListener('input', saveWallpaperOptions));
    if (elements.wallpaperClear) elements.wallpaperClear.addEventListener('click', () => {
        try { localStorage.removeItem('pigmentiq_wallpaper'); } catch (_) {}
        applyWallpaper(null);
        try { localStorage.removeItem('pigmentiq_accent'); localStorage.removeItem('pigmentiq_accent_customized'); } catch (_) {}
        const theme = document.documentElement.getAttribute('data-theme') || 'atelier-dark';
        setTheme(theme, false);
        if (elements.wallpaperInput) elements.wallpaperInput.value = '';
        showToast('Plain background restored');
    });

    function loadSavedTheme() {
        let savedTheme = localStorage.getItem('pigmentiq_theme') || 'atelier-dark';
        if (savedTheme === 'black') savedTheme = 'atelier-dark';
        if (savedTheme === 'atelier-warm') savedTheme = 'light';
        if (['discord', 'cyberpunk', 'sage', 'nordic'].includes(savedTheme)) savedTheme = 'atelier-dark';

        const isAccentCustomized = localStorage.getItem('pigmentiq_accent_customized') === 'true';
        const savedAccent = localStorage.getItem('pigmentiq_accent');
        
        setTheme(savedTheme, false);

        if (isAccentCustomized && savedAccent) {
            setAccentColor(savedAccent);
            if (elements.accentColorPicker) elements.accentColorPicker.value = savedAccent;
        }
    }

    function setTheme(themeName, notify = true) {
        if (!themeName || themeName === 'undefined') return;
        if (themeName === 'black') themeName = 'atelier-dark';
        if (themeName === 'atelier-warm') themeName = 'light';
        if (['discord', 'cyberpunk', 'sage', 'nordic'].includes(themeName)) themeName = 'atelier-dark';

        AppState.activeTheme = themeName;
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('pigmentiq_theme', themeName);

        // If user hasn't explicitly customized accent, let the active theme's CSS accent apply
        const isAccentCustomized = localStorage.getItem('pigmentiq_accent_customized') === 'true';
        if (!isAccentCustomized) {
            document.documentElement.style.removeProperty('--accent');
            document.documentElement.style.removeProperty('--accent-hover');
            document.documentElement.style.removeProperty('--accent-glow');
            document.documentElement.style.removeProperty('--badge-bg');
            if (elements.accentColorPicker) {
                const computedAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
                if (computedAccent) elements.accentColorPicker.value = computedAccent;
            }
        }

        if (elements.themeButtons) {
            elements.themeButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.theme === themeName);
            });
        }

        if (notify) {
            const labels = {
                'light': 'Light (Silver Studio)',
                'navy': 'Nev Blue (Deep Navy)',
                'atelier-dark': 'Black (Space Black)'
            };
            showToast(`Theme switched to: ${labels[themeName] || themeName}`);
        }
    }

    function setAccentColor(hex) {
        AppState.customAccent = hex;
        document.documentElement.style.setProperty('--accent', hex);
        document.documentElement.style.setProperty('--accent-hover', hex);
        document.documentElement.style.setProperty('--accent-glow', `${hex}40`);
        document.documentElement.style.setProperty('--badge-bg', `${hex}26`);
        localStorage.setItem('pigmentiq_accent', hex);
        localStorage.setItem('pigmentiq_accent_customized', 'true');
    }

    if (elements.themeButtons) {
        elements.themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.theme) {
                    setTheme(btn.dataset.theme);
                    playTap();
                }
            });
        });
    }

    if (elements.accentColorPicker) {
        elements.accentColorPicker.addEventListener('input', (e) => {
            setAccentColor(e.target.value);
        });
    }

    // Sound Controls Setup (Completely Isolated from Theme selection!)
    if (elements.soundTypeButtons) {
        elements.soundTypeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.sound === window.soundEngine.soundType);
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const sound = btn.dataset.sound;
                if (sound) {
                    window.soundEngine.setSoundType(sound);
                    elements.soundTypeButtons.forEach(b => b.classList.toggle('active', b === btn));
                    showToast(`Sound set to: ${btn.textContent.trim()}`);
                    updateAudioToggleIcon();
                }
            });
        });
    }

    if (elements.volumeSlider) {
        elements.volumeSlider.value = Math.round(window.soundEngine.volume * 100);
        if (elements.volumeValueText) elements.volumeValueText.textContent = `${elements.volumeSlider.value}%`;

        elements.volumeSlider.addEventListener('input', (e) => {
            const vol = parseInt(e.target.value) / 100;
            window.soundEngine.setVolume(vol);
            if (elements.volumeValueText) elements.volumeValueText.textContent = `${e.target.value}%`;
        });
    }

    if (elements.btnTestSound) {
        elements.btnTestSound.addEventListener('click', () => {
            playTap();
        });
    }

    // --- Poppins Master Typography & Weight Variant Handlers ---
    const POPPINS_VARIANTS = {
        'thin': { name: 'Thin', weight: '100', heading: '300', style: 'normal' },
        'light': { name: 'Light', weight: '300', heading: '500', style: 'normal' },
        'regular': { name: 'Regular', weight: '400', heading: '600', style: 'normal' },
        'medium': { name: 'Medium', weight: '500', heading: '700', style: 'normal' },
        'semibold': { name: 'SemiBold', weight: '600', heading: '800', style: 'normal' },
        'bold': { name: 'Bold', weight: '700', heading: '900', style: 'normal' },
        'extrabold': { name: 'ExtraBold', weight: '800', heading: '900', style: 'normal' },
        'black': { name: 'Black', weight: '900', heading: '900', style: 'normal' },
        'thin-italic': { name: 'Thin Italic', weight: '100', heading: '300', style: 'italic' },
        'italic': { name: 'Regular Italic', weight: '400', heading: '600', style: 'italic' },
        'medium-italic': { name: 'Medium Italic', weight: '500', heading: '700', style: 'italic' },
        'semibold-italic': { name: 'SemiBold Italic', weight: '600', heading: '800', style: 'italic' },
        'bold-italic': { name: 'Bold Italic', weight: '700', heading: '900', style: 'italic' }
    };

    function applyPoppinsVariant(variantKey, notify = true) {
        const config = POPPINS_VARIANTS[variantKey] || POPPINS_VARIANTS['regular'];

        document.documentElement.style.setProperty('--font-weight-base', config.weight);
        document.documentElement.style.setProperty('--font-weight-heading', config.heading);
        document.documentElement.style.setProperty('--font-style-base', config.style);

        if (elements.poppinsVariantButtons) {
            elements.poppinsVariantButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.variant === variantKey);
            });
        }

        if (elements.activeFontBadge) {
            elements.activeFontBadge.textContent = `Active: Poppins ${config.name} (${config.weight}${config.style === 'italic' ? 'i' : ''})`;
        }

        if (elements.fontLivePreview) {
            elements.fontLivePreview.style.fontWeight = config.weight;
            elements.fontLivePreview.style.fontStyle = config.style;
        }

        localStorage.setItem('pigmentiq_poppins_variant', variantKey);
        if (notify) showToast(`Applied Typography: Poppins ${config.name}`);
    }

    function loadSavedPoppinsVariant() {
        const saved = localStorage.getItem('pigmentiq_poppins_variant') || 'regular';
        applyPoppinsVariant(saved, false);
    }

    if (elements.poppinsVariantButtons) {
        elements.poppinsVariantButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const variant = btn.dataset.variant;
                if (variant) {
                    applyPoppinsVariant(variant);
                    playTap();
                }
            });
        });
    }

    function applyFontSize(sizePx, notify = true) {
        if (sizePx < 11 || sizePx > 26) return;
        document.documentElement.style.setProperty('--base-font-size', `${sizePx}px`);
        if (elements.fontSizeSlider) elements.fontSizeSlider.value = sizePx;
        if (elements.fontSizeText) elements.fontSizeText.textContent = `${sizePx}px`;

        if (elements.fontSizeButtons) {
            elements.fontSizeButtons.forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.dataset.size) === sizePx);
            });
        }

        localStorage.setItem('pigmentiq_font_size', sizePx);
        if (notify) showToast(`UI Font Scale: ${sizePx}px`);
    }

    if (elements.fontSizeSlider) {
        elements.fontSizeSlider.addEventListener('input', (e) => {
            applyFontSize(parseInt(e.target.value), false);
        });
    }

    if (elements.fontSizeButtons) {
        elements.fontSizeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const s = parseInt(btn.dataset.size);
                if (s) {
                    applyFontSize(s);
                    playTap();
                }
            });
        });
    }

    // Audio Toggle in Header with Vector Icon
    function updateAudioToggleIcon() {
        if (!elements.btnAudioToggle) return;
        const enabled = window.soundEngine.enabled && window.soundEngine.soundType !== 'mute';
        elements.btnAudioToggle.innerHTML = enabled
            ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`
            : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
        elements.btnAudioToggle.classList.toggle('active', enabled);
        elements.btnAudioToggle.title = enabled ? 'Sound On' : 'Muted';
    }

    if (elements.btnAudioToggle) {
        elements.btnAudioToggle.addEventListener('click', () => {
            window.soundEngine.toggleMute();
            updateAudioToggleIcon();
            showToast(window.soundEngine.enabled ? 'Audio feedback unmuted' : 'Audio muted');
        });
    }

    // =========================================================================
    // -STYLE SLIDING SETTINGS DRAWER HANDLERS
    // =========================================================================
    function openSettingsDrawer() {
        if (elements.settingsDrawer) {
            elements.settingsDrawer.classList.add('open');
        }
        if (elements.settingsDrawerBackdrop) {
            elements.settingsDrawerBackdrop.classList.add('open');
        }
        playTap();
    }

    function closeSettingsDrawer() {
        if (elements.settingsDrawer) {
            elements.settingsDrawer.classList.remove('open');
        }
        if (elements.settingsDrawerBackdrop) {
            elements.settingsDrawerBackdrop.classList.remove('open');
        }
        playTap();
    }

    function switchSettingsTab(tabId) {
        if (elements.settingsTabButtons) {
            elements.settingsTabButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.settingsTab === tabId);
            });
        }
        if (elements.settingsPanels) {
            elements.settingsPanels.forEach(panel => {
                panel.classList.toggle('active', panel.id === tabId);
            });
        }
    }

    if (elements.settingsTabButtons) {
        elements.settingsTabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                switchSettingsTab(btn.dataset.settingsTab);
                playTap();
            });
        });
    }

    if (elements.btnSettings) {
        elements.btnSettings.addEventListener('click', () => {
            openSettingsDrawer();
        });
    }

    if (elements.footerBtnAbout) {
        elements.footerBtnAbout.addEventListener('click', () => {
            openSettingsDrawer();
            switchSettingsTab('panel-about');
        });
    }

    if (elements.btnCloseSettings) {
        elements.btnCloseSettings.addEventListener('click', () => {
            closeSettingsDrawer();
        });
    }

    if (elements.settingsDrawerBackdrop) {
        elements.settingsDrawerBackdrop.addEventListener('click', () => {
            closeSettingsDrawer();
        });
    }

    // =========================================================================
    // A4 SPECIFICATION SHEET EXPORT CONTROLLER
    // =========================================================================
    let currentExportFormat = 'pdf';

    function openExportModal(defaultTitle = null) {
        if (!elements.exportModal) return;

        // Populate title if given
        if (defaultTitle && elements.exportPaletteName) {
            elements.exportPaletteName.value = defaultTitle;
        } else if (elements.exportPaletteName && !elements.exportPaletteName.value) {
            elements.exportPaletteName.value = 'Sunset Impressionism Study';
        }

        // Generate clean SL number if empty
        if (elements.exportSlNumber && !elements.exportSlNumber.value) {
            elements.exportSlNumber.value = 'SL-' + Date.now().toString().slice(-6);
        }

        // Set default formatted timestamp on footer right preview
        if (elements.exportPreviewTimestamp && window.ExportManager) {
            elements.exportPreviewTimestamp.textContent = window.ExportManager.getDefaultDateTimeStamp();
        }

        elements.exportModal.classList.add('open');
        playTap();

        // Render live mini A4 preview
        updateA4MiniPreview();
    }

    function closeExportModal() {
        if (elements.exportModal) {
            elements.exportModal.classList.remove('open');
            playTap();
        }
    }

    function updateA4MiniPreview() {
        if (!elements.exportPreviewCanvas || !window.ExportManager) return;

        const paletteTitle = (elements.exportPaletteName ? elements.exportPaletteName.value : '') || 'Color Harmony Study';
        const creator = (elements.exportCreatorName ? elements.exportCreatorName.value : '') || 'Md. Shihab Sikder';
        const purpose = (elements.exportPurpose ? elements.exportPurpose.value : '') || 'Acrylic Landscape Study';
        const slNumber = (elements.exportSlNumber ? elements.exportSlNumber.value : '') || 'SL-2026-001';
        const timestamp = elements.exportPreviewTimestamp ? elements.exportPreviewTimestamp.textContent : window.ExportManager.getDefaultDateTimeStamp();

        let font = "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        if (elements.exportFontSelect) {
            if (elements.exportFontSelect.value === 'custom' && elements.exportFontCustom && elements.exportFontCustom.value) {
                font = elements.exportFontCustom.value;
            } else if (elements.exportFontSelect.value !== 'custom') {
                font = elements.exportFontSelect.value;
            }
        }

        const watermark = elements.exportWatermarkToggle ? elements.exportWatermarkToggle.checked : false;
        const watermarkText = (elements.exportWatermarkText ? elements.exportWatermarkText.value : '') || 'PigmentIQ Studio';

        const colors = AppState.extractedColors && AppState.extractedColors.dominant && AppState.extractedColors.dominant.length > 0
            ? AppState.extractedColors.dominant
            : (AppState.activeColor ? [AppState.activeColor] : []);

        const activeColor = AppState.activeColor || null;
        const recipe = AppState.activeRecipe || null;
        const montMarteMatch = AppState.activeMmMatch || null;
        const pencilRec = AppState.activePencilRec || null;

        const fullCanvas = window.ExportManager.renderA4Canvas({
            paletteName: paletteTitle,
            creatorName: creator,
            purpose: purpose,
            slNumber: slNumber,
            dateTimeStamp: timestamp,
            fontFamily: font,
            watermark: watermark,
            watermarkText: watermarkText,
            colors: colors,
            activeColor: activeColor,
            recipe: recipe,
            montMarteMatch: montMarteMatch,
            pencilRec: pencilRec
        });

        // Draw scaled into the mini preview canvas
        const miniCtx = elements.exportPreviewCanvas.getContext('2d');
        miniCtx.clearRect(0, 0, elements.exportPreviewCanvas.width, elements.exportPreviewCanvas.height);
        miniCtx.drawImage(fullCanvas, 0, 0, elements.exportPreviewCanvas.width, elements.exportPreviewCanvas.height);
    }

    async function handleConfirmExport() {
        if (!window.ExportManager) return;

        const paletteTitle = (elements.exportPaletteName ? elements.exportPaletteName.value : '') || 'Color Palette Study';
        const creator = (elements.exportCreatorName ? elements.exportCreatorName.value : '') || 'Md. Shihab Sikder';
        const purpose = (elements.exportPurpose ? elements.exportPurpose.value : '') || 'Art Study';
        const slNumber = (elements.exportSlNumber ? elements.exportSlNumber.value : '') || 'SL-001';
        const timestamp = elements.exportPreviewTimestamp ? elements.exportPreviewTimestamp.textContent : window.ExportManager.getDefaultDateTimeStamp();

        let font = "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        if (elements.exportFontSelect) {
            if (elements.exportFontSelect.value === 'custom' && elements.exportFontCustom && elements.exportFontCustom.value) {
                font = elements.exportFontCustom.value;
            } else if (elements.exportFontSelect.value !== 'custom') {
                font = elements.exportFontSelect.value;
            }
        }

        const watermark = elements.exportWatermarkToggle ? elements.exportWatermarkToggle.checked : false;
        const watermarkText = (elements.exportWatermarkText ? elements.exportWatermarkText.value : '') || 'PigmentIQ Studio';

        const destMode = document.querySelector('input[name="export-dest"]:checked');
        const useSavePicker = destMode ? destMode.value === 'picker' : true;

        const colors = AppState.extractedColors && AppState.extractedColors.dominant && AppState.extractedColors.dominant.length > 0
            ? AppState.extractedColors.dominant
            : (AppState.activeColor ? [AppState.activeColor] : []);

        const activeColor = AppState.activeColor || null;
        const recipe = AppState.activeRecipe || null;
        const montMarteMatch = AppState.activeMmMatch || null;
        const pencilRec = AppState.activePencilRec || null;

        showToast(`Generating high-resolution A4 ${currentExportFormat.toUpperCase()}...`);

        try {
            const res = await window.ExportManager.exportPaletteSheet({
                format: currentExportFormat,
                paletteName: paletteTitle,
                creatorName: creator,
                purpose: purpose,
                slNumber: slNumber,
                dateTimeStamp: timestamp,
                fontFamily: font,
                watermark: watermark,
                watermarkText: watermarkText,
                useSavePicker: useSavePicker,
                colors: colors,
                activeColor: activeColor,
                recipe: recipe,
                montMarteMatch: montMarteMatch,
                pencilRec: pencilRec
            });

            if (res && res.ok) {
                showToast(`Saved: ${res.filename}`);
                closeExportModal();
            }
        } catch (err) {
            console.error('Export error:', err);
            showToast('Export failed. Please check browser permissions.');
        }
    }

    // Export Trigger Buttons
    if (elements.btnHeaderExport) {
        elements.btnHeaderExport.addEventListener('click', () => {
            openExportModal('Color Specification Study');
        });
    }

    if (elements.btnExportPalette) {
        elements.btnExportPalette.addEventListener('click', () => {
            openExportModal('Extracted Dominant Palette');
        });
    }

    if (elements.btnExportMmSheet) {
        elements.btnExportMmSheet.addEventListener('click', () => {
            openExportModal('Mont Marte Studio Specification');
        });
    }

    if (elements.btnExportLabSheet) {
        elements.btnExportLabSheet.addEventListener('click', () => {
            openExportModal('Subtractive Pigment Lab Blend');
        });
    }

    if (elements.btnCloseExport) {
        elements.btnCloseExport.addEventListener('click', () => {
            closeExportModal();
        });
    }

    if (elements.btnCancelExport) {
        elements.btnCancelExport.addEventListener('click', () => {
            closeExportModal();
        });
    }

    if (elements.exportModal) {
        elements.exportModal.addEventListener('click', (e) => {
            if (e.target === elements.exportModal) {
                closeExportModal();
            }
        });
    }

    if (elements.btnConfirmExport) {
        elements.btnConfirmExport.addEventListener('click', () => {
            handleConfirmExport();
        });
    }

    // Format selection buttons
    if (elements.exportFormatButtons) {
        elements.exportFormatButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                elements.exportFormatButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentExportFormat = btn.dataset.format || 'pdf';
                if (elements.btnExportText) {
                    elements.btnExportText.textContent = `Download A4 ${currentExportFormat.toUpperCase()}`;
                }
                playTap();
            });
        });
    }

    // Font select changes in export modal
    if (elements.exportFontSelect) {
        elements.exportFontSelect.addEventListener('change', () => {
            if (elements.exportFontSelect.value === 'custom') {
                if (elements.exportFontCustom) {
                    elements.exportFontCustom.style.display = 'block';
                    elements.exportFontCustom.focus();
                }
            } else {
                if (elements.exportFontCustom) {
                    elements.exportFontCustom.style.display = 'none';
                }
            }
            updateA4MiniPreview();
        });
    }

    if (elements.exportFontCustom) {
        elements.exportFontCustom.addEventListener('input', () => {
            updateA4MiniPreview();
        });
    }

    // Watermark toggle in export modal
    if (elements.exportWatermarkToggle) {
        elements.exportWatermarkToggle.addEventListener('change', () => {
            if (elements.exportWatermarkText) {
                elements.exportWatermarkText.style.display = elements.exportWatermarkToggle.checked ? 'block' : 'none';
            }
            updateA4MiniPreview();
        });
    }

    if (elements.exportWatermarkText) {
        elements.exportWatermarkText.addEventListener('input', () => {
            updateA4MiniPreview();
        });
    }

    // Live update preview on text change
    [elements.exportPaletteName, elements.exportCreatorName, elements.exportPurpose, elements.exportSlNumber].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                updateA4MiniPreview();
            });
        }
    });

    // --- Image Handling & Palette Extraction ---
    function handleImageFile(file) {
        if (!file || !file.type.startsWith('image/')) {
            showToast('Please select a valid art image file.');
            return;
        }

        showToast('Extracting pigments and color chemistry...');
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            elements.previewImage.src = dataUrl;
            elements.previewImage.style.display = 'block';

            window.ImageExtractor.loadImage(dataUrl).then(result => {
                renderExtractedPalettes(result.dominant, result.tonal);
                if (result.dominant.length > 0) {
                    setActiveColor(result.dominant[0].r, result.dominant[0].g, result.dominant[0].b);
                }
                showToast('Art image analyzed! Tap any swatch or point on the art.');
            }).catch(err => {
                console.error('Image extraction error:', err);
                showToast('Could not extract colors from this image.');
            });
        };
        reader.readAsDataURL(file);
    }

    if (elements.imageInput) {
        elements.imageInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleImageFile(e.target.files[0]);
            }
        });
    }

    if (elements.dropzone) {
        elements.dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            elements.dropzone.classList.add('dragover');
        });

        elements.dropzone.addEventListener('dragleave', () => {
            elements.dropzone.classList.remove('dragover');
        });

        elements.dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            elements.dropzone.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) {
                handleImageFile(e.dataTransfer.files[0]);
            }
        });
    }

    // Clipboard paste support (Ctrl+V)
    window.addEventListener('paste', (e) => {
        const items = e.clipboardData.items;
        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile();
                handleImageFile(blob);
                break;
            }
        }
    });

    // Sample Art Preset Chips
    document.querySelectorAll('.preset-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const presetType = chip.dataset.sample;
            loadSampleArtPreset(presetType);
        });
    });

    function loadSampleArtPreset(type) {
        playTap();
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 450;
        const ctx = canvas.getContext('2d');

        if (type === 'sunset') {
            const grad = ctx.createLinearGradient(0, 0, 0, 450);
            grad.addColorStop(0, '#1a103c');
            grad.addColorStop(0.3, '#74226c');
            grad.addColorStop(0.55, '#e85d04');
            grad.addColorStop(0.75, '#faa307');
            grad.addColorStop(1, '#ffba08');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 600, 450);

            const sunGrad = ctx.createRadialGradient(300, 260, 10, 300, 260, 90);
            sunGrad.addColorStop(0, '#ffffff');
            sunGrad.addColorStop(0.3, '#ffdd00');
            sunGrad.addColorStop(1, 'rgba(255, 174, 0, 0)');
            ctx.fillStyle = sunGrad;
            ctx.beginPath();
            ctx.arc(300, 260, 90, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#100b20';
            ctx.beginPath();
            ctx.moveTo(0, 380);
            ctx.bezierCurveTo(150, 330, 250, 390, 400, 350);
            ctx.bezierCurveTo(480, 320, 550, 360, 600, 340);
            ctx.lineTo(600, 450);
            ctx.lineTo(0, 450);
            ctx.fill();
        } else if (type === 'botanical') {
            ctx.fillStyle = '#f8f9fa';
            ctx.fillRect(0, 0, 600, 450);

            const colors = ['#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2', '#b7e4c7', '#d8f3dc', '#1b4332'];
            for (let i = 0; i < 40; i++) {
                ctx.fillStyle = colors[i % colors.length];
                ctx.save();
                ctx.translate(100 + (i % 8) * 55, 60 + Math.floor(i / 8) * 80);
                ctx.rotate((i * 35) * Math.PI / 180);
                ctx.beginPath();
                ctx.ellipse(0, 0, 35, 14, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        } else if (type === 'portrait') {
            const grad = ctx.createLinearGradient(0, 0, 600, 450);
            grad.addColorStop(0, '#2b1e1a');
            grad.addColorStop(0.4, '#c68642');
            grad.addColorStop(0.7, '#e0ac69');
            grad.addColorStop(1, '#ffdbac');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 600, 450);
        } else if (type === 'abstract') {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, 600, 450);
            const palette = ['#ff007f', '#7928ca', '#0070f3', '#00dfd8', '#ff4d4d'];
            for (let i = 0; i < 20; i++) {
                ctx.fillStyle = palette[i % palette.length];
                ctx.beginPath();
                ctx.arc(50 + (i * 28), 100 + ((i % 5) * 60), 40 + (i * 2), 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const dataUrl = canvas.toDataURL('image/png');
        elements.previewImage.src = dataUrl;
        elements.previewImage.style.display = 'block';

        window.ImageExtractor.loadImage(dataUrl).then(result => {
            renderExtractedPalettes(result.dominant, result.tonal);
            if (result.dominant.length > 0) {
                setActiveColor(result.dominant[0].r, result.dominant[0].g, result.dominant[0].b);
            }
            showToast(`Loaded ${type} reference study!`);
        });
    }

    // --- Interactive Eyedropper & Loupe on Image Canvas ---
    if (elements.canvasViewport && elements.previewImage) {
        elements.canvasViewport.addEventListener('mousemove', (e) => {
            handleEyedropperMove(e);
        });

        elements.canvasViewport.addEventListener('mouseleave', () => {
            if (elements.eyedropperLoupe) elements.eyedropperLoupe.style.display = 'none';
        });

        elements.canvasViewport.addEventListener('click', (e) => {
            const rgb = sampleColorAtCursor(e);
            if (rgb) {
                playTap();
                setActiveColor(rgb.r, rgb.g, rgb.b);
                showToast(`Eyedropper sampled: RGB(${rgb.r}, ${rgb.g}, ${rgb.b})`);
            }
        });
    }

    function sampleColorAtCursor(e) {
        const rect = elements.previewImage.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;

        if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
            return null;
        }

        const normX = (clientX - rect.left) / rect.width;
        const normY = (clientY - rect.top) / rect.height;

        return window.ImageExtractor.getColorAt(normX, normY);
    }

    function handleEyedropperMove(e) {
        if (!elements.eyedropperLoupe || !elements.loupeSwatch) return;

        const rgb = sampleColorAtCursor(e);
        if (!rgb) {
            elements.eyedropperLoupe.style.display = 'none';
            return;
        }

        const viewportRect = elements.canvasViewport.getBoundingClientRect();
        const x = e.clientX - viewportRect.left;
        const y = e.clientY - viewportRect.top;

        elements.eyedropperLoupe.style.display = 'block';
        elements.eyedropperLoupe.style.left = `${x}px`;
        elements.eyedropperLoupe.style.top = `${y}px`;
        elements.loupeSwatch.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }

    // Value Study Filter Toggle
    if (elements.btnToggleValueStudy) {
        elements.btnToggleValueStudy.addEventListener('click', () => {
            AppState.isValueStudyActive = !AppState.isValueStudyActive;
            if (elements.canvasViewport) {
                elements.canvasViewport.classList.toggle('value-study', AppState.isValueStudyActive);
            }
            elements.btnToggleValueStudy.classList.toggle('active', AppState.isValueStudyActive);
            playTap();
            showToast(AppState.isValueStudyActive ? 'Value study active (Grayscale Chiaroscuro)' : 'Standard color mode');
        });
    }

    // --- Render Extracted Swatches ---
    function renderExtractedPalettes(dominant, tonal) {
        AppState.extractedColors = { dominant, tonal };

        if (elements.dominantPaletteGrid) {
            elements.dominantPaletteGrid.innerHTML = '';
            dominant.forEach((c, idx) => {
                const card = document.createElement('div');
                card.className = `color-swatch-card ${idx === 0 ? 'active' : ''}`;
                card.innerHTML = `
                    <div class="swatch-fill" style="background-color: ${c.hex};"></div>
                    <div class="swatch-info">
                        <div class="swatch-hex">${c.hex} <span>#${idx + 1}</span></div>
                        <div class="swatch-lum">L: ${c.hsl.l}% • S: ${c.hsl.s}%</div>
                    </div>
                `;
                card.addEventListener('click', () => {
                    document.querySelectorAll('.color-swatch-card').forEach(s => s.classList.remove('active'));
                    card.classList.add('active');
                    playTap();
                    setActiveColor(c.r, c.g, c.b);
                });
                elements.dominantPaletteGrid.appendChild(card);
            });
        }
    }

    // --- Set Active Color & Compute Recipes ---
    function setActiveColor(r, g, b) {
        const hex = ColorMath.rgbToHex(r, g, b);
        const hsl = ColorMath.rgbToHsl(r, g, b);
        const cmyk = ColorMath.rgbToCmyk(r, g, b);
        const valueScale = ColorMath.rgbToValueScale(r, g, b);

        AppState.activeColor = { r, g, b, hex, hsl, cmyk, valueScale };

        // Update color previews
        if (elements.activeColorBlob) elements.activeColorBlob.style.backgroundColor = hex;
        if (elements.activeHexDisplay) elements.activeHexDisplay.textContent = hex;
        if (elements.activeHslDisplay) elements.activeHslDisplay.textContent = `HSL(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)`;
        if (elements.activeCmykDisplay) elements.activeCmykDisplay.textContent = `CMYK(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
        if (elements.activeValueDisplay) elements.activeValueDisplay.textContent = `Value: Zone ${valueScale.num} (${valueScale.zone})`;

        // 1. Generate Universal Subtractive Mixing Formula
        const universalRecipe = RecipeEngine.createUniversalRecipe(r, g, b);
        AppState.activeRecipe = universalRecipe;
        renderUniversalRecipe(universalRecipe);

        // 2. Compute Mont Marte Combo / Match
        const mmResult = RecipeEngine.solveMontMarteCombo(r, g, b, getActiveKitCodes());
        AppState.activeMmMatch = mmResult;
        renderActiveMmMatch(mmResult);

        // 3. Compute Sketch Pencil Recommendation
        const pencilRec = SketchDB.recommendPencilForLuminance(valueScale.lum);
        AppState.activePencilRec = pencilRec;
        renderPencilRecommendation(valueScale, pencilRec);
    }

    function renderUniversalRecipe(recipe) {
        // Ingredients List
        if (elements.recipeIngredientsList) {
            elements.recipeIngredientsList.innerHTML = '';
            recipe.ingredients.forEach(item => {
                const row = document.createElement('div');
                row.className = 'ingredient-item';
                row.innerHTML = `
                    <div class="ingredient-left">
                        <div class="ingredient-dot" style="background-color: ${item.hex};"></div>
                        <div>
                            <div class="ingredient-name">${item.name}</div>
                            <div class="ingredient-code">${item.code} • ${item.role}</div>
                        </div>
                    </div>
                    <div class="ingredient-parts">
                        ${item.parts} part${item.parts > 1 ? 's' : ''} (${item.ratio}%)
                    </div>
                `;
                elements.recipeIngredientsList.appendChild(row);
            });
        }

        // Proportional Bar
        if (elements.mixingRatioBar) {
            elements.mixingRatioBar.innerHTML = '';
            recipe.ingredients.forEach(item => {
                const slice = document.createElement('div');
                slice.className = 'ratio-slice';
                slice.style.width = `${item.ratio}%`;
                slice.style.backgroundColor = item.hex;
                slice.title = `${item.name}: ${item.parts} parts (${item.ratio}%)`;
                elements.mixingRatioBar.appendChild(slice);
            });
        }

        // Steps List
        if (elements.mixingStepsList) {
            elements.mixingStepsList.innerHTML = '';
            recipe.steps.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                elements.mixingStepsList.appendChild(li);
            });
        }
    }

    function renderActiveMmMatch(result) {
        if (!elements.activeMmMatchCard) return;

        if (result.type === 'exact_or_close') {
            const shade = result.shade;
            elements.activeMmMatchCard.innerHTML = `
                <div class="section-title" style="margin-bottom: 0.8rem;">
                    <h2>Mont Marte Acrylic Match</h2>
                    <span class="badge" style="background: rgba(40,167,69,0.2); color: #28a745;">${result.accuracy}% MATCH</span>
                </div>
                <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
                    <div style="width: 50px; height: 50px; border-radius: 8px; background-color: ${shade.hex}; border: 1.5px solid var(--border-main); flex-shrink: 0;"></div>
                    <div>
                        <div style="font-weight: 800; font-size: 1.1rem; color: var(--text-primary);">MM-${shade.code} ${shade.name}</div>
                        <div style="font-size: 0.78rem; color: var(--text-secondary);">Pigment: ${shade.pigment} • Opacity: ${shade.opacity}</div>
                    </div>
                </div>
                <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.4;">
                    ${result.technique}
                </div>
            `;
        } else {
            // Multi-paint combo
            elements.activeMmMatchCard.innerHTML = `
                <div class="section-title" style="margin-bottom: 0.8rem;">
                    <h2>Mont Marte Studio Blend</h2>
                    <span class="badge">COMBO MIX</span>
                </div>
                <div style="display: flex; gap: 0.6rem; align-items: center; margin-bottom: 0.8rem;">
                    <div style="width: 44px; height: 44px; border-radius: 8px; background-color: ${result.primary.hex}; border: 1.5px solid var(--border-main);" title="MM-${result.primary.code}"></div>
                    <span style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary);">+</span>
                    <div style="width: 44px; height: 44px; border-radius: 8px; background-color: ${result.secondary.hex}; border: 1.5px solid var(--border-main);" title="MM-${result.secondary.code}"></div>
                    ${result.tertiary ? `
                        <span style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary);">+</span>
                        <div style="width: 44px; height: 44px; border-radius: 8px; background-color: ${result.tertiary.hex}; border: 1.5px solid var(--border-main);" title="MM-${result.tertiary.code}"></div>
                    ` : ''}
                </div>
                <div style="font-size: 0.88rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem;">
                    ${result.ratio}
                </div>
                <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.4;">
                    ${result.technique}
                </div>
            `;
        }
    }

    function renderPencilRecommendation(valueScale, pencilRec) {
        if (!elements.activePencilRecCard) return;

        elements.activePencilRecCard.innerHTML = `
            <div class="section-title" style="margin-bottom: 0.8rem;">
                <h2>Sketch & Graphite Advisor</h2>
                <span class="badge">${valueScale.zone}</span>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.8rem;">
                <div style="width: 50px; height: 50px; border-radius: 8px; background: #1c1c1e; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem; color: #ffffff; border: 1.5px solid var(--border-main);">
                    ${pencilRec.grade}
                </div>
                <div>
                    <div style="font-weight: 800; font-size: 1.05rem; color: var(--text-primary);">${pencilRec.leadType || 'Graphite'} Lead</div>
                    <div style="font-size: 0.78rem; color: var(--text-secondary);">${pencilRec.hardness || 'Standard'} • Darkness: ${pencilRec.darknessValue || (100 - valueScale.lum)}%</div>
                </div>
            </div>
            <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 0.5rem;">
                ${pencilRec.reason}
            </p>
            <div style="font-size: 0.76rem; color: var(--accent); font-weight: 600;">
                Technique: ${pencilRec.recommendedTechnique || 'Gradual layered cross-hatching'}
            </div>
        `;
    }

    function getActiveKitCodes() {
        if (AppState.activeKitPreset === 'all') return null; // all
        return AppState.myKitCodes;
    }

    // --- Mont Marte Dedicated Studio Handlers ---
    function renderMontMarteCatalog() {
        if (!elements.mmGrid) return;

        const query = elements.mmSearchInput ? elements.mmSearchInput.value.toLowerCase().trim() : '';
        const kit = AppState.activeKitPreset;

        let list = MontMarteDB.catalog;

        // Filter by Kit
        if (kit !== 'all') {
            const kitCodes = MontMarteDB.kitPresets[kit] || [];
            list = list.filter(item => kitCodes.includes(item.code));
        }

        // Filter by Search
        if (query) {
            list = list.filter(item => 
                item.name.toLowerCase().includes(query) ||
                item.code.toLowerCase().includes(query) ||
                item.pigment.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query)
            );
        }

        elements.mmGrid.innerHTML = '';
        list.forEach(tube => {
            const card = document.createElement('div');
            card.className = 'mm-tube-card';
            card.innerHTML = `
                <div class="mm-swatch-header" style="background-color: ${tube.hex};">
                    <span class="mm-shade-badge">MM-${tube.code}</span>
                </div>
                <div class="mm-tube-body">
                    <div class="mm-tube-name">${tube.name}</div>
                    <div class="mm-tube-details-list">
                        <div class="mm-detail-row"><span>Shade code</span><span>${tube.number || `MM-${tube.code}`}</span></div>
                        <div class="mm-detail-row"><span>HEX</span><span>${tube.hex}</span></div>
                        <div class="mm-detail-row"><span>RGB</span><span>${Array.isArray(tube.rgb) ? tube.rgb.join(', ') : 'Not listed'}</span></div>
                        <div class="mm-detail-row"><span>Pigment</span><span>${tube.pigment || 'Not listed'}</span></div>
                        <div class="mm-detail-row"><span>Lightfastness</span><span>${tube.lightfastness || 'Not listed'}</span></div>
                        <div class="mm-detail-row"><span>Series</span><span>${tube.series ?? 'Not listed'}</span></div>
                        <div class="mm-detail-row"><span>Temperature</span><span>${tube.warmth || 'Not listed'}</span></div>
                        <div class="mm-detail-row"><span>Best use</span><span>${tube.role || 'General colour mixing'}</span></div>
                    </div>
                    <div class="mm-tube-badges">
                        <span class="mm-badge">${tube.opacity}</span>
                        <span class="mm-badge">${tube.category || 'Acrylic'}</span>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => {
                const rgb = ColorMath.hexToRgb(tube.hex);
                setActiveColor(rgb.r, rgb.g, rgb.b);
                showToast(`Selected MM-${tube.code} ${tube.name}`);
                playTap();
            });
            elements.mmGrid.appendChild(card);
        });
    }

    if (elements.mmSearchInput) {
        elements.mmSearchInput.addEventListener('input', () => {
            renderMontMarteCatalog();
        });
    }

    if (elements.mmKitPills) {
        elements.mmKitPills.forEach(pill => {
            pill.addEventListener('click', () => {
                elements.mmKitPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                AppState.activeKitPreset = pill.dataset.kit;
                renderMontMarteCatalog();
                playTap();
            });
        });
    }

    // Custom Target Matcher in Mont Marte Tab
    function solveCustomMontMarteTarget(hex) {
        const rgb = ColorMath.hexToRgb(hex);
        const result = RecipeEngine.solveMontMarteCombo(rgb.r, rgb.g, rgb.b, getActiveKitCodes());

        if (!elements.mmComboResult) return;

        if (result.type === 'exact_or_close') {
            const shade = result.shade;
            elements.mmComboResult.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                    <strong>Closest Direct Stock Tube:</strong>
                    <span style="color: #28a745; font-weight: 800; font-family: var(--font-mono);">${result.accuracy}% Accuracy</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.6rem;">
                    <div style="width: 38px; height: 38px; border-radius: 6px; background-color: ${shade.hex}; border: 1px solid var(--border-color);"></div>
                    <div>
                        <div style="font-weight: 800;">MM-${shade.code} ${shade.name}</div>
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">${shade.pigment} • ${shade.opacity}</div>
                    </div>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${result.technique}</div>
            `;
        } else {
            elements.mmComboResult.innerHTML = `
                <div style="margin-bottom: 0.5rem; font-weight: 800; color: var(--accent);">
                    Multi-Tube Formula Required:
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.6rem;">
                    <div style="width: 32px; height: 32px; border-radius: 6px; background-color: ${result.primary.hex};" title="MM-${result.primary.code}"></div>
                    <span>+</span>
                    <div style="width: 32px; height: 32px; border-radius: 6px; background-color: ${result.secondary.hex};" title="MM-${result.secondary.code}"></div>
                    ${result.tertiary ? `
                        <span>+</span>
                        <div style="width: 32px; height: 32px; border-radius: 6px; background-color: ${result.tertiary.hex};" title="MM-${result.tertiary.code}"></div>
                    ` : ''}
                </div>
                <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.35rem;">
                    Mixing Ratio: ${result.ratio}
                </div>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">
                    ${result.technique}
                </div>
            `;
        }
    }

    if (elements.mmCustomPicker && elements.mmCustomHexInput) {
        elements.mmCustomPicker.addEventListener('input', (e) => {
            elements.mmCustomHexInput.value = e.target.value.toUpperCase();
            solveCustomMontMarteTarget(e.target.value);
        });

        elements.mmCustomHexInput.addEventListener('change', (e) => {
            const hex = e.target.value;
            if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
                elements.mmCustomPicker.value = hex;
                solveCustomMontMarteTarget(hex);
            }
        });
    }

    function renderSketchPencils() {
        if (!elements.sketchScaleGrid) return;
        elements.sketchScaleGrid.innerHTML = '';

        SketchDB.pencilScale.forEach(pencil => {
            const darknessPct = pencil.darknessValue || Math.round((pencil.darknessIndex / 14) * 100);
            const card = document.createElement('div');
            card.className = 'pencil-grade-card';
            card.innerHTML = `
                <div class="pencil-swatch-header" style="background-color: ${pencil.hex || '#7D7D7D'};">
                    <span class="pencil-grade-badge">${pencil.grade}</span>
                    <span class="pencil-zone-badge">${pencil.valueZone.split(' - ')[0]}</span>
                </div>
                <div class="pencil-card-body">
                    <div class="pencil-title-row">
                        <span class="pencil-name">${pencil.name}</span>
                        <span class="pencil-darkness-pct">${darknessPct}% Dark</span>
                    </div>
                    <div class="pencil-category-tag">${pencil.category || 'Graphite Lead'}</div>
                    <div class="pencil-darkness-bar-wrap">
                        <div class="pencil-darkness-bar" style="width: ${darknessPct}%;"></div>
                    </div>
                    <div class="pencil-specs-grid">
                        <div class="pencil-spec-item">
                            <span class="spec-label">Clay/Graphite:</span>
                            <span class="spec-value">${pencil.composition || '50% Graphite, 50% Clay'}</span>
                        </div>
                        <div class="pencil-spec-item">
                            <span class="spec-label">Finish:</span>
                            <span class="spec-value">${pencil.sheen || 'Moderate'}</span>
                        </div>
                        <div class="pencil-spec-item">
                            <span class="spec-label">Zone Scale:</span>
                            <span class="spec-value">${pencil.valueZone || 'Standard'}</span>
                        </div>
                    </div>
                    <div class="pencil-best-uses">
                        <strong>Best Uses:</strong> ${pencil.bestUses || pencil.primaryUsage}
                    </div>
                </div>
            `;
            elements.sketchScaleGrid.appendChild(card);
        });
    }

    if (elements.sketchSlider) {
        elements.sketchSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            if (elements.sketchSliderVal) elements.sketchSliderVal.textContent = `${val}%`;
            const rec = SketchDB.recommendPencilForLuminance(val);
            if (elements.sketchSliderRec) {
                elements.sketchSliderRec.innerHTML = `
                    <div style="font-size: 1.1rem; font-weight: 800; color: var(--accent); margin-bottom: 0.2rem;">
                        Recommended Pencil: ${rec.grade}
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">
                        ${rec.reason}
                    </div>
                `;
            }
        });
    }

    // --- Brands Encyclopedia Setup ---
    function renderBrands() {
        if (!elements.brandsContainer) return;
        elements.brandsContainer.innerHTML = '';

        BrandsDB.forEach(brand => {
            const card = document.createElement('div');
            card.className = 'brand-encyclo-card';
            card.innerHTML = `
                <div class="brand-card-top">
                    <span class="brand-badge-pill">${brand.badge}</span>
                    <h3>${brand.name}</h3>
                    <div class="brand-country">Origin: ${brand.country}</div>
                    <p class="brand-desc">${brand.description}</p>
                </div>
                <div class="brand-mediums-accordion">
                    ${brand.mediums.map(m => `
                        <div class="medium-pill-item">
                            <div class="medium-pill-title">${m.type}</div>
                            <div class="medium-pill-surfaces">Best on: <strong>${m.bestSurfaces}</strong></div>
                            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 3px;">${m.features}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            elements.brandsContainer.appendChild(card);
        });
    }

    // --- Surfaces Guide Setup ---
    function renderSurfaces() {
        if (!elements.surfacesContainer) return;
        elements.surfacesContainer.innerHTML = '';

        SurfacesDB.forEach(surf => {
            const card = document.createElement('div');
            card.className = 'surface-guide-card';
            card.innerHTML = `
                <div class="surface-card-header">
                    <div>
                        <h3 style="font-size: 1.25rem;">${surf.name}</h3>
                        <span style="font-size: 0.75rem; color: var(--accent); font-weight: 600;">${surf.category}</span>
                    </div>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">${surf.description}</p>
                
                <div style="display: flex; flex-direction: column; gap: 0.45rem;">
                    <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">
                        Medium Compatibility
                    </span>
                    ${surf.compatibleMediums.slice(0, 3).map(m => `
                        <div style="display: flex; justify-content: space-between; font-size: 0.78rem; background: var(--bg-surface); padding: 5px 10px; border-radius: 6px;">
                            <span>${m.medium}</span>
                            <span class="mono" style="color: #52b788; font-weight: 700;">${m.compatibility}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="surface-prep-box">
                    <strong style="display: block; margin-bottom: 3px; color: var(--text-primary);">Surface Preparation:</strong>
                    ${surf.surfacePrep.slice(0, 2).join('<br>')}
                </div>

                <div style="font-size: 0.75rem; color: var(--text-muted); font-style: italic;">
                    Varnishing: ${surf.varnishingTips}
                </div>
            `;
            elements.surfacesContainer.appendChild(card);
        });
    }

    // --- Interactive Pigment Mixing Lab (Subtractive Paint Mixer) ---
    function setupPigmentLab() {
        const labWell1 = document.getElementById('lab-paint-1-picker');
        const labWell2 = document.getElementById('lab-paint-2-picker');
        const labWell3 = document.getElementById('lab-paint-3-picker');
        const slider1 = document.getElementById('lab-part-1-slider');
        const slider2 = document.getElementById('lab-part-2-slider');
        const slider3 = document.getElementById('lab-part-3-slider');
        const labResultSwatch = document.getElementById('lab-result-swatch');
        const labResultHex = document.getElementById('lab-result-hex');
        const labNearestMm = document.getElementById('lab-nearest-mm');

        function updateLabMix() {
            if (!labWell1 || !labWell2 || !labWell3) return;

            const rgb1 = ColorMath.hexToRgb(labWell1.value);
            const rgb2 = ColorMath.hexToRgb(labWell2.value);
            const rgb3 = ColorMath.hexToRgb(labWell3.value);

            const p1 = parseInt(slider1.value);
            const p2 = parseInt(slider2.value);
            const p3 = parseInt(slider3.value);

            const mixed = ColorMath.mixPaints([
                { r: rgb1.r, g: rgb1.g, b: rgb1.b, parts: p1 },
                { r: rgb2.r, g: rgb2.g, b: rgb2.b, parts: p2 },
                { r: rgb3.r, g: rgb3.g, b: rgb3.b, parts: p3 }
            ]);

            const hex = ColorMath.rgbToHex(mixed.r, mixed.g, mixed.b);
            if (labResultSwatch) labResultSwatch.style.backgroundColor = hex;
            if (labResultHex) labResultHex.textContent = hex;

            const nearest = MontMarteDB.findNearestShade(mixed.r, mixed.g, mixed.b);
            if (labNearestMm) {
                labNearestMm.textContent = `Nearest Mont Marte: MM-${nearest.color.code} (${nearest.color.name}) - ${nearest.accuracy}% Match`;
            }
        }

        [labWell1, labWell2, labWell3, slider1, slider2, slider3].forEach(el => {
            if (el) el.addEventListener('input', () => {
                updateLabMix();
            });
        });

        updateLabMix();
    }


    // --- Live clock: weekday | day month, year | 12-hour time ---
    (function initPigmentIQClock() {
        const dateNode = document.getElementById('clock-daydate');
        const timeNode = document.getElementById('clock-time');
        if (!dateNode || !timeNode) return;
        const dateFormatter = new Intl.DateTimeFormat('en-GB', {
            weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
        });
        const timeFormatter = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        });
        const updateClock = () => {
            const now = new Date();
            const parts = dateFormatter.formatToParts(now);
            const get = type => parts.find(part => part.type === type)?.value || '';
            dateNode.textContent = `${get('weekday')} | ${get('day')} ${get('month')}, ${get('year')}`;
            timeNode.textContent = timeFormatter.format(now).replace(/\s/g, ' ');
            timeNode.dateTime = now.toISOString();
        };
        updateClock();
        window.setInterval(updateClock, 1000);
    })();

    // --- Lightweight scroll reveals; settings and generic cards are excluded for responsiveness ---
    (function initScrollReveal() {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const selector = [
            '.section-header', '.hero-banner', '.about-creator-card', '.surface-card',
            '.mm-tube-card', '.pencil-card', '.brand-encyclo-card', '.combo-solver-card',
            '.section-description', '.medium-card', '.guide-card', '.feature-card'
        ].join(',');
        const targets = document.querySelectorAll(selector);
        if (reduceMotion || !('IntersectionObserver' in window)) {
            targets.forEach(target => target.classList.add('is-visible'));
            return;
        }
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
            else entry.target.classList.remove('is-visible');
        }), { threshold: 0.04, rootMargin: '0px 0px -28px 0px' });
        targets.forEach((target, index) => {
            target.classList.add('scroll-reveal');
            target.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 25}ms`);
            observer.observe(target);
        });
    })();

    // --- Initial Boot Sequence ---
    loadSavedTheme();
    loadSavedWallpaper();
    // Load saved Poppins typography variant & size
    loadSavedPoppinsVariant();
    const savedSize = localStorage.getItem('pigmentiq_font_size');
    if (savedSize) {
        applyFontSize(parseInt(savedSize), false);
    }
    renderExtractedPalettes([], { highlights: [], midtones: [], shadows: [] });
    setActiveColor(214, 37, 104); // Initial default (Magenta)
    renderMontMarteCatalog();
    renderSketchPencils();
    renderBrands();
    renderSurfaces();
    setupPigmentLab();

    // Load initial study preset
    loadSampleArtPreset('sunset');
    if (elements.sketchSlider) elements.sketchSlider.dispatchEvent(new Event('input'));
    if (elements.mmCustomPicker) solveCustomMontMarteTarget(elements.mmCustomPicker.value);
});
