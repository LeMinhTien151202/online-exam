import { ExamDto } from './exam.dto';
export interface QuestionDto {
  questionId: number;
  examId: number;
  content: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  answerCorrect: string;
  exam?: ExamDto;
}
