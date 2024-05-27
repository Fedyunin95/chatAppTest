export interface TodoModel {
  id: number | null;
  text: string;
  status: boolean;
}

export interface TodoListStateModel {
  todoList: TodoModel[];
  auth: boolean;
}