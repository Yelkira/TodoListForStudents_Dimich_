import {TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            let todolist: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all"

            }
            return [...state, todolist]
        }
        case "CHANGE-TODOLIST-TITLE":{
            return state.map(s=>s.id === action.id?{...s, title: action.title}:s)
        }
        default:
            throw new Error("I dont feel my legs")
    }

}
