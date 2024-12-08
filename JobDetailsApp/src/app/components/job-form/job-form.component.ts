import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobDetailsService } from '../../shared/job-details.service';
import { JobDetail } from '../../shared/job-details.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-form',
  imports: [FormsModule],
  templateUrl: './job-form.component.html',
  styles: '',
})
export class JobFormComponent {
  @Output() jobCreated = new EventEmitter<JobDetail>();
  @Output() jobUpdated = new EventEmitter<JobDetail>();

  isUpdateMode: boolean = false;

  @Input()
  jobDetail: JobDetail = {
    jobDetailID: 0,
    name: '',
    title: '',
    description: '',
    salary: 0,
    location: '',
    company: '',
  };

  constructor(
    public service: JobDetailsService,
    public snackBar: MatSnackBar
  ) { }

  onSubmit() {
    if (this.isUpdateMode) {
      this.updateJobDetail();
    } else {
      this.createJobDetail();
    }
  }

  createJobDetail() {
    this.service.createJobDetail(this.jobDetail).subscribe({
      next: (data) => {
        this.showSuccessMessage('Job detail created successfully!');
        this.jobCreated.emit(data);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creating job detail:', err);
        this.showErrorMessage('Failed to create job detail.');
      },
    });
  }

  updateJobDetail(): void {
    this.service.updateJobDetail(this.jobDetail.jobDetailID, this.jobDetail).subscribe({
      next: (data) => {
        this.showSuccessMessage('Job detail updated successfully!');
        this.jobUpdated.emit(data);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating job detail:', err);
        this.showErrorMessage('Failed to update job detail.');
      },
    });
  }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  editJobDetail(job: JobDetail): void {
    this.jobDetail = { ...job };
    this.isUpdateMode = true;
  }

  resetForm() {
    this.jobDetail = {
      jobDetailID: 0,
      name: '',
      title: '',
      description: '',
      salary: 0,
      location: '',
      company: '',
    };
    this.isUpdateMode = false;
  }
}
