/**
 * PigmentIQ / ChromaAtelier - Audio Engine
 * Procedural Web Audio API sound generator for tactile artisan feedback
 * Zero external audio files required, instant latency, full volume & type control
 */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.volume = 0.4; // 0.0 to 1.0
        this.soundType = 'wood'; // 'wood', 'click', 'water', 'brush', 'pop', 'mute'
        
        // Load preferences if saved
        this.loadSettings();
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    loadSettings() {
        try {
            const savedVol = localStorage.getItem('pigmentiq_vol');
            const savedType = localStorage.getItem('pigmentiq_sound_type');
            const savedEnabled = localStorage.getItem('pigmentiq_sound_enabled');
            if (savedVol !== null) this.volume = parseFloat(savedVol);
            if (savedType !== null) this.soundType = savedType;
            if (savedEnabled !== null) this.enabled = savedEnabled === 'true';
        } catch (e) {
            console.warn('Storage not available', e);
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('pigmentiq_vol', this.volume.toString());
            localStorage.setItem('pigmentiq_sound_type', this.soundType);
            localStorage.setItem('pigmentiq_sound_enabled', this.enabled.toString());
        } catch (e) {
            console.warn('Cannot save audio settings', e);
        }
    }

    setSoundType(type) {
        this.soundType = type;
        this.saveSettings();
        if (type !== 'mute') {
            this.playTap();
        }
    }

    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        this.saveSettings();
    }

    toggleSound(enable = null) {
        this.enabled = enable !== null ? enable : !this.enabled;
        this.saveSettings();
        return this.enabled;
    }

    playTap() {
        if (!this.enabled || this.soundType === 'mute' || this.volume <= 0.01) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const masterGain = this.ctx.createGain();
        masterGain.gain.setValueAtTime(this.volume, now);
        masterGain.connect(this.ctx.destination);

        switch (this.soundType) {
            case 'wood':
                this._playWoodTap(now, masterGain);
                break;
            case 'click':
                this._playMechanicalClick(now, masterGain);
                break;
            case 'water':
                this._playWaterDrop(now, masterGain);
                break;
            case 'brush':
                this._playBrushSwish(now, masterGain);
                break;
            case 'pop':
                this._playSoftPop(now, masterGain);
                break;
            default:
                this._playWoodTap(now, masterGain);
                break;
        }
    }

    // Warm artisan wooden easel tap
    _playWoodTap(t, dest) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(45, t + 0.06);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, t);
        filter.frequency.exponentialRampToValueAtTime(150, t + 0.05);

        gain.gain.setValueAtTime(0.7, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(t);
        osc.stop(t + 0.08);

        // Subtle woody click impulse
        const bufferSize = this.ctx.sampleRate * 0.015;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const nGain = this.ctx.createGain();
        nGain.gain.setValueAtTime(0.25, t);
        nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.015);
        noise.connect(nGain);
        nGain.connect(dest);
        noise.start(t);
    }

    // Tactile mechanical switch click
    _playMechanicalClick(t, dest) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(1800, t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.018);

        gain.gain.setValueAtTime(0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(t);
        osc.stop(t + 0.025);
    }

    // Aqua / Water drop droplet sound for watercolorists
    _playWaterDrop(t, dest) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, t);
        osc.frequency.exponentialRampToValueAtTime(1200, t + 0.08);

        gain.gain.setValueAtTime(0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(t);
        osc.stop(t + 0.13);
    }

    // Soft brush stroke across textured paper
    _playBrushSwish(t, dest) {
        const dur = 0.08;
        const bufferSize = this.ctx.sampleRate * dur;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.5;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1600, t);
        filter.frequency.exponentialRampToValueAtTime(2600, t + dur);
        filter.Q.value = 3.0;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(0.35, t + dur * 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        noise.start(t);
        noise.stop(t + dur);
    }

    // Gentle modern UI bubble pop
    _playSoftPop(t, dest) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(350, t + 0.05);

        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(t);
        osc.stop(t + 0.055);
    }
}

// Global instance
window.soundEngine = new SoundEngine();

