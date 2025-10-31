from openai import OpenAI
from googleapiclient.discovery import build
from YoutubeRecommenditon.getYoutubeQuerybyChatGPT import getYoutubeQuerybyChatGPT
from YoutubeRecommenditon.getYoutubeInfomation import getYoutubeInfomation
import os

def main(YOUTUBE_API_KEY,OPENAI_API_KEY,mood):

    # クライアント作成
    youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)
    chatGPT = OpenAI(api_key=OPENAI_API_KEY)

    # Youtubeに投げるクエリ取得
    youtubeQuery = getYoutubeQuerybyChatGPT(chatGPT, mood, 1)
    # Youtubeオススメ取得
    recomendetionData = getYoutubeInfomation(youtube, youtubeQuery)

    return recomendetionData

if __name__ == '__main__':
    mood = '癒されたい、元気を出したい'
    recomendetionData = main(mood)
    print(recomendetionData)