import Navbar from '../components/Navbar';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-12 text-center">
            <span className="text-[#4285F4]">About </span>
            <span className="text-[#EA4335]">looms</span>
            <span className="text-[#34A853]">.live</span>
          </h1>
          
          <div className="space-y-8 text-lg">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-[#4285F4]/10">
              <p className="text-[#4285F4]">
                looms.live is a unique collaborative storytelling platform where every person gets to contribute one sentence per day to an ever-evolving story.
              </p>
              
              <p className="text-[#EA4335] mt-4">
                Our mission is to weave together the creative voices of people from all around the world, creating narratives that transcend individual perspectives and showcase the beauty of collective storytelling.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-[#FBBC05]/10">
              <h2 className="text-2xl font-semibold mb-6 text-[#FBBC05]">How It Works</h2>
              <ul className="list-disc pl-6 space-y-3 text-[#4285F4]">
                <li>Each day, you can contribute one sentence to the ongoing story.</li>
                <li>Your sentence will be added to the collective narrative.</li>
                <li>Stories evolve organically, shaped by the creativity of our community.</li>
                <li>Previous contributions are preserved and viewable in the story archive.</li>
              </ul>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-[#34A853]/10">
              <h2 className="text-2xl font-semibold mb-6 text-[#34A853]">Community Guidelines</h2>
              <ul className="list-disc pl-6 space-y-3 text-[#EA4335]">
                <li>Keep your contributions family-friendly and respectful.</li>
                <li>Each sentence should meaningfully contribute to the story.</li>
                <li>Respect the narrative direction set by previous contributors.</li>
                <li>Have fun and be creative!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}