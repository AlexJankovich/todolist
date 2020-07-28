import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean

}

type  PropsType = {
    id:string
    title: string,
    filter: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todoListID:string) => void,
    changeFilter: (value: FilterValueType,todoListID:string ) => void
    addTask: (taskName: string, todoListID:string) => void
    ChangeTasks: (id: string, isDone: boolean,todoListID:string) => void
    removeTodoList:(todoListID:string)=> void
}

export const TodoList = (props: PropsType) => {
    let [taskName, setTaskName] = useState('')
    let [error, setError] = useState<string | null>(null)
    const adOnClick = () => {
        if (taskName.trim()) {
            props.addTask(taskName, props.id);
            setTaskName('');
            setError(null)
        }else
        {
            setError('Title is required')
        }
    }
    const taskMap = (props.tasks.map((t) => {
        let removeTask = () => props.removeTask(t.id, props.id)
        let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let newCheckBoxValue = e.currentTarget.checked;
            props.ChangeTasks(t.id, newCheckBoxValue, props.id)
        }
        return (
            <li key={t.id} className={t.isDone? 'is-done':''}>
                <input key={t.id}
                       type="checkbox" checked={t.isDone}
                       onChange={changeStatus}/>
                <span> {t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>)
    }))
    const changeInput = (e: ChangeEvent<HTMLInputElement>) => setTaskName(e.currentTarget.value);
    const adOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            adOnClick()
        }
    }
    const changeFilterAll = () => props.changeFilter('all', props.id)
    const changeFilterActive = () => props.changeFilter('active', props.id)
    const changeFilterCompleted = () => props.changeFilter('completed', props.id)
    const removeListHandler =()=>{props.removeTodoList(props.id)}
    return <div >
        <h3>{props.title} <button onClick={removeListHandler}>X</button> </h3>
        <div>
            <input value={taskName}
                   placeholder='input task'
                   onChange={changeInput}
                   onKeyPress={adOnKeyPress}
                   className={error ? 'error' : ''}/>
            <button onClick={adOnClick}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
        <ul>
            {taskMap}
        </ul>
        <div>
            <button
                className={props.filter === 'all'? 'active':''}
                onClick={changeFilterAll}>All</button>
            <button
                className={props.filter === 'active'? 'active':''}
                onClick={changeFilterActive}>Active</button>
            <button
                className={props.filter === 'completed'? 'active':''}
                onClick={changeFilterCompleted}>Completed</button>
        </div>
    </div>
}