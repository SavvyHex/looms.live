import Navbar from '../components/Navbar';

export default function About() {
  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About looms.live</h1>
          
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              looms.live is a unique collaborative storytelling platform where every person gets to contribute one sentence per day to an ever-evolving story.
            </p>
            
            <p>
              Our mission is to weave together the creative voices of people from all around the world, creating narratives that transcend individual perspectives and showcase the beauty of collective storytelling.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Each day, you can contribute one sentence to the ongoing story.</li>
              <li>Your sentence will be added to the collective narrative.</li>
              <li>Stories evolve organically, shaped by the creativity of our community.</li>
              <li>Previous contributions are preserved and viewable in the story archive.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Community Guidelines</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Keep your contributions family-friendly and respectful.</li>
              <li>Each sentence should meaningfully contribute to the story.</li>
              <li>Respect the narrative direction set by previous contributors.</li>
              <li>Have fun and be creative!</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}