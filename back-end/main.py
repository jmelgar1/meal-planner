from fastapi import FastAPI
from routes import recipe

app = FastAPI()

# Register routes
app.include_router(recipe.router)

@app.get("/")
def root():
    return {"message": "Welcome to the Meal Planner!"}