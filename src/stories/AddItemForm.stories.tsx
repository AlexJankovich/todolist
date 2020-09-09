import React from "react";
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Meta} from "@storybook/react";

export default {
    title: "TodoList/AddItemForm",
    component: AddItemForm
} as Meta;

export const AddItemFormBaseExample = (props: any) => {
    return (<AddItemForm
        addItem={action('Button inside form clicked')}/>)
}

