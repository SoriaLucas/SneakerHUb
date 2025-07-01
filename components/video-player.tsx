"use client"

import { useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  src: string
  title: string
  thumbnail: string
  className?: string
}

export function VideoPlayer({ src, title, thumbnail, className = "" }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div
      className={`relative group overflow-hidden rounded-lg ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={thumbnail}
        muted={isMuted}
        loop
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Overlay con controles */}
      <div
        className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button onClick={togglePlay} size="lg" className="bg-white/90 hover:bg-white text-black rounded-full w-16 h-16">
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </Button>
      </div>

      {/* Control de sonido */}
      <div className="absolute top-4 right-4">
        <Button
          onClick={toggleMute}
          size="sm"
          variant="secondary"
          className={`bg-white/90 hover:bg-white text-black transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
      </div>

      {/* Título del video */}
      <div
        className={`absolute bottom-4 left-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">{title}</span>
      </div>
    </div>
  )
}
