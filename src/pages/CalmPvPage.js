import { startCase } from "lodash";
import { useEffect, useMemo, useState } from "react";
import ReactSlider from "react-slider";
import {
   Area,
   Bar,
   CartesianGrid,
   ComposedChart,
   Label,
   Legend,
   Line,
   ResponsiveContainer,
   Tooltip,
   XAxis,
   YAxis,
} from "recharts";
import Card from "../components/Card";
import { formatMoney, kFormatter } from "../utils";

const renderLegend = (props) => {
   const { payload } = props;
   const textMap = {
      age: "Age",
      netAssets: "Net Assets (excl Non Fin Assets)",
      expenditure: "Expenditure (inc Tax)",
      income: "Income and Capital Drawdown",
   };

   return (
      <ul className="flex items-center justify-center py-8">
         {payload.map((entry, index) => (
            <li key={`item-${index}`} className="ml-4 flex items-center ">
               <span
                  className="mr-1 inline-block h-3 w-3 rounded-sm"
                  style={{ backgroundColor: entry.color }}
               />
               <span className="text-xs text-gray-500">
                  {textMap[entry.value]}
               </span>
            </li>
         ))}
      </ul>
   );
};

const getMinimum = (array) => {
   let min = array[0];
   for (let i = 0; i < array.length; i++) {
      if (array[i] < min) {
         min = array[i];
      }
   }
   return min;
};

const getMaximum = (array) => {
   let max = array[0];
   for (let i = 0; i < array.length; i++) {
      if (array[i] > max) {
         max = array[i];
      }
   }
   return max;
};

const CalmPvPage = ({ data }) => {
   const minAge = useMemo(
      () => getMinimum(data.attributes.pageData.chart.map((item) => item.age)),
      [data.attributes.pageData.chart]
   );

   const maxAge = useMemo(
      () => getMaximum(data.attributes.pageData.chart.map((item) => item.age)),
      [data.attributes.pageData.chart]
   );

   const [ageLowerBound, setAgeLowerBound] = useState();
   const [ageUpperBound, setAgeUpperBound] = useState();

   useEffect(() => {
      setAgeLowerBound(minAge);
   }, [minAge]);

   useEffect(() => {
      setAgeUpperBound(maxAge);
   }, [maxAge]);

   const chartData = data.attributes.pageData.chart.filter(
      (item) => item.age >= ageLowerBound && item.age <= ageUpperBound
   );

   return (
      <Card
         title={data.attributes.title}
         className="overflow-y-auto"
         id="calmPv"
      >
         <h4 className="mb-8 text-center text-sm font-semibold">
            Cashflow, Assets & Liabilities (Discounted by CPI)
         </h4>
         <ResponsiveContainer width="100%" height={500}>
            <ComposedChart
               data={chartData}
               margin={{ top: 10, right: 40, bottom: 10, left: 40 }}
            >
               <XAxis dataKey="age">
                  <Label
                     value="Age"
                     fill="rgb(107, 114, 128)"
                     offset={0}
                     position="bottom"
                  />
               </XAxis>
               <YAxis
                  dataKey="netAssets"
                  yAxisId={1}
                  tickFormatter={(value) => kFormatter(value)}
               >
                  <Label
                     fill="rgb(107, 114, 128)"
                     value="Net Assets (SPV)"
                     angle={-90}
                     offset={15}
                     position="left"
                  />
               </YAxis>
               <YAxis
                  dataKey="expenditure"
                  yAxisId={2}
                  orientation="right"
                  tickFormatter={(value) => kFormatter(value)}
               >
                  <Label
                     fill="rgb(107, 114, 128)"
                     value="Expenditure (SPV)"
                     angle={90}
                     offset={15}
                     position="right"
                  />
               </YAxis>
               <YAxis dataKey="income" yAxisId={3} hide />
               <CartesianGrid stroke="#f5f5f5" />
               <Tooltip
                  formatter={(value, name) => [
                     `${formatMoney(value, 0, 0, "currency")}`,
                     startCase(name),
                  ]}
                  labelFormatter={(value) => `Age: ${value}`}
                  cursor={{ fill: "#f5f5f5aa" }}
                  wrapperStyle={{
                     boxShadow: "0px 1px 2px 0px #00000035",
                     border: "0px",
                     borderRadius: 3,
                  }}
                  contentStyle={{
                     border: "0px",
                     borderRadius: 3,
                  }}
               />
               <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="square"
                  content={renderLegend}
               />
               <Area
                  yAxisId={1}
                  dataKey="netAssets"
                  type="monotone"
                  fill="#41B6D377"
                  stroke="#41B6D3"
               />
               <Line
                  yAxisId={2}
                  dataKey="expenditure"
                  type="monotone"
                  strokeWidth={2}
                  stroke="#FC486A"
                  dot={{ strokeWidth: 0, fill: "#FC486A" }}
               />
               <Bar
                  yAxisId={3}
                  dataKey="income"
                  fill="#74CC6E77"
                  stroke="#74CC6E"
               />
            </ComposedChart>
         </ResponsiveContainer>
         <div className="mx-auto w-full max-w-4xl">
            <p className="mb-2 text-center text-xs text-gray-400">
               Filter By Age
            </p>
            <ReactSlider
               className="mx-auto h-8 w-full max-w-4xl"
               thumbClassName="bg-gray-700 text-white w-6 h-6 text-xs flex items-center justify-center rounded-full cursor-pointer"
               trackClassName="bg-gray-400 h-2 rounded-full top-2"
               min={minAge}
               max={maxAge}
               value={[ageLowerBound, ageUpperBound]}
               ariaLabel={["Lower thumb", "Upper thumb"]}
               ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
               renderThumb={(props, state) => (
                  <div {...props}>{state.valueNow}</div>
               )}
               minDistance={5}
               snapDragDisabled
               onChange={([lower, upper]) => {
                  if (
                     typeof lower === "number" &&
                     lower >= minAge &&
                     lower <= maxAge
                  ) {
                     setAgeLowerBound(lower);
                  }
                  if (
                     typeof upper === "number" &&
                     upper >= minAge &&
                     upper <= maxAge
                  ) {
                     setAgeUpperBound(upper);
                  }
               }}
            />
         </div>
      </Card>
   );
};

export default CalmPvPage;
