from flask import Flask, request, jsonify
import requests
from tweepy import API, Cursor, OAuthHandler
from flask_cors import CORS
from googletrans import Translator
import openai
import os

app = Flask(__name__)
CORS(app)

translator = Translator()


# token = "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"

domain_url = os.getenv("DOMAIN_URL")
auth = OAuthHandler(os.getenv("CONSUMER_KEY"), os.getenv("CONSUMER_SECRET"))
auth.set_access_token(os.getenv("ACCESS_TOKEN"), os.getenv("ACCESS_SECRET"))
api = API(auth, wait_on_rate_limit=True)


@app.route("/get-followings", methods=["POST"])
def followings():
    userName = request.json["username"]
    friend_ids = []
    for fid in Cursor(api.get_friend_ids, screen_name=userName, count=5000).items():
        friend_ids.append(fid)

    user_info = []
    for i in range(0, len(friend_ids), 100):
        try:
            chunk = friend_ids[i : i + 100]
            user_info.extend(api.lookup_users(user_id=chunk))
        except:
            import traceback

            traceback.print_exc()
            print("Something went wrong, skipping...")

    usernames = []
    for user in user_info:
        print(user._json["screen_name"])
        usernames.append(user._json["screen_name"])

    print(usernames)
    return usernames


@app.route("/get-tweets", methods=["POST"])
def tweets():
    username = request.json["username"]
    tweets = api.user_timeline(screen_name=username, count=10, tweet_mode="extended")
    # print(tweets[0]._json["full_text"])

    all_tweets = []

    for tweet in tweets:
        all_tweets.append(tweet._json["full_text"])

    return all_tweets


@app.route("/analysis-text", methods=["POST"])
def analysis():
    # Get the text input from the user
    text = request.json["text"]

    # detect the language of the text
    detected_lang = translator.detect(text).lang

    # translate the text to English
    translated_text = translator.translate(text, dest="en")

    # print the detected language and translated text
    print("Detected Language:", detected_lang)
    print("Translated Text:", translated_text.text)

    # Define the API endpoint
    endpoint = f"{domain_url}api/analyseTweet"

    # Define any required headers or parameters
    data = {"inputs": translated_text}

    # Make the API request
    response = requests.post(endpoint, data=data)

    # Check if the request was successful (status code 200)
    # if response.status_code == 200:
    # Access the response data as a JSON object
    data = response.json()
    # Do something with the response data
    print(data)
    # else:
    # Handle any errors
    # print('Error:', response.status_code)

    return jsonify(data[0])


@app.route("/guideline-suggestion", methods=["POST"])
def suggestion():
    data = request.json["complaint"]
    print(data)
    openai.api_key = os.getenv("OPENAI_API_KEY")

    instructions = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"What steps should I take if the following incident happens with me {data}",
        max_tokens=1000,
        temperature=0,
    )
    print(instructions)
    analysis = instructions.choices[0].text
    return analysis


if __name__ == "__main__":
    app.run()
