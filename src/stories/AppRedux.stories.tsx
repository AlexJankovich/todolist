import React from "react";
import {Meta} from "@storybook/react";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";


export default {
    title: "TodoList/AppRedux",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;


export const AppReduxBaseExample = (props: any) => {
    return (<>
        <AppWithRedux/>
    </>)
}

