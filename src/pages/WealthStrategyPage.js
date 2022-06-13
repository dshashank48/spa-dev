import Card from "../components/Card";

const WealthStrategyPage = ({ data }) => {
   const {
      strategy,
      strategyDescription,
      recommendations,
      benefits,
      considerations,
   } = data.attributes.pageData;

   return (
      <Card
         title={data.attributes.title}
         className="overflow-y-auto"
         id="wealthStrategy"
      >
         <div className="flex items-start">
            <div className="px-4">
               <h3 className="text-md mb-2 font-bold">{strategy}</h3>
               <p className="mb-4">{strategyDescription}</p>
               {recommendations.map((recommendation, i) => (
                  <div key={i} className="prose mb-8 max-w-none">
                     <h4>{recommendation.preamble}</h4>
                     <ul>
                        {recommendation?.points?.map((point, i) => (
                           <li key={i}>{point}</li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
            <img
               src="images/sider_3.jpeg"
               alt="Sider"
               className="mr-4 ml-12 h-16 w-40 rounded-md object-cover object-top"
               style={{ minWidth: 160 }}
            />

            <img
               src="images/sider_3.jpeg"
               alt="Sider"
               className="h-60 w-40 rounded-md object-cover object-right"
               style={{ minWidth: 160 }}
            />
         </div>
         <div className="grid grid-cols-2 items-start gap-4">
            <div className="prose max-w-none rounded-md bg-gradient-to-r from-blue-100 via-blue-50 p-4">
               <h4>Why this benefits you</h4>
               <ul>
                  {benefits.map((point, i) => (
                     <li key={i}>{point}</li>
                  ))}
               </ul>
            </div>
            <div className="prose max-w-none rounded-md bg-gradient-to-r from-blue-100 via-blue-50 p-4">
               <h4>Things you should consider</h4>
               <ul>
                  {considerations.map((point, i) => (
                     <li key={i}>{point}</li>
                  ))}
               </ul>
            </div>
         </div>
      </Card>
   );
};

export default WealthStrategyPage;
