import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { ExamDto } from '../../dtos/exam.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  exams: ExamDto[] = [];
  grammarExams: ExamDto[] = [];
  vocabularyExams: ExamDto[] = [];
  loading = false;
  error = '';

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.loading = true;
    this.examService.getAll().subscribe({
      next: (data) => {
        this.exams = data;
        this.grammarExams = data.filter(e => e.category?.categoryName === 'Ngữ pháp tiếng anh');
        this.vocabularyExams = data.filter(e => e.category?.categoryName === 'Từ vựng tiếng anh');
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Không thể tải dữ liệu bài thi!';
        this.loading = false;
      }
    });
  }
}
