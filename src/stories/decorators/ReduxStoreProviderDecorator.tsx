import React from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../tasks-reducer";
import {todolistReducer} from "../../store/todolist-reducer";
import {v1} from "uuid";

const RootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistReducer
})

const initStore = {
    todoLists: [{id: 'todoListID1', title: 'What to learn', filter: 'all'},
        {id: 'todoListID2', title: 'What to by', filter: 'all'}],

    tasks: {
        ['todoListID1']: [
            {id: v1(), title: 'HTML&CsS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        ['todoListID2']: [
            {id: v1(), title: 'RestAPI', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    }
};
export type AppRootStateType = ReturnType<typeof RootReducer>;
export const  storyStore = createStore(RootReducer,initStore as AppRootStateType)
export const ReduxStoreProviderDecorator =(storyFn: any) => (
    <Provider
        store={storyStore}>
        {storyFn()}
    </Provider>
)