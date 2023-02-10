import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormProps = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormProps) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.key === "Enter") {
            props.addItem(title)
            setTitle("")
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is requaered")
        }
    }
    return (
        <div>
            <TextField value={title}
                       variant={"outlined"}
                       label={"Type value"}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addTask} color={"primary"}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
}