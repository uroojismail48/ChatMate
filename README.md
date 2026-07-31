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

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd chatmate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root and add your Gemini API key:

```
VITE_AI_KEY=your_gemini_api_key_here
```

Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey).

### 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or whichever port Vite assigns).

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

## Notes

- This app calls the Gemini API directly from the frontend, which exposes the API key in the browser. This is fine for learning/personal projects, but for production apps, route the API call through a backend server to keep the key secure.
- Free tier rate limits apply (requests per minute/day) — see [Gemini API rate limits](https://ai.google.dev/gemini-api/docs/rate-limits) for details.

## License

This project is open source and available for personal and educational use.
