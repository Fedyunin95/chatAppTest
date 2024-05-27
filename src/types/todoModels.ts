export interface TodoModel {
  id: number;
  text: string;
  status: boolean;
}

export interface TodoListStateModel {
  todoList: TodoModel[];
  auth: boolean;
}