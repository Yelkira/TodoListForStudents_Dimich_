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
export type changeTaskStatusACType = {
    type: "CHANGE-TASK-STATUS"
    taskId:string
    isDone:boolean
    todolistId: string
}

type ActionsType = RemoveTaskAction1Type | addTaskACType | changeTaskStatusACType

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
        case "CHANGE-TASK-STATUS":{
            return {...state, [action.todolistId]:state[action.todolistId]
                    .map(t=>t.id === action.taskId?{...t, isDone:action.isDone}:t)}
        }
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAction1Type => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskACType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}
export const changeTaskStatusAC = (taskId:string, isDone: boolean, todolistId: string): changeTaskStatusACType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId: todolistId}
}
