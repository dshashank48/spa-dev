import { ResponsivePie } from "@nivo/pie";
import React from "react";
import { ReactComponent as DollarIcon } from "../assets/icons/dollar.svg";
import Card from "../components/Card";
import { formatMoney } from "../utils";

const OverviewPage = ({ data }) => {
  const { basicDetails, netCashflow, income, expenses } =
    data.attributes.pageData;

  const partnerExists = Boolean(basicDetails?.partner?.dob);

  return (
    <div className="grid h-full grid-cols-2 gap-4">
      <Card section="basicDetails" title="Basic Details">
        <div className="flex h-full items-center justify-center">
          <div className="mx-auto grid w-max grid-flow-row grid-cols-3 gap-4">
            <strong>Date Of birth:</strong>
            <p>{basicDetails?.client?.dob} (Client)</p>
            <p>
              {partnerExists ? `${basicDetails?.partner?.dob} (Partner)` : null}
            </p>
            <strong>Martial Status:</strong>
            <p>{basicDetails?.client?.marraige}</p>
            <p>{basicDetails?.partner?.marraige}</p>
            <strong>Employment:</strong>
            <p>{basicDetails?.client?.employment}</p>
            <p>{basicDetails?.partner?.employment}</p>
            <strong>Job Title:</strong>
            <p>{basicDetails?.client?.jobTitle}</p>
            <p>{basicDetails?.partner?.jobTitle}</p>
          </div>
        </div>
      </Card>
      <Card section="netCashflow" title="Net Cashflow">
        <div className="flex h-full items-center justify-center">
          <div className="mr-3 rounded-full bg-blue-100 p-7 text-blue-600">
            <DollarIcon className="h-7 w-7" />
          </div>
          <p className="text-4xl font-bold">
            {formatMoney(netCashflow.value, 2, 2)}
          </p>
        </div>
      </Card>
      <Card
        section="income"
        title="Income"
        titleExtra={formatMoney(income.total, 2, 2, "currency")}
      >
        <div className="flex h-full items-center justify-center">
          <div className="flex h-full max-h-80 w-full flex-col">
            <div className="flex-1">
              <ResponsivePie
                data={income.breakdown}
                id="display"
                valueFormat={value => formatMoney(value, 2, 2, "currency")}
                colors={["#4FCBC6", "#027D78", "#18C3A8"]}
                margin={{ top: 20, right: 40, bottom: 40, left: 40 }}
                innerRadius={0.5}
                padAngle={1.5}
                activeOuterRadiusOffset={8}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                enableArcLabels={false}
                motionConfig="default"
              />
            </div>

            <div className="text-md flex w-full px-4">
              <strong className="mr-3">Client: </strong>{" "}
              <p className="mr-8">
                {formatMoney(income.totalClient, 2, 2, "currency")}
              </p>
              {partnerExists ? (
                <>
                  <strong className="mr-3">Partner: </strong>{" "}
                  <p>{formatMoney(income.totalPartner, 2, 2, "currency")}</p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </Card>
      <Card
        section="expenses"
        title="Expenses"
        titleExtra={formatMoney(expenses.total, 2, 2, "currency")}
      >
        <div className="flex h-full items-center justify-center">
          <div className="flex h-full max-h-80 w-full flex-col">
            <div className="flex-1">
              <ResponsivePie
                data={expenses.breakdown}
                id="display"
                valueFormat={value => formatMoney(value, 2, 2, "currency")}
                colors={["#FF7EB6", "#D1276F"]}
                margin={{ top: 20, right: 40, bottom: 40, left: 40 }}
                innerRadius={0.5}
                padAngle={1.5}
                activeOuterRadiusOffset={8}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                enableArcLabels={false}
                motionConfig="default"
              />
            </div>

            <div className="text-md flex px-4">
              <strong className="mr-3">Client: </strong>{" "}
              <p className="mr-8">
                {formatMoney(expenses.totalClient, 2, 2, "currency")}
              </p>
              {partnerExists ? (
                <>
                  <strong className="mr-3">Partner: </strong>{" "}
                  <p>{formatMoney(expenses.totalPartner, 2, 2, "currency")}</p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OverviewPage;
