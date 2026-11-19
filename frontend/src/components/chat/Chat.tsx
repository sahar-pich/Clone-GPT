import { useState } from 'react'

import './Chat.css'


function Chat() {
    const [isNewChat, setIsNewChat] = useState(true)
    const [userPrompt, setUserPrompt] = useState('')
    const [aiResponse, setAIResponse] = useState('')

    const chat = async () => {
        const response = await fetch('http://127.0.0.1:8000/conversations/1/messages', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    content: userPrompt
                }
            )
        })
        const data = await response.json()
        console.log(data)
        setAIResponse(data)
    }


    return (
        <>

            <button onClick={() => setIsNewChat(!isNewChat)}>{isNewChat ? 'True' : 'False'}</button>

            <main>

                {
                    isNewChat ?

                        <div id="newchat-div">
                            <h1 id="newchat-greeting">What should we chat about today?</h1>
                            <input id="newchat-input" type="text" onChange={(event) => setUserPrompt(event.target.value)} value={userPrompt} />
                            <button onClick={() => chat()}><img src="./assests/send.svg" /></button>
                            <p>{aiResponse}</p>
                        </div>

                        :
                        <div id="conversation-div">
                            <div id="conversation-chat-div">

                            </div>
                            <div id="chat-input-div">
                                <input id="chat-input" type="text" />
                            </div>
                        </div>

                }

            </main>
        </>
    )
}


export default Chat