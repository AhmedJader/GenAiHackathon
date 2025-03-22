"use client";

import { useState, useEffect } from "react";

const SELFHOSTED_KWH_PER_SECOND = 0.09 / 3600; // 0.000025 kWh per second
const SELFHOSTED_QUERIES_PER_SECOND = 1; // Assume 2 queries per second
const POWER_PER_QUERY =
  SELFHOSTED_KWH_PER_SECOND / SELFHOSTED_QUERIES_PER_SECOND; // kWh per query

const ONTARIO_COST_PER_KWH = 0.13; // Ontario electricity price (CAD)
const COST_PER_SECOND = SELFHOSTED_KWH_PER_SECOND * ONTARIO_COST_PER_KWH; // Cost per second (CAD)
const COST_PER_QUERY = POWER_PER_QUERY * ONTARIO_COST_PER_KWH; // Cost per query (CAD)

const CO2_PER_KWH = 0.4; // kg CO2 per kWh
const CO2_PER_SECOND = SELFHOSTED_KWH_PER_SECOND * CO2_PER_KWH; // CO2 per second (kg)
const CO2_PER_QUERY = POWER_PER_QUERY * CO2_PER_KWH; // CO2 per query (kg)

export default function SelfHostedPower() {
  const [powerUsed, setPowerUsed] = useState(0);
  const [costIncurred, setCostIncurred] = useState(0);
  const [co2Emissions, setCo2Emissions] = useState(0);
  const [queriesProcessed, setQueriesProcessed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPowerUsed((prev) => prev + SELFHOSTED_KWH_PER_SECOND);
      setCostIncurred((prev) => prev + COST_PER_SECOND);
      setCo2Emissions((prev) => prev + CO2_PER_SECOND);
      setQueriesProcessed((prev) => prev + SELFHOSTED_QUERIES_PER_SECOND);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold">
        🔋 Self-Hosted Rag Pipeline Power Usage
      </h2>

      <p className="text-4xl font-semibold mt-2">{powerUsed.toFixed(6)} kWh</p>
      <span className="text-sm text-gray-400">
        Estimated power consumption in real time
      </span>

      <h2 className="text-2xl font-bold mt-4">💰 Ontario Cost</h2>
      <p className="text-4xl font-semibold mt-2">
        ${costIncurred.toFixed(6)} CAD
      </p>
      <span className="text-sm text-gray-400">
        Cost based on Ontario’s electricity rates
      </span>

      <h2 className="text-2xl font-bold mt-4">🌎 CO₂ Emissions</h2>
      <p className="text-4xl font-semibold mt-2">
        {co2Emissions.toFixed(6)} kg CO₂
      </p>
      <span className="text-sm text-gray-400">
        Carbon footprint from AI power usage
      </span>

      <h2 className="text-2xl font-bold mt-4">⚡ Per Second Stats</h2>
      <p className="text-lg">
        Power per second: {POWER_PER_QUERY.toFixed(8)} kWh
      </p>
      <p className="text-lg">
        Cost per second: ${COST_PER_QUERY.toFixed(8)} CAD
      </p>
      <p className="text-lg">CO₂ per second: {CO2_PER_QUERY.toFixed(8)} kg</p>
      <p className="text-lg mt-2">
        Runtime (seconds): {queriesProcessed.toLocaleString()}
      </p>
    </div>
  );
}
