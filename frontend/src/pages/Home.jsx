import { Suspense } from "react"
import Overlay from "../components/Overlay.jsx"
import Background from "../components/Background.jsx"
import { FadeIn } from "../components/Styles.jsx"

export default function Home() {
    return <>
        <Suspense fallback={ null }>
            <Background speed={ 1 } />
            <FadeIn/>
        </Suspense>
        <Overlay/>
    </>
}