import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Download, ExternalLink } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function StudentCertificates() {
  const certificates = [
    {
      id: 'CERT-2025-001',
      examTitle: 'React Fundamentals',
      issuedDate: '2025-11-15',
      score: 95,
      verificationUrl: 'https://skillforge.com/verify/CERT-2025-001',
    },
    {
      id: 'CERT-2025-002',
      examTitle: 'Advanced CSS',
      issuedDate: '2025-11-10',
      score: 92,
      verificationUrl: 'https://skillforge.com/verify/CERT-2025-002',
    },
    {
      id: 'CERT-2025-003',
      examTitle: 'JavaScript ES6+',
      issuedDate: '2025-11-05',
      score: 94,
      verificationUrl: 'https://skillforge.com/verify/CERT-2025-003',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold">My Certificates</h2>
          <p className="text-muted-foreground mt-2">Your earned certificates and achievements</p>
        </div>

        <div className="grid gap-4">
          {certificates.map((cert) => (
            <Card key={cert.id} className="border-success/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                      <Award className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <CardTitle>{cert.examTitle}</CardTitle>
                      <CardDescription className="mt-1">
                        Certificate ID: {cert.id}
                      </CardDescription>
                      <CardDescription>
                        Issued: {new Date(cert.issuedDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-success">{cert.score}%</div>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Verify Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {certificates.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
              <p className="text-muted-foreground mb-4">
                Complete exams with a score of 90% or higher to earn certificates
              </p>
              <Button>View Available Exams</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
