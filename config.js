/**
 * Birthday Story Configuration
 * -------------------------------------------------------------
 * Customize every chapter of the emotional journey right here!
 * All fields are easily editable.
 */

const BIRTHDAY_CONFIG = {
  // Friend's Information
  friendName: "Babbyyyy", // Replace with his/her name (e.g., "Alex", "Rohan", "David", "Sarah")
  friendNickname: "My Day One",
  age: 21, // Age turning

  // 🎵 Background Birthday Music Track
  music: {
    title: "Happy Birthday Celebration",
    file: "happy-birthday.mp3", // "happy-birthday.mp3" or "happy_birthday_piano.mp3"
    autoplayOnCelebration: true
  },

  // 0. ❓ Opening Questions (Interactive emotional questionnaire asked right after opening)
  openingQuestions: [
    {
      id: 1,
      badge: "💌 Question 1",
      question: "What do you think makes you so special?",
      options: [
        { text: "The way you care", reaction: "You really do make everything feel warmer and kinder. 💖", emoji: "💌" },
        { text: "Your heart", reaction: "That kind heart is one of the best things about you. ❤️", emoji: "💛" },
        { text: "Your personality", reaction: "Your energy is impossible not to love. ✨", emoji: "✨" },
        { text: "The way you love", reaction: "That love is rare, beautiful, and unforgettable. 🫶", emoji: "💞" }
      ]
    },
    {
      id: 2,
      badge: "Question 2",
      question: "What do you think is my favourite thing about you?",
      options: [
        { text: "The way you talk to me", reaction: "That connection is everything to me. 💬", emoji: "💬" },
        { text: "The way you make me feel loved", reaction: "And I hope you always know how much you mean to me. 🫶", emoji: "💖" },
        { text: "Simply… YOU", reaction: "Exactly. You are the whole beautiful package. 🌷", emoji: "🌷" }
      ]
    },

    {
      id: 4,
      badge: "QUESTION 03 • THE SACRED PROMISE",
      question: "Do you promise to smile, feel loved, and enjoy every second of your special day? 🎂",
      options: [
        { text: "I promise with all my heart! ❤️", reaction: "Promise accepted! Unlocking your birthday story now... ✨", emoji: "❤️" },
        { text: "Only if you stay my favorite person forever 🤞", reaction: "Deal! You're stuck with me forever. Now let's celebrate! 🎉", emoji: "🤞" },
        { text: "Yes! Open my birthday surprise! 🎁", reaction: "Here it comes! Happy Birthday to the most special human! 🎂", emoji: "🥳" }
      ]
    }
  ],

  // 1. 💌 Why I made this
  whyIMadeThis: {
    tag: "PROLOGUE • MADE WITH LOVE",
    title: "Why I Made This For You",
    subtitle: "Because ordinary birthday texts just wouldn't do justice to our bond.",
    paragraphs: [
      "I made this little thing for you because on your birthday, a simple “Happy Birthday” just didn’t feel enough. ❤️I wanted to make something that was actually about you — our little memories, the moments I still remember, and all the things I don’t always say out loud.",
      "",
      "So here’s a little piece of my heart, made specially for you.I hope while going through it, you smile a little and realise just how special you are to me. 🥹❤️"
    ],
    quote: "“Love You Babbbyyy”"
  },

  // 2. 💬 Our first conversation
  firstConversation: {
    tag: "THE BEGINNING",
    title: "Where It All Started",
    subtitle: "Neither of us had any clue what this would turn into...",
    dateStamp: "The Very First Chapter",
    platform: "Direct Message",
    messages: [
      { sender: "them", text: "Hey! Are you also in that group project / event?", time: "11:14 PM" },
      { sender: "me", text: "Yeah I am haha, honestly no clue what's going on though 💀", time: "11:15 PM" },
      { sender: "them", text: "Lmao same here, let's just team up so we suffer together 😭", time: "11:16 PM" },
      { sender: "me", text: "Deal! Best decision already.", time: "11:17 PM" },
      { sender: "them", text: "Fast forward to today... and here we are.", time: "Present Day ✨ here" }
    ],
    footerNote: "Who would've thought that one random, awkward text would lead to years of late-night calls and endless memories?"
  },

  // 3. 👀 The first time I saw you
  firstTimeISawYou: {
    tag: "FIRST IMPRESSION",
    title: "The First Time I Saw You",
    subtitle: "First impressions are funny looking back...",
    memoryLocation: "That First Day",
    image: "images/4.jpeg", // Sample nostalgic meeting photo
    story: "I still remember the first time I saw you.I didn't know you would become this important to me. I didn't know that this simple moment would become a memory I'd always want to keep.Looking at this picture now just makes me smile… because I know how special you became to me after this.",
    funThought: "🥹❤️✨"
  },

  // 4. 📸 The memories we collected (With high quality sample photos)
  memories: [
    {
      title: "",
      date: "",
      caption: "I still remember the first time you held my hand.I don't know why, but that little moment stayed with me.And even after all this time, looking at this picture still gives me the same little feeling. ❤️",
      image: "images/1.jpeg",
      note: ""
    },
    {
      title: "",
      date: "",
      caption: "The first time you mentioned me in your story…I still remember that little happiness it gave me. 🥹❤️",
      image: "images/2.jpeg",
      note: ""
    },
    {
      title: "",
      date: "",
      caption: "Our first call.....I still remember how nervous and happy I was that day❤️",
      image: "images/3.jpeg",
      note: ""
    }
  ],

  // 5. 😂 The moments only we understand
  // insideJokes: [
  //   {
  //     emoji: "👀",
  //     title: "The Silent Eyebrow Glance",
  //     desc: "Making direct eye contact across a crowded room and immediately knowing what the other is thinking."
  //   },
  //   {
  //     emoji: "🍕",
  //     title: "The 'Just One More Slice' Lie",
  //     desc: "Saying we're on a diet and then ordering enough food to feed a small village at 1 AM."
  //   },
  //   {
  //     emoji: "🚗",
  //     title: "The Terrible Car Concerts",
  //     desc: "Singing at the top of our lungs, completely out of key, with absolute confidence."
  //   },
  //   {
  //     emoji: "🤫",
  //     title: "That One Code Word",
  //     desc: "The phrase that immediately means: 'We need to exit this situation right now.'"
  //   }
  // ],

  // 6. 🫶 Things I never say enough
  thingsINeverSay: [
    {
      heart: "💗",
      title: "",
      desc: "Mujhe pta hai hum long distance mein hain, aur kabhi-kabhi bura lagta hai ki aap mere paas nahi ho. But honestly, distance ne mere feelings kabhi change nahi kiye. Aapki chhoti-chhoti baatein, aapka care karna aur bas aapka hona mere liye bohot matter karta hai. ❤️"
    },
    {
      heart: "💗",
      title: "",
      desc: "Main har baar express nahi kar pati aur kabhi-kabhi overthink bhi kar leti hu, but ek cheez mujhe hamesha pta hai — mujhe aapse hi pyaar karna hai. Chahe hum kitne bhi door ho, mere liye aap wahi ho… mere favourite person. 🥹❤️"
    },
    {
      heart: "💗",
      title: "",
      desc: "Main shayad har baar nahi bolti, but aap meri life ka woh person ho jiske saath main apni chhoti se chhoti baat bhi share karna chahti hu. Aap mere liye sirf someone I love nahi ho, aap mere liye bohot zyada special ho. 🫶🏻"
    },
    {
      heart: "💗",
      title: "",
      desc: "Mujhe nahi pta main aapko kabhi words mein properly bata paungi ya nahi ki aap mere liye kitne important ho. Bas itna pta hai ki aapke saath jo feel hota hai, woh mere liye bohot precious hai… and I’ll always be grateful for you. ❤️"
    }
  ],

  // 💌 Secret Love Capsule & Reasons You Are Cherished
  loveNotes: {
    badge: "MADE WITH LOVE ❤️",
    secretLetter: {
      tag: "A PRIVATE NOTE",
      title: "A Sealed Letter From The Heart",
      subtitle: "Tap the wax seal to read what I wrote just for you.",
      content: `

Happy Birthday bby! ❤️

I made this website because ordinary birthday cards get tossed away, but you deserve something that lasts forever.


I love you so much — aaj bhi, kal bhi aur hamesha. Aur mera ye pyaar kabhi kam nahi hoga, bas time ke saath aur badhta hi rahega. 🥹❤️

I just wish ki agar kal ko humare beech kabhi koi aisi baat aaye jisse hum dono hurt ho ya humare beech differences ho, toh hum usse milke solve karein, ek dusre ko samjhein… na ki ek dusre ko chhod dein.

I always want you in my life, not just for the good days, but for all the days. I want us to keep choosing each other, keep understanding each other, and keep growing together.

Bas aap hamesha khush raho, apne saare dreams achieve karo… aur main hamesha aapke saath rahun. ❤️

Happy Birthday, my bby.
I love you so, so much. 🫶🏻`
    },
    reasonsLoved: [
      "You are someone that i can't replace with someone else. ✨",
      "You have such a caring heart 🫶",
      "You've give me little moments that i'll always remember 🌍❤️"
    ]
  },

  // 7. ⏳ A little countdown…
  countdown: {
    tag: "BUILDING THE SUSPENSE",
    title: "Wait... what time is it?",
    subtitle: "We've walked through the memories... now it's time for the real event.",
    drumrollText: "Ready to blow the candles and claim your spotlight?"
  },

  // 8. 🎂 His birthday + final message
  birthdayFinale: {
    heroTitle: "HAPPY BIRTHDAY,",
    image: "images/6.jpeg", // Celebratory candlelight wish photo
    candlesCount: 3,
    wishMessage: "WISH GRANTED! 🌟 May this year bring you unmatched success, endless peace, and dream vacations!",
    finalLetter: `To my Love,

Happy Birthday! 🎂✨

If there is one thing I wish for you today and every day following, it is that you receive back all the genuine love, patience, and kindness that you give so freely to the world.

May this new age bring you exciting adventures, doors opening that you never imagined, and peace of mind. Eat the extra slice of cake, celebrate yourself without hesitation, and know that wherever life takes you, you will always have my unwavering support.

Happy Birthday Babbbyyy , You deserve the world and then some. 🥂`
  },

  // 9. ♾️ To be continued…
  toBeContinued: {
    tag: "THE NEXT CHAPTER",
    title: "To Be Continued… ♾️",
    subtitle: "Our story is only just getting started.",
    closingNote: "More love, more memories, more little moments together Always us❤️"
  }
};
