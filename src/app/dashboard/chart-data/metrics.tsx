"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, XAxis, YAxis, LineChart, Line } from "recharts";
import { CHART_DUMMY_DATA } from "./data";

function Metrics() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg text-inherit">METRICS</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={730}
            height={250}
            data={CHART_DUMMY_DATA}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Line type="monotone" dataKey="pv" stroke="#2B2A29" dot={false} />
            <Line type="monotone" dataKey="uv" stroke="#FB8C00" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default Metrics;
