import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../auth/auth/shared.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss',
})
export class QuestionListComponent implements OnInit {
  activeFilter: number = 0;
  constructor(private router: Router, private sharedService: SharedService) {}
  @Input() questions: any = [];
  activePage: number = 1;
  pageSize: number = 2;
  questionCount: number = 0;
  totalPages: number = 0;
  isLoading: boolean = false;
  searchText: string = '';
  sortBy: string = 'createdAt';
  ngOnInit() {
    this.getQuestions();
  }
  getQuestions(search: string = '') {
    this.isLoading = true;
    this.sharedService
      .getQuestionList(this.activePage, this.pageSize, this.sortBy, -1, search)
      .subscribe(
        (data) => {
          console.log('$getQuestionList ', data, data?.data?.count);
          this.questions = data?.data?.data;
          this.questionCount = data?.data?.count;
          this.totalPages = Math.ceil(this.questionCount / this.pageSize);

          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
          this.questionCount = 0;
        }
      );
  }
  search(text: string) {
    console.log('searchsearch ', text);
    this.getQuestions(text);
  }
  askQuestion() {
    this.router.navigate(['/ask']);
  }
  changePage(change: number) {
    this.activePage += change;
    this.getQuestions();
  }
  goToSingleQuestion(question: any) {
    console.log('goToSingleQuestion ', question);
    this.router.navigateByUrl('/question?id=' + question._id);
  }
}
