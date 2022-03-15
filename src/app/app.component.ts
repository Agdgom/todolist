import { Component } from '@angular/core';

interface Task {
  id: number;
  name: string;
  level: string;
  todo: boolean;
  progress: boolean;
  done: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  inputValue: string = '';
  levelValue: string = '';
  todoTaskList: Task[] = [
    {
      id: 0,
      name: 'Wake Up',
      level: 'hard',
      todo: true,
      progress: false,
      done: false,
    },
    {
      id: 1,
      name: 'Drink Coffee',
      level: 'easy',
      todo: true,
      progress: false,
      done: false,
    },
    {
      id: 2,
      name: 'Learn Angular',
      level: 'medium',
      todo: true,
      progress: false,
      done: false,
    },
  ];
  progressTaskList: Task[] = [];
  doneTaskList: Task[] = [];

  findTask(arr: Task[], id: number): Task {
    return arr.filter((el) => el.id === id)[0]; // id is unique, so the array will consist of only one Task element
  }
  addTask() {
    if (this.inputValue && this.levelValue) {
      this.todoTaskList.push({
        id: this.todoTaskList.length,
        name: this.inputValue,
        level: this.levelValue,
        todo: true,
        progress: false,
        done: false,
      });
    }
  }
  removeTask(id: number) {
    this.todoTaskList = this.todoTaskList.filter((task) => task.id !== id);
  }
  progressStep(id: number) {
    // add task to progress list
    const task = this.findTask(this.todoTaskList, id);
    task.todo = false;
    task.progress = true;
    this.progressTaskList.push(task);
    //delete task from todo List
    const newTodoList = this.todoTaskList.filter((el) => el.id !== id);
    this.todoTaskList = newTodoList;
  }
  todoStep(id: number) {
    // add task to todo list
    let task: Task = this.findTask(this.progressTaskList, id);
    task.progress = false;
    task.todo = true;
    this.todoTaskList.push(task);

    // delete task form progress task list
    const newProgressTodoList = this.progressTaskList.filter(
      (el) => el.id !== id
    );
    this.progressTaskList = newProgressTodoList;
  }
  addDoneTask(id: number) {
    // add task to done list
    let task: Task = this.findTask(this.progressTaskList, id);
    task.progress = false;
    task.done = true;
    this.doneTaskList.push(task);
    //delete task from progress list
    const newProgressTodoList = this.progressTaskList.filter(
      (el) => el.id !== id
    );
    this.progressTaskList = newProgressTodoList;
  }
  backProgressStep(id: number) {
    // add task to progress list
    let task: Task = this.findTask(this.doneTaskList, id);
    task.progress = true;
    task.done = false;
    this.progressTaskList.push(task);
    //delete task from done list
    const newDoneTodoList = this.doneTaskList.filter((el) => el.id !== id);
    this.doneTaskList = newDoneTodoList;
  }
}
