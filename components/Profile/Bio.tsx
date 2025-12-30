interface BioProps {
  paragraphs: string[];
}

export const Bio = ({ paragraphs }: BioProps) => {
  return (
    <section className="mt-6">
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-lg">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};
