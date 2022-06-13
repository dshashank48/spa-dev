import React from "react";

const ScreenShort = () => {
   return (
      <button onClick={onNext}>
         Next: {playlist[currentSlideIndex + 1]?.type}
      </button>
   );
};

export default ScreenShort;
