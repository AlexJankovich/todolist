import { TaskStateType} from "./App";
import {v1} from "uuid";
import {AAdTodoListActionType, RemoveTodolistActionType} from "./todolist-reducer";
import {TaskType} from "./Todolist";

export type removeTaskActionType = {
    type: 'REMOVE-TASK',
    taskID: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: string,
    todolistId: string
}
export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    id: string,
    todoListID: string
    isDone: boolean
}
export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    id: string,
    todoListID: string
    newTitle: string
}

type ActionType = removeTaskActionType |
    AddTaskActionType |
    changeTaskStatusActionType |
    changeTaskTitleActionType|
    AAdTodoListActionType|
    RemoveTodolistActionType
    ;

export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            let newTodoList = [...state[action.todolistId].filter(t => t.id !== action.taskID)]
            return {...state, [action.todolistId]: [...state[action.todolistId].filter(t => t.id !== action.taskID)]};
        case 'ADD-TASK'   :
            let newTask = {id: v1(), title: action.task, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]};
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todoListID]: changeTitleAndStatus(state[action.todoListID],action.id, action.isDone)
            }
        }
        case "CHANGE-TASK-TITLE": {
                return {
                    ...state, [action.todoListID]: changeTitleAndStatus(state[action.todoListID],action.id, action.newTitle)
                }
        }
        case 'ADD-TODOLIST': {
            return {
               ...state,[action.todolistID]:[]
        }}
        case 'REMOVE-TODOLIST': {
            let newState ={...state}
            delete newState[action.id]
            return newState}
        default :
            throw new Error('invalid data')
    }
}

export const removeTaskAC = (taskID: string, todolistId: string):removeTaskActionType => {
        return {type: 'REMOVE-TASK', taskID, todolistId}
    }
export const addTaskAC =
    (task: string, todolistId: string): AddTaskActionType => {
        return {type: 'ADD-TASK', task, todolistId}
    }

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListID: string): changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todoListID}
}

export const changeTaskTitleAC = (id: string, newTitle: string, todoListID: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id, newTitle, todoListID}
}

let changeTitleAndStatus = (tasks:Array<TaskType>,id:string, property: string|boolean):Array<TaskType> => {
    let propertyName = typeof property === 'string'? 'title':'isDone';
    return tasks.map(t=> {
        if (t.id !== id) {
            return t
        } else {
            return {...t,[propertyName]:property}
        }
        }
    )
}