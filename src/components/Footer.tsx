import Link from "next/link"
import { Music } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Music className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">THE IDENTITY</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Music. Purpose. Identity.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["About", "Music", "Members", "Gallery"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">More</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Events", "News", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Connect</h3>
            <p className="text-sm text-muted-foreground">
              Follow The Identity on social media for the latest updates.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} The Identity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
