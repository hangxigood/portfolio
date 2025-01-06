import Link from 'next/link';
import Image from 'next/image';
import { Project } from '../lib/projects';

const githubLogo = '/github-mark.svg';

export default function ProjectCard({
    image,
    title,
    description,
    githubLink,
    deploymentLink,
}: Project) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <div className="group">
                <Link href={deploymentLink} target="_blank" rel="noopener noreferrer" className="block">
                    <Image
                        src={image}
                        alt={title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                    />
                </Link>
                <div className="px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="font-bold text-xl mb-2">
                            {title}
                        </div>
                        {githubLink && (
                            <Link href={githubLink} target="_blank" rel="noopener noreferrer">
                                <Image
                                    src={githubLogo}
                                    alt="GitHub"
                                    width={20}
                                    height={20}
                                    className="w-6 h-6 hover:opacity-75 dark:invert"
                                />
                            </Link>
                        )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-base">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
