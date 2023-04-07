from fastapi import FastAPI, Request, Form
import subprocess

from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


@app.get("/status", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {'request':request})

@app.post("/status")
def handle_form(request: Request, action: str = Form(...), service: str = Form(...)):
    if action == "stop":
        subprocess.run(["sudo", "systemctl", "stop", f'postgrest.{service}.service'])
    elif action == "restart":
        subprocess.run(["sudo", "systemctl", "restart", f'postgrest.{service}.service'])
    return read_root(request)

@app.get("/status/{service_name}")
def get_service_status(service_name: str):
    command = ["systemctl", "status", f'postgrest.{service_name}.service']
    result = subprocess.run(command, capture_output=True)
    return {"status": result.stdout.decode()}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
