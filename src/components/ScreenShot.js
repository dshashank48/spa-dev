import React from "react";
import html2canvas from "html2canvas";
import { generatePdfFromImages } from "../functions";
import jsPDF from "jspdf";

const images = [];

const ScreenShot = ({ playlist, currentSlideIndex, isEnd }) => {
   const capture = () => {
      console.log("log:", playlist[currentSlideIndex]?.type);

      html2canvas(
         document.querySelector(`#${playlist[currentSlideIndex]?.type}`)
      ).then((canvas) => {
         var imgData = canvas.toDataURL("image/jpeg", 1.0);

         images.push(imgData);

         console.log("log: iamges", images);
         if (isEnd) {
            let pdf = new jsPDF();

            pdf.deletePage(1);
            images.forEach((image) => {
               pdf.addPage();
               pdf.addImage(image, "JPEG", 0, 0);
            });
            pdf.save("spa-download.pdf");
            return;
         }
      });
   };

   return (
      <button onClick={capture}>{isEnd ? "Download PDF" : "Add to pdf"}</button>
   );
};

export default ScreenShot;
