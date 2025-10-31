
def getYoutubeQuerybyChatGPT(client, mood="癒されたい、元気を出したい", templatePattern=1):
    # 🧠 ChatGPTに「気持ちに合う検索ワード」を生成させる
    prompt = f"今の気持ちは「{mood}」です。この気持ちに合うYouTube検索ワードを1〜3個提案してください。短く、自然な日本語で。"

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    search_query = response.choices[0].message.content.strip()
    return search_query