import {v1} from "uuid";
import {TodoListType} from "../App";
import {todolistsReducer} from "./todolisttts-reducer";

test("correct todolist should be removed", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"}
    ]

    const endState = todolistsReducer(startState, {type: "REMOVE-TODOLIST", id: todolistId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoListTitle = "New Todolist"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"}
    ]
    const endState = todolistsReducer(startState, {type:"ADD-TODOLIST", title:newTodoListTitle})
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
    expect(endState[2].filter).toBe("all")

})

test("correct todolist should change its name", ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoListTitle = "New Todolist"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"}
    ]
    const action = {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistId2,
        title: newTodoListTitle
    }
    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodoListTitle)

})