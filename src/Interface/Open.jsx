import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

function Open() {
  const [messsage, setMesssage] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messsage, isLoading]);

  async function sendMessage(e) {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Nothing to say??");
      return;
    }
    const userMsg = { text: input, sender: "user" };
    setMesssage((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const aiReply = await aiResponse(input);
    const aiMsg = { text: aiReply, sender: "ai" };
    setMesssage((prev) => [...prev, aiMsg]);
    setIsLoading(false);
  }

  const apiKey = import.meta.env.VITE_AI_KEY;
  async function aiResponse(userMessage) {
    const data = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/interactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
        model: "gemini-3.5-flash-lite",
          input: userMessage,
        }),
      },
    );
    const res = await data.json();
    if (!data.ok) {
      console.error("API Error:", res.error);
      return "Error: " + (res.error?.message || "Kuch galat ho gaya");
    }
    return res.steps[1].content[0].text;
  }

  return (
    <div className="h-dvh w-full bg-black text-white border-2 sm:border-4 border-white flex flex-col p-3 sm:p-6">
      <h1 className="text-md font-bold shrink-0">CHATMATE</h1>

      <div className="flex-1 min-h-0 w-full max-w-4xl mx-auto flex flex-col">
        {messsage.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
            <h1 className="font-extrabold font-mono text-3xl sm:text-5xl md:text-7xl">
              HELLO WORLD...
            </h1>
            <p className="text-sm sm:text-base text-gray-400">Chat with Mate</p>
          </div>
        ) : (
          <div className="flex-1 min-h-0 overflow-y-auto py-4 px-1 sm:px-4 flex flex-col gap-3">
            {messsage.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`min-w-0 max-w-[85%] sm:max-w-[75%] px-4 py-2 sm:py-3 rounded-2xl shadow-md break-words
                                    [&_p]:m-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
                                    [&_pre]:overflow-x-auto [&_pre]:bg-black/40 [&_pre]:p-2 [&_pre]:rounded-lg
                                    ${
                                      msg.sender === "user"
                                        ? "bg-white text-black rounded-br-sm"
                                        : "bg-gray-700 text-white rounded-bl-sm"
                                    }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <p className="bg-gray-700 text-white px-5 py-3 rounded-2xl rounded-bl-sm shadow-md">
                  ...
                </p>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        <form
          onSubmit={sendMessage}
          className="shrink-0 flex items-center gap-2 sm:gap-4 pt-3"
        >
          <input
            className="border border-white flex-1 min-w-0 p-3 sm:p-5 rounded-2xl outline-none bg-transparent"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Type and say Something"
            type="text"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="border border-white shrink-0 px-4 py-3 sm:px-8 sm:py-5 rounded-2xl disabled:opacity-50"
          >
            {isLoading ? "..." : "SEND"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Open;
