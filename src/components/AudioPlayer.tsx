"use client";

import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true); // starts muted for autoplay compliance

  // Set volume to 20% once the element is available
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <>
      {/* Audio element: muted autoplay is universally permitted by browsers */}
      <audio
        ref={audioRef}
        src="/yulius2tudio-dreamy-japanese-lofi-anime-438118.mp3"
        autoPlay
        loop
        muted
        preload="auto"
      />

      {/* Fixed mute/unmute toggle button */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/80 text-sm font-medium shadow-xl hover:bg-black/70 hover:text-white transition-all duration-300"
      >
        {isMuted ? (
          <>
            <VolumeX size={16} />
            <span>Unmute</span>
          </>
        ) : (
          <>
            <Volume2 size={16} />
            <span>Mute</span>
          </>
        )}
      </button>
    </>
  );
}
