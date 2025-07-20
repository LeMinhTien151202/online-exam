import { UserDto } from './user.dto';
import { ExamDto } from './exam.dto';
export interface ResultDto {
  result_id: number;
  userId: number;
  examId: number;
  score: number;
  created_at: string;
  user?: UserDto;
  exam?: ExamDto;
}
