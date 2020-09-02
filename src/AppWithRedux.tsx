import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {AddTodoListAC, ChangeFilterAC, ChangeTitleAC, RemoveTodoListAC, todolistReducer} from "./todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    todoListID1, todoListID2
} from "./tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

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

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    // const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch();

    // const removeTask = (id: string, todoListID: string) => {
    //     const action = removeTaskAC(id, todoListID)
    //     dispatch(action)
    // }

    // function ChangeTasks(id: string, isDone: boolean, todoListID: string) {
    //     dispatch(changeTaskStatusAC(id, isDone, todoListID))
    // }

    // function ChangeTaskTitle(id: string, newTitle: string, todoListID: string) {
    //     dispatch(changeTaskTitleAC(id, newTitle, todoListID))
    // }

    // const addTask = (taskName: string, todoListID: string) => {
    //     dispatch(addTaskAC(taskName, todoListID))
    // }

    function removeTodoList(todoListID: string) {
        const action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title)
        dispatch(action)
    }

    function changeTodolistTitle(todoListID: string, newTitle: string) {
        dispatch(ChangeTitleAC(todoListID,newTitle))
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

                        return <Grid item>
                            <Paper style={{padding: "20px"}}
                                   elevation={5}>
                                <TodoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
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

export default AppWithRedux;
