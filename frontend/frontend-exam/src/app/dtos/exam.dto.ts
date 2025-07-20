import { CategoryDto } from './category.dto';
import { LevelDto } from './level.dto';
export interface ExamDto {
  examId: number;
  categoryId: number;
  levelId: number;
  examName: string;
  pictures: string;
  createdAt: string;
  createdUp: string;
  category?: CategoryDto;
  level?: LevelDto;
}
