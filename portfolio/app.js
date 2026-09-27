const projectData = {
  td: {
    title: 'Prototype TD',
    kicker: 'PROJECT 01 · TOWER DEFENSE',
    description: 'ผมได้สร้างเกมนี้ในเวลา 3 วันในกิจกรรม Roblox Booth Camp Hogward ของ Hamster Hub เป็นเกมแนว Tower Defense ซึ่งเป็นก้าวแรกสู่การทำเกมของผม โดยผมรับผิดชอบแอนิเมชันตัวละครทุกตัวด้วย Blender ทั้งท่าเดิน โจมตี และ Idle',
    details: ['ทำใน 3 วัน', 'Blender', 'เดิน · โจมตี · Idle', 'ต้นแบบเสร็จแล้ว'],
    image: 'assets/prototype-td.png',
    alt: 'ภาพเกม Prototype TD',
    process: ['ตั้งโจทย์เกม Tower Defense และวางภาพรวมของต้นแบบ', 'สร้างระบบเกมและฉากภายในกิจกรรม 3 วัน', 'ทำแอนิเมชันตัวละครทุกตัวใน Blender: เดิน โจมตี และ Idle', 'แอนิเมชันยังรอ rework ก่อนนำเข้าเกม'],
    url: 'https://www.roblox.com/games/97955209012164/unnamed'
  },
  night: {
    title: 'Streaming Night',
    kicker: 'PROJECT 02 · SURVIVAL HORROR',
    description: 'เกมนี้ถูกสร้างขึ้นในเวลา 1 วันในกิจกรรมเล็กๆ ของ Hamster Hub เป็นเกมผีแนว Five Nights at Freddy’s ที่ผมทำคนเดียวทุกส่วน ตั้งแต่การออกแบบบรรยากาศและฉาก ไปจนถึง UI และตัวเกม',
    details: ['ทำคนเดียว', 'ทำใน 1 วัน', 'Hamster Hub', 'สร้างเมื่อ 23 ก.ย. 2026'],
    image: 'assets/streaming-night-2.png',
    alt: 'ภาพจากเกม Streaming Night',
    process: ['คิดคอนเซปต์เกมผีธีมสตรีมเมอร์', 'ทำคนเดียวทุกส่วนภายใน 1 วันในกิจกรรมของ Hamster Hub', 'สร้างฉาก ออกแบบ UI และทำแอนิเมชันตัวละครด้วย Blender', 'จัดบรรยากาศและจังหวะเอาตัวรอดให้ผู้เล่น'],
    url: 'https://www.roblox.com/games/112929649856122/Streaming-Night'
  }
};

const dialog = document.querySelector('.project-dialog');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const loadingScreen = document.querySelector('.loading-screen');
const introScreen = document.querySelector('.intro-screen');
const introPreface = document.querySelector('.intro-preface');
const prefaceLines = [...document.querySelectorAll('[data-preface-step]')];
const prefaceProgress = document.querySelector('[data-preface-progress]');
const prefacePause = document.querySelector('.preface-pause');
const storyShell = document.querySelector('.story-shell');
const storyTitle = document.querySelector('[data-story-title]');
const storyPeriod = document.querySelector('[data-story-period]');
const storyOverline = document.querySelector('[data-story-overline]');
const storyDescription = document.querySelector('[data-story-description]');
const storyCount = document.querySelector('[data-story-count]');
const storyProgress = document.querySelector('[data-story-progress]');
const storyPause = document.querySelector('.story-pause');
const stompViewer = document.querySelector('.stomp-viewer');
const storyCards = [...document.querySelectorAll('[data-story-card]')];
const storySteps = [
  {period:'ป.3 — ป.6',overline:'จุดเริ่มต้น · FIRST SPARK',title:'เริ่มเรียนรู้การสร้างเกมด้วยตัวเอง',description:'ตอนเด็ก ผมเริ่มลองสร้างเกมใน Roblox ด้วยตัวเอง ก่อนจะค่อยๆ รู้ว่าชอบการสร้างโลกให้คนอื่นได้เข้าไปเล่น',duration:7200},
  {period:'ม.1 — ม.2',overline:'เว้นช่วง · THE PAUSE',title:'เส้นทางนี้หยุดพักไปชั่วคราว',description:'ผมหยุดทำเกมไปตั้งแต่ ม.1 ก่อนจะกลับมาสนใจโลกของเกมอีกครั้งในช่วง ม.3',duration:7000},
  {period:'ม.3',overline:'ค้นพบสิ่งใหม่ · NEW INTEREST',title:'ได้รู้จักโลกของแอนิเมชัน',description:'Leftright ทำให้ผมสนใจแอนิเมชัน Roblox แต่ตอนนั้นผมยังไม่ได้เริ่มลงมือทำ',duration:7600},
  {period:'ม.4 · HAMSTER HUB',overline:'เริ่มลงมือ · FIRST ANIMATION',title:'จากความสนใจ สู่การลงมือทำ',description:'เมื่อได้เข้าเรียน Hamster Hub ผมเริ่มทำแอนิเมชันด้วย Blender — นี่คือหนึ่งในชิ้นงานที่กำลังพัฒนา',duration:16000}
];
stompViewer?.addEventListener('load', () => {
  if (!storyShell.hidden && storyIndex === 3) stompViewer.updateFraming?.();
});
let storyIndex=0;
let storyTimer;
let storyDeadline=0;
let storyRemaining=0;
let storyPaused=false;
let viewerAutoPaused=false;
let introFinished = false;
let prefaceIndex = 0;
let prefaceTimer;
let prefaceDeadline = 0;
let prefaceRemaining = 0;
let prefacePaused = false;
const prefaceSteps = [3400, 4300, 3400];
const setPrefaceProgress = duration => {
  prefaceProgress.classList.remove('is-running', 'is-paused');
  prefaceProgress.style.setProperty('--preface-duration', duration + 'ms');
  void prefaceProgress.offsetWidth;
  prefaceProgress.classList.add('is-running');
};
const showPrefaceStep = index => {
  if (introFinished) return;
  const previous = prefaceLines[prefaceIndex];
  previous?.classList.remove('is-active');
  previous?.classList.add('is-leaving');
  prefaceIndex = index;
  const next = prefaceLines[prefaceIndex];
  next.classList.remove('is-leaving');
  next.classList.add('is-active');
  const duration = prefaceSteps[prefaceIndex];
  prefaceRemaining = duration;
  prefaceDeadline = performance.now() + duration;
  setPrefaceProgress(duration);
  window.clearTimeout(prefaceTimer);
  prefaceTimer = window.setTimeout(() => {
    if (prefaceIndex < prefaceLines.length - 1) showPrefaceStep(prefaceIndex + 1);
    else {
      introPreface.hidden = true;
      storyShell.hidden = false;
      showStoryStep(0);
    }
  }, duration);
};
const pausePreface = () => {
  if (prefacePaused || introPreface.hidden || introFinished) return;
  prefaceRemaining = Math.max(0, prefaceDeadline - performance.now());
  window.clearTimeout(prefaceTimer);
  prefacePaused = true;
  introPreface.classList.add('is-paused');
  prefacePause.textContent = 'เล่นต่อ';
  prefacePause.setAttribute('aria-label', 'เล่น Intro ต่อ');
  prefacePause.setAttribute('aria-pressed', 'true');
};
const resumePreface = () => {
  if (!prefacePaused || introFinished) return;
  prefacePaused = false;
  introPreface.classList.remove('is-paused');
  prefacePause.textContent = 'หยุด';
  prefacePause.setAttribute('aria-label', 'หยุด Intro ชั่วคราว');
  prefacePause.setAttribute('aria-pressed', 'false');
  prefaceDeadline = performance.now() + prefaceRemaining;
  prefaceTimer = window.setTimeout(() => {
    if (prefaceIndex < prefaceLines.length - 1) showPrefaceStep(prefaceIndex + 1);
    else {
      introPreface.hidden = true;
      storyShell.hidden = false;
      showStoryStep(0);
    }
  }, prefaceRemaining);
};
const updateStoryPauseButton = () => {
  storyPause.textContent = storyPaused ? 'เล่นต่อ' : 'หยุด';
  storyPause.setAttribute('aria-label', storyPaused ? 'เล่นเรื่องราวต่อ' : 'หยุดเรื่องราวชั่วคราว');
  storyPause.setAttribute('aria-pressed', String(storyPaused));
};
const pauseStory = () => {
  if (introFinished || storyPaused) return;
  storyRemaining = Math.max(0, storyDeadline - performance.now());
  window.clearTimeout(storyTimer);
  storyPaused = true;
  storyProgress.classList.add('is-paused');
  updateStoryPauseButton();
};
const resumeStory = () => {
  if (introFinished || !storyPaused) return;
  storyPaused = false;
  storyProgress.classList.remove('is-paused');
  updateStoryPauseButton();
  storyDeadline = performance.now() + storyRemaining;
  storyTimer = window.setTimeout(() => storyIndex === storySteps.length - 1 ? finishIntro() : showStoryStep(storyIndex + 1), storyRemaining);
};
const finishIntro = () => {
  if (introFinished) return;
  introFinished = true;
  window.clearTimeout(prefaceTimer);
  window.clearTimeout(storyTimer);
  introScreen.classList.add('is-exiting');
  window.setTimeout(() => introScreen.remove(), 850);
};
prefacePause.addEventListener('click', () => prefacePaused ? resumePreface() : pausePreface());
document.querySelector('.preface-skip').addEventListener('click', finishIntro);
const showStoryStep = index => {
  if (introFinished) return;
  storyIndex = (index + storySteps.length) % storySteps.length;
  const step = storySteps[storyIndex];
  storyPeriod.textContent = step.period;
  storyOverline.textContent = step.overline;
  storyTitle.textContent = step.title;
  storyDescription.textContent = step.description;
  storyCount.textContent = String(storyIndex + 1).padStart(2,'0');
  storyCards.forEach(card => { card.hidden = Number(card.dataset.storyCard) !== storyIndex; });
  if (storyIndex === 3) requestAnimationFrame(() => stompViewer?.updateFraming?.());
  document.querySelectorAll('[data-story-step]').forEach((button,i) => {
    button.classList.toggle('is-current',i===storyIndex);
    if(i===storyIndex) button.setAttribute('aria-current','step'); else button.removeAttribute('aria-current');
  });
  introScreen.dataset.step=String(storyIndex);
  introScreen.classList.remove('is-changing');
  void introScreen.offsetWidth;
  introScreen.classList.add('is-changing');
  storyProgress.classList.remove('is-running');
  storyProgress.classList.remove('is-paused');
  storyPaused = false;
  updateStoryPauseButton();
  storyProgress.style.setProperty('--story-duration',step.duration + 'ms');
  void storyProgress.offsetWidth;
  storyProgress.classList.add('is-running');
  window.clearTimeout(storyTimer);
  storyRemaining = step.duration;
  storyDeadline = performance.now() + step.duration;
  storyTimer=window.setTimeout(()=>storyIndex===storySteps.length-1?finishIntro():showStoryStep(storyIndex+1),step.duration);
};
document.querySelector('.story-skip').addEventListener('click',finishIntro);
storyPause.addEventListener('click', () => storyPaused ? resumeStory() : pauseStory());
document.querySelectorAll('[data-story-step]').forEach(button => button.addEventListener('click',()=>showStoryStep(Number(button.dataset.storyStep))));
stompViewer?.addEventListener('pointerdown',()=>{if (!storyPaused) { viewerAutoPaused = true; pauseStory(); }});
window.addEventListener('pointerup',()=>{if (viewerAutoPaused) { viewerAutoPaused = false; resumeStory(); }});
window.addEventListener('pointercancel',()=>{if (viewerAutoPaused) { viewerAutoPaused = false; resumeStory(); }});
window.addEventListener('keydown', event => {
  if (!introFinished && (event.key === 'Escape' || (event.key === 'Enter' && !event.target.closest('[data-story-step]')))) finishIntro();
});
const startIntroAfterLoading = async () => {
  const wait = duration => new Promise(resolve => window.setTimeout(resolve, duration));
  const introImage = document.querySelector('.story-image-card img');
  const modelReady = customElements.whenDefined('model-viewer').then(() => new Promise(resolve => {
    if (stompViewer.loaded) return resolve();
    stompViewer.addEventListener('load', resolve, {once:true});
    stompViewer.addEventListener('error', resolve, {once:true});
  }));
  const ready = Promise.allSettled([
    document.fonts.ready,
    introImage?.decode(),
    modelReady
  ]);
  await Promise.all([wait(1500), Promise.race([ready, wait(3600)])]);
  loadingScreen.classList.add('is-leaving');
  loadingScreen.addEventListener('animationend', event => {
    if (event.target !== loadingScreen) return;
    loadingScreen.remove();
    showPrefaceStep(0);
  });
  window.setTimeout(() => {
    if (loadingScreen.isConnected) {
      loadingScreen.remove();
      showPrefaceStep(0);
    }
  }, 850);
};
startIntroAfterLoading();

document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projectData[button.dataset.project];
    dialog.querySelector('.dialog-kicker').textContent = project.kicker;
    dialog.querySelector('#dialog-title').textContent = project.title;
    dialog.querySelector('.dialog-description').textContent = project.description;
    dialog.querySelector('.dialog-image img').src = project.image;
    dialog.querySelector('.dialog-image img').alt = project.alt;
    dialog.querySelector('.dialog-link').href = project.url;
    dialog.querySelector('.dev-log-steps').replaceChildren(...project.process.map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    dialog.querySelector('.dialog-details').replaceChildren(...project.details.map(text => {
      const tag = document.createElement('span');
      tag.textContent = text;
      return tag;
    }));
    dialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'เปิดเมนู' : 'ปิดเมนู');
  nav.classList.toggle('open', !expanded);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const sceneSlider = document.querySelector('.scene-slider');
const sceneFrame = document.querySelector('.media-night');
sceneSlider.addEventListener('input', () => {
  sceneFrame.style.setProperty('--reveal', `${sceneSlider.value}%`);
  sceneSlider.setAttribute('aria-valuetext', `เปิดเผยฉากที่สอง ${sceneSlider.value}%`);
});

const toast = document.querySelector('.toast');
document.querySelectorAll('.world-choice').forEach(button => button.addEventListener('click', () => goToProject(Number(button.dataset.projectIndex))));
document.querySelectorAll('.easter-trigger').forEach(trigger => {
  let taps = 0;
  let resetTimer;
  trigger.addEventListener('click', () => {
    taps++;
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => { taps = 0; }, 1800);
    trigger.classList.add('is-tapped');
    window.setTimeout(() => trigger.classList.remove('is-tapped'), 350);
    if (taps >= 5) {
      taps = 0;
      toast.textContent = 'ปลดล็อกด่านลับ: ไอเดียดี ๆ เริ่มจากการกดลองทำ ✦';
      toast.classList.add('show', 'secret-toast');
      window.setTimeout(() => {
        toast.classList.remove('show', 'secret-toast');
        toast.textContent = 'คัดลอก Discord แล้ว';
      }, 3500);
    }
  });
});

const ambientToggle = document.querySelector('.ambient-toggle');
const ambientPlayer = document.querySelector('.ambient-player');
const ambientAudio = ambientPlayer.querySelector('audio');
const syncAmbientControl = () => {
  const playing = !ambientAudio.paused && !ambientAudio.ended;
  const expanded = !ambientPlayer.hidden;
  ambientToggle.setAttribute('aria-pressed', String(playing));
  ambientToggle.setAttribute('aria-expanded', String(expanded));
  ambientToggle.setAttribute('aria-label', expanded ? 'ย่อเครื่องเล่นเพลง' : playing ? 'เปิดตัวเล่นเพลง' : 'เปิดเพลงบรรยากาศ');
  ambientToggle.querySelector('i').textContent = expanded ? 'ย่อ' : playing ? 'เล่นอยู่' : 'ปิด';
};
ambientToggle.addEventListener('click', async () => {
  const opening = ambientPlayer.hidden;
  ambientPlayer.hidden = !opening;
  if (opening && ambientAudio.paused) {
    try { await ambientAudio.play(); }
    catch { toast.textContent = 'กดเล่นจากตัวควบคุมเพลงได้เลย'; toast.classList.add('show'); window.setTimeout(() => toast.classList.remove('show'), 2200); }
  }
  syncAmbientControl();
});
ambientPlayer.querySelector('.ambient-collapse').addEventListener('click', () => {
  ambientPlayer.hidden = true;
  syncAmbientControl();
});
['play','pause','ended'].forEach(type => ambientAudio.addEventListener(type, syncAmbientControl));
ambientAudio.addEventListener('error', () => {
  toast.textContent = 'เปิดเพลงไม่สำเร็จ ลองเปิดเพลงจาก Pixabay';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
  syncAmbientControl();
});
document.querySelector('.copy-discord').addEventListener('click', async event => {
  try {
    await navigator.clipboard.writeText(event.currentTarget.dataset.copy);
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 1800);
  } catch {
    toast.textContent = 'Discord: hh12_.3';
    toast.classList.add('show');
    window.setTimeout(() => {
      toast.classList.remove('show');
      toast.textContent = 'คัดลอก Discord แล้ว';
    }, 2200);
  }
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('[data-reveal]').forEach(element => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    nav.querySelectorAll('a').forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-40% 0px -48% 0px' });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

const slides = [...document.querySelectorAll('main .slide-section')];
const slideTrack = document.querySelector('main');
const slideDots = [...document.querySelectorAll('.slide-dot')];
const slideNumber = document.querySelector('.slide-count b');
const slideProgress = document.querySelector('.page-progress i');
let activeSlide = 0;
let slideTicking = false;
let slideTransitionTimer;
let slideSwapTimer;
let pendingSlide = null;

function playSlideTransition(reverse, targetIndex) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const wipe = document.querySelector('.world-wipe');
  const target = slides[targetIndex];
  const accent = getComputedStyle(target).getPropertyValue('--scene-accent').trim();
  wipe.classList.remove('is-running');
  wipe.dataset.direction = reverse ? 'back' : 'forward';
  wipe.style.setProperty('--portal-accent', accent || '#a95bd0');
  wipe.querySelector('.wipe-chapter').textContent = `WORLD SYNC · ${String(targetIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  wipe.querySelector('.wipe-title').textContent = target.dataset.chapter;
  void wipe.offsetWidth;
  wipe.classList.add('is-running');
  window.clearTimeout(slideTransitionTimer);
  slideTransitionTimer = window.setTimeout(() => wipe.classList.remove('is-running'), 1120);
}

function setActiveSlide(index) {
  activeSlide = index;
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
  slideDots.forEach((dot, i) => {
    dot.classList.toggle('is-current', i === index);
    if (i === index) dot.setAttribute('aria-current', 'step');
    else dot.removeAttribute('aria-current');
  });
  slideNumber.textContent = String(index + 1).padStart(2, '0');
  nav.querySelectorAll('a[href^="#"]').forEach(link => link.classList.toggle('active', link.hash === `#${slides[index].id}`));
}

function updateSlidePosition() {
  if (pendingSlide !== null) {
    const targetLeft = pendingSlide * slideTrack.clientWidth;
    if (Math.abs(slideTrack.scrollLeft - targetLeft) > 3) {
      const range = slideTrack.scrollWidth - slideTrack.clientWidth;
      slideProgress.style.width = `${range > 0 ? slideTrack.scrollLeft / range * 100 : 0}%`;
      slideTicking = false;
      return;
    }
    pendingSlide = null;
  }
  const center = window.innerWidth * .48;
  let closest = 0;
  let smallestDistance = Infinity;
  slides.forEach((slide, index) => {
    const box = slide.getBoundingClientRect();
    const distance = box.left <= center && box.right >= center ? 0 : Math.min(Math.abs(box.left - center), Math.abs(box.right - center));
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closest = index;
    }
  });
  setActiveSlide(closest);
  const range = slideTrack.scrollWidth - slideTrack.clientWidth;
  slideProgress.style.width = `${range > 0 ? slideTrack.scrollLeft / range * 100 : 0}%`;
  slideTicking = false;
}

slideTrack.addEventListener('scroll', () => {
  if (!slideTicking) {
    window.requestAnimationFrame(updateSlidePosition);
    slideTicking = true;
  }
}, { passive: true });
window.addEventListener('resize', updateSlidePosition, { passive: true });
function goToSlide(index) {
  const next = Math.max(0, Math.min(slides.length - 1, index));
  if (next === activeSlide || pendingSlide !== null) return;
  const reverse = next < activeSlide;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) playSlideTransition(reverse, next);
  pendingSlide = next;
  setActiveSlide(next);
  window.clearTimeout(slideSwapTimer);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    slideTrack.scrollLeft = next * slideTrack.clientWidth;
    pendingSlide = null;
  } else {
    slideSwapTimer = window.setTimeout(() => {
      slideTrack.classList.add('is-swapping');
      slideTrack.scrollLeft = next * slideTrack.clientWidth;
      requestAnimationFrame(() => slideTrack.classList.remove('is-swapping'));
    }, 590);
  }
  window.setTimeout(() => {
    if (pendingSlide === next) {
      pendingSlide = null;
      updateSlidePosition();
    }
  }, 1300);
}
slideDots.forEach((dot, index) => dot.addEventListener('click', () => goToSlide(index)));
document.querySelectorAll('[data-slide-step]').forEach(button => button.addEventListener('click', () => {
  goToSlide(activeSlide + Number(button.dataset.slideStep));
}));
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const target = document.querySelector(link.hash);
  const index = slides.indexOf(target);
  if (index < 0) return;
  event.preventDefault();
  history.replaceState(null, '', link.hash);
  goToSlide(index);
}));
let wheelLocked = false;
slideTrack.addEventListener('wheel', event => {
  const panel = event.target.closest('.slide-section');
  if (!panel || event.target.closest('#projectSlider')) return;
  const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
  if (horizontal) {
    if (Math.abs(event.deltaX) < 18) return;
    event.preventDefault();
    if (wheelLocked) return;
    wheelLocked = true;
    goToSlide(activeSlide + Math.sign(event.deltaX));
    window.setTimeout(() => { wheelLocked = false; }, 760);
    return;
  }
  const canScrollInside = event.deltaY > 0
    ? panel.scrollTop + panel.clientHeight < panel.scrollHeight - 2
    : panel.scrollTop > 2;
  if (canScrollInside) return;
  event.preventDefault();
  if (wheelLocked || Math.abs(event.deltaY) < 18) return;
  wheelLocked = true;
  goToSlide(activeSlide + Math.sign(event.deltaY));
  window.setTimeout(() => { wheelLocked = false; }, 760);
}, { passive: false });
let touchStart = null;
slideTrack.addEventListener('pointerdown', event => {
  if (event.pointerType !== 'touch' || event.target.closest('button,a,input,#projectSlider')) return;
  touchStart = { x: event.clientX, y: event.clientY };
});
slideTrack.addEventListener('pointerup', event => {
  if (!touchStart) return;
  const dx = event.clientX - touchStart.x;
  const dy = event.clientY - touchStart.y;
  touchStart = null;
  if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) goToSlide(activeSlide + (dx < 0 ? 1 : -1));
});
slideTrack.addEventListener('pointercancel', () => { touchStart = null; });
window.addEventListener('keydown', event => {
  if (event.target.matches('input,textarea,select,[contenteditable="true"]') || dialog.open) return;
  if (event.key === 'ArrowRight') goToSlide(activeSlide + 1);
  if (event.key === 'ArrowLeft') goToSlide(activeSlide - 1);
});
updateSlidePosition();

const projectSlider = document.querySelector('#projectSlider');
const projectDots = [...document.querySelectorAll('.project-dot')];
const projectNumber = document.querySelector('.carousel-count b');
let activeProject = 0;
let projectTicking = false;

function setActiveProject(index) {
  activeProject = index;
  document.querySelectorAll('.world-choice').forEach((choice, i) => choice.classList.toggle('is-selected', i === index));
  projectDots.forEach((dot, i) => {
    dot.classList.toggle('is-current', i === index);
    dot.setAttribute('aria-current', i === index ? 'true' : 'false');
  });
  projectNumber.textContent = String(index + 1).padStart(2, '0');
  projectSlider.setAttribute('aria-label', `ผลงาน สไลด์ที่ ${index + 1} จาก ${projectDots.length}`);
}

function goToProject(index) {
  const next = (index + projectDots.length) % projectDots.length;
  projectSlider.scrollTo({ left: next * projectSlider.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  setActiveProject(next);
}

projectSlider.addEventListener('scroll', () => {
  if (!projectTicking) {
    window.requestAnimationFrame(() => {
      setActiveProject(Math.round(projectSlider.scrollLeft / projectSlider.clientWidth));
      projectTicking = false;
    });
    projectTicking = true;
  }
}, { passive: true });
projectDots.forEach((dot, index) => dot.addEventListener('click', () => goToProject(index)));
document.querySelectorAll('[data-project-step]').forEach(button => button.addEventListener('click', () => goToProject(activeProject + Number(button.dataset.projectStep))));

if (matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', event => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      card.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });
}
