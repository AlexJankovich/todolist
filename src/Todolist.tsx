import React, { useCallback} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {FilterBtn} from "./filterBtn";
import { IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {ChangeFilterAC} from "./store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./tasks-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type  PropsType = {
    id: string
    title: string,
    filter: string,
    removeTodoList: (todoListID: string) => void
    changeTodolistTitle: (todoListID: string, newTitle: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    console.log("Todolist called")

    // const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists&&state.todoLists.find(tl=>tl.id===props.id))

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch();

    let tasksForTodoList = tasks;

    if (props.filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone);
    }
    const changeFilter = (value: FilterValueType, todoListID: string) => {
        dispatch(ChangeFilterAC(value, todoListID))
    }


    const removeTask = useCallback((taskId:string) => {
        dispatch(removeTaskAC(taskId, props.id))
    },[dispatch, props.id])
    const changeStatus = useCallback((newCheckBoxValue:boolean,taskId:string) => {
        debugger
        dispatch(changeTaskStatusAC(taskId,  newCheckBoxValue, props.id ))
    },[dispatch, props.id])
    const changeTaskTitle = useCallback((newTitle: string,taskId:string) => {
        dispatch(changeTaskTitleAC(taskId,  newTitle,props.id))
    },[dispatch, props.id])
    const taskMap = (tasksForTodoList.map((t) => {

        return (
            <Task
                key={t.id}
                task={t}
                changeTaskTitle={changeTaskTitle}
                changeStatus={changeStatus}
                removeTask={removeTask}
            />)
    }))

    const removeListHandler = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle=useCallback((newTitle: string) =>{
        props.changeTodolistTitle(props.id, newTitle)
    },[props])
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
        // props.addTask(title, props.id)
    }, [dispatch, props])


    return <div>
        <h3>
            <EditableSpan title={props.title}
                          saveNewTitle={changeTodoListTitle}
            />
            <IconButton onClick={removeListHandler}
                        size={"small"}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {taskMap}
        </div>
        <FilterBtn changeFilter={changeFilter}
                   id={props.id}
                   filter={props.filter}/>
    </div>
})


