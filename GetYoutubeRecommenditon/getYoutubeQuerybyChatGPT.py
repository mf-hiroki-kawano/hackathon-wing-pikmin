
def getYoutubeQuerybyChatGPT(client, inputs):

    input_text = ",".join(inputs)
    prompt = f"今の気持ちは「{input_text}」です。この状況に合うYouTube検索ワードを1〜3個提案してください。"

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    search_query = response.choices[0].message.content.strip()
    return search_query
