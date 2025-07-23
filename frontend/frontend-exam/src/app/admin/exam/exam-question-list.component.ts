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
  examId!: number;
  questions: QuestionDto[] = [];
  loading = false;
  error = '';
  showAddQuestionModal = false;
  showEditQuestionModal = false;
  newQuestion: any = {};
  editQuestion: QuestionDto = {} as QuestionDto;

  constructor(private route: ActivatedRoute, private questionService: QuestionService) {}

  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('examId')!;
    this.loadQuestions();
  }

  loadQuestions() {
    this.loading = true;
    this.questionService.getByExamId(this.examId).subscribe({
      next: (data) => {
        this.questions = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Không thể tải danh sách câu hỏi!';
        this.loading = false;
      }
    });
  }

  openAddQuestionModal() {
    this.showAddQuestionModal = true;
    this.newQuestion = { examId: this.examId };
  }

  closeAddQuestionModal() {
    this.showAddQuestionModal = false;
  }

  addQuestion() {
    this.newQuestion.examId = this.examId;
    this.questionService.create(this.newQuestion).subscribe({
      next: () => {
        this.closeAddQuestionModal();
        this.loadQuestions();
      },
      error: () => {
        this.error = 'Không thể thêm câu hỏi!';
      }
    });
  }

  openEditQuestionModal(question: QuestionDto) {
    this.showEditQuestionModal = true;
    this.editQuestion = { ...question }; // giữ nguyên kiểu QuestionDto
  }

  closeEditQuestionModal() {
    this.showEditQuestionModal = false;
  }

  updateQuestion() {
    // Đảm bảo examId luôn có trong dữ liệu gửi lên
    this.editQuestion.examId = this.examId;
    this.questionService.update(this.editQuestion.questionId, this.editQuestion).subscribe({
      next: () => {
        this.closeEditQuestionModal();
        this.loadQuestions();
      },
      error: () => {
        this.error = 'Không thể cập nhật câu hỏi!';
      }
    });
  }

  deleteQuestion(id: number) {
    if (confirm('Bạn có chắc muốn xóa câu hỏi này?')) {
      this.questionService.delete(id).subscribe({
        next: () => this.loadQuestions(),
        error: () => this.error = 'Không thể xóa câu hỏi!'
      });
    }
  }
}
