import { BiAlbum } from "react-icons/bi"
import axios from "axios"
import { useState } from "react"

export default function Overlay() {
    const [ formData, setFormData ] = useState( {
        videoURL: ""
    } )
    const [ songData, setSongData ] = useState( {
        songTitle: "",
        songLink: ""
    } )
    const [ isSuccess, setIsSuccess ] = useState( null )
    const [ errorMessage, setErrorMessage ] = useState( "" )
    const [ isLoading, setIsLoading ] = useState( false )

    const converterUrl = "https://converterapp-server.onrender.com/convertMP3"

    const handleSubmit = async ( e ) => {
        e.preventDefault()

        setIsLoading( true )

        axios
            .post( converterUrl, { videoURL: formData.videoURL } )
            .then( ( response ) => {
                setIsLoading( false )

                setErrorMessage( prevError => response.data.message )
                setIsSuccess( prevIsSuccess => response.data.success )
      
                if( response.data.success === true ) {
                    setSongData( {
                        songTitle: response.data.songTitle,
                        songLink: response.data.songLink
                    } )
                    console.log( songData )
                }
            } )
            .catch( ( error ) => {
                setErrorMessage( prevError => error.message )
                setIsSuccess( false )
            } )
    }

    const handleChange = ( e ) => {
        setFormData( { ...formData, [e.target.name]: e.target.value } )
    }

    return <>
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-start justify-center bg-transparent overflow-hidden">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-10xl font-bold mt-4 ml-8 uppercase font-lilita-one bg-transparent">Convert <br/> stuffs</h1>
            <div className="flex flex-col items-center justify-center h-full w-full bg-transparent">
                <div className="bg-transparent p-8 rounded-lg w-full max-w-[800px] sm:w-[80%]">
                    <p className="text-black text-sm font-bold uppercase bg-transparent">youtube url to mp3 file</p>
                    <form 
                    className="flex flex-row justify-center items-center bg-transparent"
                    onSubmit={ handleSubmit }
                    method="post"
                    >
                        <input
                        type="text"
                        placeholder="ENTER URL..."
                        id="videoURL"
                        name="videoURL"
                        value={ formData.videoURL }
                        onChange={ handleChange }
                        className="bg-transparent border-2 border-black rounded-lg px-4 py-2 mb-1 w-full placeholder-black font-bold"
                        />

                        <button 
                        className="bg-black transition duration-300 hover:opacity-75 text-white border-1 border-black px-4 py-2 ml-2 rounded-lg uppercase inline-flex items-center"
                        type="submit"
                        >
                            <span className="mr-1">Convert</span>
                            <BiAlbum/> 
                        </button>
                    </form>

                    {/* LOADER */}
                    { isLoading ? (
                        <div className="flex justify-center items-center pt-4">
                            <img src="/images/spinner.svg"/>
                        </div>
                    ) : (
                        <div></div>
                    ) }

                    {/* ERROR MESSAGE: invalid URL */}
                    { isSuccess ? (
                        <div className="mb-3">
                            <a 
                            href={ songData.songLink }
                            className="font-bold"
                            >
                                CLICK MEH: { songData.songTitle }
                            </a>
                        </div>
                        ) : (
                        <div className="font-bold uppercase mb-3">{ errorMessage }</div>
                    ) }
                </div>
            </div>
        </div>
    </>
}