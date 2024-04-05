import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post( "/", async ( req, res ) => {
    try {
        const videoUrl = req.body.videoURL;
        if (
            videoUrl === undefined ||
            videoUrl === "" ||
            videoUrl === null
        ) {
            return res.status( 400 ).send( { success: false, message: "Invalid Video URL..." } );
        } else {
            try {
                const url = `https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/?url=${ videoUrl }`;
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': process.env.YOUTUBEMP3_API_KEY,
                        'X-RapidAPI-Host': process.env.YOUTUBEMP3_API_HOST
                    }
                };

                const fetchAPI = await fetch( url, options );
                const fetchResponse = await fetchAPI.json();

                if( fetchResponse.length != "" ) {
                    const responseObject = {
                        success: true,
                        songTitle: fetchResponse.title,
                        songLink: fetchResponse.link
                    };

                    res.json( responseObject );
                }
            } catch (error) {
                console.log( error.message );
                return res.status( 500 ).send( { success: false, message: "API Fetch Failed...URL may be invalid" } );
            }
        }
    } catch (error) {
        console.log( error.message );
        return res.status( 500 ).send( { success: false, message: error.message } );
    }
} );

export default router;