'use client';

import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import DashboardLayout from '@/components/DashboardLayout';
import DonutChart from '@/components/DonutChart';

interface OccupancyRecord {
  centreName: string;
  month: string;
  u2: string;
  o2: string;
  total: string;
}

export default function Home() {
  const [occupancyData, setOccupancyData] = useState<OccupancyRecord[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());


  const centres = [
    'Papamoa Beach',
    'The Boulevard',
    'Terrace Views',
    'The Bach',
    'Livingstone Drive',
    'West Dune',
  ];

  useEffect(() => {
    fetch('/data/occupancyData.csv')
      .then(res => res.text())
      .then(csv => {
        const parsed = Papa.parse<OccupancyRecord>(csv, {
          header: true,
          skipEmptyLines: true,
        });
        console.log('✅ CSV Loaded:', parsed.data);
        setOccupancyData(parsed.data);
      })
      .catch(err => console.error('❌ CSV Fetch Error:', err));
  }, []);

  const formatMonthYear = (date: Date) =>
    date.toLocaleString('default', { month: 'long', year: 'numeric' });

  const goToPreviousMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  const currentMonthStr = currentMonth.toISOString().slice(0, 7);
  const activeData = occupancyData.filter((entry) => entry.month === currentMonthStr);

  const averageU2 =
    activeData.reduce((sum, d) => sum + Number(d.u2 ?? 0), 0) / (activeData.length || 1);
  const averageO2 =
    activeData.reduce((sum, d) => sum + Number(d.o2 ?? 0), 0) / (activeData.length || 1);
  const averageTotal =
    activeData.reduce((sum, d) => sum + Number(d.total ?? 0), 0) / (activeData.length || 1);

  return (
    <DashboardLayout>
      <div className="text-center text-white">
        <h2 className="text-xl font-semibold mb-1">📊 Welcome to the Dashboard!</h2>
        <p className="text-sm mb-6">{formatMonthYear(currentMonth)} Occupancy Funding</p>
        <div className="flex justify-center mb-6 space-x-4">
          <button onClick={goToPreviousMonth} className="bg-white text-blue-500 px-2 rounded">◀</button>
          <button onClick={goToNextMonth} className="bg-white text-blue-500 px-2 rounded">▶</button>
        </div>
      </div>

      {/* 🔁 Centre Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {centres.map((centre) => {
          const data = occupancyData.find(
            (entry) =>
              entry.centreName?.trim().toLowerCase() === centre.trim().toLowerCase() &&
              entry.month === currentMonthStr
          );

          return (
            <div
              key={centre}
              className="bg-white p-4 rounded shadow text-center flex flex-col justify-between space-y-2"
            >
              <h3 className="font-semibold">{centre}</h3>
              <div className="flex justify-around">
                <DonutChart label="U2" value={Number(data?.u2 ?? 0)} />
                <DonutChart label="O2" value={Number(data?.o2 ?? 0)} />
                <DonutChart label="Total" value={Number(data?.total ?? 0)} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 📉 Summary Box */}
<div className="mt-8 bg-white p-4 rounded shadow text-center w-full md:w-[450px] mx-auto">
  <h3 className="text-lg font-bold mb-4">📈 Total Average Occupancy</h3>
  <div className="flex justify-around">
    <DonutChart label="U2" value={Number(averageU2.toFixed(0))} color="text-blue-500" />
    <DonutChart label="O2" value={Number(averageO2.toFixed(0))} color="text-blue-500" />
    <DonutChart label="Total" value={Number(averageTotal.toFixed(0))} color="text-blue-500" />
  </div>
</div>
    </DashboardLayout>
  );
}
// Trigger deployment test
