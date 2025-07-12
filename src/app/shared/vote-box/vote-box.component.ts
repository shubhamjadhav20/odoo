import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vote-box',
  templateUrl: './vote-box.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./vote-box.component.scss'],
})
export class VoteBoxComponent implements OnInit {
  @Input() votes = 0;
  @Input() hasVoted: boolean = false;
  @Output() voteChange = new EventEmitter<number>();

  previousVotes = 0;
  direction: 'up' | 'down' | null = null;
  lastAction: 'up' | 'down' | null = null;
  ngOnInit() {
    if (!this.votes) {
      this.votes = 0;
    }
  }
  upvote() {
    if (this.hasVoted && this.lastAction == 'up') return;
    this.hasVoted = true;
    this.direction = 'up';
    this.lastAction = 'up';
    this.voteChange.emit(1);
  }

  downvote() {
    if (this.hasVoted && this.lastAction == 'down') return;
    this.hasVoted = true;

    this.direction = 'down';
    this.lastAction = 'down';
    this.voteChange.emit(-1);
  }
}
