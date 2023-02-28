import {TasksStateType} from '../App';

export type RemoveTaskAction1Type = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}
export type addTaskACType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}

type ActionsType = RemoveTaskAction1Type | addTaskACType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .filter(s => s.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            const newTask = {id:"4", title:action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask,...state[action.todolistId]]}
        }
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAction1Type => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskACType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}
