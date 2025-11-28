import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function TakeExam() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds

  const exam = {
    title: 'Advanced JavaScript',
    duration: 60,
    questions: [
      {
        id: 1,
        question: 'What is closure in JavaScript?',
        options: [
          'A function with access to its outer scope',
          'A way to close browser windows',
          'A method to end loops',
          'A type of variable',
        ],
      },
      {
        id: 2,
        question: 'What does "this" keyword refer to in JavaScript?',
        options: [
          'The current object',
          'The previous function',
          'The global window',
          'The parent element',
        ],
      },
      {
        id: 3,
        question: 'What is the purpose of Promise in JavaScript?',
        options: [
          'Handle asynchronous operations',
          'Create loops',
          'Define variables',
          'Style elements',
        ],
      },
    ],
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Exam Submitted",
      description: "Your answers have been recorded. Results will be available shortly.",
    });
    navigate('/student/assessments');
  };

  const progress = ((currentQuestion + 1) / exam.questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Timer and Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{exam.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {exam.questions.length}
                </p>
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="h-5 w-5 text-accent" />
                {formatTime(timeLeft)}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="mt-2 text-sm text-muted-foreground">
              {answeredCount} of {exam.questions.length} questions answered
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle>Question {currentQuestion + 1}</CardTitle>
            <CardDescription>{exam.questions[currentQuestion].question}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={answers[currentQuestion] || ''}
              onValueChange={handleAnswerChange}
            >
              {exam.questions[currentQuestion].options.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value={option} id={`option-${idx}`} />
                  <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <div className="flex gap-2">
            {currentQuestion === exam.questions.length - 1 ? (
              <Button onClick={handleSubmit}>
                Submit Exam
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next Question
              </Button>
            )}
          </div>
        </div>

        {/* Warning */}
        <Card className="border-warning">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-warning flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold">Important:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Your progress is automatically saved</li>
                  <li>The exam will auto-submit when time runs out</li>
                  <li>You need 90% or above to earn a certificate</li>
                  <li>Review your answers before submitting</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
