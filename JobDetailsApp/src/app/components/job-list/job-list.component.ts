import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { JobDetailsService } from '../../shared/job-details.service';
import { JobDetail } from '../../shared/job-details.model';
import { CommonModule } from '@angular/common';
import { JobFormComponent } from '../job-form/job-form.component';

@Component({
  selector: 'app-job-list',
  imports: [NgFor, CommonModule],
  templateUrl: './job-list.component.html',
  styles: ``,
})
export class JobListComponent implements OnInit {
  @Output() jobCreated = new EventEmitter<JobDetail>();
  @Output() jobEdit = new EventEmitter<JobDetail>();

  jobDetails: JobDetail[] = [];
  errorMessage: string = '';

  constructor(public service: JobDetailsService) { }

  ngOnInit(): void {
    this.loadJobDetails();
  }

  loadJobDetails(): void {
    this.service.getJobDetails().subscribe({
      next: (data) => {
        this.jobDetails = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage =
          'Failed to load job details. Please try again later.';
        console.error('Error loading job details:', err);
      },
    });
  }

  addJob(newJob: JobDetail): void {
    this.jobDetails.push(newJob);
  }

  deleteJob(jobId: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.service.deleteJobDetail(jobId).subscribe({
        next: () => {
          this.jobDetails = this.jobDetails.filter(
            (job) => job.jobDetailID !== jobId
          );
          console.log(`Job with ID ${jobId} deleted successfully.`);
        },
        error: (err) => {
          this.errorMessage =
            'Failed to delete the job. Please try again later.';
          console.error('Error deleting job:', err);
        },
      });
    }
  }

  editJob(job: JobDetail): void {
    this.jobEdit.emit(job);
  }

  updateJobInList(updatedJob: JobDetail): void {
    const index = this.jobDetails.findIndex(
      (job) => job.jobDetailID === updatedJob.jobDetailID
    );
    if (index !== -1) {
      this.jobDetails[index] = updatedJob;
    }
  }

  viewJobDetail(jobId: number): void {
    console.log('View job details for job ID:', jobId);
  }
}
