import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskAction1Type = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId:string
}
export type ActionType12 = {
    type: '2',
    title: string
}

type ActionsType = RemoveTaskAction1Type| ActionType12

export const tasksReducer = (state: TasksStateType, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":{
            return {...state, [action.todolistId]:state[action.todolistId]
                    .filter(s=>s.id!==action.taskId)}
        }
        case "2":{
            return {...state}
        }
    }
}

export const removeTaskAC = (taskId: string, todolistId:string): RemoveTaskAction1Type => {
    return { type: 'REMOVE-TASK', todolistId, taskId}
}
export const actionAC2 = (title: string): ActionType12 => {
    return { type: '2', title: title}
}
