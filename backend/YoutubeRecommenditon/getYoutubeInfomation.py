from googleapiclient.errors import HttpError

def getYoutubeInfomation(youtube, search_query, videoDuration):
    # ① 動画検索（動画ID取得）
    search_response = youtube.search().list(
        q=search_query,
        part="snippet",
        type="video",
        maxResults=5
    ).execute()

    results = []

    # ② 検索結果をループ
    for item in search_response.get("items", []):
        video_id = item["id"]["videoId"]
        title = item["snippet"]["title"]
        description = item["snippet"].get("description", "")
        thumbnail = item["snippet"]["thumbnails"]["high"]["url"]

        comments = []

        # ③ コメント取得（コメント無効な動画でも落ちないようにする）
        try:
            comments_response = youtube.commentThreads().list(
                part="snippet",
                videoId=video_id,
                maxResults=5,
                textFormat="plainText"
            ).execute()

            for comment_item in comments_response.get("items", []):
                comment = comment_item["snippet"]["topLevelComment"]["snippet"]
                comments.append({
                    "author": comment.get("authorDisplayName"),
                    "text": comment.get("textDisplay"),
                    "like_count": comment.get("likeCount")
                })

        except HttpError as e:
            if "commentsDisabled" in str(e):
                # コメントが無効な動画はスキップして警告だけ出す
                print(f"⚠️ コメント無効: {video_id} ({title})")
                comments = [{
                    "author": None,
                    "text": "コメントは無効です。",
                    "like_count": 0
                }]
            else:
                # それ以外のエラーは再送出
                raise

        # ④ 結果をまとめて構造化
        results.append({
            "video_id": video_id,
            "title": title,
            "description": description,
            "thumbnail": thumbnail,
            "url": f"https://www.youtube.com/watch?v={video_id}",
            "comments": comments
        })

    return {"search_query": search_query, "results": results}
