from fastapi import FastAPI
from pydantic import BaseModel
import openai
import logging

# --- ロギング設定 ---
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
# FastAPIアプリの作成
app = FastAPI()

# OpenAI APIキー設定（環境変数で設定推奨）
openai.api_key = ""

# リクエストボディ定義
class FeelingRequest(BaseModel):
    feeling: str

@app.post("/recommend")
def recommend_movie(req: FeelingRequest):
    prompt = f"{req.feeling}ときに見るべき映画をスペース区切りで教えて"
    
    # OpenAI API呼び出し
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "あなたは映画のおすすめAIです。"},
            {"role": "user", "content": prompt}
        ],
        max_tokens=100
    )
    
    answer = response.choices[0].message.content.strip()
    # --- ログ出力 ---
    logger.info("Received request: %s", req.feeling)
    logger.info("Prompt: %s", prompt)
    logger.info("OpenAI API raw response: %s", response)

    answer = response.choices[0].message.content.strip()

    logger.info("Extracted recommendation: %s", answer)
    return {"prompt": prompt, "recommendation": answer}
