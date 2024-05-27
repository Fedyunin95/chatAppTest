import {ChangeEvent, FC, useMemo, useState} from 'react';
import {tss} from "../../helpers";
import {Button} from "primereact/button";
import {RadioButton} from "primereact/radiobutton";
import {InputText} from "primereact/inputtext";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {TodoModel} from "../../types";
import {addTodo, saveChangeTodoList} from "../../store/slices/todoListSlice.tsx";
import {TodoElement} from "../../components";

export const MainScreen: FC = () => {
  const {classes, cx} = useStyles();
  const dispatch = useAppDispatch();

  const {todoList} = useAppSelector(state => state.todoList);

  const [filter, setFilter] = useState<string>('');
  const [newTodo, setNewTodo] = useState<TodoModel | null>(null);

  const filteredList = useMemo(() => {
    if (filter === 'done') {
      return todoList.filter(todo => todo.status);
    } else if (filter === 'inProgress') {
      return todoList.filter(todo => !todo.status);
    } else {
      return todoList;
    }
  }, [todoList, filter])

  // handlers
  const handleFiltersChange = (filter: string) => {
    setFilter(filter);
  }

  const handleAddTodo = () => {
    const todo = {
      id: Math.floor(1000 + Math.random() * 9000),
      text: 'New todo',
      status: 0
    };
    setNewTodo(todo);
  };

  const handleSaveTodo = () => {
    dispatch(addTodo(newTodo));
    dispatch(saveChangeTodoList());
    setNewTodo(null)
  }

  const handleChangeTodoText = (e: ChangeEvent<HTMLInputElement>) => {
    const _newTodo = {...newTodo};
    _newTodo.text = e.target.value;
    setNewTodo(_newTodo);
  }

  // renders

  return (
    <div className={classes.mainScreen}>
      <h1 className={classes.title}> Список дел </h1>
      <div className={classes.todoListContainer}>
        <div className={classes.todosList}>
          <p style={{margin: 0}}>Фильтр</p>
          <div className={classes.filters}>
            <label htmlFor={`todo-all`} className={classes.radio}>
              <RadioButton
                inputId={`todo-all`}
                checked={filter === 'all'}
                name="filter"
                onChange={() => handleFiltersChange('all')}
              />
              Все
            </label>
            <label htmlFor={`todo-finished`} className={classes.radio}>
              <RadioButton
                inputId={`todo-finished`}
                checked={filter === 'done'}
                name="filter"
                onChange={() => handleFiltersChange('done')}
              />
              Выполнены
            </label>
            <label htmlFor={`todo-inProgress`} className={classes.radio}>
              <RadioButton
                inputId={`todo-inProgress`}
                checked={filter === 'inProgress'}
                name="filter"
                onChange={() => handleFiltersChange('inProgress')}
              />
              Не Выполнены
            </label>
          </div>
          <p style={{margin: 0}}>Задачи</p>
          {filteredList.map(todo => (
            <TodoElement todo={todo} key={todo.id}/>
          ))}
          {newTodo && <div className={classes.todo}>
            <InputText className={classes.input} value={newTodo.text} onChange={handleChangeTodoText}/>
            <Button className={classes.saveTodo} icon='pi pi-save' onClick={handleSaveTodo}/>
            <Button className={classes.removeTodo} icon='pi pi-times' onClick={() => setNewTodo(null)}/>
          </div>}
        </div>
        <Button className={classes.addTodo} onClick={handleAddTodo} disabled={!!newTodo} label='Добавить'
                icon='pi pi-plus'/>
      </div>
    </div>
  )
};

const useStyles = tss.create(() => ({
  mainScreen: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  title: {
    margin: '0'
  },
  todoListContainer: {
    maxWidth: '40%',
    padding: 16,
    borderRadius: 6,
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)',
    backgroundColor: '#f8f7f7',
    boxSizing: 'border-box',
  },
  filters: {
    display: 'flex',
    gap: 16
  },
  todo: {
    display: 'flex',
    alignItems: 'center',
    gap: 4
  },
  addTodo: {
    width: "25%",
    gap: 8,
    padding: 8,
    backgroundColor: '#749bc2',
    color: '#f7f7f7',
    justifySelf: 'flex-end'
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
  todosList: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 8,
    gap: 8,
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
  },
  radio: {
    display: 'flex',
    gap: 4,
    cursor: 'pointer'
  },
}))