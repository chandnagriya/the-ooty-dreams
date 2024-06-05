import styled from "styled-components";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";

const StyledGuestsRegionChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4.8rem;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  & .recharts-rectangle.recharts-tooltip-cursor {
    fill: var(--color-grey-100);
  }
`;

const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.6rem;
  margin: 0 auto;
  width: 100%;

  & .guests-chart-custom-tooltip {
    background-color: var(--color-chart-tooltip-bg);
    padding: 1.2rem 1.6rem;
    border: 1px solid var(--color-grey-300);
  }
`;

function transformData(data) {
  const stateGuests = {};
  const countryGuests = {};

  data.forEach((item) => {
    const { nationality, state } = item.guests;
    const { numGuests } = item;

    if (state) {
      if (!stateGuests[state]) {
        stateGuests[state] = 0;
      }
      stateGuests[state] += numGuests;
    }

    if (!countryGuests[nationality]) {
      countryGuests[nationality] = 0;
    }
    countryGuests[nationality] += numGuests;
  });

  const stateGuestsArray = Object.entries(stateGuests).map(
    ([state, guests]) => ({
      region: state,
      guests,
    })
  );

  const countryGuestsArray = Object.entries(countryGuests).map(
    ([country, guests]) => ({
      region: country,
      guests,
    })
  );

  stateGuestsArray.sort((a, b) => b.guests - a.guests);
  countryGuestsArray.sort((a, b) => b.guests - a.guests);

  const topStates = stateGuestsArray.slice(0, 12);
  const otherStates = stateGuestsArray.slice(12);
  const otherStatesGuests = otherStates.reduce(
    (acc, curr) => acc + curr.guests,
    0
  );

  if (otherStates.length > 0) {
    topStates.push({
      region: "Other",
      guests: otherStatesGuests,
      otherRegions: otherStates,
    });
  }

  const topCountries = countryGuestsArray.slice(0, 9);
  const otherCountries = countryGuestsArray.slice(9);
  const otherCountriesGuests = otherCountries.reduce(
    (acc, curr) => acc + curr.guests,
    0
  );

  if (otherCountries.length > 0) {
    topCountries.push({
      region: "Other",
      guests: otherCountriesGuests,
      otherRegions: otherCountries,
    });
  }

  topStates.sort((a, b) => {
    if (a.region === "Other") return 1;
    if (b.region === "Other") return -1;
    return a.region.localeCompare(b.region);
  });

  topCountries.sort((a, b) => {
    if (a.region === "Other") return 1;
    if (b.region === "Other") return -1;
    return a.region.localeCompare(b.region);
  });

  return [topStates, topCountries];
}

const CustomTick = (props) => {
  const { x, y, payload } = props;
  const lines = payload.value.split(" ");

  return (
    <g transform={`translate(${x},${y + 9})`}>
      {lines.map((line, index) => (
        <text
          key={index}
          x={0}
          y={index * 10}
          textAnchor="middle"
          fontSize="1.3rem"
          fill="var(--color-grey-700)"
          dy={index === 0 ? 0 : "1em"}
        >
          {line}
        </text>
      ))}
    </g>
  );
};

function customTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const regionData = payload[0].payload;

    return (
      <div className="guests-chart-custom-tooltip">
        {regionData.region !== "Other" && (
          <p className="label">{`${regionData.region} : ${regionData.guests}`}</p>
        )}
        {regionData.region === "Other" &&
          regionData.otherRegions.map((regionObj) => (
            <p
              key={regionObj.region}
              className="label"
            >{`${regionObj.region} : ${regionObj.guests}`}</p>
          ))}
      </div>
    );
  }
}

function GuestsRegionChart({ bookings }) {
  const [stateGuestsData, countryGuestsData] = transformData(bookings);

  const maxLen = Math.max(stateGuestsData.length, countryGuestsData.length);
  const chartWidth =
    maxLen > 10 ? "100%" : maxLen > 5 ? "70%" : maxLen > 3 ? "50%" : "35%";

  return (
    <StyledGuestsRegionChart>
      <ChartContainer>
        <Heading
          as="h2"
          style={{ marginLeft: chartWidth !== "100%" ? "3.6rem" : "0" }}
        >
          Guests by countries
        </Heading>
        <ResponsiveContainer height={300} width={chartWidth}>
          <BarChart
            data={countryGuestsData}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="region"
              tick={{ fontSize: "1.3rem", fill: "var(--color-grey-700)" }}
            />
            <YAxis
              tickFormatter={(tick) => (Number.isInteger(tick) ? tick : "")}
              tick={{ fill: "var(--color-grey-700)" }}
            />
            <Tooltip content={customTooltip} />
            <Bar
              dataKey="guests"
              barSize={28}
              fill="var(--color-bar-country)"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
      {stateGuestsData.length > 0 && (
        <ChartContainer>
          <Heading
            as="h2"
            style={{ marginLeft: chartWidth !== "100%" ? "4.8rem" : "0" }}
          >
            Guests by states
          </Heading>
          <ResponsiveContainer height={300} width={chartWidth}>
            <BarChart
              data={stateGuestsData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="region"
                interval={0}
                tick={
                  stateGuestsData.length > 10 ? (
                    <CustomTick />
                  ) : (
                    { fontSize: "1.3rem", fill: "var(--color-grey-700)" }
                  )
                }
              />
              <YAxis
                tickFormatter={(tick) => (Number.isInteger(tick) ? tick : "")}
                tick={{ fill: "var(--color-grey-700)" }}
              />
              <Tooltip content={customTooltip} />
              <Bar
                dataKey="guests"
                barSize={28}
                fill="var(--color-bar-state)"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </StyledGuestsRegionChart>
  );
}

export default GuestsRegionChart;
