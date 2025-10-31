from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import logging
import os

# --- ロギング設定 ---
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
# FastAPIアプリの作成
app = FastAPI()
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OpenAI APIキーが見つかりません。")

app = FastAPI()

class FeelingRequest(BaseModel):
    feeling: str

@app.post("/recommend")
def recommend_movie(req: FeelingRequest):
    prompt = f"{req.feeling}ときに見るべき映画をスペース区切りで教えて"
    client = OpenAI(api_key=api_key)
    # Chat API呼び出し（新仕様）
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "あなたは映画のおすすめAIです。"},
            {"role": "user", "content": prompt},
        ],
        max_tokens=100,
    )

    answer = response.choices[0].message.content.strip()

    # --- ログ出力 ---
    logger.info("Received request: %s", req.feeling)
    logger.info("OpenAI API raw response: %s", response)

    answer = response.choices[0].message.content.strip()

    logger.info("Extracted recommendation: %s", answer)
    return {"prompt": prompt, "recommendation": answer}
