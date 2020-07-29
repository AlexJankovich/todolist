import {FilterValueType} from "./App";
import React from "react";

type FilterBtnType = {
    changeFilter: (value: FilterValueType, todoListID: string) => void
    id: string
    filter: string
}

export function FilterBtn(props: FilterBtnType) {
    const changeFilterAll = () => props.changeFilter('all', props.id)
    const changeFilterActive = () => props.changeFilter('active', props.id)
    const changeFilterCompleted = () => props.changeFilter('completed', props.id)

    return <div>
        <button
            className={props.filter === 'all' ? 'active' : ''}
            onClick={changeFilterAll}>All
        </button>
        <button
            className={props.filter === 'active' ? 'active' : ''}
            onClick={changeFilterActive}>Active
        </button>
        <button
            className={props.filter === 'completed' ? 'active' : ''}
            onClick={changeFilterCompleted}>Completed
        </button>
    </div>
}