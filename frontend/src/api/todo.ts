import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000"
export const getAllTodos = () => {
    return axios.get(`${BASE_URL}/api/todo`)
}

export const createTodo = (data: {"title": string, "body": string}) => {
    return axios.post(`${BASE_URL}/api/todo/`, data)
}