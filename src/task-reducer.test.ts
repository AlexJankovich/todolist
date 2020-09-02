
import {addTaskAC, removeTaskAC, tasksReducer, changeTaskStatusAC, changeTaskTitleAC} from './tasks-reducer';
import {TaskStateType} from './App';
import {AddTodoListAC} from "./todolist-reducer";

let startState: TaskStateType;

beforeEach(
    ()=>{
        startState= {
            "todoListID1": [
                { id: "1", title: "CSS", isDone: false },
                { id: "2", title: "JS", isDone: true },
                { id: "3", title: "React", isDone: false }
            ],
            "todoListID2": [
                { id: "1", title: "bread", isDone: false },
                { id: "2", title: "milk", isDone: true },
                { id: "3", title: "tea", isDone: false }
            ]
        };
    }
);

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todoListID2");

    const endState = tasksReducer(startState, action)

    expect(endState["todoListID1"].length).toBe(3);
    expect(endState["todoListID2"].length).toBe(2);
    expect(endState["todoListID2"].every(t => t.id !== "2")).toBeTruthy();
});

test('correct task should be added to correct array', () => {

    const action = addTaskAC("juce", "todoListID2");
    const endState = tasksReducer(startState, action)

    expect(endState["todoListID1"].length).toBe(3);
    expect(endState["todoListID2"].length).toBe(4);
    expect(endState["todoListID2"][0].id).toBeDefined();
    expect(endState["todoListID2"][0].title).toBe("juce");
    expect(endState["todoListID2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", false, "todoListID2");
    const endState = tasksReducer(startState, action)

    expect(endState["todoListID2"][1].isDone).toBe(false);
    expect(endState["todoListID1"][1].isDone).toBe(true);
});

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", 'beer', "todoListID2");
    const endState = tasksReducer(startState, action)

    expect(endState["todoListID2"][1].title).toBe('beer');
    expect(endState["todoListID1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {

    const action = AddTodoListAC("new todoList");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todoListID1" && k != "todoListID2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});





