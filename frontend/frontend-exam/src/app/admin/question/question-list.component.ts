

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { QuestionDto } from '../../dtos/question.dto';

@Component({
  selector: 'admin-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questions: QuestionDto[] = [];
  loading = false;
  error = '';


  examId?: number;

  constructor(private questionService: QuestionService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.examId = params['examId'] ? +params['examId'] : undefined;
      this.loading = true;
      this.questionService.getAll().subscribe({
        next: (data) => {
          if (this.examId) {
            this.questions = data.filter(q => q.examId === this.examId);
          } else {
            this.questions = data;
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Không thể tải dữ liệu câu hỏi!';
          this.loading = false;
        }
      });
    });
  }
}
