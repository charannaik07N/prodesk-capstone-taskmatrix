'use client';

import React, { useMemo } from 'react';
import useTaskStore from '@/store/taskStore';
import useProjectStore from '@/store/projectStore';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { format, subDays, startOfDay } from 'date-fns';
import { CheckCircle2, TrendingUp, Clock, Target } from 'lucide-react';

const COLORS = ['#2563EB', '#16A34A', '#D97706', '#DC2626'];

export default function ReportsPage() {
  const { tasks } = useTaskStore();
  const { projects } = useProjectStore();

  const metrics = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'Done').length;
    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    
    const completedThisWeek = tasks.filter(t => t.status === 'Done' && new Date(t.updated_at) >= thisWeek).length;
    const createdThisWeek = tasks.filter(t => new Date(t.created_at) >= thisWeek).length;

    // Priority Distribution Data
    const priorityCounts = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    tasks.forEach(t => {
      if (priorityCounts[t.priority] !== undefined) {
        priorityCounts[t.priority]++;
      }
    });
    
    const priorityData = Object.entries(priorityCounts).map(([name, value]) => ({ name, value })).filter(d => d.value > 0);

    // Weekly Productivity Data (Tasks completed per day for last 7 days)
    const weeklyDataMap = {};
    for (let i = 6; i >= 0; i--) {
      const d = startOfDay(subDays(new Date(), i));
      weeklyDataMap[format(d, 'MMM d')] = 0;
    }

    tasks.filter(t => t.status === 'Done').forEach(t => {
      const d = format(startOfDay(new Date(t.updated_at)), 'MMM d');
      if (weeklyDataMap[d] !== undefined) {
        weeklyDataMap[d]++;
      }
    });

    const weeklyData = Object.entries(weeklyDataMap).map(([date, count]) => ({ date, completed: count }));

    return {
      completionRate,
      completedThisWeek,
      createdThisWeek,
      priorityData,
      weeklyData
    };
  }, [tasks]);

  return (
    <div className="p-8 max-w-[1200px] w-full font-sans mx-auto">
      <div className="mb-8">
        <h1 className="text-[24px] font-bold tracking-tight text-[#111827] mb-1">Productivity Analytics</h1>
        <p className="text-[14px] text-[#6B7280]">Gain insights into your team&apos;s performance and task velocity.</p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#2563EB]/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-[#2563EB]" />
            </div>
            <h3 className="text-[13px] font-semibold text-[#6B7280]">Completion Rate</h3>
          </div>
          <div className="text-[28px] font-bold text-[#111827]">{metrics.completionRate}%</div>
        </div>

        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
            </div>
            <h3 className="text-[13px] font-semibold text-[#6B7280]">Closed This Week</h3>
          </div>
          <div className="text-[28px] font-bold text-[#111827]">{metrics.completedThisWeek}</div>
        </div>

        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#D97706]/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#D97706]" />
            </div>
            <h3 className="text-[13px] font-semibold text-[#6B7280]">Created This Week</h3>
          </div>
          <div className="text-[28px] font-bold text-[#111827]">{metrics.createdThisWeek}</div>
        </div>

        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#6B7280]/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#6B7280]" />
            </div>
            <h3 className="text-[13px] font-semibold text-[#6B7280]">Active Projects</h3>
          </div>
          <div className="text-[28px] font-bold text-[#111827]">{projects.filter(p => p.status === 'Active').length}</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Weekly Productivity Bar Chart */}
        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <h3 className="text-[15px] font-bold text-[#111827] mb-6">Weekly Productivity</h3>
          <div className="h-[300px] w-full">
            {metrics.weeklyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <RechartsTooltip 
                    cursor={{ fill: '#F3F4F6' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="completed" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-[#6B7280] text-[13px]">No data for this week</div>
            )}
          </div>
        </div>

        {/* Priority Distribution Pie Chart */}
        <div className="p-6 rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <h3 className="text-[15px] font-bold text-[#111827] mb-6">Priority Distribution</h3>
          <div className="h-[300px] w-full">
            {metrics.priorityData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {metrics.priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-[#6B7280] text-[13px]">No priority data available</div>
            )}
            {/* Custom Legend */}
            <div className="flex justify-center gap-6 mt-4">
              {metrics.priorityData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-[12px] font-medium text-[#4B5563]">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
