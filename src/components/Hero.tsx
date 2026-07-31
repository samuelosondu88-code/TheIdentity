"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Music } from "lucide-react"

export default function Hero() {
  const [images, setImages] = useState<string[]>([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetch("/api/data/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setImages(data.map((img: { image_url: string }) => img.image_url))
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (images.length < 2) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            i === current ? "opacity-30" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      {images.length === 0 && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background/80 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="animate-fade-in-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Music className="h-4 w-4" />
            Kingdom-Centered Creative Hub
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            THE{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              IDENTITY
            </span>
          </h1>
          <p className="mb-2 text-xl font-semibold text-muted-foreground sm:text-2xl">
            Creativity. Calling. Christ.
          </p>
          <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg">
            A Kingdom-centered creative hub dedicated to raising creatives who
            understand their identity in Christ and use their gifts to influence
            culture with excellence, truth, and purpose.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/music">
              <Button size="lg" className="w-full sm:w-auto">
                <Play className="h-5 w-5" />
                Listen Now
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
