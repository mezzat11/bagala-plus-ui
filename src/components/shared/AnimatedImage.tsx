
import { useState, useEffect } from "react";

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "auto" | "square" | "video" | "portrait";
  fill?: boolean;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  className = "",
  aspectRatio = "auto",
  fill = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setIsError(false);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setIsError(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  // Define aspect ratio classes
  const aspectRatioClasses = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  // Placeholder rendering
  const renderPlaceholder = () => (
    <div className={`animate-pulse bg-muted rounded-lg ${aspectRatioClasses[aspectRatio]}`}>
      <div className="w-full h-full flex items-center justify-center">
        <svg 
          className="w-10 h-10 text-muted-foreground/40"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
        </svg>
      </div>
    </div>
  );

  // Error state rendering
  if (isError) {
    return (
      <div className={`bg-muted rounded-lg ${aspectRatioClasses[aspectRatio]} ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-muted-foreground">
            خطأ في تحميل الصورة
          </span>
        </div>
      </div>
    );
  }

  // Fill mode (similar to Next.js Image fill)
  if (fill) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {!isLoaded && renderPlaceholder()}
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
      </div>
    );
  }

  // Regular image with aspect ratio
  return (
    <div className={`overflow-hidden rounded-lg ${aspectRatioClasses[aspectRatio]} ${className}`}>
      {!isLoaded && renderPlaceholder()}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
      />
    </div>
  );
};

export default AnimatedImage;
