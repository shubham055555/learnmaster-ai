import { useState } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Shield, UserCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (role: UserRole) => {
    setIsLoading(true);
    try {
      await login(email, password, role);
      toast({
        title: "Login Successful",
        description: `Welcome back!`,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (role: UserRole) => {
    switch (role) {
      case 'admin':
        setEmail('admin@skillforge.com');
        setPassword('admin123');
        break;
      case 'teacher':
        setEmail('teacher@skillforge.com');
        setPassword('teacher123');
        break;
      case 'student':
        setEmail('student@skillforge.com');
        setPassword('student123');
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SkillForge
          </h1>
          <p className="text-muted-foreground mt-2">AI-Driven Adaptive Learning & Exam Generator</p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              Student
            </TabsTrigger>
            <TabsTrigger value="teacher" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Teacher
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          {(['student', 'teacher', 'admin'] as UserRole[]).map((role) => (
            <TabsContent key={role} value={role}>
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{role} Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your {role} dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`email-${role}`}>Email</Label>
                    <Input
                      id={`email-${role}`}
                      type="email"
                      placeholder={`${role}@skillforge.com`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`password-${role}`}>Password</Label>
                    <Input
                      id={`password-${role}`}
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleLogin(role)}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => fillDemo(role)}
                      disabled={isLoading}
                    >
                      Use Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Demo Credentials:</p>
          <p>Admin: admin@skillforge.com / admin123</p>
          <p>Teacher: teacher@skillforge.com / teacher123</p>
          <p>Student: student@skillforge.com / student123</p>
        </div>
      </div>
    </div>
  );
}
