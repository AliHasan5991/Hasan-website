"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(true); // show prompt until first click
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Try autoplay immediately; if blocked, keep the "enable sound" prompt visible
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onCanPlay = () => {
      audio.volume = volume;
      audio.muted = false;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    };

    // If already ready, play immediately
    if (audio.readyState >= 3) {
      onCanPlay();
    } else {
      audio.addEventListener("canplaythrough", onCanPlay, { once: true });
    }

    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(0.2);
      if (audioRef.current) audioRef.current.volume = 0.2;
    } else {
      setVolume(0);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  return (
    <div 
      className="fixed top-6 right-6 z-50 flex items-center gap-3 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-300 hover:bg-black/70"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio 
        ref={audioRef} 
        src="/yulius2tudio-dreamy-japanese-lofi-anime-438118.mp3" 
        loop
        preload="auto"
      />
      
      <button
        onClick={togglePlay}
        className="text-white flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
      </button>

      {/* Volume slider (meter) */}
      <div 
        className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
          isHovered ? 'w-24 opacity-100 ml-1' : 'w-0 opacity-0 ml-0 pointer-events-none'
        }`}
      >
        <button
          onClick={toggleMute}
          className="text-white/70 hover:text-white transition-colors mr-2 shrink-0"
        >
          {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 accent-white"
          style={{
            background: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`
          }}
        />
      </div>

      {/* Playing indicator when not hovered */}
      <div 
        className={`flex items-center justify-center transition-all duration-300 ease-in-out ${
          isPlaying && !isHovered ? 'w-6 opacity-100 ml-1' : 'w-0 opacity-0 ml-0 pointer-events-none'
        }`}
      >
         <Music size={16} className="text-white/60 animate-pulse" />
      </div>
    </div>
  );
}
