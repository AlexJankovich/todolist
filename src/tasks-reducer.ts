import {TaskStateType} from "./App";
import {v1} from "uuid";
import {AAdTodoListActionType, RemoveTodolistActionType} from "./store/todolist-reducer";

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

type ActionType =
    removeTaskActionType
    | AddTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AAdTodoListActionType
    | RemoveTodolistActionType

export const todoListID1 = v1();
export const todoListID2 = v1();
const initialState: TaskStateType = {
    // [todoListID1]: [
        // {id: v1(), title: 'HTML&CsS', isDone: true},
        // {id: v1(), title: 'JS', isDone: true},
        // {id: v1(), title: 'ReactJS', isDone: false},

    // ],
    // [todoListID2]: [
    //     {id: v1(), title: 'RestAPI', isDone: false},
    //     {id: v1(), title: 'GraphQL', isDone: false},
    // ]
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            // let newTodoList = [...state[action.todolistId].filter(t => t.id !== action.taskID)]
            return {
                ...state,
                [action.todolistId]:
                    [...state[action.todolistId].filter(t => t.id !== action.taskID)]};
        case 'ADD-TASK'   :
            let newTask = {id: v1(), title: action.task, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]};
        case "CHANGE-TASK-STATUS": {
            debugger
            let tlTasks=state[action.todoListID]

            let newTaskArray = tlTasks
                .map(t=>t.id===action.id?{...t,isDone:action.isDone}:t)
            // state[action.todoListID]=newTaskArray
            return {...state, [action.todoListID]: newTaskArray}
            // return {
            //     ...state,
            //     [action.todoListID]:[...state[action.todoListID]].filter(t=>t.id !==action.id), isDone: action.isDone
            // }
        }
        case "CHANGE-TASK-TITLE": {
                let tlTasks=state[action.todoListID]
                let newTaskArray = tlTasks
                    .map(t=>t.id===action.id?{...t,title:action.newTitle}:t)
                state[action.todoListID]=newTaskArray
                return {...state, [action.todoListID]: newTaskArray}

        }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.todolistID]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let newState = {...state}
            delete newState[action.id]
            return newState
        }
        default :
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistId: string): removeTaskActionType => {
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

// let changeTitleAndStatus = (tasks: Array<TaskType>, id: string, property: string | boolean): Array<TaskType> => {
//     let propertyName = typeof property === 'string' ? 'title' : 'isDone';
//     return tasks.map(t => {
//             if (t.id !== id) {
//                 return t
//             } else {
//                 return {...t, [propertyName]: property}
//             }
//         }
//     )
// }