import { Disclosure } from "@headlessui/react";
import React from "react";
import Card from "../components/Card";
import { ReactComponent as CheveronUpIcon } from "../assets/icons/chevron-up.svg";
import { formatMoney } from "../utils";

const ProductCostsSection = ({ data }) => {
  return (
    <Disclosure defaultOpen className="my-1">
      {({ open }) => (
        <>
          <Disclosure.Button className="mb-1 mt-3 flex w-full items-center rounded-sm py-1 pl-4 pr-5 transition-colors hover:bg-blue-100">
            <p className="mr-3 font-bold capitalize">{data.display}</p>
            <CheveronUpIcon
              className={`h-5 w-5 ${open ? "" : "rotate-180 transform"}`}
            />
          </Disclosure.Button>

          <Disclosure.Panel className="pb-2">
            <table className="w-full">
              <tbody>
                {data.fees.map(item => (
                  <tr key={item.id}>
                    <td className="border-b border-solid border-blueGray-300 py-2 pl-4">
                      {item.display}
                    </td>
                    <td
                      className={`w-48 border-b border-solid border-blueGray-300 py-2 pr-5 text-right`}
                    >
                      {formatMoney(item.weight, 2, 2)}%
                    </td>
                    <td
                      className={`w-48 border-b border-solid border-blueGray-300 py-2 pr-5 text-right`}
                    >
                      {formatMoney(item.value, 2, 2, "currency")}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <td className="border-b border-solid border-blueGray-300 py-2 pl-4 text-right">
                    Sub Total:
                  </td>
                  <td
                    className={`w-48 border-b border-solid border-blueGray-300 py-2 pr-5 text-right`}
                  >
                    {formatMoney(data.totalPercentage, 2, 2)}%
                  </td>
                  <td
                    className={`w-48 border-b border-solid border-blueGray-300 py-2 pr-5 text-right`}
                  >
                    {formatMoney(data.totalValue, 2, 2, "currency")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const ProductCostsPage = ({ data }) => {
  const { portfolios } = data.attributes.pageData;

  return (
    <Card title={data.attributes.title} className="overflow-y-auto">
      <img
        src="images/header_6.jpeg"
        alt="Header"
        className="mb-6 h-40 w-full rounded-md object-cover"
      />
      <p className="mb-4">
        Various costs are also payable to product and service providers to cover
        expenses associated with buying, disposing or administering a product.
        The table below shows the key product costs associated with our advice.
      </p>
      <div className="mx-auto mb-4 max-h-full max-w-7xl rounded-md bg-gradient-to-r from-blue-100 via-blue-50 p-4">
        <div className="flex flex-col">
          <div
            className={`flex flex-row justify-end rounded-sm bg-blue-200 py-1 pl-4 pr-5`}
          >
            <h3 className="text-md mr-auto font-bold capitalize">
              Fee and Charges
            </h3>
            <p className="text-md w-48 text-right font-bold">Ongoing</p>
            <p className="text-md w-48 text-right font-bold"></p>
          </div>
          {portfolios.map((portfolio, i) => (
            <ProductCostsSection key={i} data={portfolio} />
          ))}
        </div>
      </div>
      <ul className="my-4 ml-4 list-disc">
        <li>
          Please refer to the 'Explanatory notes' section for information
          relating to the notations included in this table.
        </li>
      </ul>
    </Card>
  );
};

export default ProductCostsPage;
