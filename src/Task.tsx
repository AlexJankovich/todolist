import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent} from "react";
import {TaskType} from "./Todolist";


type TaskComponentType = {
    task: TaskType
    removeTask: (id: string) => void
    key: string
    changeStatus: (value: boolean, taskId: string) => void
    changeTaskTitle: (newTitle: string, taskId: string) => void
}

export const Task = React.memo((props: TaskComponentType) => {
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        props.changeStatus(e.currentTarget.checked, props.task.id)
    }
    const removeTask = () => {
        props.removeTask(props.task.id)
    }
    const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(newTitle, props.task.id)
    return (
        <div key={props.task.id}
             className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox checked={props.task.isDone}
                      onChange={changeStatus}
            />
            <EditableSpan title={props.task.title}
                          saveNewTitle={changeTaskTitle}
            />
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>)
})
