from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import document_router

app = FastAPI(
    title="Word Document Formatter API",
    description="API for formatting Word documents",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(document_router)


@app.get("/")
async def root():
    return {"message": "Word Document Formatter API", "version": "1.0.0"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
