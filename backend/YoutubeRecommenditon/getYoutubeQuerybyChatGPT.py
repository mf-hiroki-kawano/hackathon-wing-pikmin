
def getYoutubeQuerybyChatGPT(client, inputs):
    # 🧠 ChatGPTに「気持ちに合う検索ワード」を生成させる
    input_text = ",".join(inputs)
    prompt = f"今の気持ちは「{input_text}」です。この気持ちに合うYouTube検索ワードを1〜3個提案してください。短く、自然な日本語で。"

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    search_query = response.choices[0].message.content.strip()
    return search_query