import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Card from "../components/Card";

const GoalsPage = ({ data }) => {
   const { goals } = data.attributes.pageData;

   return (
      <Card
         title={data.attributes.title}
         className="overflow-y-auto"
         id="goals"
      >
         <div className="flex h-full flex-col">
            {goals.map((goal, idx) => {
               return (
                  <div
                     key={`${goal.id}-${idx}`}
                     className="mb-6 flex w-full bg-gradient-to-r from-blue-50 via-blue-50"
                  >
                     <img
                        src={
                           goal.coverImage ||
                           "https://source.unsplash.com/random/300x200/?goals"
                        }
                        alt={goal.name}
                        className="h-40 rounded-md"
                     />
                     <div className="p-4">
                        <h5 className="mb-2 font-bold">{goal.name}</h5>
                        <ReactMarkdown
                           children={goal.displayMarkdown}
                           remarkPlugins={[remarkGfm]}
                           className="prose max-w-none"
                        />
                     </div>
                  </div>
               );
            })}
         </div>
      </Card>
   );
};

export default GoalsPage;
