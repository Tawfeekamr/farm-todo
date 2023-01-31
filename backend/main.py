#  @bekbrace
#  FARMSTACK Tutorial - Sunday 13.06.2021
import uuid
from fastapi import FastAPI, HTTPException

from model import Todo

from database import (
    fetch_one_todo,
    fetch_all_todos,
    create_todo,
    update_todo,
    remove_todo,
)

# an HTTP-specific exception class  to generate exception information

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5173/",
    "http://192.168.100.84:5173/",
    "http://192.168.100.84:5173",

]

# what is a middleware? 
# software that acts as a bridge between an operating system or database and applications, especially on a network.

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/todo")
async def get_all_todos():
    response = await fetch_all_todos()
    return response


# @app.get("/api/todo/{title}")
# async def get_todo(title: str):
#     response = await fetch_one_todo(title)
#     return response


@app.get("/api/todo/{todo_id}", response_model=Todo)
async def get_todo_by_title(todo_id: str):
    response = await fetch_one_todo(todo_id)
    if response:
        return response
    raise HTTPException(404, f"There is no todo with the title {todo_id}")


@app.post("/api/todo/", response_model=Todo)
async def post_todo(todo: Todo):
    new_todo = {
        "uuid": str(uuid.uuid4()),
        "body": todo.body,
        "title": todo.title
    }
    response = await create_todo(new_todo)
    if response:
        return response
    raise HTTPException(400, "Something went wrong")


@app.put("/api/todo/{title}/", response_model=Todo)
async def put_todo(title: str, desc: str):
    response = await update_todo(title, desc)
    if response:
        return response
    raise HTTPException(404, f"There is no todo with the title {title}")


@app.delete("/api/todo/{title}")
async def delete_todo(title):
    response = await remove_todo(title)
    if response:
        return "Successfully deleted todo"
    raise HTTPException(404, f"There is no todo with the title {title}")
