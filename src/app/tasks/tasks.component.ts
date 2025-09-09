import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { TaskData } from '../data/task-data';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  private httpClient = inject(HttpClient);
  taskDataList: Array<TaskData> = [];
  private baseUrl = environment.apiBaseUrl;

  ngOnInit() {
    this.httpClient
      .get<Array<TaskData>>(`${this.baseUrl}/task/allTasks`)
      .subscribe((taskDataList) => {

        // taskDataList.forEach((taskData)=>{
        //  taskData.timeDuration = this.calculateDuration(taskData.startTime,taskData.endTime);
        // })
        
        this.taskDataList = taskDataList;
        console.log('TaskData', taskDataList);
      });
  }

  //  calculateDuration(startTime: string, endTime: string): number {
  //   const start = new Date(`1970-01-01T${startTime}`);
  //   const end = new Date(`1970-01-01T${endTime}`);
    
  //   if (end < start) {
  //     end.setDate(end.getDate() + 1);
  //   }
    
  //   const diffMs = end.getTime() - start.getTime();
  //   return Math.round(diffMs / 60000);
  // }

  taskStatusUpdate(taskId: string) {
    // this.httpClient
    //   .put<string>(`${this.baseUrl}/updateTaskStatus/` + taskId, {})
    //   .subscribe((taskId) => {
    //     console.log('updated', taskId);
    //   });
    // console.log(taskId);

    this.httpClient
      .put<string>(`${this.baseUrl}/task/updateTaskStatus/` + taskId, {})
      .pipe(
        switchMap((taskId) => {
          console.log('First call response:', taskId);
          // Use user.id or any data to make second call
          return this.httpClient.get<Array<TaskData>>(
            `${this.baseUrl}/task/allTasks`
          );
        })
      )
      .subscribe({
        next: (taskDataList) => {
          this.taskDataList = taskDataList;
          console.log('TaskData', taskDataList);
        },
        error: (err) => {
          console.error('Error occurred:', err);
        },
      });
  }

  getTaskById(taskId: string): boolean {
    const task = this.taskDataList.find((task) => task.taskId === taskId);
    return task ? task.completed : false; // or return !!task?.isCompleted;
  }
}
