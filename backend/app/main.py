from fastapi import FastAPI

app = FastAPI(title="公路广告牌管理系统 API")


@app.get("/health")
def health():
    return {"status": "ok"}
