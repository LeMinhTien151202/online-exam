import { Component } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { ExamDto } from '../../dtos/exam.dto';
import { CategoryService } from '../../services/category.service';
import { LevelService } from '../../services/level.service';
import { CategoryDto } from '../../dtos/category.dto';
import { LevelDto } from '../../dtos/level.dto';

@Component({
  selector: 'admin-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent {
  exams: ExamDto[] = [];
  loading = false;
  error = '';
  showAddExamModal = false;
  newExam: any = {};
  selectedFile: File | null = null;
  categories: CategoryDto[] = [];
  levels: LevelDto[] = [];

  constructor(
    private examService: ExamService,
    private categoryService: CategoryService,
    private levelService: LevelService
  ) {}

  ngOnInit() {
    this.loadExams();
    this.categoryService.getAll().subscribe(data => this.categories = data);
    this.levelService.getAll().subscribe(data => this.levels = data);
  }

  loadExams() {
    this.loading = true;
    this.examService.getAll().subscribe({
      next: (data) => {
        this.exams = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Không thể tải danh sách bài thi!';
        this.loading = false;
      }
    });
  }

  openAddExamModal() {
    this.showAddExamModal = true;
    this.newExam = {};
    this.selectedFile = null;
  }

  closeAddExamModal() {
    this.showAddExamModal = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addExam() {
    const formData = new FormData();
    formData.append('examName', this.newExam.examName);
    formData.append('category', this.newExam.categoryId); // chỉ gửi id
    formData.append('level', this.newExam.levelId);       // chỉ gửi id
    if (this.selectedFile) {
      debugger
      formData.append('thumbnail', this.selectedFile);
    }

    this.examService.createWithImage(formData).subscribe({
      next: () => {
        this.closeAddExamModal();
        this.loadExams();
      },
      error: () => {
        this.error = 'Không thể thêm bài thi!';
      }
    });
  }
}
