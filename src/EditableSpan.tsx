import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    saveNewTitle:(newTitle:string)=>void
}

function EditableSpan(props: EditableSpanType) {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle]=useState<string>(props.title)
    function activateEditMode(){
        setEditMode(true)
        setTitle(props.title)
    }
    function deActivateEditMode(){
        setEditMode(false)
        props.saveNewTitle(title)
    }
    function changeTitle(e: ChangeEvent<HTMLInputElement>){
        setTitle(e.currentTarget.value)
    }


    return editMode
        ?  <TextField
            onBlur={deActivateEditMode}
            onChange={changeTitle}
            autoFocus
            value={title}
        />
        // <input value={title}
        //          onBlur={deActivateEditMode}
        //          autoFocus
        //          onChange={changeTitle}/>
        : <span onDoubleClick={activateEditMode}> {props.title}</span>
}

export default EditableSpan;