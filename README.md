# ChatMate

A responsive AI-powered chat application built with React and Tailwind CSS, integrating Google's Gemini API to deliver real-time, intelligent conversational responses.

## Features

- **Real-time AI chat** powered by Gemini 3.6 Flash (Google's Interactions API)
- **Markdown rendering** for AI responses — supports bold text, lists, and code blocks via `react-markdown`
- **Clean chat UI** with WhatsApp-style message bubbles, right-aligned for user messages and left-aligned for AI replies
- **Loading state** with a typing indicator while waiting for the AI response
- **Input validation** — prevents sending empty messages
- **Error handling** — gracefully displays a message if the API call fails
- **Fully responsive** — works across mobile, tablet, and desktop screen sizes

## Tech Stack

| Technology | Purpose |
|---|---|
| React | UI framework |
| Tailwind CSS | Styling |
| Gemini API (Interactions API) | AI chat responses |
| react-markdown | Rendering formatted AI responses |

## Project Structure

```
chatmate/
├── src/
│   ├── Open.jsx        # Main chat component (UI + logic)
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env                 # API key (not committed to git)
├── package.json
└── README.md
```

## How It Works

1. User types a message and hits **Send**
2. The message is added to the chat as a user bubble
3. A request is sent to the Gemini Interactions API with the user's input
4. While waiting, a typing indicator (`...`) is shown
5. Once the AI responds, its reply is added as a chat bubble and rendered with Markdown formatting

## License

This project is open source and available for personal and educational use.
