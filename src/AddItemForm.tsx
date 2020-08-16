import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField, IconButton} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required')
        }
    }
    const changeInput = (e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.currentTarget.value);
    const adOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem()
        }
        setError(null)
    }
    return <div>
        <TextField
        variant={"outlined"}
        onChange={changeInput}
        onKeyPress={adOnKeyPress}
        error={!!error}
        size={"small"}
        label={'input task'}
        helperText={error}
        value={title}
        />
        <IconButton onClick={addItem}
                color={"primary"}
                size={"medium"}>
            <AddBox/>
        </IconButton>
    </div>
}