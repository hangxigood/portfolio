import Link from 'next/link';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import { Project } from '../lib/projects';
import { getImagePath } from '../lib/utils';

const githubLogo = getImagePath('/github-mark.svg');

export default function ProjectCard({
    image,
    title,
    description,
    githubLink,
    deploymentLink,
    stacks,
}: Project) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <div className="group">
                <Image
                    src={getImagePath(image)}
                    alt={title}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover"
                />
                <div className="px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="font-bold text-xl mb-2">
                            {title}
                        </div>
                        <div className="flex gap-3 items-center">
                            {deploymentLink && (
                                <Link href={deploymentLink} target="_blank" rel="noopener noreferrer">
                                    <FiExternalLink className="w-6 h-6 hover:opacity-75 text-gray-700 dark:text-gray-300" />
                                </Link>
                            )}
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
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-base mb-3">
                        {description}
                    </p>
                    {stacks && stacks.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {stacks.map((stack, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                                >
                                    {stack}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
