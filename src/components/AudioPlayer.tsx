"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);
  // iOS Safari blocks ALL audio until a direct user tap — no exceptions.
  // We show a floating "Tap to enable sound" pill until the first interaction.
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // On non-iOS browsers, try autoplay immediately
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;

    audio.play()
      .then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
      })
      .catch(() => {
        // Blocked (iOS or strict browser policy) — the prompt will handle it
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Called from the floating prompt OR the play button — always a real user tap
  const startAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.play()
      .then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
      })
      .catch(console.error);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (showPrompt) { startAudio(); return; }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const toggleMute = () => {
    const v = volume === 0 ? 0.5 : 0;
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/yulius2tudio-dreamy-japanese-lofi-anime-438118.mp3"
        loop
        preload="metadata"
      />

      {/* ── Floating "Tap to enable sound" prompt (iOS + Chrome on first visit) ── */}
      {showPrompt && (
        <button
          onClick={startAudio}
          className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-sm font-medium shadow-xl animate-pulse"
          aria-label="Enable background music"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <Music size={15} />
          Tap to enable music
        </button>
      )}

      {/* ── Player widget (top-right) ── */}
      <div
        className="fixed top-6 right-4 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Play / Pause button */}
        <button
          onClick={togglePlay}
          className="text-white flex items-center justify-center p-2 rounded-full bg-white/10 active:bg-white/30 transition-colors"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {isPlaying
            ? <Pause size={16} fill="currentColor" />
            : <Play  size={16} fill="currentColor" className="ml-0.5" />}
        </button>

        {/* Volume controls — desktop hover only (hidden on touch) */}
        <div
          className={`hidden sm:flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
            isHovered ? "w-28 opacity-100 ml-1" : "w-0 opacity-0 ml-0 pointer-events-none"
          }`}
        >
          <button
            onClick={toggleMute}
            className="text-white/70 hover:text-white transition-colors mr-2 shrink-0"
          >
            {volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <input
            type="range"
            min="0" max="1" step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`,
            }}
          />
        </div>

        {/* Animated music note when playing */}
        <div
          className={`flex items-center justify-center transition-all duration-300 ease-in-out ${
            isPlaying && !isHovered ? "w-5 opacity-100 ml-1" : "w-0 opacity-0 ml-0 pointer-events-none"
          }`}
        >
          <Music size={14} className="text-white/60 animate-pulse" />
        </div>
      </div>
    </>
  );
}
