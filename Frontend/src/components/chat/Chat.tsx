import { useState } from 'react'
import './Chat.css'
import sendIcon from '../../assets/send.svg'
import { Link } from 'react-router-dom'

interface NewConversation {
    id: number
}

interface Conversation {
    role: "assistant" | "user",
    content: string
}


function Chat() {
    const [isNewChat, setIsNewChat] = useState(true)
    const [userPrompt, setUserPrompt] = useState('')
    const [chatId, setChatId] = useState<number | null>(null)
    const [conversations, setConversation] = useState<Conversation[]>([])

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
            const aiResponse = await response.json()
            setConversation([...conversations, { role: "user", content: userPrompt }, { role: "assistant", content: aiResponse }])
            setUserPrompt('')
            setIsNewChat(false)

        }
        catch (err) {
            console.log(err)
        }
    }

    // Returns to New Chat
    const newChat = () => {
        setIsNewChat(true)
        setConversation([])
        setChatId(null)
        setUserPrompt('')
    }


    return (
        <>
            <Link to="/about"><button>About</button></Link>
            {!isNewChat && <button onClick={() => newChat()}>NewChat</button>}

            <main>

                {
                    isNewChat ?

                        <div id="newchat-div">
                            <h1 id="newchat-greeting">What should we chat about today?</h1>
                            <div>
                                <input id="newchat-input" type="text" onChange={(event) => setUserPrompt(event.target.value)} value={userPrompt} />
                                <button onClick={() => chat()}><img src={sendIcon} className="send-icon" /></button>
                            </div>
                        </div>

                        :
                        <div id="conversation-div">
                            <div id="chat-div">{
                                conversations.map((c, i) => {
                                    return (
                                        <div key={i} className={c.role === "user" ? "user_message_div" : "assistant_message_div"}>
                                            <p className={c.role === "user" ? "user_message" : "assistant_message"}>{c.content}</p>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <div>
                                <input id="newchat-input" type="text" onChange={(event) => setUserPrompt(event.target.value)} value={userPrompt} />
                                <button onClick={() => chat()}><img src={sendIcon} className="send-icon" /></button>
                            </div>
                        </div>

                }

            </main >
        </>
    )
}


export default Chat