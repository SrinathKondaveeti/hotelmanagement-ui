export interface TaskData {
      taskId:string;
      startTime:string;
      taskDuration:string;
      endTime:string;
      taskAt:string;
      taskType:string;
      itemsUsed:Record<string, string>;
      taskFor:Array<string>;
      assignedTo:Array<string>;
      taskProcedure:string;
      taskDescription:string;
      completed:boolean;
}
