# 🎉 The Emotional Birthday Story Website (Made with Love ❤️)

A personal, cinematic birthday website crafted in **pure HTML, CSS, and Vanilla JavaScript** that takes your friend on an unforgettable emotional journey through your friendship, memories, and celebration.

---

## ✨ Features Added

### 1. ❓ Interactive Opening Questionnaire
- **Right after opening the website**, the friend is greeted with a warm 3D gift box and invited to answer 4 heartfelt questions before unlocking the surprise!
- **Interactive multi-stage cards**:
  1. *Who is officially the most loved & irreplaceable person today? 👑*
  2. *What emotion and vibe are you bringing into this memory journey? 🥺*
  3. *Did you know that having you in my life is one of my greatest blessings? 💫*
  4. *Do you promise to smile, feel loved, and enjoy every second of your birthday? 🎂*
- **Dynamic feedback**: Instant emotional reaction bubbles (`"100% correct! You rule this day!"`), sweet sound chimes, heart progress meter (`❤️ 🤍 🤍 🤍`), and confetti bursts.
- **Grand Unlocking**: On completion (or skip), the gift box lid pops open with fanfare sound and confetti shower, smoothly entering the story!
- **Replay anytime**: Click the **`❓ Quiz`** button in the top navigation bar to retake or show the questions to friends anytime.

### 2. 📸 Beautiful Sample Photos Included
All 6 high-resolution aesthetic sample photos are pre-placed in [`images/`](file:///home/ashish/Desktop/birthday/images/) and configured in [`config.js`](file:///home/ashish/Desktop/birthday/config.js):
- **`photo1.jpg`**: Spontaneous road trip adventure at sunset
- **`photo2.jpg`**: Late night talks & coffee laughter
- **`photo3.jpg`**: Cheering victory & confetti milestone celebration
- **`photo4.jpg`**: Sunny picnic & ordinary days that mattered
- **`photo5.jpg`**: Nostalgic first meeting in the library (Chapter 3)
- **`photo6.jpg`**: Birthday candlelight wish celebration (Chapter 8)
- **Aesthetic details**: Realistic Polaroid frames, washi-tape stickers, handwritten notes in Caveat cursive script, and click-to-open lightbox with a **"Send Love ❤️"** button.

### 3. 💖 "Show Emotions" & "Made with Love" Features
- **Floating Emotion Reactor Bar**:
  - Pinned at the bottom with 5 interactive emotion reactions:
    - 🥹 *Happy Tears*
    - 🥰 *Deep Love*
    - 🫂 *Warm Hug*
    - 😂 *Banter / Laugh*
    - 💖 *Heart Burst*
  - **Floating particles**: Tapping any emotion launches floating particles drifting upward across the screen.
  - **Live Love Counter**: Tracks and increments total loves given (`"❤️ 128 Loves Given"`), saved in `localStorage`.
  - **Emotion Toast Messages**: Sweet, encouraging popups like *"Tears of pure happiness! Love you so much 🥹❤️"*.
- **Chapter 6.5: Sealed Love Letter from the Heart**:
  - An interactive vintage envelope with a 3D wax seal (`❤️ OPEN`).
  - Clicking the seal cracks the wax, flips open the envelope flap, and slides out an intimate handwritten letter.
- **Interactive "Reasons Why You Are Loved" Generator**:
  - Tap the button to reveal 8+ uplifting, heartfelt reminders of why your friend is so deeply cherished.
- **"Made with Love" Badges & Accents**:
  - Delicate top navbar badge: `❤️ Made with Love`
  - Handwritten sticky notes pinned to memory cards
  - Story footer with a touching dedication

---

## 🚀 How to Run

1. Open [`index.html`](file:///home/ashish/Desktop/birthday/index.html) in any web browser (Chrome, Edge, Firefox, Safari).
2. Answer the 4 opening questions (or tap **"Skip directly to story"**) to unlock the journey.
3. Turn up the volume to hear the festive **Happy Birthday Song**, ambient chime effects, and celebratory fanfare!

---

## 🎶 Birthday Song & Audio

- **Happy Birthday Celebration Audio**: [`happy-birthday.mp3`](file:///home/ashish/Desktop/birthday/happy-birthday.mp3) is included in high quality (with an alternate piano rendition [`happy_birthday_piano.mp3`](file:///home/ashish/Desktop/birthday/happy_birthday_piano.mp3)).
- **Top Bar Sound Toggle**: Tap **`Play Birthday Song`** / **`Mute Song`** with animated dancing equalizer wave bars.
- **Smart Triggers**:
  - Automatically plays when blowing out all cake candles in Chapter 8.
  - Automatically kicks off upon countdown completion into the Birthday spotlight.
  - Fallback synthesizer chimes ensure audio always plays even if audio playback restrictions apply.

---

## ✏️ How to Personalize

All customizations are cleanly managed in [`config.js`](file:///home/ashish/Desktop/birthday/config.js) without any editor buttons cluttering the recipient's screen:
- **Friend's details**: `friendName`, `friendNickname`, and `age`
- **Background song selection**: `music.file` (`happy-birthday.mp3` or `happy_birthday_piano.mp3`)
- **Opening questions & answers**: `openingQuestions` array
- **Photos & captions**: `memories` array
- **First conversation messages**: `firstConversation.messages`
- **Sealed letter & reasons loved**: `loveNotes`
- **Grand finale letter**: `birthdayFinale.finalLetter`
