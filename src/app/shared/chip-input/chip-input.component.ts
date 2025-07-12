import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  forwardRef,
} from '@angular/core';
import { COMMA, ENTER, BACKSPACE } from '@angular/cdk/keycodes';
import {
  MatChipInputEvent,
  MatChipGrid,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-chip-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIcon,
  ],
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipInputComponent),
      multi: true,
    },
  ],
})
export class ChipInputComponent implements ControlValueAccessor {
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @Input() placeholder = '';

  tags: string[] = [];
  inputValue = '';
  readonly separatorKeysCodes = [ENTER, COMMA, BACKSPACE] as const;

  onChange = (tags: string[]) => {};
  onTouched = () => {};

  writeValue(tags: string[]): void {
    this.tags = tags || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
      this.onChange(this.tags);
      this.onTouched();
    }

    if (event.input) {
      event.input.value = '';
    }
    this.inputValue = '';
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.onChange(this.tags);
      this.onTouched();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.inputValue && this.tags.length > 0) {
      this.removeTag(this.tags[this.tags.length - 1]);
    }
  }
}
