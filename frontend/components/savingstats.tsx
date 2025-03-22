"use client";

import { useState, useEffect } from "react";

const OPENAI_KWH_PER_SECOND = 120833 / 3600; // 33.56 kWh per second
const OPENAI_QUERIES_PER_SECOND = 100; // Assumed QPS
const POWER_PER_QUERY = OPENAI_KWH_PER_SECOND / OPENAI_QUERIES_PER_SECOND; // kWh per query

const ONTARIO_COST_PER_KWH = 0.13; // Average Ontario electricity price (CAD)
const COST_PER_SECOND = OPENAI_KWH_PER_SECOND * ONTARIO_COST_PER_KWH; // Cost per second (CAD)
const COST_PER_QUERY = POWER_PER_QUERY * ONTARIO_COST_PER_KWH; // Cost per query (CAD)

const CO2_PER_KWH = 0.4; // kg CO2 per kWh (approximation)
const CO2_PER_SECOND = OPENAI_KWH_PER_SECOND * CO2_PER_KWH; // CO2 emissions per second (kg)
const CO2_PER_QUERY = POWER_PER_QUERY * CO2_PER_KWH; // CO2 emissions per query (kg)

const SELFHOSTED_KWH_PER_SECOND = 0.09 / 3600; // 0.000025 kWh per second
const SELFHOSTED_QUERIES_PER_SECOND = 2; // Assume 2 queries per second
const SELFHOSTED_POWER_PER_QUERY = SELFHOSTED_KWH_PER_SECOND / SELFHOSTED_QUERIES_PER_SECOND; // kWh per query

const SELFHOSTED_COST_PER_SECOND = SELFHOSTED_KWH_PER_SECOND * ONTARIO_COST_PER_KWH; // Cost per second (CAD)
const SELFHOSTED_COST_PER_QUERY = SELFHOSTED_POWER_PER_QUERY * ONTARIO_COST_PER_KWH; // Cost per query (CAD)

const SELFHOSTED_CO2_PER_SECOND = SELFHOSTED_KWH_PER_SECOND * CO2_PER_KWH; // CO2 per second (kg)
const SELFHOSTED_CO2_PER_QUERY = SELFHOSTED_POWER_PER_QUERY * CO2_PER_KWH; // CO2 per query (kg)

export default function SelfHostedSavings() {
  const [powerSaved, setPowerSaved] = useState<number>(0);
  const [costSaved, setCostSaved] = useState<number>(0);
  const [co2Reduced, setCo2Reduced] = useState<number>(0);
  const [queriesProcessed, setQueriesProcessed] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate per-second differences
      const powerDiff = OPENAI_KWH_PER_SECOND - SELFHOSTED_KWH_PER_SECOND;
      const costDiff = COST_PER_SECOND - SELFHOSTED_COST_PER_SECOND;
      const co2Diff = CO2_PER_SECOND - SELFHOSTED_CO2_PER_SECOND;

      // Update states using functional updates to accumulate values
      setPowerSaved(prev => prev + powerDiff);
      setCostSaved(prev => prev + costDiff);
      setCo2Reduced(prev => prev + co2Diff);
      setQueriesProcessed(prev => prev + OPENAI_QUERIES_PER_SECOND);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // Prevent negative values (if OpenAI is not running)
  const powerSavings = Math.max(0, powerSaved);
  const costSavings = Math.max(0, costSaved);
  const co2Savings = Math.max(0, co2Reduced);

  // Percentage Reductions
  const powerReduction = (powerSavings / (OPENAI_KWH_PER_SECOND || 1)) * 100;
  const costReduction = (costSavings / (COST_PER_SECOND || 1)) * 100;
  const co2Reduction = (co2Savings / (CO2_PER_SECOND || 1)) * 100;

  // Bonus Calculations
  const treesSaved = co2Savings / 21; // 1 tree absorbs ~21kg CO₂ per year
  const gasolineSaved = co2Savings / 2.3; // 1 liter of gas = 2.3 kg CO₂

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-green-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold">🌱 Self-Hosting Savings</h2>

      <h3 className="text-xl font-semibold mt-4">🔋 Power Saved</h3>
      <p className="text-4xl font-semibold">{powerSavings.toFixed(6)} kWh</p>
      <span className="text-sm text-gray-300">
        {powerReduction.toFixed(2)}% less power usage
      </span>

      <h3 className="text-xl font-semibold mt-4">💰 Cost Savings</h3>
      <p className="text-4xl font-semibold">${costSavings.toFixed(6)} CAD</p>
      <span className="text-sm text-gray-300">
        {costReduction.toFixed(2)}% cost reduction
      </span>

      <h3 className="text-xl font-semibold mt-4">🌎 CO₂ Reduction</h3>
      <p className="text-4xl font-semibold">{co2Savings.toFixed(6)} kg CO₂</p>
      <span className="text-sm text-gray-300">
        {co2Reduction.toFixed(2)}% lower carbon footprint
      </span>

      <h3 className="text-xl font-semibold mt-4">🌳 Environmental Impact</h3>
      <p className="text-lg">{treesSaved.toFixed(2)} trees saved</p>
      <p className="text-lg">{gasolineSaved.toFixed(2)} liters of gas avoided</p>

      <span className="text-sm text-gray-400 mt-4">
        *Comparison based on OpenAI model power usage
      </span>
    </div>
  );
}
