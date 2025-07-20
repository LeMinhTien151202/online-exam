
import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { ExamDto } from '../../dtos/exam.dto';

@Component({
  selector: 'admin-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit {
  exams: ExamDto[] = [];
  loading = false;
  error = '';

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.loading = true;
    this.examService.getAll().subscribe({
      next: (data) => {
        debugger
        this.exams = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Không thể tải dữ liệu bài thi!';
        this.loading = false;
      }
    });
  }
}
