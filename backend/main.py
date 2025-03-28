from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 실제 배포 시에는 특정 도메인만 허용하도록 수정
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터 모델
class Item(BaseModel):
    id: Optional[int] = None
    name: str
    description: str

# 메모리 내 데이터 저장소
items_db = []
current_id = 1

# API 엔드포인트
@app.get("/api/items")
async def get_items():
    return items_db

@app.post("/api/items")
async def create_item(item: Item):
    global current_id
    item.id = current_id
    current_id += 1
    items_db.append(item)
    return item

@app.delete("/api/items/{item_id}")
async def delete_item(item_id: int):
    for i, item in enumerate(items_db):
        if item.id == item_id:
            return items_db.pop(i)
    raise HTTPException(status_code=404, detail="Item not found")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 