const axios = require('axios')
const cheerio = require('cheerio')
const fetch=require('node-fetch')
const pretty = require('pretty')

const atcoderBaseUrl="https://atcoder.jp/users/"
const codeChefBaseUrl = "https://www.codechef.com/users/"
const codeforcesBaseUrl="https://codeforces.com/api/user.info?handles="
const leetCodeBaseUrl="https://leetcode.com/"
// {
//     success:""
//     rating:""
// }

const atCoderRating = async (req,res) => {
    

    try {
        
        const url=atcoderBaseUrl+req.params.username
        const { data } = await axios.get(url)
        
        const $ = cheerio.load(data)
        
        const rt=$(".mt-2 tbody tr:nth-child(2) td span")
        const rating=pretty(rt.html())
        res.status(200).json({
            success: true,
            rating:rating
        })
    }
    catch (err)
    {
        console.log("Error while Fetching atcoderRating -> ",err);
        res.status(503).json({
            success: false,
            message:"Opps! Some error occurred"
        })
    }
}

const codechefRating = async (req,res) => {
    
    const username=req.params.username
    try {
        
        const url = codeChefBaseUrl + username
        const {data} = await axios.get(url)
        
        const $ = cheerio.load(data)
        const ratingDiv = $(".user-profile-container .row .sidebar .content .rating-header .rating-number")
        const stars = $(".user-profile-container .row .sidebar .content .rating-header .rating-star")
        // const highest_rating=$(".user-profile-container .row .sidebar .content .rating-header ")
        res.status(200).json({
            success:true,
            rating: pretty(ratingDiv.html()),
            stars: pretty(stars.html()),
            // highest_rating:
        })
    }
    catch (err)
    {
        console.log("Error in codechef Rating Fun -> ", err);
        res.status(503).json({
            success: false,
            message:"Opps! Some error occurred"
        })
    }
    
}

const codeforcesRating = async (req, res) => {
    const users = req.params.users
    const url = codeforcesBaseUrl + users
    const response = await fetch(url, { method: "GET" })

    const jsonArray=[]
    if (response.ok)
    {
        const jsonObject = await response.json()
        if (jsonObject.status == "OK")
        {
            const arr = jsonObject.result
            
            for (let i = 0; i < arr.length; i++)
            {
                const curr=arr[i]
                const obj = {
                    handle: curr.handle,
                    rating: curr.rating,
                    rank: curr.rank,
                    maxRating: curr.maxRating,
                    maxRank:curr.maxRank
                }
                jsonArray.push(obj)
            }
        }
        res.status(200).send(jsonArray)
    }
    else {
        console.log("Error in fetching codeforces ratings -> ", response.error);
        res.status(503).json({
            success: false,
            message:"Opps! Some error occurred"
        })
    }
}

const leetCodeRating = async (req, res) => {
    const username=req.params.username
    try {
        
        const url = leetCodeBaseUrl + username
        const {data} = await axios.get(url)
        
        const $ = cheerio.load(data)
        const pr=$("body div:nth-child(1) div:nth-child(2) div div:nth-child(1) div:nth-child(2) div div:nth-child(1) div:nth-child(1) div:nth-child(1)")
        const solved=pretty(pr.html())
        res.status(200).json({
            success:true,
            rating:solved
        })
    }
    catch (err)
    {
        console.log("Error in codechef Rating Fun -> ", err);
        res.status(503).json({
            success: false,
            message:"Opps! Some error occurred"
        })
    }
}
module.exports={atCoderRating,codechefRating,codeforcesRating,leetCodeRating}