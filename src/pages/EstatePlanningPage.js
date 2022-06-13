import React from "react";
import Card from "../components/Card";
import { ReactComponent as DollarIcon } from "../assets/icons/dollar.svg";
import { ReactComponent as LightningIcon } from "../assets/icons/lightning.svg";
import { ReactComponent as CreditCardIcon } from "../assets/icons/credit-card.svg";
import { ReactComponent as LineChartIcon } from "../assets/icons/line-chart.svg";

const Icon = ({ type }) => {
  switch (type) {
    case 0:
    case 4:
      return (
        <div className="inline-block rounded-full bg-indigo-100 p-2 text-indigo-500">
          <LightningIcon className="h-4 w-4" />
        </div>
      );

    case 1:
    case 5:
      return (
        <div className="inline-block rounded-full bg-teal-100 p-2 text-teal-500">
          <LineChartIcon className="h-4 w-4" />
        </div>
      );
    case 2:
    case 6:
      return (
        <div className="inline-block rounded-full bg-red-100 p-2 text-red-500">
          <CreditCardIcon className="h-4 w-4" />
        </div>
      );
    case 3:
      return (
        <div className="inline-block rounded-full bg-green-100 p-2 text-green-500">
          <DollarIcon className="h-4 w-4" />
        </div>
      );
    default:
      return null;
  }
};

const getValueClassName = value => {
  switch (value) {
    case "Yes":
      return "bg-teal-500";
    case "No":
      return "bg-blue-500";
    case "N/A":
      return "bg-gray-600";
    default:
      return "";
  }
};

const EstatePlanningPage = ({ data }) => {
  const { items } = data.attributes.pageData.options;

  return (
    <Card title={data.attributes.title} className="overflow-y-auto">
      <img
        src="images/header_2.jpeg"
        alt="Header"
        className="mb-6 h-40 w-full rounded-md object-cover"
      />
      <div
        className="grid grid-flow-col auto-rows-min grid-cols-2 gap-y-4 gap-x-12"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        <div
          className={`col-start-1 row-start-1 mr-4 grid grid-cols-3 items-center gap-x-12`}
          style={{ gridTemplateColumns: "1fr 64px 64px" }}
        >
          <div />
          <strong className="text-center">Client</strong>
          <strong className="text-center">Partner</strong>
        </div>
        <div
          className={`col-start-2 row-start-1 mr-4 grid grid-cols-3 items-center gap-x-12`}
          style={{ gridTemplateColumns: "1fr 64px 64px" }}
        >
          <div />
          <strong className="text-center">Client</strong>
          <strong className="text-center">Partner</strong>
        </div>
        {items.map((item, i) => {
          return (
            <div
              className={`mr-4 grid grid-cols-3 items-center gap-x-12 rounded-md bg-gradient-to-r from-blue-100 via-transparent py-4 ${
                i < 4 ? "col-start-1" : "col-start-2"
              }`}
              style={{ gridTemplateColumns: "1fr 64px 64px" }}
            >
              <div className="flex items-center pl-4">
                <Icon type={i} />
                <p className="pl-3">{item.display}</p>
              </div>
              <p
                className={`rounded-md px-2 py-1 text-center text-sm text-white ${getValueClassName(
                  item.clientValue
                )}`}
              >
                {item.clientValue}
              </p>
              <p
                className={`rounded-md px-2 py-1 text-center text-sm text-white ${getValueClassName(
                  item.partnerValue
                )}`}
              >
                {item.partnerValue}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default EstatePlanningPage;
