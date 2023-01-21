import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTasksStatus: (taskId: string, isDone: boolean) => void
    filter:FilterValuesType
}

export const Todolist = (props: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.key === "Enter") {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Title is requaered")
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}
                       className={error?"error":""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((el, i) => {

                        const onRemoveHandler = () => {
                            props.removeTask(el.id)
                        }
                        const CheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTasksStatus(el.id, e.currentTarget.checked)
                        }
                        return <li className={el.isDone?"is-done":""} key={el.id}><input onChange={CheckboxHandler} type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
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