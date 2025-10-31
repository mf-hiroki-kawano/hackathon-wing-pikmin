from openai import OpenAI
from googleapiclient.discovery import build
from getYoutubeQuerybyChatGPT import getYoutubeQuerybyChatGPT
from getYoutubeInfomation import getYoutubeInfomation
import os

def getYoutubeRecommendetion(YOUTUBE_API_KEY,OPENAI_API_KEY,inputs, videoDuration='any'):
    
    # クライアント作成
    youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)
    chatGPT = OpenAI(api_key=OPENAI_API_KEY)

    # Youtubeに投げるクエリ取得, 
    youtubeQuery = getYoutubeQuerybyChatGPT(chatGPT, inputs)
    # Youtubeオススメ取得
    recomendetionData = getYoutubeInfomation(youtube, youtubeQuery ,videoDuration)

    return recomendetionData

# if __name__ == '__main__':
    # 例
    # inputs = ['通勤時間','癒されたい、元気を出したい']
    # recomendetionData = getYoutubeRecommendetion(YOUTUBE_API_KEY,OPENAI_API_KEY,inputs)
    # print(recomendetionData)