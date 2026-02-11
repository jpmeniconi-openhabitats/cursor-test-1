import { Spinner } from "@/components/ui/spinner"

export default function MapLoading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-8 w-8 text-primary" />
        <p className="text-muted-foreground text-sm animate-pulse">Loading map data...</p>
      </div>
    </div>
  )
}
