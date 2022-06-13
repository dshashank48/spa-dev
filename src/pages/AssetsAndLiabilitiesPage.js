import { ResponsivePie } from "@nivo/pie";
import React from "react";
import { ReactComponent as DollarIcon } from "../assets/icons/dollar.svg";
import Card from "../components/Card";
import { formatMoney } from "../utils";

const AssetsAndLiabilitiesPage = ({ data }) => {
   const { assets, liabilities, netAsset, assetBreakdown } =
      data.attributes.pageData;

   const totalAsset = assetBreakdown.lifestyle + assetBreakdown.investment;
   const lifestylePercentage = (assetBreakdown.lifestyle / totalAsset) * 100;
   const investmentPercentage = (assetBreakdown.investment / totalAsset) * 100;

   return (
      <div className="grid h-full grid-cols-2 gap-4">
         <Card
            section="assets"
            title="Assets"
            titleExtra={formatMoney(assets.total, 2, 2, "currency")}
         >
            <div className="flex h-full items-center justify-center">
               <div className="flex h-full max-h-80 w-full flex-col">
                  <div className="flex-1">
                     <ResponsivePie
                        data={assets.breakdown}
                        id="display"
                        valueFormat={(value) =>
                           formatMoney(value, 2, 2, "currency")
                        }
                        colors={[
                           "#0043CF",
                           "#012D9C",
                           "#0E61FE",
                           "#4589FE",
                           "#79A9FF",
                           "#D1E1FF",
                        ]}
                        margin={{ top: 20, right: 40, bottom: 40, left: 40 }}
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
                        enableArcLabels={false}
                        motionConfig="default"
                     />
                  </div>

                  <div className="text-md flex px-4">
                     {assets.totalClient ? (
                        <>
                           <strong className="mr-3">Client: </strong>{" "}
                           <p className="mr-8">
                              {formatMoney(
                                 assets.totalClient,
                                 2,
                                 2,
                                 "currency"
                              )}
                           </p>
                        </>
                     ) : null}
                     {assets.totalPartner ? (
                        <>
                           <strong className="mr-3">Partner: </strong>{" "}
                           <p className="mr-8">
                              {formatMoney(
                                 assets.totalPartner,
                                 2,
                                 2,
                                 "currency"
                              )}
                           </p>
                        </>
                     ) : null}
                     {assets.totalJoint ? (
                        <>
                           <strong className="mr-3">Joint: </strong>{" "}
                           <p>
                              {formatMoney(assets.totalJoint, 2, 2, "currency")}
                           </p>
                        </>
                     ) : null}
                  </div>
               </div>
            </div>
         </Card>
         <Card
            section="liabilities"
            title="Liabilities"
            titleExtra={formatMoney(liabilities.total, 2, 2, "currency")}
         >
            <div className="flex h-full items-center justify-center">
               <div className="flex h-full max-h-80 w-full flex-col">
                  <div className="flex-1">
                     {liabilities.breakdown?.length ? (
                        <ResponsivePie
                           data={liabilities.breakdown}
                           id="display"
                           valueFormat={(value) =>
                              formatMoney(value, 2, 2, "currency")
                           }
                           colors={["#4A1E8C", "#E8DBFE", "#BE95FF"]}
                           margin={{ top: 20, right: 40, bottom: 40, left: 40 }}
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
                           enableArcLabels={false}
                           motionConfig="default"
                        />
                     ) : (
                        <h1 className="pt-24 text-center text-5xl">
                           No Liabilities
                        </h1>
                     )}
                  </div>

                  <div className="text-md flex w-full px-4">
                     {liabilities.totalClient ? (
                        <>
                           <strong className="mr-3">Client: </strong>{" "}
                           <p className="mr-8">
                              {formatMoney(
                                 liabilities.totalClient,
                                 2,
                                 2,
                                 "currency"
                              )}
                           </p>
                        </>
                     ) : null}
                     {liabilities.totalPartner ? (
                        <>
                           <strong className="mr-3">Partner: </strong>{" "}
                           <p className="mr-8">
                              {formatMoney(
                                 liabilities.totalPartner,
                                 2,
                                 2,
                                 "currency"
                              )}
                           </p>
                        </>
                     ) : null}
                     {liabilities.totalJoint ? (
                        <>
                           <strong className="mr-3">Joint: </strong>{" "}
                           <p>
                              {formatMoney(
                                 liabilities.totalJoint,
                                 2,
                                 2,
                                 "currency"
                              )}
                           </p>
                        </>
                     ) : null}
                  </div>
               </div>
            </div>
         </Card>

         <Card section="assetBreakdown" title="Asset Breakdown">
            <div className="flex h-full items-center justify-center">
               <div
                  className="mx-auto grid w-full grid-flow-row items-center gap-y-4 gap-x-8 px-8"
                  style={{ gridTemplateColumns: "auto 1fr auto" }}
               >
                  <strong>Lifestyle Assets</strong>
                  <div className="relative h-5 w-full overflow-hidden rounded-md bg-yellow-100">
                     <div
                        className="absolute left-0 top-0 bottom-0 bg-yellow-400"
                        style={{ width: `${lifestylePercentage}%` }}
                     />
                  </div>
                  <p className="text-right">
                     ${formatMoney(assetBreakdown.lifestyle)}
                  </p>
                  <strong>Investment Assets</strong>
                  <div className="relative h-5 w-full overflow-hidden rounded-md bg-indigo-100">
                     <div
                        className="absolute left-0 top-0 bottom-0 bg-indigo-600"
                        style={{ width: `${investmentPercentage}%` }}
                     />
                  </div>
                  <p className="text-right">
                     ${formatMoney(assetBreakdown.investment)}
                  </p>
               </div>
            </div>
         </Card>
         <Card section="netAsset" title="Net Asset">
            <div className="flex h-full items-center justify-center">
               <div className="mr-3 rounded-full bg-blue-100 p-7 text-blue-600">
                  <DollarIcon className="h-7 w-7" />
               </div>
               <p className="text-4xl font-bold">
                  {formatMoney(netAsset.value, 2, 2)}
               </p>
            </div>
         </Card>
      </div>
   );
};

export default AssetsAndLiabilitiesPage;
