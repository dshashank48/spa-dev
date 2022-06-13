import { Disclosure } from "@headlessui/react";
import React from "react";
import Card from "../components/Card";
import { ReactComponent as CheveronUpIcon } from "../assets/icons/chevron-up.svg";
import { formatMoney } from "../utils";

const ProposedPortfolioSection = ({ data }) => {
  return (
    <Disclosure defaultOpen className="my-1">
      {({ open }) => (
        <>
          <Disclosure.Button className="mb-1 mt-3 flex w-full items-center rounded-sm py-1 pl-4 pr-5 transition-colors hover:bg-blue-100">
            <p className="mr-3 font-normal capitalize">{data.owner}</p>
            <CheveronUpIcon
              className={`h-5 w-5 ${open ? "" : "rotate-180 transform"}`}
            />
          </Disclosure.Button>

          <Disclosure.Panel className="pb-2">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="pb-2 pl-4 text-left">{data.display}</th>
                  <th className="w-32 pb-2 pr-5"></th>
                </tr>
              </thead>
              <tbody>
                {data.values.map(item => (
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
                    Total:
                  </td>
                  <td
                    className={`w-48 border-b border-solid border-blueGray-300 py-2 pr-5 text-right`}
                  >
                    {formatMoney(data.totalWeight, 2, 2)}%
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

const ProposedPortfolioPage = ({ data }) => {
  const { portfolios } = data.attributes.pageData;

  return (
    <Card title={data.attributes.title} className="overflow-y-auto">
      <img
        src="images/header_5.jpeg"
        alt="Header"
        className="mb-6 h-40 w-full rounded-md object-cover"
      />
      <p className="mb-4">
        Your portfolio will be comprised of the following investments:
      </p>
      <div className="max-h-full rounded-md bg-gradient-to-r from-blue-100 via-blue-50 p-4">
        <div className="flex flex-col">
          <div
            className={`flex flex-row justify-end rounded-sm bg-blue-200 py-1 pl-4 pr-5`}
          >
            <h3 className="text-md mr-auto font-bold capitalize">Product</h3>
            <p className="text-md w-48 text-right font-bold">Weight</p>
            <p className="text-md w-48 text-right font-bold">Value</p>
          </div>
          {portfolios.map((portfolio, i) => (
            <ProposedPortfolioSection key={i} data={portfolio} />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProposedPortfolioPage;
