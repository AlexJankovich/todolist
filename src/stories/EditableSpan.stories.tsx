import React from "react";
import {action} from "@storybook/addon-actions";
import {Meta} from "@storybook/react";
import EditableSpan from "../EditableSpan";

export default {
    title: "TodoList/EdSpan",
    component: EditableSpan
} as Meta;


export const ESpanBaseExample = (props: any ) => {
    return (<>
      <EditableSpan title={'StartValue'} saveNewTitle={action('value changed')}/>
    </>)
}

