import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskData } from '../data/task-data';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-common',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './common.component.html',
  styleUrl: './common.component.scss',
})
export class CommonComponent {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  taskDataList: Array<TaskData> = [];
  private baseUrl = environment.apiBaseUrl;
  addNewTaskForm!: FormGroup;
  updateTaskForm!: FormGroup;
  newTaskForControl = new FormControl('');
  selectedEditTaskData: TaskData | undefined;

  displayAllTasks: boolean = false;
  createNewTask: boolean = false;
  deleteConfirmationPopup: boolean = false;
  displayEditTaskForm: boolean = false;

  constructor(private fb: FormBuilder) {
    this.addNewTaskForm = this.fb.group({
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      taskOwner: ['', [Validators.required]],
      taskProcedureType: ['', [Validators.required]],
      taskAt: ['', [Validators.required]],
      taskDescription: ['', [Validators.required]],
      taskFor: this.fb.array([]), // Changed from taskFor2 to taskForArray
    });
  }

  createAllTasks() {
    this.httpClient
      .get<Array<any>>(
        `${this.baseUrl}/task/123/143/786/999/createAllTasks`
      )
      .subscribe((taskDataList) => {
        console.log('TaskData created');
      });
    this.displayAllTasks = false;
    this.createNewTask = false;
    this.deleteConfirmationPopup = false;
    this.displayEditTaskForm = false;
  }

  getAllTasks() {
    this.httpClient
      .get<Array<TaskData>>(`${this.baseUrl}/task/allTasks`)
      .subscribe((taskDataList) => {
        this.taskDataList = taskDataList;
        console.log('TaskData', taskDataList);
      });

    this.displayAllTasks = true;
    this.createNewTask = false;
    this.deleteConfirmationPopup = false;
    this.displayEditTaskForm = false;
  }

  // Getter for easy access to the FormArray
  get taskFor(): FormArray {
    return this.addNewTaskForm.get('taskFor') as FormArray;
  }

   get recipes(){
    return this.selectedEditTaskData?.taskFor;
  }

  addTaskFor() {
    const taskForValue = this.newTaskForControl.value?.trim();
    if (taskForValue) {
      this.taskFor.push(this.fb.control(taskForValue, Validators.required));
      this.newTaskForControl.reset(''); // Clear the input
      console.log('Form Data:', this.addNewTaskForm.value);
    }
  }

  removeTaskFor(index: number) {
    this.taskFor.removeAt(index);
  }

  displayEditTaskFormFun(taskId: string) {
    console.log(
      'taskDataList',
      this.taskDataList.find((task) => task.taskId === taskId)
    );
    this.selectedEditTaskData = this.taskDataList.find(
      (task) => task.taskId === taskId
    );

    this.updateTaskForm = this.fb.group({
      taskId: [this.selectedEditTaskData?.taskId, [Validators.required]],
      startTime: [this.selectedEditTaskData?.startTime, [Validators.required]],
      endTime: [this.selectedEditTaskData?.endTime, [Validators.required]],
      taskOwner: [this.selectedEditTaskData?.assignedTo, [Validators.required]],
      taskProcedureType: [
        this.selectedEditTaskData?.taskProcedure,
        [Validators.required],
      ],
      taskAt: [this.selectedEditTaskData?.taskAt, [Validators.required]],
      taskDescription: [
        this.selectedEditTaskData?.taskDescription,
        [Validators.required],
      ],
      taskFor: this.fb.array(
        (this.selectedEditTaskData?.taskFor || []).map((recipe) =>
          this.fb.control(recipe, Validators.required)
        )
      ),
    });

    this.displayAllTasks = false;
    this.createNewTask = false;
    this.deleteConfirmationPopup = false;
    this.displayEditTaskForm = true;
    // this.httpClient
    //   .get<Array<any>>(
    //     `${this.baseUrl}/task/123/143/786/999/createAllTasks`
    //   )
    //   .subscribe((taskDataList) => {
    //     console.log('TaskData created');
    //   });
    // this.router.navigate(['tasks']);
  }

  showConfirm(taskId: string) {
    if (confirm('Are you sure you want to delete this task ' + taskId + ' ?')) {
      this.deleteTask(taskId);
      // User clicked "OK"
      console.log('Confirmed');
    } else {
      // User clicked "Cancel"
      console.log('Cancelled');
    }
  }

  deleteTask(taskId: string) {
    this.httpClient
      .delete<Array<any>>(`${this.baseUrl}/task/deleteTask/` + taskId)
      .subscribe((taskDataList) => {
        console.log('TaskData created');
      });
    this.displayAllTasks = false;
    this.createNewTask = false;
    this.deleteConfirmationPopup = false;
    this.displayEditTaskForm = false;
  }

  createTask() {
    this.displayAllTasks = false;
    this.createNewTask = true;
    this.deleteConfirmationPopup = false;
    this.displayEditTaskForm = false;
  }

  createForm() {
    if (this.addNewTaskForm.valid) {
      console.log('Form Data:', this.addNewTaskForm.value);

      this.httpClient
        .post(
          `${this.baseUrl}/task/createTask`,
          this.addNewTaskForm.value
        )
        .subscribe(
          (response: any) => {
            this.addNewTaskForm.reset();
            console.log('User registered successfully:', response);
            //this.getAllTasks();
            this.displayAllTasks = false;
            this.createNewTask = false;
            this.deleteConfirmationPopup = false;
            this.displayEditTaskForm = false;
          },
          (error: any) => {
            console.error('Error occurred:', error);
          }
        );
    } else {
      console.log('Form Invalid');
    }
  }

  

    updateForm() {
    if (this.addNewTaskForm.valid) {
      console.log('Form Data:', this.addNewTaskForm.value);

      this.httpClient
        .post(
          `${this.baseUrl}/task/createTask`,
          this.addNewTaskForm.value
        )
        .subscribe(
          (response: any) => {
            this.addNewTaskForm.reset();
            console.log('User registered successfully:', response);
            //this.getAllTasks();
            this.displayAllTasks = false;
            this.createNewTask = false;
            this.deleteConfirmationPopup = false;
            this.displayEditTaskForm = false;
          },
          (error: any) => {
            console.error('Error occurred:', error);
          }
        );
    } else {
      console.log('Form Invalid');
    }
  }



}
