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
}

export const Todolist = (props: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === "Enter") {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
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
                <input value={newTaskTitle} onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}
                />
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {
                    props.tasks.map((el, i) => {
                        const onRemoveHandler = () => {
                            props.removeTask(el.id)
                        }
                        return <li key={el.id}><input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={onRemoveHandler}>x
                            </button>
                        </li>

                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All
                </button>
                <button onClick={onActiveClickHandler}>Active
                </button>
                <button onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}