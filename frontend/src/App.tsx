import {FormEvent, useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {createTodo, getAllTodos} from "./api/todo";
import {TodoType} from "./@types/todo";

function App() {
    const [todos, setTodos] = useState<TodoType[]>([])
    useEffect(() => {
        getAllTodos().then((res) => setTodos(res.data)).catch((err) => console.error(err))
    }, [todos])

    const handleSubmit = (e: FormEvent | HTMLFormElement | undefined) => {
        e?.preventDefault();
        let elements: any;
        // @ts-ignore
        elements = e?.target?.elements;
        if (elements) {
            const {title, body} = elements
            console.debug('Title:', title.value);
            console.debug('Body:', body.value);
            const submitData = {title: title.value, body: body.value}
            createTodo(submitData).then(() => todos.unshift(submitData)).catch((err) => console.error(err))
        }

    }
    return (
        <div className="App">
            <div>
                <h3 className={"my-4"}>Task Manager</h3>
                <form onSubmit={handleSubmit}>
                    <div className={"mb-3 text-start"}>
                        <label htmlFor="title" className={"form-label"}>Add your Task</label>
                        <input type="text" className="form-control" id="title" name={"title"}
                               aria-describedby="emailHelp" placeholder={"add your task here"}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="desc" className="form-label">Task description</label>
                        <input type="text" name={"body"} className="form-control" id="desc"
                               placeholder={"add your task description"}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Task</button>
                </form>
            </div>
            <div className={"mt-4"}>
                <h3>List of Todos</h3>
                <ul className="list-group">
                    {todos.map((todo) => <li key={window.crypto.randomUUID()} className="list-group-item"><div>{todo.title}</div><small>{todo.body}</small></li>)}
                </ul>
            </div>
        </div>
    )
}

export default App
