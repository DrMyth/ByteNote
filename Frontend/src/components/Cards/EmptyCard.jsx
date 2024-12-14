import React, { useState } from "react";

export const EmptyCard = ({ imgSrc, message }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={imgSrc}
        alt="No Notes"
        className="w-full h-auto transition-all duration-500 xl:max-w-xl max-w-md mx-auto"
        onLoad={() => setIsImageLoaded(true)}
      />

      {isImageLoaded && (
        <p className="w-3/4 max-w-xl text-lg font-semibold text-slate-700 text-center leading-7 mt-5 mb-10">
          {message}
        </p>
      )}
    </div>
  );
};
