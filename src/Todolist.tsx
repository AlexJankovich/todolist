import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {FilterBtn} from "./filterBtn";

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
        let removeTask = () => props.removeTask(t.id, props.id)
        let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let newCheckBoxValue = e.currentTarget.checked;
            props.ChangeTasks(t.id,
                newCheckBoxValue,
                props.id)
        }
        let changeTaskTitle = (newTitle: string) => {
            props.ChangeTaskTitle(t.id, newTitle, props.id)
        }
        return (
            <li key={t.id}
                className={t.isDone ? 'is-done' : ''}>
                <input key={t.id}
                       type="checkbox"
                       checked={t.isDone}
                       onChange={changeStatus}/>
                <EditableSpan title={t.title}
                              saveNewTitle={changeTaskTitle}/>
                <button onClick={removeTask}>X</button>
            </li>)
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
            <button onClick={removeListHandler}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {taskMap}
        </ul>
        <FilterBtn changeFilter={props.changeFilter}
                   id={props.id}
                   filter={props.filter}/>
    </div>
}


