from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
import os
from typing import List
from pydantic import BaseModel

from YoutubeRecommenditon.getYoutubeRecommendetion import getYoutubeRecommendetion
from fastapi.middleware.cors import CORSMiddleware

# --- ロギング設定 ---
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# 許可するオリジン（開発中なら * でもOK）
origins = [
    "http://localhost:3000",  # Next.jsフロント
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # 許可するオリジン
    allow_credentials=True,
    allow_methods=["*"],            # すべてのHTTPメソッドを許可
    allow_headers=["*"],            # すべてのHTTPヘッダーを許可
)
load_dotenv()

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OpenAI APIキーが見つかりません。")

# --- CORS 設定 ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FeelingRequest(BaseModel):
    filters: List[str]


@app.post("/recommend")
def recommend_movie(req: FeelingRequest):
    raw_data = getYoutubeRecommendetion(YOUTUBE_API_KEY, OPENAI_API_KEY, req.filters)
    formatted_data = []
    for item in raw_data.get("results", []):
        formatted_data.append({
            "url": item["url"],
            "name": item["title"],
            "icon": item["thumbnail"],
            "review": (
                item["comments"][0]["text"]
                if item["comments"]
                else "コメントはありません。"
            )
        })

    # 🔽ここを変更：「data」→「videos」
    response = {"videos": formatted_data}
    logger.info("Response JSON: %s", response)
    return response

@app.get("/health")
def helth():
    return {
        "data": [
            {
                "url": "https://example.com",
                "name": "Example1",
                "icon": "https://i.ytimg.com/vi/iS9KzCBOmFo/hqdefault.jpg",
                "review": "とても良いサービスです！"
            },
            {
                "url": "https://example2.com",
                "name": "Example2",
                "icon": "https://i.ytimg.com/vi/iS9KzCBOmFo/hqdefault.jpg",
                "review": "とても良いサービスです！"
            },
            {
                "url": "https://example3.com",
                "name": "Example3",
                "icon": "https://i.ytimg.com/vi/iS9KzCBOmFo/hqdefault.jpg",
                "review": "とても良いサービスです！"
            }
        ]
    }
