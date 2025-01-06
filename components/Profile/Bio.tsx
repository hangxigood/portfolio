interface BioProps {
  paragraphs: string[];
}

export const Bio = ({ paragraphs }: BioProps) => {
  return (
    <div className="mt-12 space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-lg">
          {paragraph}
        </p>
      ))}
    </div>
  );
};
