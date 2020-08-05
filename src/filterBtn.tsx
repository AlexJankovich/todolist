import {FilterValueType} from "./App";
import React from "react";
import {Button} from "@material-ui/core";

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
        <Button
            color={props.filter === 'all' ? 'secondary' : 'default'}
            onClick={changeFilterAll}
            variant={"outlined"}
            size={"small"}
        >
            All
        </Button>
        <Button
            color={props.filter === 'active' ? `secondary` : 'default'}
            onClick={changeFilterActive}
            variant={"outlined"}
            size={"small"}>
            Active
        </Button>
        <Button
            color={props.filter === 'completed' ? 'secondary' : 'default'}
            onClick={changeFilterCompleted}
            variant={"outlined"}
            size={"small"}>
            Completed
        </Button>
    </div>
}