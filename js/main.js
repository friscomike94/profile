// Main JS — Cursor, scroll reveal, interactions

(function() {

  // ── CUSTOM CURSOR ──
  const cur     = document.getElementById('cur');
  const curRing = document.getElementById('cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function lerpRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    curRing.style.left = rx + 'px';
    curRing.style.top  = ry + 'px';
    requestAnimationFrame(lerpRing);
  })();

  // Cursor expand on interactive elements
  document.querySelectorAll('a, button, .work-item, .sk').forEach(el => {
    el.addEventListener('mouseenter', () => {
      curRing.style.width  = '52px';
      curRing.style.height = '52px';
      curRing.style.borderColor = 'rgba(200,255,0,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      curRing.style.width  = '36px';
      curRing.style.height = '36px';
      curRing.style.borderColor = 'rgba(200,255,0,0.4)';
    });
  });

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 90);
      }
    });
  }, { threshold: 0.05 });

  reveals.forEach(el => observer.observe(el));

  // ── SMOOTH NAV LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── LANGUAGE & INVERT TOGGLES ──
  const langs = {
    en: {
      'nav.work': 'Work', 'nav.about': 'About', 'nav.skills': 'Skills',
      'nav.contact': 'Contact', 'nav.hire': 'Hire me',
      'hero.overline': 'Available for work · 2025',
      'hero.h1.makes': 'MAKES', 'hero.h1.moves': 'MOVES.',
      'hero.sub': '<strong>Aesthetic boundaries exist to be pushed.</strong><br/>UI/UX · Motion · Brand Identity — designed at the intersection of raw energy and functional precision.',
      'hero.cta.work': 'See my work →', 'hero.cta.talk': "Let's talk",
      'stat.projects': 'Projects shipped', 'stat.disciplines': 'Disciplines', 'stat.boundaries': 'Boundaries left',
      'hero.scroll': 'Scroll',
      'ticker.uiux': 'UI/UX Design', 'ticker.motion': 'Motion & Animation', 'ticker.brand': 'Brand Identity',
      'ticker.interaction': 'Interaction Design', 'ticker.visual': 'Visual Systems', 'ticker.academy': 'Academy of Art · SF',
      'works.label': 'Selected Work', 'works.h': 'WHAT<br/>I BUILT.', 'works.seeall': 'All projects →',
      'work.01.title': 'Fresco — Smart Fridge App',
      'work.01.desc': 'IoT-connected mobile app that tracks fridge freshness in real time and reduces household food waste through timely consumption nudges.',
      'work.02.title': 'ironleg — Bike Mechanic App',
      'work.02.desc': 'Connects motorcycle owners with individual and in-shop mechanics. Transparent pricing, real availability, booked in a few taps.',
      'work.03.title': 'ABI — Mood Music AI',
      'work.03.desc': "AI-powered music app that reads the user's mood and curates a soundtrack to match — no search, no scrolling, just feel.",
      'work.04.title': 'bitbird — San Holo Game',
      'work.04.desc': "Freemium mobile game built around San Holo's music and sound design. Gameplay reacts to the music like a live DJ set.",
      'work.05.title': 'Liger — Custom Typeface',
      'work.05.desc': 'Full typeface design with complete glyph set and international character support. Built from first principles, set in its own voice.',
      'about.label': 'About Mike', 'about.h': 'DESIGN<br/>IS A<br/>STANCE.',
      'about.body1': "I'm a <strong>multidisciplinary designer</strong> from San Francisco with a relentless obsession for work that hits different. Not decoration. Not polish. A <strong>point of view</strong> — expressed through interface, motion, and identity.",
      'about.body2': 'I push aesthetic boundaries while keeping every pixel accountable to function. The work should feel <strong>inevitable</strong> the moment someone sees it.',
      'about.edu.label': 'Education',
      'about.edu.content': 'BFA · Web Design & New Media<br/>Academy of Art University, San Francisco',
      'disc.01.desc': 'Research to pixel-perfect. Systems that scale, interactions that feel like breathing.',
      'disc.02.desc': 'Animation as narrative. UI motion that communicates intent without screaming.',
      'disc.03.desc': 'Visual language that outlasts trends. Built to own a space no other brand can touch.',
      'skills.label': 'Toolkit', 'skills.h': 'TOOLS<br/>OF THE<br/>CRAFT.',
      'skills.intro': "Sharp tools, sharper eye. Here's what I use to turn ideas into things that hit.",
      'contact.label': "Let's build something",
      'contact.line1': 'GOT A', 'contact.line2': 'WILD', 'contact.line3': 'IDEA?',
      'contact.meta': "Open to freelance, full-time, and anything that sounds like a challenge. Let's make it real.",
      'contact.email': 'Email me →',
      'footer.copy': '© 2025 Mike — All rights reserved',
      'footer.work': 'Work', 'footer.about': 'About', 'footer.skills': 'Skills', 'footer.contact': 'Contact',
    },
    ko: {
      'nav.work': '작업', 'nav.about': '소개', 'nav.skills': '스킬',
      'nav.contact': '연락', 'nav.hire': '고용하기',
      'hero.overline': '작업 가능 · 2025',
      'hero.h1.makes': '만든다', 'hero.h1.moves': '무브스.',
      'hero.sub': '<strong>미적 경계는 넘기 위해 존재한다.</strong><br/>UI/UX · 모션 · 브랜드 아이덴티티 — 강렬한 에너지와 기능적 정밀함의 교차점에서 디자인.',
      'hero.cta.work': '작업 보기 →', 'hero.cta.talk': '대화하기',
      'stat.projects': '완성 프로젝트', 'stat.disciplines': '분야', 'stat.boundaries': '남은 경계',
      'hero.scroll': '스크롤',
      'ticker.uiux': 'UI/UX 디자인', 'ticker.motion': '모션 & 애니메이션', 'ticker.brand': '브랜드 아이덴티티',
      'ticker.interaction': '인터랙션 디자인', 'ticker.visual': '비주얼 시스템', 'ticker.academy': '아카데미 오브 아트 · SF',
      'works.label': '선정 작업', 'works.h': '내가<br/>만든 것.', 'works.seeall': '전체 프로젝트 →',
      'work.01.title': '프레스코 — 스마트 냉장고 앱',
      'work.01.desc': 'IoT 연동 앱으로 냉장고 신선도를 실시간 추적, 제때 소비를 통해 음식물 쓰레기를 줄입니다.',
      'work.02.title': '아이언레그 — 바이크 정비 앱',
      'work.02.desc': '오토바이 오너와 개인/샵 정비사를 연결. 명확한 가격, 실시간 가용성, 몇 번의 탭으로 예약.',
      'work.03.title': 'ABI — 무드 뮤직 AI',
      'work.03.desc': '사용자의 감정을 읽어 그에 맞는 음악을 큐레이션하는 AI 음악 앱 — 검색도 스크롤도 필요 없이.',
      'work.04.title': '비트버드 — 산 홀로 게임',
      'work.04.desc': '산 홀로의 음악과 사운드 디자인을 기반으로 한 프리미엄 모바일 게임. 라이브 DJ 세트처럼 음악에 반응하는 게임플레이.',
      'work.05.title': '라이거 — 커스텀 서체',
      'work.05.desc': '완전한 글리프 세트와 국제 문자 지원을 갖춘 풀 서체 디자인. 처음부터 설계된 고유한 목소리.',
      'about.label': '마이크 소개', 'about.h': '디자인은<br/>태도다.',
      'about.body1': '저는 샌프란시스코 출신의 <strong>멀티디시플리너리 디자이너</strong>로, 남다른 작업에 대한 끊임없는 집착을 갖고 있습니다. 장식이 아닙니다. 폴리시가 아닙니다. <strong>관점</strong> — 인터페이스, 모션, 아이덴티티를 통해 표현합니다.',
      'about.body2': '모든 픽셀이 기능에 책임을 지면서 미적 경계를 밀어붙입니다. 작업은 누군가 처음 볼 때 <strong>필연적으로</strong> 느껴져야 합니다.',
      'about.edu.label': '학력',
      'about.edu.content': 'BFA · 웹 디자인 & 뉴 미디어<br/>아카데미 오브 아트 유니버시티, 샌프란시스코',
      'disc.01.desc': '리서치부터 픽셀 퍼펙트까지. 확장 가능한 시스템, 숨쉬는 듯한 인터랙션.',
      'disc.02.desc': '애니메이션은 내러티브다. 소리치지 않고 의도를 전달하는 UI 모션.',
      'disc.03.desc': '트렌드를 넘어서는 비주얼 언어. 다른 브랜드가 범접할 수 없는 영역을 점령하다.',
      'skills.label': '툴킷', 'skills.h': '크래프트의<br/>도구.',
      'skills.intro': '날카로운 도구, 더 날카로운 눈. 아이디어를 임팩트 있는 것으로 만들기 위해 사용하는 것들.',
      'contact.label': '함께 만들자',
      'contact.line1': '거친', 'contact.line2': '아이디어', 'contact.line3': '있나요?',
      'contact.meta': '프리랜서, 정규직, 도전적으로 들리는 모든 것에 열려 있습니다. 함께 현실로 만들어봐요.',
      'contact.email': '이메일 →',
      'footer.copy': '© 2025 마이크 — 모든 권리 보유',
      'footer.work': '작업', 'footer.about': '소개', 'footer.skills': '스킬', 'footer.contact': '연락',
    }
  };

  let currentLang = 'en';

  function applyLang(lang) {
    currentLang = lang;
    document.body.classList.toggle('ko', lang === 'ko');
    document.getElementById('lang-toggle').textContent = lang === 'en' ? '한국어' : 'English';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = langs[lang][el.getAttribute('data-i18n')];
      if (!val) return;
      if (val.includes('<')) el.innerHTML = val;
      else el.textContent = val;
    });
  }

  document.getElementById('lang-toggle').addEventListener('click', () => applyLang(currentLang === 'en' ? 'ko' : 'en'));
  document.getElementById('invert-toggle').addEventListener('click', () => document.body.classList.toggle('inverted'));

})();
