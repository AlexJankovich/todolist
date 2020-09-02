import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";


const RootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistReducer
})

export  const store =createStore(RootReducer);

export type AppRootStateType = ReturnType<typeof RootReducer>;

//@ts-ignore
window.store =store