import React from "react";

const Card = ({ section, title, titleExtra, children, className, id }) => {
   return (
      <div
         className={`flex h-full w-full flex-col rounded-lg bg-white p-4 shadow-sm ${
            className ? className : ""
         }`}
         id={id}
      >
         <div
            className={`mb-6 flex items-center justify-between rounded-md bg-gradient-to-r from-blue-100 via-blue-50 py-1 pl-4`}
         >
            <p className="text-sm font-bold">{title}</p>
            <div className="flex items-center">
               <p className="font-bold">{titleExtra}</p>
            </div>
         </div>
         <div className="mb-4 flex-1">{children}</div>
      </div>
   );
};

export default Card;
