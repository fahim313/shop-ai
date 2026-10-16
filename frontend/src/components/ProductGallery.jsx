import { useState } from "react";

export default function ProductGallery({
  images = [],
  imageUrl,
  name,
}) {
  const allImages = [
    ...new Set(
      [
        ...(Array.isArray(images)
          ? images.map((image) =>
              typeof image === "string"
                ? image
                : image?.image_url ?? image?.url
            )
          : []),
        imageUrl,
      ].filter(Boolean)
    ),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState([]);

  const currentImage = allImages[activeIndex];
  const currentImageFailed = failedImages.includes(currentImage);

  function handleImageError(image) {
    setFailedImages((previous) =>
      previous.includes(image) ? previous : [...previous, image]
    );
  }

  function handleThumbnailClick(index) {
    setActiveIndex(index);
  }

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {allImages.length > 1 && (
        <div className="flex shrink-0 gap-3 overflow-x-auto pb-1 md:flex-col md:overflow-y-auto md:pb-0">
          {allImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => handleThumbnailClick(index)}
              aria-label={`View ${name} image ${index + 1}`}
              aria-pressed={activeIndex === index}
              className={`h-20 w-16 shrink-0 overflow-hidden rounded-md border-2 bg-neutral-100 transition sm:h-24 sm:w-20 ${
                activeIndex === index
                  ? "border-neutral-900"
                  : "border-transparent opacity-75 hover:opacity-100"
              }`}
            >
              {!failedImages.includes(image) ? (
                <img
                  src={image}
                  alt={`${name} thumbnail ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  onError={() => handleImageError(image)}
                />
              ) : (
                <span className="flex h-full items-center justify-center text-xs text-neutral-400">
                  Unavailable
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <div className="relative flex aspect-3/4 min-h-80 flex-1 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-[#F5F4F0]">
        {currentImage && !currentImageFailed ? (
          <img
            key={currentImage}
            src={currentImage}
            alt={name}
            className="h-full w-full object-contain"
            onError={() => handleImageError(currentImage)}
          />
        ) : (
          <p className="px-6 text-center text-sm text-neutral-400">
            Product image unavailable
          </p>
        )}

        {allImages.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2.5 py-1 text-xs text-white">
            {activeIndex + 1} / {allImages.length}
          </span>
        )}
      </div>
    </div>
  );
}
