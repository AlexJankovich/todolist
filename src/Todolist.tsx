import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {FilterBtn} from "./filterBtn";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type  PropsType = {
    id: string
    title: string,
    filter: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todoListID: string) => void,
    changeFilter: (value: FilterValueType, todoListID: string) => void
    addTask: (taskName: string, todoListID: string) => void
    ChangeTasks: (taskId: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    ChangeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    changeTodolistTitle: (todoListID: string, newTitle: string) => void
}

export const TodoList = (props: PropsType) => {
    const taskMap = (props.tasks.map((t) => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            const newCheckBoxValue = e.currentTarget.checked;
            props.ChangeTasks(t.id,
                newCheckBoxValue,
                props.id)
        }
        const changeTaskTitle = (newTitle: string) => {
            props.ChangeTaskTitle(t.id, newTitle, props.id)
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
        props.addTask(title, props.id)
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
        <FilterBtn changeFilter={props.changeFilter}
                   id={props.id}
                   filter={props.filter}/>
    </div>
}


