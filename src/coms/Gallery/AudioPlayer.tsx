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
import { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  src: string;
  thumbnail: string;
  title: string;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AudioPlayer = ({ src, thumbnail, title }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevPlayState = useRef<"playing" | "paused">("paused");
  const preventSetSlider = useRef<boolean>(false);

  const [sliderValue, setSliderValue] = useState(0);

  /**
   * functions
   * ====================================================================
   */

  const handleSkip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const handleFastForward = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        setError("Failed to play audio");
      });
      setIsPlaying(true);
    }
  };

  /**
   * useEffect
   * ====================================================================
   */

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = (e: Event) => {
      if (preventSetSlider.current) return;

      setCurrentTime(audio.currentTime);
      // Cập nhật slider value để đồng bộ với currentTime
      setSliderValue((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = (e: Event) => {
      setDuration(audio?.duration);
    };

    const handleDurationChange = (e: Event) => {
      setDuration(audio?.duration);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    const handleError = () => {
      setError("Failed to load audio");
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    // Add event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    // Check if audio is already loaded
    if (audio.readyState >= 1) {
      setDuration(audio.duration);
    }
    if (audio.readyState >= 2) {
      setIsLoading(false);
    }

    // Cleanup function
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [src]);

  // Handle initial load when component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    setIsLoading(true);
    setError(null);

    // Force reload the audio
    audio.load();
  }, [src]);

  /**
   * render view
   * ====================================================================
   */

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
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="mt-6">
        {error && (
          <div className="text-red-300 text-sm text-center mb-4 bg-red-500/20 rounded-lg p-2">
            {error}
          </div>
        )}

        <div className="">
          <SliderComponent
            value={sliderValue}
            disabled={isLoading || !!error}
            onChange={(value) => {
              if (audioRef.current && duration > 0) {
                const newTime = (value / 100) * duration;
                audioRef.current.currentTime = newTime;
                setCurrentTime(newTime);
              }
            }}
            onDragging={() => {
              prevPlayState.current = isPlaying ? "playing" : "paused";

              preventSetSlider.current = true;
              audioRef.current?.pause();
            }}
            onDragEnd={() => {
              preventSetSlider.current = false;
              if (prevPlayState.current === "playing") {
                audioRef.current?.play();
              }
            }}
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
              disabled={isLoading || !!error}
            >
              <IconSkipBack size={24} />
            </button>
            <button
              className="size-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleFastForward(-5)}
              disabled={isLoading || !!error}
            >
              <IconRewind size={24} />
            </button>
          </div>
          <button
            className="size-[3.75rem] rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={togglePlayPause}
            disabled={isLoading || !!error}
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
              disabled={isLoading || !!error}
            >
              <IconFastForward size={24} />
            </button>
            <button
              className="size-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleSkip(10)}
              disabled={isLoading || !!error}
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

interface SliderComponentProps {
  value: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  onDragging?: () => void;
  onDragEnd?: () => void;
}

const SliderComponent = ({
  value,
  disabled,
  onChange,
  onDragging,
  onDragEnd,
}: SliderComponentProps) => {
  const [sliderValue, setSliderValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setSliderValue(newValue);
    setIsDragging(true);
    if (onDragging) {
      onDragging();
    }
  };

  const handleSliderEnd = () => {
    setIsDragging(false);
    if (onDragEnd) {
      onDragEnd();
    }
    if (onChange) {
      onChange(sliderValue);
    }
  };

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  return (
    <Slider
      value={[sliderValue]}
      max={100}
      step={0.1}
      onValueChange={handleSliderChange}
      onValueCommit={handleSliderEnd}
      className="cursor-pointer"
      disabled={disabled}
    />
  );
};
