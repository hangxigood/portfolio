import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface SocialLink {
  href: string;
  icon: JSX.Element;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/hangxigood",
    icon: <FaGithub />,
    label: "GitHub Profile"
  },
  {
    href: "https://linkedin.com/in/hangxi",
    icon: <FaLinkedin />,
    label: "LinkedIn Profile"
  }
];

export const SocialLinks = () => {
  return (
    <div className="flex gap-4 justify-center md:justify-start">
      {socialLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-gray-600 transition-colors"
          aria-label={link.label}
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
};
