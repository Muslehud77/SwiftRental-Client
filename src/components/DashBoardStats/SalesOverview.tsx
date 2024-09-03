import { ChartTooltipContent, ChartContainer } from "../../components/ui/chart";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  CartesianGrid,
  Tooltip,

} from "recharts";
import { useTheme } from "../ThemeProvider";

const SalesOverview = ({ sales }: { sales: Record<string, unknown>[] }) => {
 
  const {actualTheme} = useTheme()

  return (
    <div className="aspect-[9/4] pt-10">
      <ChartContainer
        config={{
          sales: {},
        }}
      >
        <BarChart
          width={500}
          height={300}
          data={sales}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" className="hidden" />

          <Tooltip active content={<ChartTooltipContent />} />

          <Bar
            dataKey="sales"
            fill={actualTheme === "dark" ? "#3B82F6" : "#2563EB"}
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default SalesOverview;
