import DashboardLayout from '@/components/DashboardLayout';
import OccupancyTable from '@/components/OccupancyTable';

export default function OccupancyPage() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">📊 Occupancy Overview</h2>
      <OccupancyTable />
    </DashboardLayout>
  );
}
