from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer = 'MOUSE'

@app.get("/answer")
def get_answer():
    return {'answer' : answer}

app.mount("/", StaticFiles(directory="static", html=True), name="static")
