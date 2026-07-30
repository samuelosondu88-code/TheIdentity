"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, ExternalLink } from "lucide-react"
import type { MusicRelease } from "@/types/database"

interface MusicCardProps {
  release: MusicRelease
}

const PLAY_EVENT = "music-play"

export default function MusicCard({ release }: MusicCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setPlaying(false)
  }, [])

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (e.detail !== release.id) stop()
    }
    window.addEventListener(PLAY_EVENT, handler as EventListener)
    return () => window.removeEventListener(PLAY_EVENT, handler as EventListener)
  }, [release.id, stop])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) {
      stop()
    } else {
      window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: release.id }))
      audioRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {release.cover_image_url ? (
          <Image
            src={release.cover_image_url}
            alt={release.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Play className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        {release.audio_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              className="h-14 w-14 rounded-full"
              onClick={togglePlay}
            >
              {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
          </div>
        )}
        {release.featured && (
          <Badge className="absolute left-3 top-3">Featured</Badge>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="mb-1 text-lg font-semibold">{release.title}</h3>
        <p className="mb-2 text-sm text-muted-foreground">{release.artist}</p>
        <p className="mb-3 text-xs text-muted-foreground">
          Released: {new Date(release.release_date).toLocaleDateString()}
        </p>
        {release.description && (
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {release.description}
          </p>
        )}
        <div className="flex items-center gap-2">
          {release.audio_url && (
            <Button variant="default" size="sm" onClick={togglePlay}>
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {playing ? "Pause" : "Listen"}
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <a href={`/music#${release.id}`}>
              Details
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardContent>
      {release.audio_url && (
        <audio
          ref={audioRef}
          src={release.audio_url}
          onEnded={() => setPlaying(false)}
          preload="none"
        />
      )}
    </Card>
  )
}
