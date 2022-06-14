import React from "react";
import Card from "../components/Card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getDGDisplayName } from "../utils";
import { formatMoney } from "../utils";

const CoAInitialPage = ({ data }) => {
   const { preambleMarkdown, table } = data.attributes.pageData;

   // fetch DG display name
   const dgDisplayName = getDGDisplayName();
   // console.log(`Fetched from function: ${dgDisplayName}`)

   return (
      <Card
         title={data.attributes.title}
         className="overflow-y-auto"
         id="costOfAdviceInitial"
      >
         <img
            src="images/header_8.jpeg"
            alt="Header"
            className="mb-6 h-40 w-full rounded-md object-cover"
            style={{ objectPosition: "0% 45%" }}
         />
         {preambleMarkdown?.map((p, idx) => (
            <ReactMarkdown
               key={idx}
               children={p}
               remarkPlugins={[remarkGfm]}
               className="prose mb-6 max-w-7xl"
            />
         ))}
         <h3 className="text-md mb-2 font-bold">Initial Advice</h3>
         <div className="mx-auto mb-4 max-h-full rounded-md bg-gradient-to-r from-blue-100 via-blue-50 p-4">
            <div className="flex flex-col">
               <div
                  className={`flex flex-row items-center justify-end rounded-sm bg-blue-200 pl-4`}
               >
                  <p className="text-md mr-auto font-bold capitalize">
                     Description
                  </p>
                  <p className="text-md mr-2 w-32 text-center font-bold">
                     Percentage
                  </p>
                  <div className="text-md mr-2 grid w-72 grid-cols-2 gap-2 whitespace-nowrap bg-blue-300 py-1 px-2 text-center font-bold">
                     <p className="col-span-2">Amounts payable to us</p>
                     <p className="col-span-1">Paid by you</p>
                     <p className="col-span-1">Paid via product</p>
                  </div>
                  <div className="text-md grid w-72 grid-cols-2 gap-2 whitespace-nowrap bg-blue-300 py-1 px-2 text-center font-bold">
                     <p className="col-span-2">Amounts payable by us</p>
                     <p className="col-span-1">{dgDisplayName}</p>
                     <p className="col-span-1">CAR</p>
                  </div>
               </div>

               {table?.items?.map((item, idx) => {
                  return (
                     <div
                        key={idx}
                        className="flex w-full flex-row items-center justify-end border-b py-1 pl-4"
                     >
                        <p className="text-md mr-auto capitalize">
                           {item.display}
                        </p>
                        <p className="text-md mr-2 w-32 text-center">
                           {item.percentage ? `${item.percentage}` : "-"}
                        </p>
                        <div className="text-md mr-2 grid w-72 grid-cols-2 gap-2 whitespace-nowrap py-1 px-2 text-center">
                           <p className="col-span-1">
                              {item.paidByYou
                                 ? formatMoney(item.paidByYou, 2, 2, "currency")
                                 : ""}
                           </p>
                           <p className="col-span-1">
                              {item.paidByProduct
                                 ? formatMoney(
                                      item.paidByProduct,
                                      2,
                                      2,
                                      "currency"
                                   )
                                 : "-"}
                           </p>
                        </div>
                        <div className="text-md grid w-72 grid-cols-2 gap-2 whitespace-nowrap py-1 px-2 text-center">
                           <p className="col-span-1">
                              {item.retainedByDealerGroup
                                 ? formatMoney(
                                      item.retainedByDealerGroup,
                                      2,
                                      2,
                                      "currency"
                                   )
                                 : "-"}
                           </p>
                           <p className="col-span-1">
                              {item.retainedByCar
                                 ? formatMoney(
                                      item.retainedByCar,
                                      2,
                                      2,
                                      "currency"
                                   )
                                 : "-"}
                           </p>
                        </div>
                     </div>
                  );
               })}

               <div className="flex w-full flex-row items-center justify-end border-b py-1 pl-4  font-bold">
                  <p className="text-md mr-auto capitalize"></p>
                  <p className="text-md mr-2 w-32 text-center">Sub total:</p>
                  <div className="text-md mr-2 grid w-72 grid-cols-2 gap-2 whitespace-nowrap py-1 px-2 text-center">
                     <p className="col-span-1">
                        {table?.subTotal?.paidByYou
                           ? formatMoney(
                                table?.subTotal?.paidByYou,
                                2,
                                2,
                                "currency"
                             )
                           : ""}
                     </p>
                     <p className="col-span-1">
                        {table?.subTotal?.paidByProduct
                           ? formatMoney(
                                table?.subTotal?.paidByProduct,
                                2,
                                2,
                                "currency"
                             )
                           : "-"}
                     </p>
                  </div>
                  <div className="text-md grid w-72 grid-cols-2 gap-2 whitespace-nowrap py-1 px-2 text-center">
                     <p className="col-span-1">
                        {table?.subTotal?.retainedByDealerGroup
                           ? formatMoney(
                                table?.subTotal?.retainedByDealerGroup,
                                2,
                                2,
                                "currency"
                             )
                           : "-"}
                     </p>
                     <p className="col-span-1">
                        {table?.subTotal?.retainedByCar
                           ? formatMoney(
                                table?.subTotal?.retainedByCar,
                                2,
                                2,
                                "currency"
                             )
                           : "-"}
                     </p>
                  </div>
               </div>

               <div className="flex w-full flex-row items-center justify-end border-b py-1 pl-4  font-bold">
                  <p className="text-md mr-auto capitalize"></p>
                  <p className="text-md mr-2 w-32 text-center">Total:</p>
                  <p className="text-md mr-2 w-72 whitespace-nowrap rounded-sm bg-blue-200 py-1 px-2 text-center">
                     {table?.total?.payable
                        ? formatMoney(table?.total?.payable, 2, 2, "currency")
                        : ""}
                  </p>
                  <p className="text-md w-72 whitespace-nowrap rounded-sm bg-blue-200 py-1 px-2 text-center">
                     {table?.total?.retained
                        ? formatMoney(table?.total?.retained, 2, 2, "currency")
                        : "-"}
                  </p>
               </div>
            </div>
         </div>
      </Card>
   );
};

export default CoAInitialPage;
