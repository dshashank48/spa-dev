import React from "react";
import {
   Bar,
   BarChart,
   CartesianGrid,
   Legend,
   ResponsiveContainer,
   Tooltip,
   XAxis,
   YAxis,
} from "recharts";
import Card from "../components/Card";

const AssestAllocationTable = ({ data }) => {
   return (
      <div className="rounded-md bg-gradient-to-r from-blue-100 via-blue-50 p-4">
         <table className="w-full table-fixed ">
            <thead className="bg-blue-200 text-center">
               <tr>
                  <th className="w-1/3 rounded-l-md py-1 pl-2 text-left">
                     Asset Class
                  </th>
                  <th className="w-1/12 py-1">Min%</th>
                  <th className="w-1/12 py-1">Max%</th>
                  <th className="w-1/12 py-1">Current</th>
                  <th className="w-1/12 py-1">Target</th>
                  <th className="w-1/12 rounded-r-md py-1 pr-2">Proposed</th>
               </tr>
            </thead>
            <tbody className="text-center">
               {data.map((section) => {
                  const itemRows = section.items.map((item) => {
                     return (
                        <tr key={`item-${item.id}`}>
                           <td className="border-b py-2 pl-2 text-left">
                              {item.display}
                           </td>
                           <td
                              className={`border-b py-2 ${
                                 item.min ? "font-bold" : ""
                              }`}
                           >
                              {item.min}
                           </td>
                           <td
                              className={`border-b py-2 ${
                                 item.max ? "font-bold" : ""
                              }`}
                           >
                              {item.max}
                           </td>
                           <td
                              className={`border-b py-2 ${
                                 item.current ? "font-bold" : ""
                              }`}
                           >
                              {item.current}
                           </td>
                           <td
                              className={`border-b py-2 ${
                                 item.target ? "font-bold" : ""
                              }`}
                           >
                              {item.target}
                           </td>
                           <td
                              className={`border-b py-2 ${
                                 item.proposed ? "font-bold" : ""
                              }`}
                           >
                              {item.proposed}
                           </td>
                        </tr>
                     );
                  });

                  return (
                     <>
                        <tr key={`section-${section.id}`}>
                           <td className="border-b py-2 pl-2 text-left font-bold">
                              {section.display}
                           </td>
                           <td className="border-b py-2" />
                           <td className="border-b py-2" />
                           <td className="border-b py-2" />
                           <td className="border-b py-2" />
                           <td className="border-b py-2" />
                        </tr>
                        {itemRows}
                        {section.totalDefensive && (
                           <tr key={`totalDefensive`}>
                              <td className="border-b py-2 pr-2 text-right font-bold">
                                 Total Defensive :
                              </td>
                              <td className="border-b py-2" />
                              <td className="border-b py-2" />
                              <td
                                 className={`border-b py-2 ${
                                    section.totalDefensive.current
                                       ? "font-bold"
                                       : ""
                                 }`}
                              >
                                 {section.totalDefensive.current}
                              </td>
                              <td
                                 className={`border-b py-2 ${
                                    section.totalDefensive.target
                                       ? "font-bold"
                                       : ""
                                 }`}
                              >
                                 {section.totalDefensive.target}
                              </td>
                              <td
                                 className={`border-b py-2 ${
                                    section.totalDefensive.proposed
                                       ? "font-bold"
                                       : ""
                                 }`}
                              >
                                 {section.totalDefensive.proposed}
                              </td>
                           </tr>
                        )}
                        {section.totalGrowth && (
                           <tr key={`totalGrowth`}>
                              <td className="border-b py-2 pr-2 text-right font-bold">
                                 Total Growth :
                              </td>
                              <td className="border-b py-2" />
                              <td className="border-b py-2" />
                              <td
                                 className={`border-b py-2 ${
                                    section.totalGrowth.current
                                       ? "font-bold"
                                       : ""
                                 }`}
                              >
                                 {section.totalGrowth.current}
                              </td>
                              <td
                                 className={`border-b py-2 ${
                                    section.totalGrowth.target
                                       ? "font-bold"
                                       : ""
                                 }`}
                              >
                                 {section.totalGrowth.target}
                              </td>
                              <td
                                 className={`border-b py-2 ${
                                    section.totalGrowth.proposed
                                       ? "font-bold"
                                       : ""
                                 }`}
                              >
                                 {section.totalGrowth.proposed}
                              </td>
                           </tr>
                        )}
                        {section.total && (
                           <tr key={`total`}>
                              <td className="border-b py-2 pr-2 text-right font-bold">
                                 Total :
                              </td>
                              <td className="border-b py-2" />
                              <td className="border-b py-2" />
                              <td
                                 className={`border-b py-2 ${
                                    section.total.current ? "font-bold" : ""
                                 }`}
                              >
                                 {section.total.current}
                              </td>
                              <td
                                 className={`border-b py-2 ${
                                    section.total.target ? "font-bold" : ""
                                 }`}
                              >
                                 {section.total.target}
                              </td>
                              <td
                                 className={`border-b py-2 ${
                                    section.total.proposed ? "font-bold" : ""
                                 }`}
                              >
                                 {section.total.proposed}
                              </td>
                           </tr>
                        )}
                     </>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

const renderLegend = (props) => {
   const { payload } = props;
   const textMap = {
      proposedValue: "Proposed",
      profileValue: "Profile",
   };

   return (
      <ul className="flex items-center justify-end pb-8">
         {payload.map((entry, index) => (
            <li key={`item-${index}`} className="ml-4 flex items-center">
               <span
                  className="mr-1 inline-block h-3 w-3 rounded-sm"
                  style={{ backgroundColor: entry.color }}
               />
               <span>{textMap[entry.value]}</span>
            </li>
         ))}
      </ul>
   );
};

const AssetAllocationChart = ({ data }) => {
   return (
      <div className="asset-allocation-chart">
         <ResponsiveContainer width="100%" height={500}>
            <BarChart
               data={data}
               margin={{ top: 10, right: 5, bottom: 5, left: 0 }}
            >
               <CartesianGrid vertical={false} stroke="#e5e5e5" />
               <XAxis
                  height={100}
                  dataKey="display"
                  tickSize={0}
                  interval={0}
                  tickMargin={30}
                  angle={-45}
                  tick={{
                     fontSize: "10px",
                  }}
                  origin="start"
                  axisLine={false}
               />
               <YAxis
                  tickSize={0}
                  ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                  interval={0}
                  tickMargin={10}
                  tick={{ fontSize: "10px" }}
                  axisLine={false}
                  tickFormatter={(tick) => `${tick}%`}
               />
               <Tooltip
                  formatter={(value, name, props) => [
                     `${value}%`,
                     name.slice(0, -5),
                  ]}
                  cursor={{ fill: "#f5f5f5aa" }}
                  wrapperStyle={{
                     boxShadow: "0px 1px 2px 0px #00000035",
                     border: "0px",
                     borderRadius: 3,
                  }}
                  contentStyle={{
                     border: "0px",
                     borderRadius: 3,
                  }}
               />
               <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="square"
                  content={renderLegend}
               />
               <Bar
                  dataKey="proposedValue"
                  fill="#F2C3A7"
                  radius={[20, 20, 0, 0]}
               />
               <Bar
                  dataKey="profileValue"
                  fill="#6560A4"
                  radius={[20, 20, 0, 0]}
               />
            </BarChart>
         </ResponsiveContainer>
      </div>
   );
};

const AssetAllocationPage = ({ data }) => {
   const { display, table, chart } = data.attributes.pageData;

   return (
      <Card
         title={data.attributes.title}
         className="overflow-y-auto"
         id="proposedAssetAllocation"
      >
         <div className="flex h-full flex-col">
            <p className="mb-4 max-w-4xl">
               The following demonstrates the asset allocation of the proposed
               portfolio following the implementation of our advice and
               describes any significant variations from the agreed target.
            </p>
            <h3 className="text-md mb-2 font-bold">{display}</h3>
            <div className="grid h-full grid-cols-12 items-start gap-4">
               <div className="col-span-7">
                  <AssestAllocationTable data={table} />
               </div>
               <div className="col-span-5">
                  <AssetAllocationChart data={chart} />
                  <p className="mb-4 ml-8 max-w-4xl">
                     Based on your risk profile of High Growth and target asset
                     allocation, your proposed portfolio is aligned within your
                     target split between Growth and Defensive assets and the
                     recommended minimum and maximum allocation for each asset
                     class.
                  </p>
               </div>
            </div>
         </div>
      </Card>
   );
};

export default AssetAllocationPage;
