import React from "react";
import {action} from "@storybook/addon-actions";
import {Meta} from "@storybook/react";
import {Task} from "../Task";

export default {
    title: "TodoList/Task",
    component: Task
} as Meta;

const removeCallback = action("Remove Button Clicked")
const changeStatusCallback = action("Status changed")
const changeTitleCallback = action("Title changed")

export const TaskBaseExample = (props: any) => {
    return (<>
        <Task
            key={'1'}
            task={{id: "1", isDone: true, title: 'css'}}
            changeTaskTitle={changeTitleCallback}
            changeStatus={changeStatusCallback}
            removeTask={removeCallback}
        />
        <Task
            key={'2'}
            task={{id: "2", isDone: false, title: 'HTML'}}
            changeTaskTitle={changeTitleCallback}
            changeStatus={changeStatusCallback}
            removeTask={removeCallback}
        />
    </>)
}

