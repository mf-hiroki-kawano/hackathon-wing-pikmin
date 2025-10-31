

def getYoutubeRecommendetion(youtube, search_query, videoDuration):
    # ① 動画検索（動画ID取得）
    search_response = youtube.search().list(
        q=search_query,
        part="snippet",
        type="video",
        videoDuration = videoDuration,
        maxResults=5  # 取得件数
    ).execute()

    # 構造化データを格納するリスト
    results = []

    # ② 検索結果をループ
    for item in search_response.get("items", []):
        video_id = item["id"]["videoId"]
        title = item["snippet"]["title"]
        description = item["snippet"].get("description", "")
        thumbnail = item["snippet"]["thumbnails"]["high"]["url"]

        # ③ コメント取得
        comments_response = youtube.commentThreads().list(
            part="snippet",
            videoId=video_id,
            maxResults=5,
            textFormat="plainText"
        ).execute()

        comments = []
        for comment_item in comments_response.get("items", []):
            comment = comment_item["snippet"]["topLevelComment"]["snippet"]
            comments.append({
                "author": comment.get("authorDisplayName"),
                "text": comment.get("textDisplay"),
                "like_count": comment.get("likeCount")
            })

        # ④ 結果をまとめて構造化
        results.append({
            "video_id": video_id,
            "title": title,
            "description": description,
            "thumbnail": thumbnail,
            "url": f"https://www.youtube.com/watch?v={video_id}",
            "comments": comments
        })

    # JSONライクなPython辞書を返す
    return {"search_query": search_query, "results": results}
