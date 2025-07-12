import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIcon],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
})
export class ToasterComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBar
  ) {}
  ngOnInit(): void {
    console.log('This is the data received on init of toaster', this.data);
    if (this.data?.textElipsis) {
      if (this.data.title.length > 30) {
        this.data.title = this.data.title.slice(0, 30) + '...';
      }
      if (this.data.message) {
        if (this.data.message.length > 160) {
          this.data.message = this.data.message.slice(0, 160) + '...';
        }
      }
    }
  }
  closeToaster() {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }

  //! GIVE PROPER ICONS
  getCloseIcon() {
    let icon = 'modalcross';
    if (this.data.source == 'valOptions') {
      icon = 'modalcross';
    }
    return icon;
  }
  getIcon() {
    let icon = 'check';
    if (this.data.isError) {
      icon = 'highlight_off';
    } else if (this.data.isInfo) {
      icon = 'info';
    } else if (this.data.isWarn) {
      icon = 'warn';
    }
    return icon;
  }
}
