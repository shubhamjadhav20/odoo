import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vote-box',
  templateUrl: './vote-box.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./vote-box.component.scss'],
})
export class VoteBoxComponent {
  @Input() votes = 0;
  @Input() hasVoted: boolean = false;
  @Output() voteChange = new EventEmitter<number>();

  previousVotes = 0;
  direction: 'up' | 'down' | null = null;
  lastAction: 'up' | 'down' | null = null;

  upvote() {
    if (this.hasVoted) return;
    this.hasVoted = true;
    this.direction = 'up';
    this.lastAction = 'up';
    this.voteChange.emit(1);
  }

  downvote() {
    if (this.hasVoted) return;
    this.hasVoted = true;

    this.direction = 'down';
    this.lastAction = 'down';
    this.voteChange.emit(-1);
  }
}
