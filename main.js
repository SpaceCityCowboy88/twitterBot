const fs = require('fs');
const {TwitterApi} = require('twitter-api-v2');

tweetCount = 1
waitTime = 0

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//config vars
var twitterHandle = ""
var userId = ""
var speed
var replyTweet = ""
var imgFileName = ""
var mediaId = ""

var searchTerms = []
var configAppKey = ""
var configAppSecret = ""
var configAccessToken = ""
var configAccessSecret = ""
var retweetQuote = ""
var client;


const initialize = async () => {
    const configFile = fs.readFileSync('config.txt', 'utf-8');
    lines = configFile.split(/\r?\n/)
    lineCount = lines.length

    for(let x = 0; x <= lines.length-1; x++){
        flag = true       
        //config app keys
        if(lines[x] == "~keys"){
            xx = x + 1
            while(flag){
                if(lines[xx] != ""){
                    if(lines[xx].split("=")[0].trim() == "appKey"){
                        configAppKey = lines[xx].split("=")[1].trim()
                    }
                    if(lines[xx].split("=")[0].trim() == "appSecret"){
                        configAppSecret = lines[xx].split("=")[1].trim()
                    }
                    if(lines[xx].split("=")[0].trim() == "accessToken"){
                        configAccessToken = lines[xx].split("=")[1].trim()
                    }
                    if(lines[xx].split("=")[0].trim() == "accessSecret"){
                        configAccessSecret = lines[xx].split("=")[1].trim()
                    }
                    xx = xx + 1
                }else{
                    flag = false
                }
            }
        }
        //config search terms
        if(lines[x] == "~searchTerms"){
            xx = x + 1
            while(flag){
                if(lines[xx] != ""){
                    searchTerms.push(lines[xx])
                    xx = xx + 1
                }else{
                    flag = false
                }
            }
        }
        //config retweetQuote
        if(lines[x] == "~retweetQuote"){
            xx = x + 1
            while(flag){
                if(lines[xx] != ""){
                    retweetQuote = lines[xx]
                    xx = xx + 1
                }else{
                    flag = false
                }
            }
        }
        //config commentTweet
        if(lines[x] == "~commentTweet"){
            xx = x + 1
            while(flag){
                if(lines[xx] != ""){
                    replyTweet = lines[xx]
                    xx = xx + 1
                }else{
                    flag = false
                }
            }
        }
        //config twitterHandle
        if(lines[x] == "~yourTwitterHandle"){
            xx = x + 1
            while(flag){
                if(lines[xx] != ""){
                    twitterHandle = lines[xx].replace('@', '')
                    xx = xx + 1
                }else{
                    flag = false
                }
            }
        }
        //config IMG file name
        if(lines[x] == "~imgFileName"){
            xx = x + 1
            while(flag){
                if(lines[xx] != ""){
                    imgFileName = lines[xx]
                    xx = xx + 1
                }else{
                    flag = false
                }
            }
        }
        //config speed for requests to api in seconds
        if(lines[x] == "~speed"){
            xx = x + 1
            while(flag){
                if(lines[xx] != "" && xx <= lines.length-1){
                    speed = lines[xx]
                    xx = xx + 1
                }else{
                    flag = false
                }
            }
        }
    } 
    client = new TwitterApi({
        appKey: configAppKey,
        appSecret: configAppSecret,
        accessToken: configAccessToken,
        accessSecret: configAccessSecret,
    });
    userId = await client.v2.userByUsername(twitterHandle);
    userId = userId.data.id  
    mediaId = await client.v1.uploadMedia("./"+imgFileName);
}

const main = async () => {
    console.log("This application was created by https://twitter.com/SCowboy88... Enjoy. :)")
    await initialize()

    for await (term of searchTerms){  
        try{
            const jsTweets = await client.v2.search(term, { 'tweet.fields': 'author_id'});

            await sleep(speed*1000)

            for await (const tweet of jsTweets) {
                tweetCount = tweetCount + 1
                user = await client.v2.users([tweet.author_id])
                tweetUrl = 'https://twitter.com/'+user.data[0].username+"/status/"+tweet.id
                tweetPayload = retweetQuote //+ "\n\n" + tweetUrl

                await sleep(speed*1000)

                await client.v2.like(userId, tweet.id);
                await client.v2.reply(
                    replyTweet,
                    tweet.id,
                    {
                        media:{media_ids: [mediaId]}
                    }
                );
                console.log("liked and commented...")

                await sleep(speed*1000)

                const { data: createdTweet } = await client.v2.tweet(tweetPayload,{
                    quote_tweet_id:tweet.id,
                    media:{media_ids: [mediaId]}
                });
                console.log("Retweet Count: " + tweetCount)
                console.log('Retweet ID: ', createdTweet.id) 
                console.log('Retweet Text:', createdTweet.text);
                console.log("")

                await sleep(speed*1000)


            }

        }catch(e){
            console.log(e)
            try{
                waitTime = e.rateLimit.reset - Math.floor(Date.now() / 1000)
                console.log("TIMEOUT: Waiting for " + waitTime + " seconds...")
                await sleep(waitTime*1000).then(() => {
                    console.log("starting...")
                    waitTime = 0
                });
            }catch(e){console.log(e)}       
        }
    }
}

main()