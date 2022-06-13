import React from "react";
import { ResponsivePie } from "@nivo/pie";
import Card from "../components/Card";
import { formatMoney } from "../utils";

const PersonalRiskInsurance = ({ data }) => {
  const { riskInsurances } = data.attributes.pageData;

  return (
    <>
      <Card title={data.attributes.title} className="overflow-y-auto">
        {riskInsurances.map((riskInsurance, idx) => {
          return (
            <div
              key={idx}
              className="mb-4 grid grid-cols-2 rounded-xl border bg-white p-4 shadow"
              style={{ bordrBottomWidth: "1px" }}
            >
              <div className="flex flex-col border-r border-blueGray-300 pr-4">
                <h3 className="text-xl">{riskInsurance.provider}</h3>
                <div style={{ maxHeight: 400 }} className="flex-1">
                  <ResponsivePie
                    data={riskInsurance.covers}
                    id="cover"
                    value="amount"
                    valueFormat={value => formatMoney(value, 2, 2, "currency")}
                    colors={["#19C3A8", "#4FCCC6"]}
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
              </div>
              <div className="pl-4">
                <div className="bg-blue-100 py-1 px-2 font-bold">
                  {riskInsurance.type}
                </div>
                <div className="mb-4 grid w-max grid-flow-row grid-cols-2 gap-4 p-2">
                  <p>Owner</p>
                  <p className="ml-4 text-gray-500">{riskInsurance.owner}</p>

                  <p>Premium Structure</p>
                  <p className="ml-4 text-gray-500">
                    {riskInsurance.premiumStructure || "N/A"}
                  </p>

                  <p>Policy Details</p>
                  <p className="ml-4 text-gray-500">
                    {riskInsurance.policyDetails || "N/A"}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 bg-blue-100 py-1 px-2 font-bold">
                  <p>Cover</p>
                  <p>Amount</p>
                  <p>Life Insured</p>
                </div>
                <div className="grid grid-cols-3 gap-4 p-2">
                  {riskInsurance.covers.map(cover => (
                    <>
                      <p>{cover.cover}</p>
                      <p className="text-gray-500">
                        {formatMoney(cover.amount, 0, 0, "currency")}
                      </p>
                      <p className="text-gray-500">{cover.owner}</p>
                    </>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    </>
  );
};

export default PersonalRiskInsurance;
