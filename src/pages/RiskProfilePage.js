import { ResponsivePie } from "@nivo/pie";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Card from "../components/Card";

const RiskProfilePage = ({ data }) => {
   const { name, detailMarkdown, characteristicsMarkdown, breakdown } =
      data.attributes.pageData;

   console.log(data);

   return (
      <Card
         title={data.attributes.title}
         className="overflow-y-auto"
         id="riskProfile"
      >
         <div className="flex h-full flex-col">
            <img
               src="images/header_3.jpeg"
               alt="Header"
               className="mb-6 h-40 w-full rounded-md object-cover"
            />
            <h3 className="text-md mb-2 font-bold">{name}</h3>
            <ReactMarkdown
               children={detailMarkdown}
               remarkPlugins={[remarkGfm]}
               className="prose max-w-none"
            />
            <div className="min-h-80 mt-6 flex flex-1 rounded-md bg-gradient-to-r from-blue-50 via-blue-50 p-3">
               <div className="border-r-1 w-3/5 border-blueGray-300 pr-4">
                  <h3 className="mb-2 text-sm font-bold">
                     Profile Characteristics
                  </h3>
                  <ul className="my-4 ml-4 list-disc">
                     {characteristicsMarkdown?.map((note, idx) => (
                        <li key={idx}>{note}</li>
                     ))}
                  </ul>
               </div>
               <div className="flex max-h-80 w-2/5 flex-col p-4">
                  <div className="flex-1">
                     <ResponsivePie
                        data={breakdown}
                        id="display"
                        value="percentage"
                        colors={["#DBEAF8", "#76DEFB", "#54A7E1", "#2D82BF"]}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        innerRadius={0.5}
                        padAngle={1.5}
                        activeOuterRadiusOffset={8}
                        borderColor={{
                           from: "color",
                           modifiers: [["darker", 0.2]],
                        }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: "color" }}
                        valueFormat={(value) => `${value}%`}
                        motionConfig="default"
                     />
                  </div>
               </div>
            </div>
         </div>
      </Card>
   );
};

export default RiskProfilePage;
