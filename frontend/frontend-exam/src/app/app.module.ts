
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { ExersiceComponent } from './components/exersice/exersice.component';
import { ExamListComponent } from './admin/exam/exam-list.component';
import { ExamEditComponent } from './admin/exam/exam-edit.component';
import { QuestionListComponent } from './admin/question/question-list.component';
import { QuestionEditComponent } from './admin/question/question-edit.component';
import { UserListComponent } from './admin/user/user-list.component';
import { UserEditComponent } from './admin/user/user-edit.component';
import { AdminLayoutComponent } from './admin/admin-layout.component';
import { ExamQuestionListComponent } from './admin/exam/exam-question-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ExersiceComponent,
    ExamListComponent,
    ExamEditComponent,
    QuestionListComponent,
    QuestionEditComponent,
    UserListComponent,
    UserEditComponent,
    AdminLayoutComponent,
    ExamQuestionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
