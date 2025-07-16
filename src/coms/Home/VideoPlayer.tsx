"use client";

// import ReactPlayer from "react-player";
import { IconPlay2 } from "../Icon/fill";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import clsx from "clsx";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoPlayerProps {
  url: string;
  thumbnail: string;
  className?: string;
  width?: number;
  height?: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  thumbnail,
  className,
  width = 807,
  height = 451,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);

  return (
    <div
      className={clsx(
        "relative w-full aspect-video overflow-hidden",
        className
      )}
    >
      {!isPlaying && !isPlayed && (
        <img
          src={thumbnail}
          alt="thumbnail"
          width={width}
          height={height}
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          onClick={() => setIsPlaying(true)}
          loading="lazy"
        />
      )}

      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        playing={isPlaying}
        onPlay={() => {
          setIsPlaying(true);
          setIsPlayed(true);
        }}
        onPause={() => setIsPlaying(false)}
      />

      {!isPlaying && !isPlayed && (
        <div
          onClick={() => setIsPlaying(true)}
          className="z-20 cursor-pointer absolute size-[5.5rem] rounded-full bg-white/25 backdrop-blur-2xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center"
        >
          <IconPlay2 size={34} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
