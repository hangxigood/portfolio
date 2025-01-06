import Image from "next/image";

export const ProfileImage = () => {
  const imagePath = process.env.NODE_ENV === "production" ? "/portfolio/profile.jpg" : "/profile.jpg";
  
  return (
    <div className="w-48 h-48 relative rounded-full overflow-hidden">
      <Image
        src={imagePath}
        alt="Hangxi Xiang"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};
