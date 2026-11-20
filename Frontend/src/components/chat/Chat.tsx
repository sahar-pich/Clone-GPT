import { useState } from 'react'
import './Chat.css'
import sendIcon from '../../assets/send.svg'

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
    const [isLoading, setIsLoading] = useState(false)

    const chat = async () => {
        // Ignores empty prompts and clicks while waiting for a reply
        if (isLoading || !userPrompt.trim()) return

        setIsLoading(true)
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
        finally {
            setIsLoading(false)
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

            <main>

                {
                    isNewChat ?

                        <div id="newchat-div">
                            <h1 id="newchat-greeting">What should we chat about today?</h1>
                            <div className="input-bar">
                                <input
                                    id="newchat-input" type="text" placeholder="Ask anything" autoComplete="off"
                                    onChange={(event) => setUserPrompt(event.target.value)} value={userPrompt}
                                    onKeyDown={(event) => { if (event.key === "Enter") chat() }}
                                    disabled={isLoading}
                                />
                                <button onClick={() => chat()} className="send-btn" disabled={isLoading}><img src={sendIcon} className="send-icon" /></button>
                            </div>
                        </div>

                        :
                        <div id="conversation-div">
                            <button onClick={() => newChat()} className="newchat-btn">New chat</button>
                            <div id="chat-div">{
                                conversations.map((c, i) => {
                                    return (
                                        <div key={i} className={c.role === "user" ? "user_message_div" : "assistant_message_div"}>
                                            <p className={c.role === "user" ? "user_message" : "assistant_message"}>{c.content}</p>
                                        </div>
                                    )
                                })
                            }
                                {isLoading && <p className="thinking">Thinking...</p>}
                            </div>
                            <div className="input-bar">
                                <input
                                    id="newchat-input" type="text" placeholder="Ask anything" autoComplete="off"
                                    onChange={(event) => setUserPrompt(event.target.value)} value={userPrompt}
                                    onKeyDown={(event) => { if (event.key === "Enter") chat() }}
                                    disabled={isLoading}
                                />
                                <button onClick={() => chat()} className="send-btn" disabled={isLoading}><img src={sendIcon} className="send-icon" /></button>
                            </div>
                        </div>

                }

            </main >
        </>
    )
}


export default Chat