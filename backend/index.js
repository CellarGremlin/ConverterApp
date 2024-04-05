import express from "express";
import cors from "cors";
import YoutubeToMP3Route from "./routes/YoutubeToMP3Route.js";
import dotenv from "dotenv"

dotenv.config()

const app = express();

const port = process.env.PORT || 3333;

// MIDDLEWARE
app.use( express.json() );
app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}))
app.use( cors() );

app.get( "/", ( req, res ) => {
    console.log( req );
    return res.status( 333 ).send( "Hello..." )
} );

app.use( "/convertMP3", YoutubeToMP3Route );

// VERCEL DEPLOYMENT IS SERVERLESS
// app.listen( port, () => {
//     console.log(`App Running On Port: ${ port }`);
// } );
export default app;