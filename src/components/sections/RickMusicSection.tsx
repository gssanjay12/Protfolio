import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Disc3, Radio, Sparkles, AlertCircle } from 'lucide-react';

export const RickMusicSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [isSynthFallback, setIsSynthFallback] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);

  // Format seconds to mm:ss
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Safe Web Audio procedural synth loop for demo if MP3 is missing
  const stopSynth = useCallback(() => {
    if (synthTimerRef.current) {
      window.clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (synthCtxRef.current && synthCtxRef.current.state !== 'closed') {
      try {
        synthCtxRef.current.close();
      } catch {
        // Context might already be closed
      }
      synthCtxRef.current = null;
    }
  }, []);

  const startSynth = useCallback(() => {
    stopSynth();
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      synthCtxRef.current = ctx;

      // Rick & Morty inspired dark-synth arpeggio chords (C minor / Sci-Fi scale)
      const notes = [130.81, 155.56, 174.61, 196.0, 233.08, 261.63, 311.13, 349.23]; // C3, Eb3, F3, G3, Bb3, C4, Eb4, F4
      let step = 0;

      // Set fallback duration
      setDuration(120);

      synthTimerRef.current = window.setInterval(() => {
        if (!ctx || ctx.state === 'closed') return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Alternating waveforms for retro sci-fi synth flavor
        osc.type = step % 4 === 0 ? 'sawtooth' : 'sine';
        const note = notes[step % notes.length];
        osc.frequency.setValueAtTime(note, now);

        const currentVol = isMuted ? 0 : volume * 0.15;
        gain.gain.setValueAtTime(currentVol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.38);

        step = (step + 1) % 16;
        setCurrentTime((prev) => (prev >= 120 ? 0 : prev + 0.25));
      }, 250);
    } catch {
      console.warn('Web Audio synthesis unavailable');
    }
  }, [isMuted, volume, stopSynth]);

  // Handle Play/Pause toggle
  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      if (isSynthFallback) stopSynth();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsSynthFallback(false);
        setAudioError(false);
      } catch (err: unknown) {
        console.info('Local audio not found or blocked, activating interdimensional synth simulation:', err);
        setAudioError(true);
        setIsSynthFallback(true);
        setIsPlaying(true);
        startSynth();
      }
    }
  };

  // Audio element listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!isSynthFallback) {
        setCurrentTime(audio.currentTime);
      }
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setAudioError(false);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onError = () => {
      setAudioError(true);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [isSynthFallback]);

  // Volume synchronization
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
      }
      stopSynth();
    };
  }, [stopSynth]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current && !isSynthFallback) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section
      id="dimension-c137"
      aria-label="Interdimensional Easter Egg"
      className="relative w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-16 overflow-hidden border-y border-white/5 bg-[#060608]"
    >
      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        src="/audio/damage-code.mp3"
        preload="metadata"
      />

      {/* Subtle Interdimensional Grid Background Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,229,255,0.04),transparent_40%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Section Top Tag */}
        <div className="flex items-center justify-between mb-8">
          <div className="font-mono text-xs text-[#71717A] tracking-widest uppercase flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${isPlaying ? 'bg-[#CCFF00] shadow-[0_0_8px_#CCFF00]' : 'bg-[#52525B]'}`} />
            <span>INTERDIMENSIONAL INTERMISSION // C-137</span>
          </div>

          <div className="font-mono text-[11px] text-[#A1A1AA] flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Sparkles size={12} className={isPlaying ? 'text-[#CCFF00] animate-spin' : 'text-[#71717A]'} />
            <span className="hidden sm:inline">EASTER EGG PROTOCOL</span>
            <span className="sm:hidden">EASTER EGG</span>
          </div>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Rick Sanchez Visual with Portal and Energy Field */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              
              {/* Rotating Portal Energy Glow Ring */}
              <motion.div
                animate={{
                  rotate: isPlaying ? 360 : 0,
                  scale: isPlaying ? [1, 1.05, 1] : 1,
                  opacity: isPlaying ? [0.6, 0.85, 0.6] : 0.25,
                }}
                transition={{
                  rotate: { duration: 16, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(204,255,0,0.4)_0%,rgba(0,229,255,0.25)_45%,transparent_70%)] blur-2xl pointer-events-none"
              />

              {/* Portal Swirl Border */}
              <motion.div
                animate={{
                  rotate: isPlaying ? -360 : 0,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className={`absolute inset-4 rounded-full border border-dashed transition-all duration-700 pointer-events-none ${
                  isPlaying ? 'border-[#CCFF00]/50 shadow-[0_0_20px_rgba(204,255,0,0.3)]' : 'border-white/10'
                }`}
              />

              {/* Particle Sparks around Rick */}
              {isPlaying && (
                <>
                  <motion.div
                    animate={{ y: [-15, -45], opacity: [0, 1, 0], scale: [0.5, 1.2] }}
                    transition={{ repeat: Infinity, duration: 1.6, delay: 0.2 }}
                    className="absolute -top-2 left-1/4 w-2 h-2 rounded-full bg-[#CCFF00] blur-[1px]"
                  />
                  <motion.div
                    animate={{ y: [-10, -50], opacity: [0, 1, 0], scale: [0.6, 1.4] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                    className="absolute top-1/4 -right-2 w-2.5 h-2.5 rounded-full bg-[#00E5FF] blur-[1px]"
                  />
                  <motion.div
                    animate={{ y: [10, -30], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: 0.9 }}
                    className="absolute bottom-1/4 -left-2 w-2 h-2 rounded-full bg-[#CCFF00]"
                  />
                </>
              )}

              {/* Rick Sanchez Character Visual */}
              <motion.div
                animate={{
                  y: isPlaying ? [0, -6, 0] : [0, -3, 0],
                  scale: isPlaying ? [1, 1.025, 1] : 1,
                }}
                transition={{
                  duration: isPlaying ? 0.6 : 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 w-full h-full flex items-center justify-center p-3"
              >
                <img
                  src="/images/rick.png"
                  alt="Rick Sanchez - Dimension C-137"
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
                  onError={(e) => {
                    // Fallback to stylized SVG placeholder if rick.png cannot be resolved
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.rick-fallback')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'rick-fallback w-48 h-48 rounded-full bg-white/5 border border-[#CCFF00]/40 flex flex-col items-center justify-center text-center p-4 font-mono text-xs';
                      fallback.innerHTML = '<span class="text-3xl mb-2">🧪</span><span class="text-[#CCFF00] font-bold">RICK SANCHEZ</span><span class="text-[10px] text-[#A1A1AA] mt-1">/images/rick.png</span>';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </motion.div>
            </div>

            {/* Portal Fluid Status Indicator */}
            <div className="mt-4 font-mono text-[10px] tracking-widest uppercase flex items-center gap-2 text-[#71717A]">
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-[#CCFF00] animate-pulse' : 'bg-white/20'}`} />
              <span>PORTAL FLUID: {isPlaying ? '100% DISCHARGED' : 'IDLE'}</span>
            </div>
          </div>

          {/* Right Column: Quotes & Master Audio Player */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Catchphrase & Subtext */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#CCFF00]/10 border border-[#CCFF00]/30 font-mono text-[11px] text-[#CCFF00] font-bold tracking-wider uppercase mb-3">
                <Radio size={12} className={isPlaying ? 'animate-pulse text-[#CCFF00]' : ''} />
                <span>INTERDIMENSIONAL BROADCAST</span>
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#F4F4F6] leading-[1.05]">
                &ldquo;WUBBA LUBBA<br />
                <span className="text-[#CCFF00] drop-shadow-[0_0_20px_rgba(204,255,0,0.35)]">DUB DUB.&rdquo;</span>
              </h3>

              <p className="mt-2 text-sm sm:text-base text-[#A1A1AA] font-sans">
                A little chaos between the serious stuff. Take a breath, turn up the transmission, and let the multiverse hum.
              </p>
            </div>

            {/* Audio Player Container */}
            <div className="p-6 rounded-2xl bg-[#0F0F14]/90 border border-white/10 shadow-2xl backdrop-blur-md space-y-5">
              
              {/* Player Top Meta Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#CCFF00]"
                  >
                    <Disc3 size={18} />
                  </motion.div>
                  <div>
                    <div className="font-display font-bold text-sm text-[#F4F4F6] tracking-wide">
                      Damage Code
                    </div>
                    <div className="text-[10px] text-[#71717A] tracking-wider uppercase">
                      Dimension C-137 Master Mix
                    </div>
                  </div>
                </div>

                {/* Animated Equalizer Waveform Indicator */}
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] tracking-wider uppercase font-semibold ${isPlaying ? 'text-[#CCFF00]' : 'text-[#71717A]'}`}>
                    {isPlaying ? 'NOW PLAYING' : 'STANDBY'}
                  </span>
                  <div className="flex items-end gap-[3px] h-4 w-5">
                    <span className={`w-1 bg-[#CCFF00] rounded-xs transition-all duration-200 ${isPlaying ? 'h-4 animate-[bounce_0.8s_infinite]' : 'h-1.5'}`} />
                    <span className={`w-1 bg-[#00E5FF] rounded-xs transition-all duration-200 ${isPlaying ? 'h-3 animate-[bounce_1.1s_infinite_0.2s]' : 'h-2'}`} />
                    <span className={`w-1 bg-[#CCFF00] rounded-xs transition-all duration-200 ${isPlaying ? 'h-5 animate-[bounce_0.9s_infinite_0.4s]' : 'h-1.5'}`} />
                  </div>
                </div>
              </div>

              {/* Progress Slider & Timestamps */}
              <div className="space-y-1.5">
                <div className="relative w-full flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    aria-label="Track progress"
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#CCFF00] focus:outline-none focus:ring-1 focus:ring-[#CCFF00]"
                  />
                </div>
                <div className="flex justify-between font-mono text-[10px] text-[#71717A]">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Main Controls & Volume Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                
                {/* Play / Pause Primary Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={togglePlay}
                  data-cursor="pointer"
                  aria-label={isPlaying ? 'Pause music' : 'Play Damage Code'}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl flex items-center justify-center gap-3 font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg ${
                    isPlaying
                      ? 'bg-[#CCFF00] text-black hover:bg-[#b8e600] shadow-[0_0_20px_rgba(204,255,0,0.35)]'
                      : 'bg-[#F4F4F6] text-black hover:bg-white'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause size={16} className="fill-black" />
                      <span>PAUSE TRANSMISSION</span>
                    </>
                  ) : (
                    <>
                      <Play size={16} className="fill-black ml-0.5" />
                      <span>PLAY &ldquo;DAMAGE CODE&rdquo;</span>
                    </>
                  )}
                </motion.button>

                {/* Volume Slider Controls */}
                <div className="flex items-center gap-3 w-full sm:w-auto bg-black/40 px-3.5 py-2.5 rounded-xl border border-white/5">
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="text-[#A1A1AA] hover:text-[#CCFF00] transition-colors"
                  >
                    {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume level"
                    className="w-24 sm:w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#CCFF00] focus:outline-none"
                  />
                  <span className="font-mono text-[10px] text-[#71717A] w-7 text-right">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                  </span>
                </div>
              </div>

              {/* Informational Asset Note when MP3 is pending */}
              <AnimatePresence>
                {audioError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2"
                  >
                    <div className="p-3 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/25 font-mono text-[11px] text-[#00E5FF] flex items-start gap-2.5">
                      <AlertCircle size={15} className="mt-0.5 shrink-0 text-[#00E5FF]" />
                      <div className="leading-relaxed">
                        <span className="font-bold">Interdimensional Synth Simulation Active:</span> Playing procedural synthesizer arpeggio. To use your original audio, simply place your audio file at <code className="px-1.5 py-0.5 rounded bg-black/50 text-[#CCFF00] font-semibold">public/audio/damage-code.mp3</code>.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RickMusicSection;
