import React from "react";
import Card from "../components/Card";

// shuffleCost formats text as follows: (0.48%) $1,018.88	(if percentage non-empty) or $1,018.88	(if percentage empty)
const shuffleCost = cost => {
  let [amount, percentage] = cost.split(" ");
  let _amount = `${amount}`;
  let _percentage = percentage?.slice(1, -1) || "";
  let _formatted_percentage = ""
  // only show percentage if non-empty
  if (_percentage) {
    _formatted_percentage = `(${_percentage})`;
  }

  return `${_formatted_percentage} ${_amount}`;
};

const parseTable = table => {
  let rows = [];
  let header = [table.header.description, ...table.header.columns];
  let boldIndices = [];

  table.default.forEach(item => {
    rows.push([item.description, ...item.columns]);
  });
  boldIndices.push(rows.length);
  rows.push(["Initial Costs", ""]);

  table.initial.items.forEach(item => {
    rows.push([item.description, ...item.columns]);
  });

  boldIndices.push(rows.length);
  rows.push([table.initial.total.description, ...table.initial.total.columns]);

  boldIndices.push(rows.length);
  rows.push(["Ongoing Fees / Costs", ""]);

  table.ongoing.items.forEach(item => {
    rows.push([item.description, ...item.columns.map(shuffleCost)]);
  });

  boldIndices.push(rows.length);
  rows.push([
    table.ongoing.total.description,
    ...table.ongoing.total.columns.map(shuffleCost),
  ]);

  return { header, rows, boldIndices };
};

const WealthProductPage = ({ data }) => {
  const { table } = data.attributes.pageData;

  const { header, rows, boldIndices } = parseTable(table);
  const noOfColumns = table.header.columns.length;

  return (
    <Card
      title="Replacement of wealth products"
      className="overflow-y-auto overflow-x-hidden"
    >
      <p className="mb-2 text-xl">
        Comparison of existing and recommended wealth products
      </p>
      <p className="mb-4">
        The following table compares the costs of your existing and recommended
        products.
      </p>

      <div className=" rounded-md bg-gradient-to-r from-blue-100 via-blue-50 p-4">
        <div className="relative w-full overflow-x-auto">
          <table>
            <thead>
              <tr>
                {header.map((item, i) => (
                  <th
                    key={i}
                    className={`mb-1 bg-blue-200 py-1 px-4  ${
                      i === 0
                        ? "sticky left-0 bg-blue-100 text-left"
                        : "text-right"
                    }`}
                    style={{ minWidth: i === 0 ? 300 : 200 }}
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {row.map((item, j) => (
                    <td
                      key={j}
                      className={`border-b border-solid border-blueGray-300 py-1 px-4 ${
                        j === 0
                          ? "sticky left-0 bg-blue-100 text-left"
                          : "text-right"
                      } ${boldIndices.includes(i) ? "font-bold" : ""}`}
                      style={{ minWidth: j === 0 ? 300 : 200 }}
                      colSpan={item ? 1 : noOfColumns}
                    >
                      {item || " "}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ul className="my-4 ml-4 list-disc">
        <li>
          * Please refer to the 'Explanatory notes' section for information
          relating to the notations included in this table.
        </li>
      </ul>
    </Card>
  );
};

export default WealthProductPage;
