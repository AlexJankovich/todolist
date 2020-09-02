import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {FilterBtn} from "./filterBtn";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TaskStateType, TodoListType} from "./AppWithRedux";
import {ChangeFilterAC} from "./todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./tasks-reducer";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type  PropsType = {
    id: string
    title: string,
    filter: string,
    // removeTask: (taskId: string, todoListID: string) => void,
    // changeFilter: (value: FilterValueType, todoListID: string) => void
    // addTask: (taskName: string, todoListID: string) => void
    // ChangeTasks: (taskId: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    // ChangeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    changeTodolistTitle: (todoListID: string, newTitle: string) => void
}

export const TodoList = (props: PropsType) => {
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
    const changeFilter = (value: FilterValueType, todoListID: string) =>
    {
        dispatch(ChangeFilterAC(value,todoListID))
    }

    const taskMap = (tasksForTodoList.map((t) => {
        const removeTask = () => {
            dispatch(removeTaskAC(t.id, props.id))
            // props.removeTask(t.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            const newCheckBoxValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(t.id, newCheckBoxValue, props.id))
            // props.ChangeTasks(t.id,
            //     newCheckBoxValue,
            //     props.id)
        }
        const changeTaskTitle = (newTitle: string) => {
            dispatch(changeTaskTitleAC(t.id, newTitle, props.id))
            // props.ChangeTaskTitle(t.id, newTitle, props.id)
        }

        return (
            <div key={t.id}
                 className={t.isDone ? 'is-done' : ''}>
                <Checkbox checked={t.isDone}
                          onChange={changeStatus}
                />
                <EditableSpan title={t.title}
                              saveNewTitle={changeTaskTitle}
                />
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </div>)
    }))

    const removeListHandler = () => {
        props.removeTodoList(props.id)
    }

    function addTask(title: string) {
        dispatch(addTaskAC(title, props.id))
        // props.addTask(title, props.id)
    }

    function changeTodoListTitle(newTitle: string) {
        props.changeTodolistTitle(props.id, newTitle)
    }

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
}


