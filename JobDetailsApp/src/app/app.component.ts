import { Component, ViewChild } from '@angular/core';
import { JobFormComponent } from './components/job-form/job-form.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobDetail } from './shared/job-details.model';

@Component({
  selector: 'app-root',
  imports: [JobFormComponent, JobListComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  @ViewChild(JobListComponent) jobList!: JobListComponent;
  @ViewChild(JobFormComponent) jobForm!: JobFormComponent;

  selectedJob: JobDetail = {
    jobDetailID: 0,
    name: '',
    title: '',
    description: '',
    salary: 0,
    location: '',
    company: '',
  };

  onJobCreated(newJob: JobDetail): void {
    this.jobList.addJob(newJob);
  }

  onJobEdit(job: JobDetail): void {
    this.jobForm.editJobDetail(job);
  }

  onJobUpdated(updatedJob: JobDetail): void {
    this.jobList.updateJobInList(updatedJob);
  }

  title = 'JobDetailsApp';
}
