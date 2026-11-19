import { useState } from 'react'

import './Chat.css'
import sendIcon from '../../assets/send.svg'

interface NewConversation {
    id: number
}


function Chat() {
    const [isNewChat, setIsNewChat] = useState(true)
    const [userPrompt, setUserPrompt] = useState('')
    const [aiResponse, setAIResponse] = useState('')
    const [chatId, setChatId] = useState<number | null>(null)

    const chat = async () => {
        try {
            let chatNumber = chatId
            // Creates new chat
            if (isNewChat) {
                const response = await fetch("http://127.0.0.1:8000/new_conversation", {
                    method: "POST"
                })
                const data: NewConversation = await response.json()
                setChatId(data.id)
                chatNumber = data.id
            }
            // Promt and Response
            const response = await fetch(`http://127.0.0.1:8000/conversations/${chatNumber}/messages`, {
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
            setIsNewChat(false)

        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <>

            {/* <button onClick={() => setIsNewChat(!isNewChat)}>{isNewChat ? 'True' : 'False'}</button> */}

            <main>

                {
                    isNewChat ?

                        <div id="newchat-div">
                            <h1 id="newchat-greeting">What should we chat about today?</h1>
                            <input id="newchat-input" type="text" onChange={(event) => setUserPrompt(event.target.value)} value={userPrompt} />
                            <button onClick={() => chat()}><img src={sendIcon} /></button>
                        </div>

                        :
                        <div id="conversation-div">
                            <input id="newchat-input" type="text" onChange={(event) => setUserPrompt(event.target.value)} value={userPrompt} />
                            <button onClick={() => chat()}><img src={sendIcon} /></button>
                            <p>{aiResponse}</p>
                        </div>

                }

            </main>
        </>
    )
}


export default Chat