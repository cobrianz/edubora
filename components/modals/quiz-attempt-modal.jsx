"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, CheckCircle, Radio, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

export default function QuizAttemptModal({ quiz, onClose, onSubmit }) {
  const { toast } = useToast()
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  if (!quiz) return null

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleCheckboxChange = (questionId, optionValue, isChecked) => {
    setAnswers((prev) => {
      const currentSelections = new Set(prev[questionId] || [])
      if (isChecked) {
        currentSelections.add(optionValue)
      } else {
        currentSelections.delete(optionValue)
      }
      return { ...prev, [questionId]: Array.from(currentSelections) }
    })
  }

  const handleSubmitQuiz = () => {
    let calculatedScore = 0
    quiz.questions.forEach((q) => {
      if (q.type === "multiple-choice" || q.type === "true-false") {
        if (answers[q.id] === q.correctAnswer) {
          calculatedScore += q.points
        }
      } else if (q.type === "multiple-select") {
        const correctOptions = new Set(q.correctAnswer)
        const studentSelections = new Set(answers[q.id] || [])
        const isCorrect =
          correctOptions.size === studentSelections.size &&
          Array.from(correctOptions).every((option) => studentSelections.has(option))
        if (isCorrect) {
          calculatedScore += q.points
        }
      }
      // For essay/short-answer, scoring would be manual
    })

    setScore(calculatedScore)
    setSubmitted(true)
    onSubmit({ quizId: quiz.id, answers, score: calculatedScore })
    toast({
      title: "Quiz Submitted!",
      description: `You scored ${calculatedScore} out of ${quiz.totalMarks}.`,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-5 w-5" />
              {quiz.title}
            </CardTitle>
            <CardDescription>
              {quiz.subject} - {quiz.teacher}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quiz Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Subject:</span>
                  <span className="text-sm font-medium">{quiz.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Marks:</span>
                  <span className="text-sm font-medium">{quiz.totalMarks}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Time & Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Duration: {quiz.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Status: {submitted ? "Completed" : "Pending"}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {submitted ? (
            <Card className="text-center py-8 bg-green-50 border-green-200">
              <CardTitle className="text-2xl text-green-700">Quiz Completed!</CardTitle>
              <CardDescription className="mt-2">
                You scored <span className="font-bold text-green-800">{score}</span> out of{" "}
                <span className="font-bold text-green-800">{quiz.totalMarks}</span>.
              </CardDescription>
              <Button onClick={onClose} className="mt-4">
                Close
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {quiz.questions.map((q, index) => (
                <Card key={q.id}>
                  <CardHeader>
                    <CardTitle className="text-md">
                      {index + 1}. {q.question} ({q.points} points)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {q.type === "multiple-choice" && (
                      <RadioGroup
                        onValueChange={(value) => handleAnswerChange(q.id, value)}
                        value={answers[q.id] || ""}
                      >
                        {q.options.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={`${q.id}-${option.value}`} />
                            <Label htmlFor={`${q.id}-${option.value}`}>{option.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                    {q.type === "multiple-select" && (
                      <div className="space-y-2">
                        {q.options.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${q.id}-${option.value}`}
                              checked={(answers[q.id] || []).includes(option.value)}
                              onCheckedChange={(checked) => handleCheckboxChange(q.id, option.value, checked)}
                            />
                            <Label htmlFor={`${q.id}-${option.value}`}>{option.label}</Label>
                          </div>
                        ))}
                      </div>
                    )}
                    {q.type === "true-false" && (
                      <RadioGroup
                        onValueChange={(value) => handleAnswerChange(q.id, value)}
                        value={answers[q.id] || ""}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id={`${q.id}-true`} />
                          <Label htmlFor={`${q.id}-true`}>True</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id={`${q.id}-false`} />
                          <Label htmlFor={`${q.id}-false`}>False</Label>
                        </div>
                      </RadioGroup>
                    )}
                    {q.type === "essay" && (
                      <Textarea
                        placeholder="Type your answer here..."
                        value={answers[q.id] || ""}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        rows={5}
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
