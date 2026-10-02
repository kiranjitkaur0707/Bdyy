/**
 * An Emotional Birthday Journey - Interactive Engine
 * -------------------------------------------------------------
 * Powers the multi-chapter storytelling experience with Web Audio,
 * interactive opening questions, canvas confetti, sample photo galleries,
 * 3D love envelope with wax seal, emotion reactor bar, interactive cake candles,
 * and ambient sound effects.
 */

(function () {
  'use strict';

  // 1. STATE & LOCALSTORAGE (Defensive Merge)
  let currentConfig = JSON.parse(JSON.stringify(BIRTHDAY_CONFIG));
  try {
    const saved = localStorage.getItem('birthday_story_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.friendName) currentConfig.friendName = parsed.friendName;
      if (parsed.age) currentConfig.age = parsed.age;
      if (parsed.birthdayFinale && parsed.birthdayFinale.finalLetter) {
        currentConfig.birthdayFinale.finalLetter = parsed.birthdayFinale.finalLetter;
      }
    }
  } catch (e) {
    console.warn('Could not read saved story config', e);
  }

  // 2. WEB AUDIO & BIRTHDAY MUSIC ENGINE
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.isPlayingMusic = false;
      this.musicTimer = null;
      this.bgAudio = null;
      this.initBackgroundAudio();
    }

    initBackgroundAudio() {
      try {
        const musicFile = (window.BIRTHDAY_CONFIG && window.BIRTHDAY_CONFIG.music && window.BIRTHDAY_CONFIG.music.file) || 'happy-birthday.mp3';
        this.bgAudio = document.getElementById('bgBirthdayAudio') || new Audio(musicFile);
        this.bgAudio.loop = true;
        this.bgAudio.volume = 0.7;

        this.bgAudio.addEventListener('play', () => {
          this.isPlayingMusic = true;
          if (typeof updateSoundUI === 'function') updateSoundUI(true);
        });

        this.bgAudio.addEventListener('pause', () => {
          this.isPlayingMusic = false;
          if (typeof updateSoundUI === 'function') updateSoundUI(false);
        });

        this.bgAudio.addEventListener('ended', () => {
          this.isPlayingMusic = false;
          if (typeof updateSoundUI === 'function') updateSoundUI(false);
        });
      } catch (e) {
        console.warn('Background audio init notice:', e);
      }
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTone(freq, type = 'sine', duration = 0.3, gainLevel = 0.15) {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) { }
    }

    playPop() {
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.09);
      } catch (e) { }
    }

    playChime() {
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'triangle', 0.45, 0.12), idx * 75);
      });
    }

    playHeartTone() {
      this.init();
      const chord = [349.23, 440.0, 523.25, 698.46];
      chord.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sine', 0.6, 0.09), idx * 60);
      });
    }

    playDrumrollTick(pitch = 220) {
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
      } catch (e) { }
    }

    playWhoosh() {
      this.init();
      if (!this.ctx) return;
      try {
        const bufferSize = this.ctx.sampleRate * 0.25;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
        noise.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start();
      } catch (e) { }
    }

    playFanfare() {
      this.init();
      const chord1 = [261.63, 329.63, 392.00, 523.25];
      chord1.forEach((freq) => this.playTone(freq, 'triangle', 0.7, 0.14));
      setTimeout(() => {
        const chord2 = [349.23, 440.00, 523.25, 698.46];
        chord2.forEach((freq) => this.playTone(freq, 'triangle', 0.9, 0.16));
      }, 280);
      setTimeout(() => {
        const chord3 = [392.00, 493.88, 587.33, 783.99];
        chord3.forEach((freq) => this.playTone(freq, 'triangle', 1.4, 0.2));
      }, 600);
    }

    startCelebrationMelody() {
      this.init();
      this.isPlayingMusic = true;

      // Ensure background audio element is connected
      if (!this.bgAudio) {
        this.initBackgroundAudio();
      }

      if (this.bgAudio) {
        const promise = this.bgAudio.play();
        if (promise !== undefined) {
          promise
            .then(() => {
              if (typeof updateSoundUI === 'function') updateSoundUI(true);
            })
            .catch((err) => {
              console.log('Audio autoplay prevented or error, falling back to synth chime:', err);
              this.playSynthesizedMelody();
            });
          return;
        }
      }

      this.playSynthesizedMelody();
    }

    playSynthesizedMelody() {
      if (this.musicTimer) {
        clearTimeout(this.musicTimer);
        this.musicTimer = null;
      }

      const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23,
        G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25,
        D5 = 587.33, Bb4 = 466.16;

      const melody = [
        { note: C4, d: 350 }, { note: C4, d: 200 }, { note: D4, d: 550 },
        { note: C4, d: 550 }, { note: F4, d: 550 }, { note: E4, d: 1100 },
        { note: C4, d: 350 }, { note: C4, d: 200 }, { note: D4, d: 550 },
        { note: C4, d: 550 }, { note: G4, d: 550 }, { note: F4, d: 1100 },
        { note: C4, d: 350 }, { note: C4, d: 200 }, { note: C5, d: 550 },
        { note: A4, d: 550 }, { note: F4, d: 550 }, { note: E4, d: 550 }, { note: D4, d: 900 },
        { note: Bb4, d: 350 }, { note: Bb4, d: 200 }, { note: A4, d: 550 },
        { note: F4, d: 550 }, { note: G4, d: 550 }, { note: F4, d: 1200 }
      ];

      let idx = 0;
      const nextNote = () => {
        if (!this.isPlayingMusic) return;
        const item = melody[idx];
        this.playTone(item.note, 'triangle', (item.d / 1000) * 0.9, 0.12);
        idx = (idx + 1) % melody.length;
        this.musicTimer = setTimeout(nextNote, item.d);
      };

      nextNote();
    }

    stopCelebrationMelody() {
      this.isPlayingMusic = false;
      if (this.bgAudio) {
        try {
          this.bgAudio.pause();
        } catch (e) { }
      }
      if (this.musicTimer) {
        clearTimeout(this.musicTimer);
        this.musicTimer = null;
      }
      if (typeof updateSoundUI === 'function') updateSoundUI(false);
    }
  }

  const sound = new SoundEngine();

  // 3. FULLSCREEN CONFETTI ENGINE
  class ConfettiEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];
      this.colors = ['#ff4d8d', '#ffd166', '#4cc9f0', '#06d6a0', '#9d4edd', '#ff9e00', '#ffffff', '#ff758c'];
      this.isAnimating = false;

      if (this.canvas) {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
      }
    }

    resizeCanvas() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    burst(x, y, count = 75, spread = 60) {
      if (!this.canvas) return;
      const originX = x !== undefined ? x : window.innerWidth / 2;
      const originY = y !== undefined ? y : window.innerHeight / 2;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * spread + 8;
        this.particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 5,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          size: Math.random() * 8 + 6,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          gravity: 0.28,
          drag: 0.94,
          wobble: Math.random() * 10,
          wobbleSpeed: Math.random() * 0.1 + 0.05,
          opacity: 1,
          shape: Math.random() > 0.3 ? 'rect' : 'circle'
        });
      }

      if (!this.isAnimating) {
        this.animate();
      }
    }

    rain(count = 60) {
      if (!this.canvas) return;
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * window.innerWidth,
          y: -20 - Math.random() * 100,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 3 + 2,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          size: Math.random() * 9 + 5,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
          gravity: 0.08,
          drag: 0.99,
          wobble: Math.random() * 10,
          wobbleSpeed: Math.random() * 0.08 + 0.04,
          opacity: 1,
          shape: Math.random() > 0.4 ? 'rect' : 'circle'
        });
      }

      if (!this.isAnimating) {
        this.animate();
      }
    }

    animate() {
      if (!this.ctx) return;
      this.isAnimating = true;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx + Math.sin(p.wobble) * 1.5;
        p.y += p.vy;
        p.wobble += p.wobbleSpeed;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.007;

        if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        } else {
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        }

        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        requestAnimationFrame(() => this.animate());
      } else {
        this.isAnimating = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }

  const confetti = new ConfettiEngine('confetti-canvas');

  // 4. FLOATING AMBIENT BALLOONS & HEARTS
  function initAmbientBalloons() {
    const container = document.getElementById('ambientBalloons');
    if (!container) return;

    const items = ['🎈', '🎉', '💖', '🎂', '✨', '🎈', '⭐', '🎈', '💌', '🌸', '🥰'];
    const maxItems = 12;

    function createBalloon() {
      if (container.children.length >= maxItems) return;

      const balloon = document.createElement('div');
      balloon.className = 'floating-balloon';
      balloon.textContent = items[Math.floor(Math.random() * items.length)];

      const leftPos = Math.random() * 95;
      const duration = Math.random() * 8 + 9;
      const sizeScale = Math.random() * 0.6 + 0.8;

      balloon.style.left = `${leftPos}%`;
      balloon.style.animationDuration = `${duration}s`;
      balloon.style.fontSize = `${sizeScale * 2.5}rem`;

      balloon.addEventListener('click', () => {
        sound.playPop();
        const rect = balloon.getBoundingClientRect();
        confetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25, 20);
        balloon.style.transform = 'scale(1.8)';
        balloon.style.opacity = '0';
        setTimeout(() => balloon.remove(), 200);
      });

      balloon.addEventListener('animationend', () => balloon.remove());
      container.appendChild(balloon);
    }

    for (let i = 0; i < 5; i++) {
      setTimeout(createBalloon, i * 900);
    }
    setInterval(createBalloon, 2400);
  }

  // 5. RENDER ALL CHAPTERS
  function renderAllChapters() {
    // 1. 💌 Why I made this
    const contentWhy = document.getElementById('contentWhy');
    const quoteWhy = document.getElementById('quoteWhy');
    if (contentWhy && currentConfig.whyIMadeThis) {
      contentWhy.innerHTML = currentConfig.whyIMadeThis.paragraphs
        .map((p) => `<p>${p}</p>`)
        .join('');
    }
    if (quoteWhy && currentConfig.whyIMadeThis) {
      quoteWhy.textContent = currentConfig.whyIMadeThis.quote || '';
    }

    // 2. 💬 Our first conversation
    const chatFriendName = document.getElementById('chatFriendName');
    const chatContainer = document.getElementById('chatMessagesContainer');
    const chatFooter = document.getElementById('chatFooterNote');

    if (chatFriendName) chatFriendName.textContent = currentConfig.friendName || 'Babbyyyy';
    if (chatFooter && currentConfig.firstConversation) {
      chatFooter.textContent = currentConfig.firstConversation.footerNote || '';
    }
    if (chatContainer && currentConfig.firstConversation) {
      chatContainer.innerHTML = currentConfig.firstConversation.messages.map((m) => `
        <div class="chat-bubble ${m.sender}">
          <span class="bubble-text">${m.text}</span>
          <span class="bubble-time">${m.time}</span>
        </div>
      `).join('');
    }

    // 3. 👀 The first time I saw you
    const spotlightLoc = document.getElementById('spotlightLocation');
    const spotlightStory = document.getElementById('spotlightStory');
    const spotlightThought = document.getElementById('spotlightFunThought');
    const spotlightImg = document.getElementById('spotlightImg');
    const firstSightCard = document.getElementById('firstSightPhotoCard');

    if (spotlightLoc && currentConfig.firstTimeISawYou) {
      spotlightLoc.textContent = currentConfig.firstTimeISawYou.memoryLocation || 'That First Day';
    }
    if (spotlightStory && currentConfig.firstTimeISawYou) {
      spotlightStory.textContent = currentConfig.firstTimeISawYou.story || '';
    }
    if (spotlightThought && currentConfig.firstTimeISawYou) {
      spotlightThought.textContent = currentConfig.firstTimeISawYou.funThought || '';
    }
    if (spotlightImg && currentConfig.firstTimeISawYou && currentConfig.firstTimeISawYou.image) {
      spotlightImg.src = currentConfig.firstTimeISawYou.image;
    }
    if (firstSightCard) {
      firstSightCard.addEventListener('click', () => {
        openPhotoLightbox({
          title: "The First Time We Met",
          caption: "Where our wild journey quietly began 🥹✨",
          image: (currentConfig.firstTimeISawYou && currentConfig.firstTimeISawYou.image) || "images/4.jpeg"
        });
      });
    }

    // 4. 📸 The memories we collected
    const memoriesGrid = document.getElementById('memoriesGrid');
    if (memoriesGrid && currentConfig.memories) {
      memoriesGrid.innerHTML = currentConfig.memories.map((mem, idx) => `
        <div class="polaroid-card" data-index="${idx}">
          <div class="polaroid-photo-wrapper">
            ${mem.image
          ? `<img src="${mem.image}" alt="${mem.title}" class="polaroid-img" />`
          : `<div class="polaroid-placeholder">
                    <span class="polaroid-placeholder-icon">📸</span>
                    <span class="polaroid-placeholder-text">Add your photo here!</span>
                   </div>`
        }
            <div class="polaroid-tape-top"></div>
          </div>
          <div class="polaroid-info">
            <span class="polaroid-date">${mem.date || '❤️'}</span>
            <h4 class="polaroid-title">${mem.title}</h4>
            <p class="polaroid-caption">${mem.caption}</p>
            ${mem.note ? `<div class="polaroid-hand-note">${mem.note}</div>` : ''}
          </div>
        </div>
      `).join('');

      memoriesGrid.querySelectorAll('.polaroid-card').forEach((card) => {
        card.addEventListener('click', () => {
          const idx = parseInt(card.getAttribute('data-index'), 10);
          openPhotoLightbox(currentConfig.memories[idx]);
        });
      });
    }

    // 5. 😂 The moments only we understand
    const jokesGrid = document.getElementById('jokesGrid');
    if (jokesGrid && currentConfig.insideJokes) {
      jokesGrid.innerHTML = currentConfig.insideJokes.map((joke) => `
        <div class="joke-card">
          <div class="joke-emoji">${joke.emoji}</div>
          <h3 class="joke-title">${joke.title}</h3>
          <p class="joke-desc">${joke.desc}</p>
        </div>
      `).join('');

      jokesGrid.querySelectorAll('.joke-card').forEach((card) => {
        card.addEventListener('click', () => {
          sound.playChime();
          const rect = card.getBoundingClientRect();
          confetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25, 20);
        });
      });
    }

    // 6. 🫶 Things I never say enough
    const gratitudeGrid = document.getElementById('gratitudeGrid');
    if (gratitudeGrid && currentConfig.thingsINeverSay) {
      gratitudeGrid.innerHTML = currentConfig.thingsINeverSay.map((item) => `
        <div class="gratitude-card">
          <div class="gratitude-heart">${item.heart}</div>
          <h3 class="gratitude-title">${item.title}</h3>
          <p class="gratitude-desc">${item.desc}</p>
        </div>
      `).join('');
    }

    // 6.5 💌 Sealed Love Letter from the Heart
    const letterSalutation = document.getElementById('letterSalutation');
    const letterParagraphs = document.getElementById('letterParagraphs');
    const letterSigName = document.getElementById('letterSigName');

    if (currentConfig.loveNotes && currentConfig.loveNotes.secretLetter) {
      if (letterSalutation) {
        letterSalutation.textContent = `To ${currentConfig.friendName || 'Babbyyyy'},`;
      }
      if (letterParagraphs) {
        const paragraphs = currentConfig.loveNotes.secretLetter.content.split('\n\n');
        letterParagraphs.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
      }
      if (letterSigName) {
        letterSigName.textContent = `${currentConfig.friendNickname || 'Your Day One Forever'} 💖`;
      }
    }

    // 7. ⏳ A little countdown…
    const drumrollText = document.getElementById('drumrollText');
    if (drumrollText && currentConfig.countdown) {
      drumrollText.textContent = currentConfig.countdown.drumrollText || 'Ready for the main event?';
    }

    // 8. 🎂 His birthday + final message
    const birthdayName = document.getElementById('birthdayName');
    const finalLetter = document.getElementById('finalLetterContent');
    const wishMsg = document.getElementById('wishMessageText');
    const finaleCard = document.getElementById('finalePhotoCard');

    if (birthdayName) birthdayName.textContent = (currentConfig.friendName || 'Babbyyyy') + '!';
    if (finalLetter && currentConfig.birthdayFinale) {
      finalLetter.textContent = currentConfig.birthdayFinale.finalLetter || '';
    }
    if (wishMsg && currentConfig.birthdayFinale) {
      wishMsg.textContent = currentConfig.birthdayFinale.wishMessage || 'WISH GRANTED!';
    }
    if (finaleCard) {
      finaleCard.addEventListener('click', () => {
        openPhotoLightbox({
          title: "The Big Moment ✨🎂",
          caption: "Surrounded by warmth, smiles, and endless celebration. May all your wishes come true!",
          image: (currentConfig.birthdayFinale && currentConfig.birthdayFinale.image) || "images/6.jpeg"
        });
      });
    }

    // 9. ♾️ To be continued…
    const tbcNote = document.getElementById('tbcNote');
    if (tbcNote && currentConfig.toBeContinued) {
      tbcNote.textContent = currentConfig.toBeContinued.closingNote || '';
    }
  }

  // 6. CHAPTER SCROLL SPY
  function initScrollSpy() {
    const chapters = document.querySelectorAll('.chapter-section');
    const navDots = document.querySelectorAll('.story-nav .nav-dot');

    window.addEventListener('scroll', () => {
      let currentId = '';
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      chapters.forEach((chapter) => {
        const top = chapter.offsetTop;
        const height = chapter.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = chapter.getAttribute('id');
        }
      });

      if (currentId) {
        navDots.forEach((dot) => {
          if (dot.getAttribute('href') === `#${currentId}`) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }

  // 7. COUNTDOWN & DRUMROLL TRIGGER
  function initCountdownTrigger() {
    const drumrollBtn = document.getElementById('drumrollTriggerBtn');
    const countVal = document.getElementById('countVal');
    let isCounting = false;

    if (!drumrollBtn || !countVal) return;

    drumrollBtn.addEventListener('click', () => {
      if (isCounting) return;
      isCounting = true;
      drumrollBtn.disabled = true;

      sound.init();

      let current = 3;
      countVal.textContent = current;
      sound.playDrumrollTick(300);

      const interval = setInterval(() => {
        current--;
        if (current > 0) {
          countVal.textContent = current;
          countVal.classList.add('tick');
          setTimeout(() => countVal.classList.remove('tick'), 200);
          sound.playDrumrollTick(320 + (3 - current) * 60);
        } else {
          clearInterval(interval);
          countVal.textContent = '🎉';
          sound.playFanfare();
          confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 130, 50);
          confetti.rain(70);

          setTimeout(() => {
            const bdaySection = document.getElementById('chapter-birthday');
            if (bdaySection) {
              bdaySection.scrollIntoView({ behavior: 'smooth' });
            }
            sound.startCelebrationMelody();
            if (typeof updateSoundUI === 'function') updateSoundUI(true);
            isCounting = false;
            drumrollBtn.disabled = false;
          }, 600);
        }
      }, 900);
    });
  }

  // 8. INTERACTIVE BIRTHDAY CAKE
  function initCakeInteraction() {
    const candlesWrapper = document.getElementById('candlesWrapper');
    const wishRevealBox = document.getElementById('wishRevealBox');
    const relightCandlesBtn = document.getElementById('relightCandlesBtn');

    if (!candlesWrapper) return;
    const candles = candlesWrapper.querySelectorAll('.candle');

    candles.forEach((candle) => {
      candle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (candle.classList.contains('blown-out')) return;

        candle.classList.add('blown-out');
        sound.playWhoosh();

        const rect = candle.getBoundingClientRect();
        confetti.burst(rect.left + rect.width / 2, rect.top, 25, 20);

        const allBlown = Array.from(candles).every((c) => c.classList.contains('blown-out'));
        if (allBlown) {
          setTimeout(() => {
            sound.playFanfare();
            confetti.burst(window.innerWidth / 2, window.innerHeight * 0.45, 130, 50);
            confetti.rain(80);
            if (wishRevealBox) wishRevealBox.classList.add('active');
            sound.startCelebrationMelody();
            if (typeof updateSoundUI === 'function') updateSoundUI(true);
          }, 350);
        }
      });
    });

    if (relightCandlesBtn) {
      relightCandlesBtn.addEventListener('click', () => {
        sound.playChime();
        candles.forEach((c) => c.classList.remove('blown-out'));
        if (wishRevealBox) wishRevealBox.classList.remove('active');
      });
    }
  }

  // 9. INTERACTIVE OPENING QUESTIONS FLOW
  function initOpeningQuestions() {
    const welcomeCard = document.getElementById('introCardWelcome');
    const quizCard = document.getElementById('introCardQuiz');
    const unlockedCard = document.getElementById('introCardUnlocked');
    const introOverlay = document.getElementById('introOverlay');
    const introGiftBox = document.getElementById('introGiftBox');

    const startBtn = document.getElementById('startQuestionsBtn');
    const skipWelcomeBtn = document.getElementById('skipIntroQuestionsBtn');
    const quizSkipBtn = document.getElementById('quizSkipBtn');
    const quizNextBtn = document.getElementById('quizNextBtn');

    const quizBadge = document.getElementById('quizBadge');
    const quizHeartSteps = document.getElementById('quizHeartSteps');
    const quizQuestionText = document.getElementById('quizQuestionText');
    const quizOptionsContainer = document.getElementById('quizOptionsContainer');
    const quizFeedbackBox = document.getElementById('quizFeedbackBox');
    const feedbackEmoji = document.getElementById('feedbackEmoji');
    const feedbackText = document.getElementById('feedbackText');
    const navQuizBtn = document.getElementById('openQuizNavBtn');

    const questions = currentConfig.openingQuestions || [];
    let currentQIdx = 0;
    let autoAdvanceTimer = null;

    function renderQuestion(idx) {
      if (!questions[idx]) return;
      const q = questions[idx];

      if (quizBadge) quizBadge.textContent = q.badge || `QUESTION 0${idx + 1} OF 0${questions.length}`;
      if (quizQuestionText) quizQuestionText.textContent = q.question;

      if (quizHeartSteps) {
        quizHeartSteps.innerHTML = questions.map((_, i) => {
          if (i < idx) return '<span class="heart-step active">❤️</span>';
          if (i === idx) return '<span class="heart-step active">💖</span>';
          return '<span class="heart-step">🤍</span>';
        }).join('');
      }

      if (quizFeedbackBox) quizFeedbackBox.classList.add('hidden');
      if (quizNextBtn) quizNextBtn.classList.add('hidden');

      if (quizOptionsContainer) {
        quizOptionsContainer.innerHTML = q.options.map((opt, optIdx) => `
          <button class="quiz-opt-btn" data-opt-idx="${optIdx}">
            <span class="opt-emoji">${opt.emoji || '✨'}</span>
            <span class="opt-text">${opt.text}</span>
          </button>
        `).join('');

        const optBtns = quizOptionsContainer.querySelectorAll('.quiz-opt-btn');
        optBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            const chosenIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
            const chosen = q.options[chosenIdx];

            sound.playChime();
            const rect = btn.getBoundingClientRect();
            confetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 30, 20);

            optBtns.forEach(b => {
              b.disabled = true;
              b.classList.remove('selected');
            });
            btn.classList.add('selected');

            if (quizFeedbackBox && chosen.reaction) {
              if (feedbackEmoji) feedbackEmoji.textContent = chosen.emoji || '🥰';
              if (feedbackText) feedbackText.textContent = chosen.reaction;
              quizFeedbackBox.classList.remove('hidden');
            }

            if (quizHeartSteps) {
              quizHeartSteps.innerHTML = questions.map((_, i) => {
                if (i <= idx) return '<span class="heart-step active">❤️</span>';
                return '<span class="heart-step">🤍</span>';
              }).join('');
            }

            if (quizNextBtn) quizNextBtn.classList.remove('hidden');

            if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
            autoAdvanceTimer = setTimeout(() => {
              goToNextQuestion();
            }, 1400);
          });
        });
      }
    }

    function goToNextQuestion() {
      if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);

      if (currentQIdx < questions.length - 1) {
        currentQIdx++;
        renderQuestion(currentQIdx);
      } else {
        completeQuizAndUnlock();
      }
    }

    function completeQuizAndUnlock() {
      if (quizCard) quizCard.classList.add('hidden');
      if (unlockedCard) unlockedCard.classList.remove('hidden');

      sound.init();
      sound.playFanfare();
      confetti.burst(window.innerWidth / 2, window.innerHeight * 0.45, 140, 50);
      confetti.rain(75);

      sound.startCelebrationMelody();
      updateSoundUI(true);

      setTimeout(() => {
        if (introOverlay) {
          introOverlay.classList.add('hidden');
        }
      }, 2300);
    }

    function skipDirectly() {
      sound.init();
      sound.playFanfare();
      confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 100, 40);
      sound.startCelebrationMelody();
      updateSoundUI(true);
      if (introOverlay) introOverlay.classList.add('hidden');
    }

    function startQuizFlow() {
      sound.init();
      sound.playChime();
      if (welcomeCard) welcomeCard.classList.add('hidden');
      if (quizCard) quizCard.classList.remove('hidden');
      currentQIdx = 0;
      renderQuestion(currentQIdx);
    }

    if (startBtn) startBtn.addEventListener('click', startQuizFlow);
    if (introGiftBox) introGiftBox.addEventListener('click', startQuizFlow);
    if (skipWelcomeBtn) skipWelcomeBtn.addEventListener('click', skipDirectly);
    if (quizSkipBtn) quizSkipBtn.addEventListener('click', skipDirectly);
    if (quizNextBtn) quizNextBtn.addEventListener('click', goToNextQuestion);

    if (navQuizBtn) {
      navQuizBtn.addEventListener('click', () => {
        sound.init();
        sound.playChime();
        if (introOverlay) introOverlay.classList.remove('hidden');
        if (welcomeCard) welcomeCard.classList.add('hidden');
        if (unlockedCard) unlockedCard.classList.add('hidden');
        if (quizCard) quizCard.classList.remove('hidden');
        currentQIdx = 0;
        renderQuestion(currentQIdx);
      });
    }
  }

  // 10. SOUND TOGGLE
  function initSoundToggle() {
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    if (!soundToggleBtn) return;

    soundToggleBtn.addEventListener('click', () => {
      sound.init();
      if (sound.isPlayingMusic) {
        sound.stopCelebrationMelody();
      } else {
        sound.startCelebrationMelody();
      }
    });
  }

  function updateSoundUI(isPlaying) {
    const btn = document.getElementById('soundToggleBtn');
    const icon = document.getElementById('soundIcon');
    const label = document.getElementById('soundLabel');
    if (!btn) return;

    if (isPlaying) {
      btn.classList.add('playing');
      if (icon) icon.textContent = '🎶';
      if (label) label.textContent = 'Mute Song';
    } else {
      btn.classList.remove('playing');
      if (icon) icon.textContent = '🔇';
      if (label) label.textContent = 'Play Birthday Song';
    }
  }

  // 11. LIGHTBOX MODAL WITH SEND LOVE BUTTON
  function openPhotoLightbox(mem) {
    if (!mem) return;
    const modal = document.getElementById('photoModal');
    const wrapper = document.getElementById('lightboxImgWrapper');
    const title = document.getElementById('lightboxTitle');
    const caption = document.getElementById('lightboxCaption');
    const heartBtn = document.getElementById('lightboxHeartBtn');

    if (mem.image) {
      wrapper.innerHTML = `<img src="${mem.image}" alt="${mem.title}">`;
    } else {
      wrapper.innerHTML = `
        <div style="padding: 50px 20px; color: #fff; text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 12px;">📸</div>
          <p style="font-size: 1.1rem; color: #ffd166;">Photo for <strong>${mem.title}</strong></p>
          <p style="font-size: 0.9rem; color: #b8b3d1; margin-top: 6px;">Add your image to images/ and set the path in config.js!</p>
        </div>
      `;
    }

    title.textContent = mem.title;
    caption.textContent = mem.caption;
    modal.classList.add('active');

    if (heartBtn) {
      heartBtn.onclick = () => {
        sound.playHeartTone();
        confetti.burst(window.innerWidth / 2, window.innerHeight * 0.45, 50, 30);
        if (window.showStoryEmotion) window.showStoryEmotion('💖');
      };
    }
  }

  // 12. PHOTO MODAL LISTENERS
  function initPhotoModalListeners() {
    const photoModal = document.getElementById('photoModal');
    if (photoModal) {
      photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) photoModal.classList.remove('active');
      });
    }

    const closePhotoBtn = document.getElementById('closePhotoModalBtn');
    if (closePhotoBtn && photoModal) {
      closePhotoBtn.addEventListener('click', () => {
        photoModal.classList.remove('active');
      });
    }
  }

  // 13. CONFETTI BUTTONS
  function initConfettiButtons() {
    const fabBtn = document.getElementById('fabConfettiBtn');
    const finaleBtn = document.getElementById('blastConfettiFinaleBtn');

    const handleBlast = (e) => {
      sound.playFanfare();
      const x = e ? e.clientX : window.innerWidth / 2;
      const y = e ? e.clientY : window.innerHeight / 2;
      confetti.burst(x, y, 120, 50);
      confetti.rain(50);
    };

    if (fabBtn) fabBtn.addEventListener('click', handleBlast);
    if (finaleBtn) finaleBtn.addEventListener('click', handleBlast);
  }

  // 14. CHAPTER 6.5: LOVE LETTER ENVELOPE & REASONS GENERATOR
  function initLoveLetterAndReasons() {
    const waxSeal = document.getElementById('waxSealBtn');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const closeLetterBtn = document.getElementById('closeLetterBtn');
    const envelopeHint = document.getElementById('envelopeHint');

    if (waxSeal && envelopeWrapper) {
      waxSeal.addEventListener('click', () => {
        sound.init();
        sound.playHeartTone();
        const rect = waxSeal.getBoundingClientRect();
        confetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 40, 25);
        envelopeWrapper.classList.add('open');
        if (envelopeHint) {
          envelopeHint.textContent = "💌 Handcrafted with infinite love & gratitude 💌";
        }
      });
    }

    if (closeLetterBtn && envelopeWrapper) {
      closeLetterBtn.addEventListener('click', () => {
        sound.playWhoosh();
        envelopeWrapper.classList.remove('open');
        if (envelopeHint) {
          envelopeHint.textContent = "✨ Tap the wax seal to unseal this private birthday letter ✨";
        }
      });
    }

    const reasons = (currentConfig.loveNotes && currentConfig.loveNotes.reasonsLoved) || [
      "Your laugh is completely infectious and brightens up every room. ✨",
      "You stay genuinely loyal when everyone else is fake. 🛡️",
      "You listen without judgment and make everyone feel understood. 💖",
      "The world is truly a kinder, brighter, and funnier place with you in it. 🌍❤️"
    ];
    let reasonIdx = 0;
    const reasonText = document.getElementById('reasonText');
    const nextReasonBtn = document.getElementById('nextReasonBtn');

    if (nextReasonBtn && reasonText) {
      nextReasonBtn.addEventListener('click', () => {
        sound.init();
        sound.playChime();
        confetti.burst(window.innerWidth / 2, window.innerHeight * 0.7, 25, 20);

        reasonText.style.opacity = '0';
        reasonText.style.transform = 'translateY(10px)';

        setTimeout(() => {
          reasonIdx = (reasonIdx + 1) % reasons.length;
          reasonText.textContent = `"${reasons[reasonIdx]}"`;
          reasonText.style.opacity = '1';
          reasonText.style.transform = 'translateY(0)';
        }, 250);
      });
    }
  }

  // 15. FLOATING EMOTION REACTOR & PARTICLES
  function initEmotionReactor() {
    let loveCount = 128;
    try {
      const savedCount = localStorage.getItem('birthday_story_love_count');
      if (savedCount) loveCount = parseInt(savedCount, 10);
    } catch (e) { }

    const counterDisplay = document.getElementById('loveCountDisplay');
    if (counterDisplay) counterDisplay.textContent = loveCount;

    const toast = document.getElementById('emotionToast');
    let toastTimeout = null;

    const messages = {
      '🥹': 'Happy tears only today! Love you so much 🥹❤️',
      '🥰': 'Sending you all my love and blessings! 🥰✨',
      '🤗': 'The warmest, biggest virtual bear hug for you! 🫂💖',
      '😂': 'Our unhinged laughs will echo forever! 😂🥂',
      '💖': 'Heart explosion! You mean the absolute world to me! 💖'
    };

    function showEmotionToast(emotion) {
      if (!toast) return;
      toast.textContent = messages[emotion] || `Sent ${emotion} with all my love! ❤️`;
      toast.classList.add('visible');
      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('visible');
      }, 2500);
    }

    function spawnFloatingParticles(emoji, count = 14) {
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-emotion-particle';
        particle.textContent = emoji;

        const left = Math.random() * 90 + 5;
        const duration = Math.random() * 2 + 2.5;
        const delay = Math.random() * 0.4;
        const size = Math.random() * 1.2 + 1.6;

        particle.style.left = `${left}vw`;
        particle.style.bottom = '40px';
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.fontSize = `${size}rem`;

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), (duration + delay) * 1000);
      }
    }

    const emotionBtns = document.querySelectorAll('.emotion-btn');
    emotionBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const emotion = btn.getAttribute('data-emotion') || '💖';
        sound.init();
        sound.playPop();

        loveCount++;
        if (counterDisplay) counterDisplay.textContent = loveCount;
        try {
          localStorage.setItem('birthday_story_love_count', loveCount);
        } catch (e) { }

        const rect = btn.getBoundingClientRect();
        confetti.burst(rect.left + rect.width / 2, rect.top, 25, 20);

        spawnFloatingParticles(emotion, 16);
        showEmotionToast(emotion);
      });
    });

    window.showStoryEmotion = (emotion) => {
      spawnFloatingParticles(emotion, 16);
      showEmotionToast(emotion);
    };
  }

  // INITIALIZATION ON DOM READY
  document.addEventListener('DOMContentLoaded', () => {
    renderAllChapters();
    initScrollSpy();
    initOpeningQuestions();
    initLoveLetterAndReasons();
    initEmotionReactor();
    initSoundToggle();
    initCountdownTrigger();
    initCakeInteraction();
    initAmbientBalloons();
    initPhotoModalListeners();
    initConfettiButtons();
  });
})();
