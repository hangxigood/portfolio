import { Metadata } from "next";
import { ProfileImage } from "@/components/Profile/ProfileImage";
import { SocialLinks } from "@/components/Profile/SocialLinks";
import { Bio } from "@/components/Profile/Bio";

export const metadata: Metadata = {
  title: "Hangxi Xiang - Software Developer",
  description:
    "Personal portfolio of Hangxi Xiang, a software developer based in Calgary with experience in embedded systems, marketing, product management, and data analysis.",
};

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
          <p className="text-lg mb-4">A software developer based in Calgary.</p>
          <SocialLinks />
        </div>
      </div>

      <Bio paragraphs={bioParagraphs} />
    </div>
  );
}
