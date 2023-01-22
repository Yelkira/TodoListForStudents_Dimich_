import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    id:string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todolistId:string) => void
    changeFilter: (value: FilterValuesType, todolistId:string) => void
    addTask: (title: string, todolistId:string) => void
    changeTasksStatus: (taskId: string, isDone: boolean, todolistId:string) => void
    filter:FilterValuesType
    removeTodoList:(todolistId:string)=>void
}

export const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.key === "Enter") {
            props.addTask(title, props.id)
            setTitle("")
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.id)
            setTitle("")
        } else {
            setError("Title is requaered")
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
const removeTodolist=()=>{
        props.removeTodoList(props.id)
}

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>x</button></h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}
                       className={error?"error":""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((t, i) => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const CheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTasksStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return <li className={t.isDone?"is-done":""} key={t.id}><input onChange={CheckboxHandler} type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x
                            </button>
                        </li>

                    })
                }
            </ul>
            <div>
                <button className={props.filter==="all"?"active-filter":""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter==="active"?"active-filter":""} onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter==="completed"?"active-filter":""} onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}