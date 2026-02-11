import { SubmitProjectForm } from "@/components/explorer/submit-project-form"

export default function SubmitPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Submit Your Project</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Share your sustainable architecture project with the global community. Help inspire others and contribute
              to the future of green building.
            </p>
          </div>

          <SubmitProjectForm />
        </div>
      </div>
    </main>
  )
}
