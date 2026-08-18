import React from "react"

export default function Main() {
    const[meme,setMeme]=React.useState({
        topText:"One does not simply",
        bottomText:"Walk into Mordor",
        imageUrl:"http://i.imgflip.com/1bij.jpg"
    })
    function handleChange(event){
        const {value,name}=event.currentTarget
        setMeme((prememe)=>({...prememe, [name]:value }))
    }
    

    const[allMemes,setAllMemes]=React.useState([])
    React.useEffect(() => {
        async function getMemes() {
            try {
                const response = await fetch("https://api.imgflip.com/get_memes")
                const data = await response.json()
                const memes = data.data.memes
                setAllMemes(memes)
            } catch (error) {
                console.error("Error fetching memes:", error)
            }
        }

        getMemes()
    }, [])

    function getImage(){
        if (!allMemes.length) return

        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const memeUrl = allMemes[randomNumber].url

        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: memeUrl
        }))
    }
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </label>
                <button onClick={getImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src= {meme.imageUrl}/>
                <span className="top">{  meme.topText }</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}