"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  bcMonthlyTrend,
  trainingOutcomeData,
  consultancyPipelineData,
  weeklyCommandData,
} from "@/lib/mock-data";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export function CommandCenterCharts() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Performance Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <TabsList className="h-8">
            <TabsTrigger value="weekly" className="text-xs">Weekly Activity</TabsTrigger>
            <TabsTrigger value="bc" className="text-xs">BC Trend</TabsTrigger>
            <TabsTrigger value="training" className="text-xs">Training Outcomes</TabsTrigger>
            <TabsTrigger value="consulting" className="text-xs">Consulting Mix</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="mt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={weeklyCommandData} barSize={10}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: "12px" }}
                />
                <Bar dataKey="bcLeads" name="BC Leads" fill="#6366F1" radius={[3, 3, 0, 0]} />
                <Bar dataKey="dprActions" name="DPR Actions" fill="#8B5CF6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="trainingBatches" name="Batches" fill="#10B981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="workflows" name="Workflows" fill="#F59E0B" radius={[3, 3, 0, 0]} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="bc" className="mt-4">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={bcMonthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: "12px" }} />
                <Line type="monotone" dataKey="active" name="Active BCs" stroke="#6366F1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="onboarded" name="Onboarded" stroke="#10B981" strokeWidth={2} dot={false} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="training" className="mt-4">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={trainingOutcomeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: "12px" }} />
                <Line type="monotone" dataKey="enrolled" name="Enrolled" stroke="#6366F1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="certified" name="Certified" stroke="#10B981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="launched" name="Business Launched" stroke="#F59E0B" strokeWidth={2} dot={false} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="consulting" className="mt-4">
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={consultancyPipelineData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {consultancyPipelineData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: "12px" }} />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
