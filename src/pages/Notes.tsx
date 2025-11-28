import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Upload } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

export default function Notes() {
  const { user } = useAuth();

  const notes = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      subject: 'Programming',
      uploadedBy: 'Prof. Sarah Johnson',
      date: '2025-11-20',
      size: '2.4 MB',
    },
    {
      id: 2,
      title: 'React Hooks Guide',
      subject: 'Web Development',
      uploadedBy: 'Prof. John Smith',
      date: '2025-11-18',
      size: '1.8 MB',
    },
    {
      id: 3,
      title: 'Data Structures Cheat Sheet',
      subject: 'Computer Science',
      uploadedBy: 'Prof. Emily Davis',
      date: '2025-11-15',
      size: '3.2 MB',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Study Notes</h2>
            <p className="text-muted-foreground mt-2">Access learning materials and resources</p>
          </div>
          {(user?.role === 'teacher' || user?.role === 'admin') && (
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Notes
            </Button>
          )}
        </div>

        <div className="grid gap-4">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{note.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {note.subject} • Uploaded by {note.uploadedBy}
                      </CardDescription>
                      <CardDescription>
                        {new Date(note.date).toLocaleDateString()} • {note.size}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
