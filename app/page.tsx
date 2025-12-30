import { ProfileImage } from "@/components/Profile/ProfileImage";
import { SocialLinks } from "@/components/Profile/SocialLinks";
import { Bio } from "@/components/Profile/Bio";
import { Timeline } from "@/components/Profile/Timeline";

const bioParagraphs = [
  "I used to work as an embedded systems developer, marketer, product manager, and data analyst. These roles have given me great insights into both business and technology.",
  "Apart from work, I love cooking, reading, snorkeling, camping, and spending time with my wife and child.",
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <ProfileImage />

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4">Hi, I&apos;m Hangxi Xiang</h1>
          <p className="text-lg mb-4">A Product Engineer.</p>
          <SocialLinks />
        </div>
      </div>

      <Bio paragraphs={bioParagraphs} />

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Key Achievements</h2>
        <div className="grid gap-6">
          <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">FinTech Product Strategy</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Spearheaded the launch of a commodity trading platform, scaling to 175+ corporate clients.
              By leveraging custom data ETL pipelines and dashboards to drive strategic decisions, reached
              over <span className="text-blue-600 dark:text-blue-400 font-semibold">$100 Million CAD</span> in
              transaction volume.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">End-to-End Product Ownership</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Architected an <span className="text-blue-600 dark:text-blue-400 font-semibold">FDA-compliant </span> Electronic
              Batch Record system, digitizing <span className="text-blue-600 dark:text-blue-400 font-semibold">500+</span> unique product lines through a dynamic architecture instead of hard-coded forms.
            </p>
          </div>
        </div>
      </section>

      <Timeline />
    </div>
  );
}
