import StatsGrid from "../components/StatsGrid";
import AnalyticsChart from "../components/AnalyticsChart";
import TrackerCard from "../components/TrackerCard";
import ActivityTable from "../components/ActivityTable";
import SalesByCountry from "../components/SalesByCountry";
import BestSellingTable from "../components/BestSellingTable";

export default function DashboardSection() {
  return (
    <section className="bg-[#FAF6EF]">
      <div className="p-6 lg:p-8">
        <div className="mt-2 grid xl:grid-cols-[1.6fr_1fr] gap-6 items-start">
          <div>
            <StatsGrid />
            <div className="mt-6 grid lg:grid-cols-[1fr_1fr] gap-6 items-start">
              <AnalyticsChart />
              <TrackerCard />
            </div>
            <div className="mt-6">
              <ActivityTable />
            </div>
          </div>
          <div className="space-y-6">
            <BestSellingTable />
            <SalesByCountry />
          </div>
        </div>
      </div>
    </section>
  );
}
