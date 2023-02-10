import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange:(newValue:string)=>void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle]=useState("")
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <TextField variant={"standard"} onChange={onChangeTitleHandler} value={title} onBlur={deactivateEditMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )

}