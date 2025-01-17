import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTasksDTO } from './dto/create-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id); 

    if(!found){
     throw new NotFoundException('task with ID "${id}" not found');
    }
    return found;
  }

  createTask(createTaskDTO: CreateTasksDTO
    //title: string, description: string
    ): Task{
    const {title, description} = createTaskDTO;
    const task: Task = {
        id: uuid(),
        title,
        description,
        status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  } 

  updateTaskStatus(id: string, status: TaskStatus): Task{
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
