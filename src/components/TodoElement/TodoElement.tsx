import {ChangeEvent, FC, useState} from 'react';
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {TodoModel} from "../../types";
import {
  changeStatusTodo,
  deleteTodo,
  editTodo,
  saveChangeTodoList
} from "../../store/slices/todoListSlice.tsx";
import {useAppDispatch} from "../../hooks/redux.ts";
import {tss} from "../../helpers";

export const TodoElement: FC<{todo: TodoModel}> = (props) => {
  const {todo} = props;
  const dispatch = useAppDispatch();
  const {classes, cx} = useStyles();

  const [editedTodo, setEditedTodo] = useState<TodoModel | null>(null);

  const handleChangeEditedTodoText = (e: ChangeEvent<HTMLInputElement>) => {
    const _editedTodo = {...editedTodo};
    _editedTodo.text = e.target.value;
    setEditedTodo(_editedTodo);
  }

  const handleSaveEditedTodo = () => {
    dispatch(editTodo(editedTodo));
    dispatch(saveChangeTodoList());
    setEditedTodo(null)
  }

  const handleRemoveTodo = (id: number) => {
    dispatch(deleteTodo(id));
    dispatch(saveChangeTodoList());
  }

  const handleChangeStatusTodo = (todo: TodoModel) => {
    dispatch(changeStatusTodo({id: todo.id, status: !todo.status}))
    dispatch(saveChangeTodoList());
  }

  const handleEditTodo = (todo: TodoModel) => {
    setEditedTodo(todo);
  }

  return editedTodo?.id !== todo.id ? (
      <div className={classes.todo}>
        <label htmlFor={`todo-#${todo.id}`} className={
          cx(classes.checkbox, {
            'checked': todo.status
          })
        }>
          <Checkbox
            inputId={`todo-#${todo.id}`}
            className={classes.checkboxField}
            checked={todo.status}
            onChange={() => handleChangeStatusTodo(todo)}
          />
          {todo.text}
        </label>
        <Button className={classes.editTodo} icon='pi pi-pencil' onClick={() => handleEditTodo(todo)}/>
        <Button className={classes.removeTodo} icon='pi pi-trash' onClick={() => handleRemoveTodo(todo.id)}/>
      </div>
    )
    : <div className={classes.todo}>
      <InputText className={classes.input} value={editedTodo.text} onChange={handleChangeEditedTodoText}/>
      <Button className={classes.saveTodo} icon='pi pi-save' onClick={handleSaveEditedTodo}/>
      <Button className={classes.removeTodo} icon='pi pi-times' onClick={() => setEditedTodo(null)}/>
    </div>
}

const useStyles = tss.create(() => ({
  editTodo: {
    backgroundColor: '#4866cc',
    padding: 8,
    marginLeft: 'auto',
    color: '#f7f7f7',
    border: 'none',
    transition: 'all .3s ease-in-out',

    '&:hover': {
      backgroundColor: '#053cef',
    },
  },
  removeTodo: {
    backgroundColor: '#c91717',
    padding: 8,
    marginLeft: 8,
    color: '#f7f7f7',
    border: 'none',
    transition: 'all .3s ease-in-out',

    '&:hover': {
      backgroundColor: '#ef0505',
    },
  },
  saveTodo: {
    padding: 8,
    marginLeft: 'auto',
    color: '#f7f7f7',
    border: 'none',
    transition: 'all .3s ease-in-out',
    backgroundColor: '#42982c',
    '&:hover': {
      backgroundColor: '#49b21f',
    },
  },
  todo: {
    display: 'flex',
    alignItems: 'center',
    gap: 4
  },
  input: {
    padding: 8,
    borderRadius: 6,
    border: 'none',
    outline: 'none',
  },
  checkbox: {
    display: 'flex',
    gap: 4,
    alignItems: 'center',
    cursor: 'pointer',
    '&.checked': {
      textDecoration: 'line-through',
      opacity: '0.5'
    }
  },
  checkboxField: {
    '& input': {
      display: 'none',
    },
    '& .p-checkbox-box': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 16,
      height: 16,
      backgroundColor: '#fffefe',
      borderRadius: 4,
      color: '#2f6ea9',
      border: '1px solid #2f6ea9'
    }
  }
}))