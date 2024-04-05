import express from "express";
import cors from "cors";
import YoutubeToMP3Route from "./routes/YoutubeToMP3Route.js";
import dotenv from "dotenv"
dotenv.config()

const app = express();

const PORT = process.env.PORT;

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

app.listen( PORT, () => {
    console.log(`App Running On Port: ${ PORT }`);
} );
export default app;