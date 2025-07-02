"use client";

import { Slider } from "@/shadcn/ui/slider";
import {
  IconFastForward,
  IconPlay2,
  IconRewind,
  IconSkipBack,
  IconSkipForward,
  IconPause,
} from "../Icon/fill";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

interface AudioPlayerProps {
  src: string;
  thumbnail: string;
  title: string;
}

const AudioPlayer = ({ src, thumbnail, title }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioSupported, setAudioSupported] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Check if audio format is supported
  const checkAudioSupport = useCallback(() => {
    if (!src) {
      setAudioSupported(false);
      setError("No audio source provided");
      return false;
    }

    const audio = audioRef.current;
    if (!audio) return false;

    // Check if the audio can be played
    const canPlay =
      audio.canPlayType("audio/mpeg") ||
      audio.canPlayType("audio/mp3") ||
      audio.canPlayType("audio/wav") ||
      audio.canPlayType("audio/ogg") ||
      audio.canPlayType("audio/mp4");

    if (canPlay === "") {
      setAudioSupported(false);
      setError("Audio format not supported by this browser");
      return false;
    }

    return true;
  }, [src]);

  // Format time to MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time) || time === Infinity) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle time update
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  // Handle loaded metadata
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      const audioDuration = audioRef.current.duration;
      setDuration(audioDuration);
      setError(null);
      setAudioSupported(true);
    }
  }, []);

  // Handle play/pause
  const togglePlayPause = async () => {
    if (!audioRef.current) {
      setError("Audio element not available");
      return;
    }

    // Check audio support before playing
    if (!checkAudioSupport()) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const audio = audioRef.current;

        // Check if audio is ready to play
        // readyState values: 0=HAVE_NOTHING, 1=HAVE_METADATA, 2=HAVE_CURRENT_DATA, 3=HAVE_FUTURE_DATA, 4=HAVE_ENOUGH_DATA
        if (audio.readyState < 1) {
          // If audio hasn't loaded metadata yet, try to load it
          audio.load();
          setError("Loading audio metadata, please wait...");
          setIsLoading(false);
          return;
        }

        // If we have metadata but not enough data, wait a bit more
        if (audio.readyState < 2) {
          setError("Audio is still loading, please wait...");
          setIsLoading(false);

          // Wait a bit and try again
          setTimeout(() => {
            if (audio.readyState >= 2) {
              setError(null);
              togglePlayPause(); // Retry
            }
          }, 1000);
          return;
        }

        // Try to play the audio
        const playPromise = audio.play();

        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        } else {
          setIsPlaying(true);
        }
      }
    } catch (err: any) {
      // Handle specific error types
      if (err.name === "NotSupportedError") {
        setError("Audio format not supported or file is corrupted");
      } else if (err.name === "NotAllowedError") {
        setError("Audio playback was blocked by browser");
      } else if (err.name === "NetworkError") {
        setError("Network error while loading audio");
      } else {
        setError(`Failed to play audio: ${err.message || "Unknown error"}`);
      }

      setIsPlaying(false);
      setAudioSupported(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    if (audioRef.current && duration > 0) {
      const newTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle skip forward/backward
  const handleSkip = (seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(
        0,
        Math.min(audioRef.current.currentTime + seconds, duration)
      );
      audioRef.current.currentTime = newTime;
    }
  };

  // Handle fast forward/rewind
  const handleFastForward = (seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(
        0,
        Math.min(audioRef.current.currentTime + seconds, duration)
      );
      audioRef.current.currentTime = newTime;
    }
  };

  // Calculate slider value
  const sliderValue = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Handle audio end
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  // Handle audio error
  const handleError = useCallback((e: any) => {
    const audio = audioRef.current;

    setError("Failed to load audio file. Please check the audio source.");
    setIsPlaying(false);
    setIsLoading(false);
    setAudioSupported(false);
  }, []);

  // Handle audio loading
  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  // Handle audio can play
  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setAudioSupported(true);
  }, []);

  // Handle audio can play through
  const handleCanPlayThrough = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setAudioSupported(true);
  }, []);

  // Handle audio progress
  const handleProgress = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.buffered.length > 0) {
      const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
      const duration = audio.duration;
      const progress = (bufferedEnd / duration) * 100;
    }
  }, []);

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Add event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("progress", handleProgress);

    // Cleanup function
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("progress", handleProgress);
    };
  }, [
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    handleError,
    handleLoadStart,
    handleCanPlay,
    handleCanPlayThrough,
    handleProgress,
  ]);

  // Reset state when src changes
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setError(null);
    setIsLoading(false);
    setAudioSupported(true);

    // Check audio support when src changes
    setTimeout(() => {
      checkAudioSupport();
    }, 100);
  }, [src, checkAudioSupport]);



  return (
    <div className="w-full max-w-[660px] mx-auto bg-blue-600 rounded-3xl p-4 pb-7">
      <div className="w-full aspect-[628/471] bg-white rounded-[8px] overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          width={628}
          height={471}
          className="size-full object-cover"
        />
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
      />

      <div className="mt-6">
        {error && (
          <div className="text-red-300 text-sm text-center mb-4 bg-red-500/20 rounded-lg p-2">
            {error}
          </div>
        )}

        <div className="">
          <Slider
            value={[sliderValue]}
            max={100}
            step={0.1}
            onValueChange={handleSliderChange}
            className="cursor-pointer"
            disabled={isLoading || !!error || !audioSupported}
          />
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-white text-xsm">
              {formatTime(currentTime)}
            </span>
            <span className="text-white text-xsm">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="w-fit flex items-center justify-center mt-4 mx-auto text-white/80 gap-5">
          <div className="flex gap-2">
            <button
              className="size-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleSkip(-10)}
              disabled={isLoading || !!error || !audioSupported}
            >
              <IconSkipBack size={24} />
            </button>
            <button
              className="size-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleFastForward(-5)}
              disabled={isLoading || !!error || !audioSupported}
            >
              <IconRewind size={24} />
            </button>
          </div>
          <button
            className="size-[3.75rem] rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={togglePlayPause}
            disabled={isLoading || !!error || !audioSupported}
          >
            {isLoading ? (
              <div className="size-6 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <IconPause size={24} className="text-blue-800" />
            ) : (
              <IconPlay2 size={24} className="text-blue-800" />
            )}
          </button>
          <div className="flex gap-2">
            <button
              className="size-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleFastForward(5)}
              disabled={isLoading || !!error || !audioSupported}
            >
              <IconFastForward size={24} />
            </button>
            <button
              className="size-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleSkip(10)}
              disabled={isLoading || !!error || !audioSupported}
            >
              <IconSkipForward size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
