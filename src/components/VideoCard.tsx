interface VideoCardProps {
  title: string
  video_url: string
  description?: string
}

export default function VideoCard({ title, video_url, description }: VideoCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/30">
      <video src={video_url} className="aspect-video w-full object-cover" controls preload="metadata" />
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        {description && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>}
      </div>
    </div>
  )
}
