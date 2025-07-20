import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExersiceComponent } from './components/exersice/exersice.component';
import { ExamListComponent } from './admin/exam/exam-list.component';
import { ExamEditComponent } from './admin/exam/exam-edit.component';
import { QuestionListComponent } from './admin/question/question-list.component';
import { QuestionEditComponent } from './admin/question/question-edit.component';
import { ExamQuestionListComponent } from './admin/exam/exam-question-list.component';
import { UserListComponent } from './admin/user/user-list.component';
import { UserEditComponent } from './admin/user/user-edit.component';
import { AdminLayoutComponent } from './admin/admin-layout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'exersice', component: ExersiceComponent },
  // Admin layout with children
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'exam', component: ExamListComponent },
      { path: 'exam/add', component: ExamEditComponent },
      { path: 'exam/edit/:id', component: ExamEditComponent },
      { path: 'question', component: QuestionListComponent },
      { path: 'exam/:examId/questions', component: ExamQuestionListComponent },
      { path: 'question/add', component: QuestionEditComponent },
      { path: 'question/edit/:id', component: QuestionEditComponent },
      { path: 'user', component: UserListComponent },
      { path: 'user/add', component: UserEditComponent },
      { path: 'user/edit/:id', component: UserEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
