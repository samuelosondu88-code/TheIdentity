import type { Metadata } from "next"
import { Compass, Target, HeartHandshake, Lightbulb, Users, Award, Link2 } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description: "The Identity is a Kingdom-centered creative hub dedicated to raising creatives who understand their identity in Christ and use their gifts to influence culture.",
}

const pillars = [
  {
    title: "Discover",
    description:
      "Helping creatives discover their identity in Christ, purpose, gifting, and Kingdom assignment.",
  },
  {
    title: "Develop",
    description:
      "Equipping creatives with technical skills, leadership capacity, and spiritual maturity to pursue excellence.",
  },
  {
    title: "Deploy",
    description:
      "Empowering creatives to produce impactful work that influences culture across industries.",
  },
  {
    title: "Disciple",
    description:
      "Building Christ-centered character so creativity flows from intimacy with God and reflects His nature.",
  },
]

const community = [
  "Music",
  "Film and Videography",
  "Photography",
  "Graphic and Motion Design",
  "Fashion and Textile Design",
  "Fine Arts and Illustration",
  "Creative Writing and Storytelling",
  "Animation",
  "Architecture and Product Design",
  "Theatre and Dance",
  "Digital Content Creation",
  "Technology and Creative Innovation",
]

const values = [
  { title: "Identity", description: "We begin with Christ because purpose flows from identity." },
  { title: "Excellence", description: "We pursue quality that honors God and serves people well." },
  { title: "Truth", description: "We create work that reflects biblical truth and integrity." },
  { title: "Purpose", description: "We create with eternal significance and intentional impact." },
  { title: "Community", description: "We believe growth happens through collaboration and accountability." },
  { title: "Innovation", description: "We embrace creativity while remaining grounded in Scripture." },
  { title: "Stewardship", description: "We faithfully develop and maximize every gift entrusted to us." },
]

const impact = [
  "Creative leadership development",
  "Collaborative productions",
  "Public exhibitions and showcases",
  "Music, film, and publishing projects",
  "Mentorship programs",
  "Educational partnerships",
  "Community engagement",
  "Cultural influence through creative excellence",
]

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <Users className="h-4 w-4" />
              Kingdom-Centered Creative Hub
            </div>
            <h1 className="text-4xl font-bold sm:text-5xl">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                The Identity
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A Kingdom-centered creative hub dedicated to raising creatives who
              understand their identity in Christ and use their gifts to influence
              culture with excellence, truth, and purpose.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold">Who We Are</h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                <strong>The Identity</strong> is a Kingdom-centered creative hub
                dedicated to raising creatives who understand their identity in
                Christ and use their gifts to influence culture with excellence,
                truth, and purpose.
              </p>
              <p>
                We exist to disciple, develop, and deploy creatives who see their
                craft as a calling — not merely a profession. Through spiritual
                formation, creative excellence, and collaborative innovation, we
                empower artists and creators to communicate biblical truth and
                shape society through their work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <Compass className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Our Vision</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                To raise Kingdom creatives who influence culture by reflecting the
                truth, beauty, and excellence of God&apos;s Kingdom through every
                creative discipline.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Our Mission</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                To equip creatives with biblical identity, spiritual maturity,
                professional excellence, and leadership capacity to transform
                culture through creative expression.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <HeartHandshake className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Our Purpose</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                We believe creativity is one of God&apos;s greatest gifts for
                communicating truth and shaping culture. Every creative discipline
                has the power to influence hearts, minds, and communities. Our
                purpose is to help creatives discover who they are in Christ,
                develop their gifts with excellence, and deploy those gifts to
                glorify God and serve humanity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold">What We Do</h2>
            <p className="mt-4 text-muted-foreground">
              The Identity provides an ecosystem where creatives grow spiritually,
              professionally, and collaboratively.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Creative discipleship and mentorship",
              "Leadership development",
              "Professional training and masterclasses",
              "Creative fellowships and networking",
              "Collaborative productions and projects",
              "Conferences, retreats, and workshops",
              "Community outreach initiatives",
              "Digital learning and creative resources",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
              >
                <Lightbulb className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Our Four Pillars</h2>
            <p className="mt-4 text-muted-foreground">
              The foundation of everything we do.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50"
              >
                <h3 className="mb-2 text-lg font-bold text-primary">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Our Creative Community</h2>
            <p className="mt-4 text-muted-foreground">
              The Identity welcomes creatives from diverse disciplines.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {community.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium transition-colors hover:border-primary/50"
              >
                {item}
              </span>
            ))}
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
                <h3 className="mb-2 text-lg font-bold text-primary">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold">Our Impact</h2>
            <p className="mt-4 text-muted-foreground">
              The Identity is committed to raising a generation of Kingdom
              creatives who become leaders across the creative industries. We
              believe creative excellence can transform culture by restoring
              biblical values, inspiring hope, and pointing people to Christ.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {impact.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <Award className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-3">
              <Link2 className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Partnership</h2>
            </div>
            <p className="mt-4 text-muted-foreground">
              We partner with churches, ministries, educational institutions,
              businesses, creative professionals, and organizations that share our
              passion for raising Kingdom creatives and transforming culture
              through creativity.
            </p>
            <p className="mt-4 text-muted-foreground">
              Together, we are building a community where creativity becomes a
              vehicle for discipleship, leadership, innovation, and cultural
              transformation.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Our Commitment</h2>
            <p className="mt-4 text-muted-foreground">
              At The Identity, we believe that when creatives understand who they
              are in Christ, they create with greater purpose, excellence, and
              influence.
            </p>
            <p className="mt-4 text-muted-foreground">
              We are more than a creative community — we are a movement committed
              to revealing Christ, restoring identity, redeeming creativity, and
              shaping culture for the glory of God.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
