import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Container,
    Grid,
    Paper
} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeFilterAC,
    ChangeTitleAC,
    RemoveTodoListAC,
    todolistReducer
} from "./todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    todoListID1, todoListID2
} from "./tasks-reducer";

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

function AppWithReducers() {

    const [todoLists, dispatchToTodoList] = useReducer(todolistReducer, [
        // {id: todoListID1, title: 'What to learn', filter: 'all'},
        // {id: todoListID2, title: 'What to by', filter: 'all'}
    ])
    let [tasks, dispatchToTasks] = useReducer(tasksReducer,
        {
            // [todoListID1]: [
            //     {id: v1(), title: 'HTML&CsS', isDone: true},
            //     {id: v1(), title: 'JS', isDone: true},
            //     {id: v1(), title: 'ReactJS', isDone: false},
            //
            // ],
            // [todoListID2]: [
            //     {id: v1(), title: 'RestAPI', isDone: false},
            //     {id: v1(), title: 'GraphQL', isDone: false},
            // ]
        })
    // const removeTask = (id: string, todoListID: string) => {
    //     dispatchToTasks(removeTaskAC(id, todoListID))
    // }
    //
    // function ChangeTasks(id: string, isDone: boolean, todoListID: string) {
    //     dispatchToTasks(changeTaskStatusAC(id, isDone, todoListID))
    // }
    //
    // function ChangeTaskTitle(id: string, newTitle: string, todoListID: string) {
    //     dispatchToTasks(changeTaskTitleAC(id, newTitle, todoListID))
    // }

    const addTask = (taskName: string, todoListID: string) => {
        dispatchToTasks(addTaskAC(taskName, todoListID))
    }

    function removeTodoList(todoListID: string) {
        const action = RemoveTodoListAC(todoListID)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }

    function changeTodolistTitle(todoListID: string, newTitle: string) {
        dispatchToTodoList(ChangeTitleAC(todoListID, newTitle))
        // const todolist = todoLists.find(tl => tl.id === todoListID);
        // if (todolist) {
        //     todolist.title = newTitle;
        //     setTodoLists([...todoLists])
        // }
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
                        const changeFilter = (value: FilterValueType, todoListID: string) => {
                            dispatchToTodoList(ChangeFilterAC(value, todoListID))
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

export default AppWithReducers;
