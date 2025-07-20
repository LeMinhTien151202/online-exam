import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { QuestionDto } from '../../dtos/question.dto';

@Component({
  selector: 'admin-exam-question-list',
  templateUrl: './exam-question-list.component.html',
  styleUrls: ['./exam-question-list.component.scss']
})
export class ExamQuestionListComponent implements OnInit {
  questions: QuestionDto[] = [];
  loading = false;
  error = '';
  examId?: number;

  constructor(private questionService: QuestionService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.examId = params['examId'] ? +params['examId'] : undefined;
      this.loading = true;
      if (this.examId) {
        this.questionService.getByExamId(this.examId).subscribe({
          next: (data) => {
            debugger
            this.questions = data;
            this.loading = false;
          },
          error: (err) => {
            this.error = 'Không thể tải dữ liệu câu hỏi!';
            this.loading = false;
          }
        });
      } else {
        this.questions = [];
        this.loading = false;
      }
    });
  }
}
