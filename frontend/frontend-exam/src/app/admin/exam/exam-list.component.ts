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
  error = '';
  success = '';
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
    this.examService.getAll().subscribe({
      next: (data) => {
        this.exams = data;
      },
      error: () => {
        this.error = 'Không thể tải danh sách bài thi!';
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
        this.success = 'Thêm bài thi thành công!';
        setTimeout(() => this.success = '', 3000);
      },
      error: () => {
        this.error = 'Không thể thêm bài thi!';
        setTimeout(() => this.error = '', 3000);
      }
    });
  }

  // Xóa bài thi
  deleteExam(exam: ExamDto) {
    if (confirm(`Bạn có chắc muốn xóa bài thi "${exam.examName}"?\n\nHành động này không thể hoàn tác!`)) {
      this.examService.delete(exam.examId).subscribe({
        next: () => {
          this.success = `Đã xóa bài thi "${exam.examName}" thành công!`;
          this.loadExams(); // Reload danh sách
          setTimeout(() => this.success = '', 3000);
        },
        error: () => {
          this.error = 'Không thể xóa bài thi! Vui lòng thử lại.';
          setTimeout(() => this.error = '', 3000);
        }
      });
    }
  }

  // Helper method để kiểm tra xem bài thi có câu hỏi không
  hasQuestions(exam: ExamDto): boolean {
    // Có thể kiểm tra dựa trên examId hoặc các thuộc tính khác
    // Tạm thời return true để hiển thị cảnh báo
    return true;
  }
}
