"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { CHART_DUMMY_DATA } from "./data";

function UserGrowth() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg text-inherit">USER GROWTH</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={0} data={CHART_DUMMY_DATA}>
            <Bar dataKey="uv" fill="#FB8C00" barSize={10} />
            <XAxis
              dataKey="name"
              axisLine={false}
              strokeOpacity={0}
              padding={{ left: 3, right: 3 }}
            />
            <YAxis axisLine={false} strokeOpacity={0} />
            <YAxis axisLine={false} strokeOpacity={0} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default UserGrowth;
