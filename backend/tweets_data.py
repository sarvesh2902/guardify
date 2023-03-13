import argparse
import configparser
import pandas as pd
import time
from tweepy import API, Cursor, OAuthHandler, TweepyException


api_key = "c3sFnv7hxrfgRk5zN4VT1tfpk"
api_key_secret = "Tmr7cq2PLOUEA8nP2zrW5w5OT2yKieu5HE4FuOniyEZfin9Ktv"
access_token = "1390587786491617282-5K8Sz2lHtG35RP1UzjHnkl1LvvkYyw"
access_secret = "4CGdhXjBIlELdJqlm0vXdyQoDtslmVaNmgMebqSSs1ADf"

auth = OAuthHandler(api_key, api_key_secret)
auth.set_access_token(access_token, access_secret)

api = API(auth)

user_name ="Shreyan80327061"
tweets = api.user_timeline(screen_name= user_name, count=200,
                           tweet_mode='extended')

# create DataFrame
columns = ['TweetId', 'User', 'Tweet']
data = []

for tweet in tweets:
    data.append([tweet.id, tweet.user.screen_name, tweet.full_text])

df = pd.DataFrame(data, columns=columns)

print(df)

# class Bot(object):
#     '''Saves friends and/or followers of a Twitter handle to CSV file(s).'''

#     def _init_(self):
#         self.authenticate()

#     def authenticate(self):
#         '''Authenticates Tweepy API.'''
#         # Read in authentication keys, tokens and secrets
#         # configs = configparser.ConfigParser()
#         # configs.read('./config.ini')
#         # keys = configs['TWITTER']



#         # Get tweepy.OAuthHandler object that will help authenticate
#         auth = OAuthHandler(consumer_key, consumer_secret)
#         auth.set_access_token(access_token, access_secret)

#         # Authenticate and set API
#         self.api = API(auth, wait_on_rate_limit=True)

#         user_info = api.user_timeline("Shreyan80327061")
#         print(user_info)

# #     def get_follower_ids(self, screen_name):
# #         '''Returns follower ids of passed screen_name.'''
# #         follower_ids = []
# #         for fid in Cursor(self.api.get_follower_ids, screen_name=screen_name, count=5000).items():
# #             follower_ids.append(fid)
# #         return follower_ids

# #     def get_tweets(self, screen_name):
# #         '''Returns follower ids of passed screen_name.'''
# #         tweets = []
# #         for fid in Cursor(self.api.user_timeline, screen_name=screen_name, count=5000).items():
# #             follower_ids.append(fid)
# #         return tweets

# #     def get_friend_ids(self, screen_name):
# #         '''Returns friend ids of passed screen_name.'''
# #         friend_ids = []
# #         for fid in Cursor(self.api.get_friend_ids, screen_name=screen_name, count=5000).items():
# #             friend_ids.append(fid)
# #         return friend_ids

# #     def get_user_info(self, user_ids):
# #         '''Gets all user info.
# #         API.lookup_users has a rate limit of about 100 * 180 = 18K lookups each 15 min window.
# #         It only accepts 100 user ids at a time.'''
# #         user_info = []
# #         for i in range(0, len(user_ids), 100):
# #             try:
# #                 chunk = user_ids[i:i+100]
# #                 user_info.extend(self.api.lookup_users(user_id=chunk))
# #             except:
# #                 import traceback
# #                 traceback.print_exc()
# #                 print('Something went wrong, skipping...')
# #         return user_info

def download_friends(self, handle):
        '''Downloads friends of passed handle.'''
        now = time.strfti/me("_%Y-%m-%d-%H-%M-%S%Z")
        filepath = handle +'_friends.csv'
        ids = self.get_friend_ids(handle)
        self.download(ids, filepath)

# #     def download_followers(self, handle):
# #         '''Downloads followers of passed handle.'''
# #         # now = time.strftime("_%Y-%m-%d-%H-%M-%S%Z")
# #         filepath = handle +'_followers.csv'
# #         ids = self.get_follower_ids(handle)
# #         self.download(ids, filepath)

# #     def download(self, ids, filepath):
# #         '''Downloads passed users.'''
# #         data = [x._json for x in self.get_user_info(ids)]
# #         df = pd.DataFrame(data)
# #         df = df[['id', 'name', 'screen_name', 'location', 'description', 'url']]
# #         df.to_csv(filepath, index=False)

# #     def execute(self, handle, which):
# #         '''Runs bot.'''
# #         if which == 'friends':
# #             self.download_friends(handle)
# #         elif which == 'followers':
# #             self.download_followers(handle)
# #         elif which == 'both':
# #             self.download_friends(handle)
# #             self.download_followers(handle)


# # if _name_ == '_main_':
# #     parser = argparse.ArgumentParser()
# #     parser.add_argument('-u', '--user', help='Twitter handle for which to download followers and/or friends.', required=True)
# #     parser.add_argument('-t', '--type', help='Accepts three options: followers, friends, both. Defaults to followers only.', default='followers')
# #     args = parser.parse_args()

# #     # Run the bot
# #     bot = Bot()
# #     bot.execute(args.user, args.type)


