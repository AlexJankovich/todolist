import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

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
    return<div>
        <input value={title}
               placeholder='input task'
               onChange={changeInput}
               onKeyPress={adOnKeyPress}
               className={error ? 'error' : ''}/>
        <button onClick={addItem}>+</button>
        {error && <div className='error-message'>{error}</div>}
    </div>
}