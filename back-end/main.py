from fastapi import FastAPI
from app.routes import recipe, ingredient
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(recipe.router)
app.include_router(ingredient.router)

@app.get("/", tags=["Root"])
def root():
    return {"message": "Hello from FastAPI!"}
