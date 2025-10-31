from openai import OpenAI
from googleapiclient.discovery import build
from getYoutubeQuerybyChatGPT import getYoutubeQuerybyChatGPT
from getYoutubeRecommendetion import getYoutubeRecommendetion
import os

def main(inputs, videoDuration='any'):
    # 🔑 APIキーを設定
    YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    
    # クライアント作成
    youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)
    chatGPT = OpenAI(api_key=OPENAI_API_KEY)

    # Youtubeに投げるクエリ取得, 
    youtubeQuery = getYoutubeQuerybyChatGPT(chatGPT, inputs)
    # Youtubeオススメ取得
    recomendetionData = getYoutubeRecommendetion(youtube, youtubeQuery ,videoDuration)

    return recomendetionData

if __name__ == '__main__':
    # 例
    inputs = ['通勤時間','癒されたい、元気を出したい']
    recomendetionData = main(inputs)
    print(recomendetionData)