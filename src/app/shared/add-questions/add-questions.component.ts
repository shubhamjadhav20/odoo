import { Component } from '@angular/core';
import { SharedService } from '../../auth/auth/shared.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorModule } from 'primeng/editor';
import 'quill/dist/quill.snow.css';
import 'primeicons/primeicons.css'; // PrimeIcons styles

@Component({
  selector: 'app-add-questions',
  standalone: true,
  imports: [FormsModule, CommonModule, EditorModule],
  templateUrl: './add-questions.component.html',
  styleUrl: './add-questions.component.scss',
})
export class AddQuestionsComponent {
  title: string = '';
  description: string = '';
  tags: string = '';

  constructor(private sharedService: SharedService) {}

  submitQuestion() {
    const tagList = this.tags.split(',').map((t) => t.trim());
    const data = {
      title: this.title,
      description: this.description,
      tags: tagList,
    };

    // this.sharedService.postQuestion(data).subscribe(() => {
    //   alert('Question posted!');
    //   this.title = this.description = this.tags = '';
    // });
  }
}
