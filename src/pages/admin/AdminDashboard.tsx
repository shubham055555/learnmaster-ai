import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Award, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Teachers', value: '24', icon: Users, color: 'text-primary' },
    { label: 'Total Students', value: '156', icon: Users, color: 'text-secondary' },
    { label: 'Total Exams', value: '48', icon: FileText, color: 'text-accent' },
    { label: 'Certificates Issued', value: '89', icon: Award, color: 'text-success' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <p className="text-muted-foreground mt-2">Overview of your learning platform</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'New teacher registered', name: 'Prof. Sarah Johnson', time: '2 hours ago' },
                  { action: 'Exam completed', name: 'Mathematics Final - 45 students', time: '3 hours ago' },
                  { action: 'Certificate issued', name: 'John Doe - Web Development', time: '5 hours ago' },
                  { action: 'New notes uploaded', name: 'Advanced Physics Module', time: '1 day ago' },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performers This Week</CardTitle>
              <CardDescription>Students with highest scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Alice Cooper', score: 98, exams: 5 },
                  { name: 'Bob Smith', score: 96, exams: 4 },
                  { name: 'Carol White', score: 95, exams: 6 },
                  { name: 'David Brown', score: 94, exams: 5 },
                ].map((student, idx) => (
                  <div key={idx} className="flex items-center justify-between pb-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.exams} exams</p>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-success">{student.score}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
