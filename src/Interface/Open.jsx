import { useState } from "react"
import ReactMarkdown from "react-markdown"

function Open() {
    const [messsage, setMesssage] = useState([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function sendMessage(e) {
        e.preventDefault()
        if (input.trim() === "") {
            alert("Nothing to say??");
            return;
        }
        const userMsg = { text: input, sender: "user" };
        setMesssage(prev => [...prev, userMsg]);   
        setInput("");
        setIsLoading(true)

        const aiReply = await aiResponse(input);
        const aiMsg = { text: aiReply, sender: "ai" };
        setMesssage(prev => [...prev, aiMsg]);
        setIsLoading(false)
    }

    const apiKey = import.meta.env.VITE_AI_KEY
    async function aiResponse(userMessage) {
        const data = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/interactions`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey
                },
                body: JSON.stringify({
                    model: "gemini-3.6-flash",
                    input: userMessage
                })
            }
        );
        const res = await data.json();
        if (!data.ok) {
            console.error("API Error:", res.error);
            return "Error: " + (res.error?.message || "Kuch galat ho gaya");
        }
        return res.steps[1].content[0].text
    }

    return (
        <div className="h-screen w-full bg-black p-3 sm:p-6 text-white border-2 sm:border-7 border-white flex flex-col">
            <h1 className="text-md font-bold">CHATMATE</h1>

            <div className="w-full flex-1 py-6 sm:py-14 gap-2 flex-col items-center flex overflow-hidden">
                <h1 className="font-extrabold font-mono text-3xl sm:text-5xl md:text-7xl text-center">HELLO WORLD...</h1>
                <h1 className="text-sm sm:text-md text-gray-400">Chat with ChatMate</h1>

                <div className="w-full max-w-4xl h-full items-center flex flex-col justify-between">
                    <div className="w-full flex-1 py-4 sm:py-8 px-2 sm:px-8 overflow-y-auto flex flex-col gap-2">
                        {messsage.map((msg, index) => (
    <div key={index} className={`flex min-w-0 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
        <div className={`px-4 sm:px-5 py-2 sm:py-3 
        flex-wrap min-w-0
        rounded-2xl max-w-[95%] sm:max-w-xs break-words overflow-wrap-anywhere shadow-md
            ${msg.sender === "user" 
                ? "bg-white text-black rounded-br-sm" 
                : "bg-gray-700 text-white rounded-bl-sm"}`}>
            <ReactMarkdown>{msg.text}</ReactMarkdown>
        </div>
    </div>
))}

                        {isLoading && (
                            <div className="flex  justify-start">
                                <p className="bg-gray-700
                                
                                text-white px-5 py-3 rounded-2xl rounded-bl-sm max-w-xs shadow-md">
                                    ...
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center w-full px-2">  
                        <input className="border w-full sm:flex-1 p-4 sm:p-6 rounded-2xl 
                        text-start border-white outline-none" 
                        onChange={(e) => setInput(e.target.value)}  
                        value={input}
                        placeholder="Type and say Something" type="text" />
                        <button 
                        onClick={sendMessage}
                        disabled={isLoading}
                        className="border border-white p-3 sm:p-4 w-full sm:w-40 rounded-2xl disabled:opacity-50">
                            {isLoading ? "..." : "SEND"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Open