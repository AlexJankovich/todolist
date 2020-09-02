import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from "@material-ui/icons";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValueType = 'all' | 'active' | 'completed'
// export type FilterValueType = string

function App() {
    const todoListID1 = v1();
    const todoListID2 = v1();
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
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

    function ChangeTaskTitle(id: string, newTitle: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
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

    function addTodoList(tile: string) {
        let newTodolistID = v1();
        let newTodoList: TodoListType = {
            id: newTodolistID,
            title: tile,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks, [newTodolistID]: []
        })
    }

    function changeTodolistTitle(todoListID: string, newTitle: string) {
        const todolist = todoLists.find(tl => tl.id === todoListID);
        if (todolist) {
            todolist.title = newTitle;
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"}
                                color={"inherit"}
                                aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <Paper elevation={3} style={{padding: "20px"}}>
                        <AddItemForm addItem={addTodoList}/>
                    </Paper>
                </Grid>
                <Grid container spacing={5}>{
                    todoLists.map(tl => {
                        let tasksForTodoList = tasks[tl.id];

                        if (tl.filter === 'active') {
                            tasksForTodoList = tasks[tl.id].filter(t => !t.isDone);
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = tasks[tl.id].filter(t => t.isDone);
                        }
                        const changeFilter = (value: FilterValueType, todoListID: string) =>
                        {
                            const todoList = todoLists.find(tl => tl.id === todoListID)
                            if (todoList) {
                                todoList.filter = value
                            }
                            setTodoLists([...todoLists])
                        }
                        return <Grid item>
                            <Paper style={{padding: "20px"}}
                                   elevation={5}>
                                <TodoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    // tasks={tasksForTodoList}
                                    // removeTask={removeTask}
                                    // changeFilter={changeFilter}
                                    // addTask={addTask}
                                    // ChangeTasks={ChangeTasks}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    // ChangeTaskTitle={ChangeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }</Grid>
            </Container>
        </div>
    )

}

export default App;
