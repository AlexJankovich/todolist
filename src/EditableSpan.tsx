import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    saveNewTitle:(newTitle:string)=>void
}

function EditableSpan(props: EditableSpanType) {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle]=useState<string>(props.title)
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
        ? <input value={title}
                 onBlur={deActivateEditMode}
                 autoFocus
                 onChange={changeTitle}/>
        : <span onDoubleClick={activateEditMode}> {props.title}</span>
}

export default EditableSpan;