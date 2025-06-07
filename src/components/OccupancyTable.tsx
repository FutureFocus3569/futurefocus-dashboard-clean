'use client';

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface OccupancyRecord {
  centreName: string;
  apiId: string;
  month: string;
  u2: string;
  o2: string;
  total: string;
}

export default function OccupancyTable() {
  const [data, setData] = useState<OccupancyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('/data/occupancyData.csv');
        if (!response.ok) {
          throw new Error(`Failed to load CSV: ${response.statusText}`);
        }

        const csvText = await response.text();
        const parsed = Papa.parse<OccupancyRecord>(csvText, {
          header: true,
          skipEmptyLines: true,
        });

        if (parsed.errors.length) {
          throw new Error(`CSV Parse Error: ${parsed.errors[0].message}`);
        }

        setData(parsed.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('❌ CSV load error:', err.message);
          setError(err.message);
        } else {
          setError('Unknown error loading CSV');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCSV();
  }, []);

  if (loading) {
    return <p className="text-center text-blue-500">Loading occupancy data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Centre Name</th>
            <th className="px-4 py-2 border">Month</th>
            <th className="px-4 py-2 border">Under 2</th>
            <th className="px-4 py-2 border">Over 2</th>
            <th className="px-4 py-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{record.centreName}</td>
              <td className="px-4 py-2 border">{record.month}</td>
              <td className="px-4 py-2 border text-center">{record.u2}%</td>
              <td className="px-4 py-2 border text-center">{record.o2}%</td>
              <td className="px-4 py-2 border text-center font-semibold">{record.total}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
