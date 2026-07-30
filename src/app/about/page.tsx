import type { Metadata } from "next"
import { Music, Target, Heart, Lightbulb, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about The Identity music group - our story, mission, and vision.",
}

const values = [
  {
    icon: Music,
    title: "Musical Excellence",
    description:
      "We are committed to creating music that pushes boundaries and resonates deeply with our audience.",
  },
  {
    icon: Target,
    title: "Purpose-Driven",
    description:
      "Every note we play and every song we write has meaning. Our music carries a message of hope, unity, and identity.",
  },
  {
    icon: Heart,
    title: "Passion & Authenticity",
    description:
      "We stay true to ourselves and our art. Authenticity is at the core of everything we create.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace new sounds, technologies, and creative approaches to keep our music fresh and relevant.",
  },
  {
    icon: Globe,
    title: "Community",
    description:
      "Music brings people together. We are building a community of fans who share our love for great music.",
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                The Identity
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Music. Purpose. Identity.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Our Story</h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  The Identity was born from a simple idea — that music has the
                  power to define who we are. Formed by a collective of
                  passionate musicians, our journey began in small studios and
                  late-night jam sessions, fueled by a shared dream of creating
                  something meaningful.
                </p>
                <p>
                  Over the years, we have evolved, experimented, and grown. Our
                  sound has matured, our audience has expanded, but our core
                  mission remains the same: to create music that speaks to the
                  soul and inspires people to embrace their own identity.
                </p>
                <p>
                  From our first single to our latest release, every track is a
                  piece of our story. We invite you to be part of it.
                </p>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="flex h-full items-center justify-center">
                <Music className="h-32 w-32 text-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Our Mission & Vision</h2>
            <p className="mt-4 text-muted-foreground">
              We are on a mission to create music that matters.
            </p>
          </div>
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="rounded-xl border border-border bg-card p-8">
              <h3 className="text-xl font-semibold text-primary">Our Mission</h3>
              <p className="mt-4 text-muted-foreground">
                To create authentic, high-quality music that resonates with
                people across the globe. We aim to inspire, entertain, and
                connect through the universal language of sound.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <h3 className="text-xl font-semibold text-primary">Our Vision</h3>
              <p className="mt-4 text-muted-foreground">
                To become a defining voice in modern music — known not just for
                our sound, but for our impact. We envision a world where The
                Identity is synonymous with creativity, purpose, and artistic
                excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Our Core Values</h2>
            <p className="mt-4 text-muted-foreground">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50"
              >
                <value.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">What Makes Us Unique</h2>
            <p className="mt-4 text-muted-foreground">
              The Identity is not just a music group — we are a brand, a
              movement, and a family. Our diversity of talent, our commitment to
              authenticity, and our relentless pursuit of excellence set us
              apart. We don&apos;t just make music; we create experiences that
              stay with you.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
