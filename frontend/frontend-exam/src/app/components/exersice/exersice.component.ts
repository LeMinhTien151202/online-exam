import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { ResultService } from '../../services/result.service';
import { QuestionDto } from '../../dtos/question.dto';
import { ResultDto } from '../../dtos/result.dto';
import { ExamService } from '../../services/exam.service';
import { ExamDto } from '../../dtos/exam.dto';

@Component({
  selector: 'app-exersice',
  templateUrl: './exersice.component.html',
  styleUrls: ['./exersice.component.scss']
})
export class ExersiceComponent implements OnInit {
  examInfo?: ExamDto;
  examId?: number;
  questions: QuestionDto[] = [];
  userAnswers: string[] = [];
  showResult = false;
  score = 0;
  loading = false;
  error = '';

  previousResults: ResultDto[] = [];
  userId = 4; // giả lập user id, có thể lấy từ auth nếu có

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private resultService: ResultService,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.examId = params['examId'] ? +params['examId'] : undefined;
      if (this.examId) {
        // Lấy thông tin bài thi
        this.examService.getById(this.examId).subscribe({
          next: (exam) => {
            this.examInfo = exam;
          },
          error: () => {
            this.examInfo = undefined;
          }
        });
        // Lấy kết quả từ API, lọc theo userId và examId
        this.resultService.getAll().subscribe({
          next: (results) => {
            this.previousResults = results.filter((r: any) => Number(r.userId) === Number(this.userId) && Number(r.examId) === Number(this.examId));
          },
          error: () => {
            this.previousResults = [];
          }
        });
        this.loading = true;
        this.questionService.getByExamId(this.examId).subscribe({
          next: (data) => {
            this.questions = data;
            this.userAnswers = new Array(data.length).fill('');
            this.loading = false;
          },
          error: (err) => {
            this.error = 'Không thể tải dữ liệu câu hỏi!';
            this.loading = false;
          }
        });
      } else {
        this.previousResults = [];
      }
    });
  }

  submitAnswers() {
    this.score = this.questions.filter((q, idx) => this.userAnswers[idx] === q.answerCorrect).length;
    this.showResult = true;
  }
}
