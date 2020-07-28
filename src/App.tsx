import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {v1} from "uuid";

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    // let [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: 'HTML&CsS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    //     {id: v1(), title: 'RestAPI', isDone: false},
    //     {id: v1(), title: 'GraphQL', isDone: false},
    // ])
    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to by', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TaskStateType>(
        {
            [todoListID1]: [
                {id: v1(), title: 'HTML&CsS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},

            ],
            [todoListID2]: [
                {id: v1(), title: 'RestAPI', isDone: false},
                {id: v1(), title: 'GraphQL', isDone: false},
            ]
        })

    const removeTask = (id: string, todoListID: string) => {
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = todoListTasks.filter(t => t.id !== id)
        // let filteredTasks = tasks.filter((t => t.id !== id));
        setTasks({...tasks})
    }

    function ChangeTasks(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const addTask = (taskName: string, todoListID: string) => {
        let task = {id: v1(), title: taskName, isDone: false};
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [task, ...todoListTasks];
        setTasks({...tasks});
    }

    function removeTodoList(todoListID: string) {
        delete tasks[todoListID];
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID));
    }


    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let tasksForTodoList = tasks[tl.id];

                    if (tl.filter === 'active') {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone );
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone);
                    }
                    const changeFilter = (value: FilterValueType, todoListID: string) => {
                        let todoList = todoLists.find(tl => tl.id === todoListID)
                        if (todoList) {
                            todoList.filter = value
                        }
                        setTodoLists([...todoLists])
                    }
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        ChangeTasks={ChangeTasks}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                })
            }
        </div>
    )
}

export default App;


{/*<TodoList*/
}
{/*    title='What to learn'*/
}
{/*    tasks={tasksForTodoList}*/
}
{/*    removeTask={removeTask}*/
}
{/*    changeFilter={changeFilter}*/
}
{/*    addTask={addTask}*/
}
{/*    ChangeTasks={ChangeTasks}*/
}
{/*    filter={filter}*/
}
{/*/>*/
}