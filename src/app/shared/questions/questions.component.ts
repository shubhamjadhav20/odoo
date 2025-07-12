import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VoteBoxComponent } from '../vote-box/vote-box.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../../auth/auth/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorModule } from 'primeng/editor';
import 'quill/dist/quill.snow.css';
import 'primeicons/primeicons.css'; // PrimeIcons styles

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [FormsModule, CommonModule, VoteBoxComponent, EditorModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnInit {
  selectedQuestion: any = {
    title: 'How to join 2 columns in a dataset to make seperate columns in sql',
    desc: 'lorem impsusm',
    votes: 0,
    answers: [
      {
        title: 'lorem impsums asafa ada d ada das dad ',
        votes: 2,
        isAccepted: true,
      },

      {
        title: 'sadas adasd adasdas da impsums asafa ada d ada das dad ',
        votes: -1,
      },
    ],
  };
  newAnswer = '';
  isLoading: boolean = false;
  description: any;
  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    console.log('idid ');
    this.route.queryParams.subscribe((query: any) => {
      console.log('query ', query);
      this.isLoading = true;
      this.sharedService.getOneQuestion(query.id).subscribe((data) => {
        console.log('$getOneQuestion ', data);
        this.selectedQuestion = data.data;
        this.selectedQuestion?.answers.forEach((ans: any) => {
          if (ans._id == this.selectedQuestion.acceptedAnswerId) {
            ans.isAccepted = true;
          } else {
            ans.isAccepted = false;
          }
        });

        this.isLoading = false;
      });
    });
  }
  submitAnswer() {
    if (this.newAnswer.trim()) {
      this.selectedQuestion.answers.push({
        title: this.newAnswer,
        votes: 0,
      });
      this.newAnswer = '';
    }
    console.log(
      'Submit answer called',
      this.description,
      this.selectedQuestion.answers,
      this.newAnswer
    );
    this.sharedService
      .submitAnswer(this.description, this.selectedQuestion._id)
      .subscribe((data: any) => {
        console.log('Data from submitAnswer', data);
      });
  }

  voteQuestion(question: any, delta: number) {
    question.votes += delta;

    //
  }
  voteAnswer(answer: any, delta: number) {
    if (!answer.votes) {
      answer.votes = 0;
    }
    answer.votes += delta;
    console.log('voteAnswer ', delta, answer.votes);
  }
  acceptAnswer(index: number) {
    let selectedId = '';
    this.selectedQuestion?.answers?.forEach((ans: any, idx: number) => {
      if (index == idx) {
        selectedId = ans._id;
        ans.isAccepted = true;
      } else {
        ans.isAccepted = false;
      }
    });
    // this.share
    //call update api to update question accepted id
  }
}
