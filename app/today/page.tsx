import Navbar from '../components/Navbar';

function StoryDisplay() {
  return (
    <section className="p-6 border rounded-md text-center text-[var(--fg-muted)]">
      Story display is unavailable.
    </section>
  );
}

/* ContributionForm module not found — provide a small local fallback component */
function ContributionForm() {
  return (
    <section className="p-6 border rounded-md text-center text-[var(--fg-muted)]">
      Contribution form is unavailable.
    </section>
  );
}

export default function TodayPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[var(--fg)] mb-4">
              Today's Story
            </h1>
            <p className="text-lg text-[var(--fg-muted)]">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* The story so far */}
          <StoryDisplay />

          {/* Contribution form */}
          <ContributionForm />
        </div>
      </div>
    </main>
  );
}
