

import { useGetDashboardStatsQuery } from "../../redux/features/Booking/bookingApi";
import { Helmet } from "react-helmet-async";
  


import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";


import {
  Car,
  Users,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { ReactNode } from 'react';
import { Skeleton } from "../../components/ui/skeleton";

import Report from "./Report";

const bookingTrendData = [
  { month: "Jan", bookings: 8 },
  { month: "Feb", bookings: 10 },
  { month: "Mar", bookings: 12 },
  { month: "Apr", bookings: 15 },
  { month: "May", bookings: 13 },
  { month: "Jun", bookings: 18 },
];

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];

export default function Dashboard() {

  const {data:dashboardData,isLoading,isError,refetch} = useGetDashboardStatsQuery(undefined)




 

  const data = dashboardData?.data

    if (isLoading) {
    return (
      <div className="rounded-xl min-h-screen p-8 space-y-8">
        <Helmet>
          <title>Dashboard | Loading...</title>
        </Helmet>
        <SkeletonDashboard />
      </div>
    )}
  
    if (isError) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-red-600">Something went wrong!</h2>
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition"
          onClick={refetch}
        >
          Retry
        </button>
      </div>
    );
  }

 



  return (
    <div id="dashboard" className=" rounded-xl min-h-screen p-8 space-y-8 ">
      <Helmet>
        <title>Dashboard | Statistics</title>
      </Helmet>

      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-foreground mb-6">
          Dashboard Statistics
        </h1>
        <Report data={data} />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <GlassCard
          title="Total Users"
          value={data?.totalUsers}
          icon={<Users className="h-6 w-6" />}
        />
        <GlassCard
          title="Active Users"
          value={data?.activeUsers}
          icon={<Users className="h-6 w-6" />}
        />
        <GlassCard
          title="Total Bookings"
          value={data?.totalBookings}
          icon={<Calendar className="h-6 w-6" />}
        />
        <GlassCard
          title="Total Revenue"
          value={`$${data?.totalRevenue}`}
          icon={<DollarSign className="h-6 w-6" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Most Rented Cars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.mostRentedCars}>
                <XAxis dataKey="carModel" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="count"
                  fill="rgba(225, 29, 72)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.paymentMethods}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ _id, percent }) =>
                    `${_id} ${(percent * 100)?.toFixed(0)}%`
                  }
                >
                  {data?.paymentMethods?.map((entry, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`${COLORS[index % COLORS.length]}CC`}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </GlassCard>
      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Booking Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingTrendData}>
              <CartesianGrid strokeDasharray="8 8" stroke="#a1a1aa" />
              <XAxis dataKey="month" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  color: "#a1a1aa",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="rgba(225, 29, 72)"
                strokeWidth={2}
                dot={{ fill: "rgba(225, 29, 72)", r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </GlassCard>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <GlassCard>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Booking Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <StatusItem
                icon={<CheckCircle className="h-5 w-5 text-green-500" />}
                label="Completed"
                value={data?.completedBookings}
              />
              <StatusItem
                icon={<AlertCircle className="h-5 w-5 text-yellow-500" />}
                label="Pending"
                value={data?.pendingBookings}
              />
              <StatusItem
                icon={<XCircle className="h-5 w-5 text-red-500" />}
                label="Cancelled"
                value={
                  data?.totalBookings -
                  data?.completedBookings -
                  data?.pendingBookings
                }
              />
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Average Booking Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-full flex justify-center items-center gap-2">
              <Clock className="size-20 text-primary" />
              <span className="text-7xl font-bold">
                {data?.avgBookingDuration?.toFixed(2)}
              </span>
              <span className="text-2xl">days</span>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Total Cars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-full flex justify-center items-center gap-2">
              <Car className="size-20 text-primary" />
              <span className="text-7xl font-bold">{data?.availableCars}</span>
              <span className="text-2xl">cars</span>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}

function GlassCard({ children, title, value, icon } : {
  children?:ReactNode,title?:string,value?:string|number,icon?:ReactNode
}) {
  return (
    <motion.div
    
    >
      <Card className="bg-white/20 backdrop-filter backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-xl h-full">
        {title ? (
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
          </CardHeader>
        ) : null}
        <CardContent>
          {value ? <div className="text-3xl font-bold">{value}</div> : children}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StatusItem({
  icon,
  label,
  value,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function SkeletonDashboard() {
  return (
    <div className="space-y-8">
      {/* Skeleton for the 4 summary cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SkeletonSummaryCard />
        <SkeletonSummaryCard />
        <SkeletonSummaryCard />
        <SkeletonSummaryCard />
      </div>

      {/* Skeleton for charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <SkeletonChartCard />
        <SkeletonChartCard />
      </div>

      {/* Skeleton for booking status, average duration, and total cars */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SkeletonStatusCard />
        <SkeletonDurationCard />
        <SkeletonCarCard />
      </div>
    </div>
  );
}

function SkeletonSummaryCard() {
  return (
    <Card className="bg-white/20 backdrop-filter backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-xl h-full p-3">
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-6" />
        </div>
        <Skeleton className="h-8 w-32" />
      </CardContent>
    </Card>
  );
}

function SkeletonChartCard() {
  return (
    <Card className="bg-white/20 backdrop-filter backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-xl h-full p-3">
      <CardContent>
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-64 w-full" />
      </CardContent>
    </Card>
  );
}

function SkeletonStatusCard() {
  return (
    <Card className="bg-white/20 backdrop-filter backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-xl h-full p-3">
      <CardContent>
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-5 w-12" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-5 w-12" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-5 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonDurationCard() {
  return (
    <Card className="bg-white/20 backdrop-filter backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-xl h-full p-3">
      <CardContent>
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="h-full flex justify-center items-center space-x-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-6 w-12" />
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonCarCard() {
  return (
    <Card className="bg-white/20 backdrop-filter backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-xl h-full p-3">
      <CardContent>
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="h-full flex justify-center items-center space-x-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}
