print("Starting application...")
from fastapi import FastAPI
from app.spoonacular.routes import recipe
from app.nutritionix.routes import ingredient
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(ingredient.router)
app.include_router(recipe.router)

@app.get("/", tags=["Root"])
def root():
    return {"message": "Hello from FastAPI!"}

if __name__ == "__main__":
    print("Starting server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
