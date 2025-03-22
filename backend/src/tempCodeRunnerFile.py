

if __name__ == "main":
    uvicorn.run(app, host="localhost", port=8000, log_level="info")