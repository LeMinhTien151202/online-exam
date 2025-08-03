import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { CategoryService } from '../../services/category.service';
import { LevelService } from '../../services/level.service';
import { ExamDto } from '../../dtos/exam.dto';
import { CategoryDto } from '../../dtos/category.dto';
import { LevelDto } from '../../dtos/level.dto';

@Component({
  selector: 'admin-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.scss']
})
export class ExamEditComponent implements OnInit {
  examId!: number;
  exam: any = {};
  categories: CategoryDto[] = [];
  levels: LevelDto[] = [];
  selectedFile: File | null = null;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService,
    private categoryService: CategoryService,
    private levelService: LevelService
  ) {}

  ngOnInit(): void {
    debugger
    this.examId = +this.route.snapshot.paramMap.get('id')!;
    this.examService.getById(this.examId).subscribe({
      next: (data) => {
        debugger
        this.exam = data; // <-- Gán dữ liệu cũ vào biến exam
      },
      error: () => {
        this.error = 'Không thể tải thông tin bài thi!';
      }
    });
    this.categoryService.getAll().subscribe(data => this.categories = data);
    this.levelService.getAll().subscribe(data => this.levels = data);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateExam() {
    const formData = new FormData();
    formData.append('examName', this.exam.examName);
    formData.append('category', this.exam.categoryId);
    formData.append('level', this.exam.levelId);
    debugger
    if (this.selectedFile) {
      formData.append('thumbnail', this.selectedFile);
    }
    this.examService.updateWithImage(this.examId, formData).subscribe({
      next: () => {
        this.router.navigate(['/admin/exam']);
      },
      error: () => {
        this.error = 'Không thể cập nhật bài thi!';
      }
    });
  }

  cancelEdit() {
    this.router.navigate(['/admin/exam']);
  }
}
