import {FilterValueType, TodoListType} from "./App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AAddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}

type ActionType = RemoveTodolistActionType |
                  AAddTodoListActionType |
                  ChangeTodolistTitleActionType |
                  ChangeTodoListFilterActionType

export const todolistReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST'   :
            let newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state;
        case 'CHANGE-TODOLIST-FILTER':
            let todoList1 = state.find((tl => tl.id === action.id))
            if (todoList1) {
                todoList1.filter = action.filter
                return [...state]
            }
            return state
        default :
            throw new Error('invalid data')
    }
}

export const RemoveTodoListAC =
    (id: string): RemoveTodolistActionType =>
{
    return {type: 'REMOVE-TODOLIST', id: id}
}
export const AddTodoListAC =
    (title: string): AAddTodoListActionType =>
{
    return {type: 'ADD-TODOLIST', title: title}
}
export const ChangeTitleAC =
    (title: string, id: string): ChangeTodolistTitleActionType =>
    {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: id}
}
export const ChangeFilterAC =
    (filter: FilterValueType, id: string): ChangeTodoListFilterActionType =>
    {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
