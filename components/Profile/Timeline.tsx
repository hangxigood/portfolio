import React from 'react';

interface TimelineEntry {
    title: string;
    organization: string;
    period: string;
    location?: string;
    description?: string | React.ReactNode;
    type: 'work' | 'education';
    startDate: Date; // For sorting
    url?: string;
}

const entries: TimelineEntry[] = [
    {
        type: 'work',
        title: "Software Developer",
        organization: "Southmedic Inc",
        url: "https://www.southmedic.com/",
        period: "Jan 2025 - Dec 2025",
        location: "Ontario, Canada (Remote)",
        description: (
            <>
                Architected an FDA-compliant Electronic Batch Record system, digitizing{" "}
                <span className="text-blue-600 dark:text-blue-400 font-bold">500+</span> unique product lines through a
                dynamic architecture instead of hard-coded forms.
            </>
        ),
        startDate: new Date('2025-01-01')
    },
    {
        type: 'education',
        title: "Diploma, Software Development",
        organization: "Southern Alberta Institute of Technology (SAIT)",
        url: "https://www.sait.ca/programs-and-courses/diplomas/software-development",
        period: "Sep 2023 - Dec 2024",
        location: "Calgary, Canada",
        description: (
            <>
                Grade: <span className="text-emerald-600 dark:text-emerald-400 font-bold">4.0/4.0</span>
            </>
        ),
        startDate: new Date('2023-09-01')
    },
    {
        type: 'work',
        title: "Product Marketing Manager",
        organization: "Chengdu Jwell Group Co.LTD.",
        url: "https://gt.jwell56.com/home",
        period: "Aug 2021 - Aug 2023",
        location: "Chengdu, China",
        description: (
            <>
                Launched supply chain finance products, securing 175 corporate clients and{" "}
                <span className="text-blue-600 dark:text-blue-400 font-bold">$100M CAD</span> in orders.
            </>
        ),
        startDate: new Date('2021-08-01')
    },
    {
        type: 'work',
        title: "Data Analyst",
        organization: "Chengdu Jwell Group Co.LTD.",
        url: "https://gt.jwell56.com/home",
        period: "Aug 2020 - Aug 2021",
        location: "Chengdu, China",
        description: (
            <>
                Automated complex back-office data workflows, replacing manual Excel processes. Designed ETL pipelines that reduced data processing time by <span className="text-blue-600 dark:text-blue-400 font-bold">95%</span>.
            </>
        ),
        startDate: new Date('2020-08-01')
    },
    {
        type: 'work',
        title: "Marketing Specialist",
        organization: "Bmofang",
        period: "Jul 2017 - Sep 2019",
        location: "Chengdu, China",
        description: "Managed growth initiatives and marketing campaigns for over two years.",
        startDate: new Date('2017-07-01')
    },
    {
        type: 'work',
        title: "Digital Marketing Manager",
        organization: "HWTrek",
        url: "https://hwtrek.com/",
        period: "Feb 2017 - Jul 2017",
        location: "Shenzhen, China",
        description: "Managed digital marketing strategies in a fast-paced hardware ecosystem.",
        startDate: new Date('2017-02-01')
    },
    {
        type: 'work',
        title: "Marketing Coordinator",
        organization: "Guangzhou ZHIYUAN Electronics",
        url: "https://www.zlg.com/",
        period: "Jul 2015 - Aug 2016",
        location: "Guangzhou, China",
        description: "Coordinated marketing efforts and managed initial product outreach.",
        startDate: new Date('2015-07-01')
    },
    {
        type: 'education',
        title: "Bachelor of Engineering",
        organization: "Guangzhou University",
        url: "https://english.gzhu.edu.cn/",
        period: "Sep 2011 - Jun 2015",
        location: "Guangzhou, China",
        description: "Electronic Information Engineering",
        startDate: new Date('2011-09-01')
    }
];

const sortedEntries = [...entries].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

const TimelineItem = ({ entry }: { entry: TimelineEntry }) => {
    const isWork = entry.type === 'work';
    const dotColor = isWork ? 'bg-blue-600' : 'bg-emerald-500';

    return (
        <div className="relative mb-12 last:mb-0">
            {/* Mobile Dot and Line */}
            <div className="md:hidden">
                <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800"></div>
                <div className={`absolute left-0 top-2 w-6 h-6 rounded-full border-4 border-white dark:border-slate-950 ${dotColor}`}></div>
            </div>

            {/* Item Container */}
            <div className={`flex flex-col md:flex-row items-start md:items-center w-full ${isWork ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Content Side */}
                <div className={`w-full md:w-[calc(50%-12px)] pl-8 md:pl-0 ${isWork ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                    <h3 className="font-bold text-lg leading-none mb-2">{entry.title}</h3>

                    <div className="text-slate-700 dark:text-slate-300 font-medium mb-1">
                        {entry.url ? (
                            <a href={entry.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {entry.organization}
                            </a>
                        ) : (
                            entry.organization
                        )}
                    </div>

                    <div className="text-sm text-slate-500 mb-2">{entry.period} {entry.location && `• ${entry.location}`}</div>

                    {entry.description && (
                        <p className="text-slate-600 dark:text-slate-400 text-sm italic">
                            {entry.description}
                        </p>
                    )}
                </div>

                {/* Desktop Center Point (Placeholder/Spacer for the dot) */}
                <div className="hidden md:flex w-6 h-6 items-center justify-center z-10 shrink-0 mx-0">
                    {/* The actual dot is absolute centered in the parent container below */}
                </div>

                <div className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white dark:border-slate-950 ${dotColor} shadow-sm z-10 hidden md:block`}></div>

                {/* Empty Side (Desktop) */}
                <div className="hidden md:block md:w-[calc(50%-12px)]"></div>
            </div>
        </div>
    );
};

export const Timeline = () => {
    return (
        <div className="mt-24 relative w-full">
            <h2 className="text-3xl font-bold mb-8 text-center">Experience & Education</h2>

            {/* Desktop Center Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-24 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

            <div className="flex flex-col">
                {sortedEntries.map((item, idx) => (
                    <TimelineItem key={idx} entry={item} />
                ))}
            </div>
        </div>
    );
};
