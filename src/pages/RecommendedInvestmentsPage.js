import React from "react";
import { Disclosure } from "@headlessui/react";
import Card from "../components/Card";
import { ReactComponent as CheveronUpIcon } from "../assets/icons/chevron-up.svg";
import { formatMoney } from "../utils";

const colors = {
  buy: {
    bg: "bg-green-200",
    text: "text-green-400",
  },
  sell: {
    bg: "bg-red-200",
    text: "text-red-400",
  },
};

const InvestmentsCardSection = ({ data, type }) => {
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
                      className={`border-b border-solid border-blueGray-300 py-2 pr-5 text-right ${colors[type].text} w-32`}
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
                    className={`border-b border-solid border-blueGray-300 py-2 pr-5 text-right ${colors[type].text} w-32`}
                  >
                    {formatMoney(data.total, 2, 2, "currency")}
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

const InvestmentsCard = ({ type, data }) => {
  return (
    <div className="max-h-full rounded-md bg-gradient-to-r from-blue-100 via-blue-50 p-4">
      <div className="flex flex-col">
        <div
          className={`flex flex-row justify-between ${colors[type].bg} rounded-sm py-1 pl-4 pr-5`}
        >
          <div>
            <h3 className="text-md font-bold capitalize">{type}</h3>
          </div>
          <p className="text-md font-bold">Amount</p>
        </div>
        {data.map(section => (
          <InvestmentsCardSection
            key={section.owner}
            data={section}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

const RecommendedInvestmentsPage = ({ data }) => {
  const { buy, sell } = data.attributes.pageData;

  return (
    <Card title={data.attributes.title} className="overflow-y-auto">
      <div className="flex h-full flex-col">
        <img
          src="images/header_4.jpeg"
          alt="Header"
          className="mb-6 h-40 w-full rounded-md object-cover object-top"
        />
        <p className="mb-4">
          After careful consideration of your needs, goals and investment
          preferences, we recommend the following investments which we believe
          are suitable for you:
        </p>
        <div className="grid h-full grid-cols-2 items-start gap-4">
          <InvestmentsCard type="sell" data={sell} />
          <InvestmentsCard type="buy" data={buy} />
        </div>
      </div>
    </Card>
  );
};

export default RecommendedInvestmentsPage;
