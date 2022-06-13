import React from "react";
import Card from "../components/Card";

const SwitchAnalysisPage = ({ data }) => {
  const { table } = data.attributes.pageData;

  return (
    <Card title={data.attributes.title} className="overflow-y-auto">
      <img
        src="images/header_7.jpeg"
        alt="Header"
        className="mb-6 h-40 w-full rounded-md object-cover"
      />
      <p className="mb-4">
        The table below shows the costs of your existing portfolio and what
        costs will apply in our recommended portfolio, based on our research.
        Amounts shown are estimates which may differ due to the timing of
        transactions.
      </p>
      <div className="mx-auto mb-4 max-h-full max-w-7xl rounded-md bg-gradient-to-r from-blue-100 via-blue-50 p-4">
        <div className="flex flex-col">
          <div
            className={`flex flex-row justify-end rounded-sm bg-blue-200 py-1 pl-4 pr-5`}
          >
            <h3 className="text-md mr-auto font-bold capitalize">
              {table?.display}
            </h3>
            <p className="text-md w-48 text-right font-bold">Existing</p>
            <p className="text-md w-48 text-right font-bold">Proposed</p>
          </div>

          <table className="w-full">
            <tbody>
              <tr>
                <td className="border-b border-solid border-blueGray-300 py-2 pl-4">
                  Fund Balance
                </td>
                <td
                  className={`w-48 border-b border-solid border-blueGray-300 py-2 pr-5 text-right`}
                >
                  {table?.fundBalance?.existing}
                </td>
                <td
                  className={`w-48 border-b border-solid border-blueGray-300 py-2 pr-5 text-right`}
                >
                  {table?.fundBalance?.proposed}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mb-1 mt-3 flex w-full items-center rounded-sm py-1 pl-4 pr-5">
            <p className="mr-3 font-bold capitalize">Initial costs</p>
          </div>
          <table className="w-full">
            <tbody>
              {table?.initial?.fees?.map(fee => (
                <tr key={fee.id}>
                  <td className="border-b border-solid border-blueGray-300 py-2 pl-4">
                    {fee.display}
                  </td>
                  <td
                    className={`w-48 border-b border-solid border-blueGray-300 py-2 pr-5 text-right`}
                  >
                    {fee.existing}
                  </td>
                  <td
                    className={`w-48 border-b border-solid border-blueGray-300 py-2 pr-5 text-right`}
                  >
                    {fee.proposed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-1 mt-3 flex w-full items-center rounded-sm py-1 pl-4 pr-5">
            <p className="mr-3 font-bold capitalize">Ongoing fees / costs</p>
          </div>
          <table className="w-full">
            <tbody>
              {table?.ongoing?.fees?.map(fee => (
                <tr key={fee.id}>
                  <td className="border-b border-solid border-blueGray-300 py-2 pl-4">
                    {fee.display}
                  </td>
                  <td
                    className={`w-48 border-b border-solid border-blueGray-300 py-2 pr-5 text-right`}
                  >
                    {fee.existing}
                  </td>
                  <td
                    className={`w-48 border-b border-solid border-blueGray-300 py-2 pr-5 text-right`}
                  >
                    {fee.proposed}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td className="border-b border-solid border-blueGray-300 py-2 pl-4 text-right">
                  Total ongoing fees:
                </td>
                <td
                  className={`w-48 border-b border-solid border-blueGray-300 py-2 pr-5 text-right`}
                >
                  {table?.ongoing?.totalExisting}
                </td>
                <td
                  className={`w-48 border-b border-solid border-blueGray-300 py-2 pr-5 text-right`}
                >
                  {table?.ongoing?.totalProposed}
                </td>
              </tr>
            </tfoot>
          </table>
          <table className="w-full">
            <tbody>
              <tr>
                <td
                  className={`border-b border-solid border-blueGray-300 py-2 pl-4 font-bold`}
                >
                  Difference in costs:{" "}
                  <span
                    className={
                      table.difference.toLowerCase().includes("less")
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {table?.difference}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ul className="my-4 ml-4 list-disc">
        {table?.notes?.map((note, idx) => (
          <li key={idx}>{note}</li>
        ))}
      </ul>
    </Card>
  );
};

export default SwitchAnalysisPage;
