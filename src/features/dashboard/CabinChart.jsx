import styled from "styled-components";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useDarkMode } from "../../context/DarkModeContext";

import { generateAdditionalColors } from "../../utils/helpers";

import Heading from "../../ui/Heading";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  & .cabin-chart-custom-tooltip {
    background-color: var(--color-chart-tooltip-bg);
    padding: 1.2rem 1.6rem;
    border: 1px solid var(--color-grey-300);
  }
`;

const colorsLightMode = [
  "#ff4f9b",
  "#28c8de",
  "#0081c6",
  "#ff832b",
  "#34c034",
  "#ff3838",
  "#a75dfb",
];

const colorsDarkMode = [
  "#b82363",
  "#01a0ab",
  "#027fc2",
  "#b45a1a",
  "#228922",
  "#b02d2d",
  "#7b48b5",
];

function generateColorScheme(numColors, darkMode = false) {
  const colorPalette = darkMode ? colorsDarkMode : colorsLightMode;

  let generatedColors = [];

  if (numColors <= colorPalette.length) {
    generatedColors = colorPalette.slice(0, numColors);
  } else {
    generatedColors = generateAdditionalColors(colorPalette, numColors);
  }

  return generatedColors;
}

function generateCabinChartsData(cabins, bookings, darkMode = false) {
  const numCabins = cabins.length;
  const colors = generateColorScheme(numCabins, darkMode);

  return cabins
    .map((cabin, index) => ({
      cabinName: cabin.name,
      value: bookings.reduce(
        (acc, curr) => (curr.cabins.id === cabin.id ? acc + 1 : acc),
        0
      ),
      color: colors[index],
    }))
    .filter((cabin) => cabin.value);
}

function onlyOneCabinPie(data) {
  let onlyOneCabinPieExists = true;
  let prevCabinName = data[0].cabinName;

  for (let i = 0; i < data.length; i++) {
    if (data[i].cabinName !== prevCabinName) {
      onlyOneCabinPieExists = false;
      break;
    }
  }

  return onlyOneCabinPieExists;
}

function customTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="cabin-chart-custom-tooltip">
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}

function CabinsChart({ cabins, bookings }) {
  const { isDarkMode } = useDarkMode();
  const data = generateCabinChartsData(cabins, bookings, isDarkMode);
  const onlyOneCabinPieExists = onlyOneCabinPie(data);

  return (
    <ChartBox>
      <Heading as="h2">Bookings per cabin</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="cabinName"
            dataKey="value"
            innerRadius={80}
            outerRadius={110}
            cx="45%"
            cy="50%"
            paddingAngle={onlyOneCabinPieExists ? 0 : 5}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.cabinName}
              />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
          <Legend
            verticalAlign="middle"
            align="right"
            width="40%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default CabinsChart;
