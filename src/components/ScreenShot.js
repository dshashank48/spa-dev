import React from "react";
import html2canvas from "html2canvas";

const images = [];

const ScreenShot = ({ playlist, currentSlideIndex, isEnd }) => {
   const capture = () => {
      console.log("log:", playlist[currentSlideIndex]?.type);
      if (isEnd) {
         //TODO: Perform pdf download process here and return
      }
      html2canvas(
         document.querySelector(`#${playlist[currentSlideIndex]?.type}`)
      ).then((canvas) => {
         const image = canvas
            .toDataURL("image/png", 1.0)
            .replace("image/png", "image/octet-stream");
         images.push(image);
         var link = document.createElement("a");
         link.download = playlist[currentSlideIndex]?.type + ".png";
         link.href = image;
         link.click();
      });
   };

   return (
      <button onClick={capture}>
         {isEnd ? "Download PDF" : "Add to pdf"}{" "}
      </button>
   );
};

export default ScreenShot;
