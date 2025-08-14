# PodcastBot UI

A conversational UI for **PodcastBot**, the AI-powered interface that invites users to externalize their “stream of consciousness” as a short podcast. Participants speak freely, the bot responds with contextual follow-up questions, and the conversation unfolds like a reflective audio journey. Designed for exhibition during **Jerusalem Design Week 2024**.

---

##  Live Demo: Experience the Interface
https://youtu.be/ZaHegLDccJk

---

##  Core UI Features
- **Interactive Chat Interface**: Displays real-time user input and AI-generated bot responses in a clean, conversational layout.
- **Audio Input & Controls**: Speak your thoughts and see responses; seamlessly integrated with speech-to-text and backend conversation endpoints.
- **Dynamic Flow**: Bot’s prompts evolve based on your input—creating a reflective, unfolding dialogue experience.

---

##  Technical Stack
- Built with [React](https://reactjs.org/) (or Vue, whichever applies) + Vite
- Communicates with the `podcastbot-backend` via REST or WebSocket for:
  - Speech transcription (user → text)
  - Bot responses (generated via AI)
- Manages conversational context on the UI side for smooth user experience

---

##  Getting Started

```bash
git clone https://github.com/nogakril/podcastbot-ui.git
cd podcastbot-ui
npm install       # or yarn / pnpm
npm run dev       # start the dev server
