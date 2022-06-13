import React from "react";
import html2canvas from "html2canvas";

const ScreenShot = ({ playlist, currentSlideIndex }) => {
   const capture = () => {
      console.log("log:", playlist[currentSlideIndex]?.type);
      // html2canvas(
      //    document.querySelector(`#${playlist[currentSlideIndex]?.type}`)
      // ).then((canvas) => {
      //    const image = canvas
      //       .toDataURL("image/png", 1.0)
      //       .replace("image/png", "image/octet-stream");
      //    var link = document.createElement("a");
      //    link.download = playlist[currentSlideIndex]?.type + ".png";
      //    link.href = image;
      //    link.click();
      // });
   };

   return <button onClick={capture}>Add to pdf</button>;
};

export default ScreenShot;
