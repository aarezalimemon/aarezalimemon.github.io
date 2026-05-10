/* =====================================================
   AAREZ ALI MEMON — script.js
   =====================================================
   TABLE OF CONTENTS
   1.  Articles data        ← ADD YOUR ARTICLES HERE
   2.  Theme toggle
   3.  Custom cursor
   4.  Scroll progress + reveal
   5.  Magnetic buttons
   6.  Page navigation
   7.  Article rendering
   8.  Init
===================================================== */


/* =====================================================
   1. ARTICLES DATA
   =====================================================
   To add a new article, copy the template below and
   paste it into the ARTICLES array. The article will
   automatically appear in the home preview, blog index,
   and be readable as a full page.

   TEMPLATE:
   ─────────────────────────────────────────────────
   {
     id:      "your-unique-slug",          // used in URL-like navigation — no spaces
     title:   "Your Article Title",
     date:    "Mar 2025",
     tags:    ["Tag1", "Tag2"],            // used for filtering on blog page
     summary: "One sentence for the list.",
     content: `
       <p>Your opening paragraph.</p>

       <h2>A section heading</h2>
       <p>More content here.</p>

       <ul>
         <li>A bullet point</li>
         <li>Another point</li>
       </ul>

       <blockquote><p>A pull quote or key insight.</p></blockquote>

       <div class="callout"><p>A highlighted note or tip.</p></div>

       <h2>Another section</h2>
       <p>Keep writing...</p>
     `
   },
   ─────────────────────────────────────────────────
===================================================== */

const ARTICLES = [

  {
    id:      "ERM",
    title:   "Am I Artificially Intelligent?",
    date:    "04/05/2023",
    tags:    ["BehaviouralEconomics", "ArtificialIntelligence", "ResearchDesign"],
    summary: "A field experiment testing whether AI usage has a causal effect on human creativity, using the Torrance Test of Creative Thinking and an ordered logistic regression to estimate the treatment effect.",
    content: `
<p style="text-align: justify;">Does AI usage have a measurable effect on human creativity? This piece proposes a field experiment to test that question by utilising the Torrance Test of Creative Thinking to capture creative output across two randomly assigned groups, one with access to ChatGPT and one without. The treatment effect is estimated via an ordered logistic regression in Stata, with the experimental design carefully constructed to minimise selection bias and confounding variables.</p>

<p style="text-align: justify;">The question at the heart of this piece is deceptively simple: Does using AI make you more or less creative? To answer it rigorously, I designed a field experiment around a randomised control trial. Volunteers from the University of Leeds were randomly assigned to two rooms: a control group working unaided and a treatment group with access to ChatGPT. Both groups were given the Torrance Test of Creative Thinking (TTCT), currently the most widely used psychometric tool for measuring creative ability, and their outputs were scored by a panel of five judges on a five-point creativity scale.</p>

<p style="text-align: justify;">The rationale draws on Bieser's (2022) framework of the "Five Skills of Disruptive Innovators" — Associating, Questioning, Networking, and Experimenting (AQNE) — and the ongoing debate over whether AI can genuinely augment these skills or quietly erode them through overreliance. The experiment was designed to isolate AI usage as a binary treatment variable, with creativity as the dependent variable, estimated through an ordered logistic regression in Stata. In the case where a sample output shows a positive coefficient on AI usage, with a p-value exceeding 0.05 - meaning the result fell short of statistical significance - it could point to the need for a larger, more powered study to draw firm conclusions.</p>
    `},

   {
    id:      "DISS",
    title:   "Exploring Skill-Based Matchmaking in First-Person Shooters",
    date:    "15/07/2025",
    tags:    ["BehaviouralEconomics", "GameDesign", "PlayerRetention"],
    summary: "A behavioural experiment using Krunker.io to test whether skill-based matchmaking improves player enjoyment, finding that psychological factors like effort and frustration matter far more than matchmaking logic itself.",
    content: `
<p style="text-align: justify;">Skill-based matchmaking promises fairer competition, but does it actually keep players engaged over time? This piece examines whether the precision of modern SBMM systems in first-person shooters improves long-run player retention, or whether removing the natural variance of unbalanced lobbies inadvertently accelerates churn by stripping the game of its highs and lows.</p>

<p style="text-align: justify;"> A paper I wrote investigates one of the hottest debated mechanics in modern competitive gaming: does skill-based matchmaking actually make games more enjoyable? To find out, I ran a behavioural field experiment using the browser-based FPS Krunker.io, comparing a control group placed into random lobbies against a treatment group exposed to skill-balanced matchmaking. Rather than relying on self-reported preferences, the study measured enjoyment directly through structured post-match evaluation, allowing for a cleaner test of whether matchmaking logic translates into a meaningfully better experience.</p>

   <p style="text-align: justify;">The findings are striking precisely because they cut against the loudest voices in the community debate. SBMM, as it turns out, has no direct statistically significant effect on fun. This holds regardless of a player's skill level or appetite for risk. What actually drives enjoyment is psychological: how much effort a player felt they exerted, and how much frustration they experienced during the match. Perceived engagement and emotional response matter far more than whether the lobby was algorithmically balanced. The implication for game developers is a meaningful one; rather than endlessly refining matchmaking parameters, the bigger lever may be designing systems that actively manage the emotional arc of a session, reducing frustration and rewarding effort, regardless of the final scoreline.</p>
    `},
];


/* =====================================================
   2. THEME TOGGLE
===================================================== */

function toggleTheme() {
  const html = document.documentElement;
  const btn  = document.getElementById('theme-btn');
  const dark = html.dataset.theme === 'dark';

  html.dataset.theme  = dark ? 'light' : 'dark';
  btn.textContent     = dark ? '☀' : '☾';
  localStorage.setItem('aampp-theme', html.dataset.theme);
}

// restore saved theme on load
(function restoreTheme() {
  const saved = localStorage.getItem('aampp-theme');
  if (!saved) return;
  document.documentElement.dataset.theme = saved;
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = saved === 'dark' ? '☾' : '☀';
})();


/* =====================================================
   3. CUSTOM CURSOR
===================================================== */

const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// dot follows mouse instantly
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// ring lags behind with lerp
(function animateRing() {
  ringX += (mouseX - ringX) * 0.11;
  ringY += (mouseY - ringY) * 0.11;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

// expand ring on interactive elements
document.querySelectorAll('a, button, .project-card, .article-row, .interest-tag, .skill-pill, .contact-link').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// shrink dot on click
document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));


/* =====================================================
   4. SCROLL PROGRESS + REVEAL
===================================================== */

const progressBar = document.getElementById('progress');

function handleScroll() {
  // progress bar
  const doc = document.documentElement;
  const pct = doc.scrollTop / (doc.scrollHeight - doc.clientHeight) * 100;
  progressBar.style.width = pct + '%';

  // reveal elements as they enter the viewport
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', handleScroll, { passive: true });
setTimeout(handleScroll, 80); // run once on load


/* =====================================================
   5. MAGNETIC BUTTONS
   Buttons physically pull toward the cursor on hover.
===================================================== */

document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.18;
    const y = (e.clientY - r.top  - r.height / 2) * 0.22;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});


/* =====================================================
   6. PAGE NAVIGATION
   Shows/hides .page divs instead of loading new files.
===================================================== */

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  window.scrollTo(0, 0);

  if (pageId === 'blog') renderBlogList(ARTICLES);
  setTimeout(handleScroll, 100); // re-run reveals after page switch
}

function smoothScroll(sectionId) {
  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 60);
}


/* =====================================================
   7. ARTICLE RENDERING
===================================================== */

// builds a single article row for list views
function buildArticleRow(article) {
  return `
    <div class="article-row" onclick="openArticle('${article.id}')">
      <div class="article-date">${article.date.replace(' ', '<br>')}</div>
      <div class="article-content">
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
        <div class="article-tags">
          ${article.tags.map(t => `<span class="article-tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="article-arrow">↗</div>
    </div>
  `;
}

// home page: shows 3 most recent articles
function renderHomePreview() {
  const el = document.getElementById('home-article-list');
  if (el) el.innerHTML = ARTICLES.slice(0, 3).map(buildArticleRow).join('');
}

// blog page: shows all articles, filtered by tag
let activeFilter = 'all';

function renderBlogList(articles) {
  const el = document.getElementById('blog-article-list');
  if (!el) return;

  const filtered = activeFilter === 'all'
    ? articles
    : articles.filter(a => a.tags.includes(activeFilter));

  el.innerHTML = filtered.length
    ? filtered.map(buildArticleRow).join('')
    : `<p style="padding:3rem 0; color:var(--ink-soft); font-size:14px;">No articles in this category yet.</p>`;
}

function filterArticles(tag, btn) {
  activeFilter = tag;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderBlogList(ARTICLES);
}

// open a single article reader page
function openArticle(id) {
  const article = ARTICLES.find(a => a.id === id);
  if (!article) return;

  document.getElementById('art-title').textContent = article.title;
  document.getElementById('art-date').textContent  = article.date;
  document.getElementById('art-tags').innerHTML    = article.tags.map(t => `<span class="article-tag">${t}</span>`).join('');
  document.getElementById('art-prose').innerHTML   = article.content;

  showPage('article');
}


/* =====================================================
   8. INIT
===================================================== */

renderHomePreview();


/* =====================================================
   9. TYPEWRITER EFFECT
   Cycles through words in the hero section.
   To change the words, edit the WORDS array below.
===================================================== */

const WORDS = [
  'a Builder.',   
  'an Economist.',
  'a Tech Enthusiast.',
  'a Friend.',
];

(function typewriter() {
  const el     = document.getElementById('typewriter-word');
  if (!el) return;

  let wordIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  const TYPE_SPEED   = 80;
  const DELETE_SPEED = 45;
  const PAUSE_END    = 1800; // ms to wait at end of word
  const PAUSE_START  = 300;  // ms to wait before typing next word

  function tick() {
    const word    = WORDS[wordIdx];
    const current = word.slice(0, charIdx);
    el.textContent = current;

    if (!deleting) {
      if (charIdx < word.length) {
        charIdx++;
        setTimeout(tick, TYPE_SPEED);
      } else {
        // finished typing — pause then start deleting
        setTimeout(() => { deleting = true; tick(); }, PAUSE_END);
      }
    } else {
      if (charIdx > 0) {
        charIdx--;
        setTimeout(tick, DELETE_SPEED);
      } else {
        // finished deleting — move to next word
        deleting = false;
        wordIdx  = (wordIdx + 1) % WORDS.length;
        setTimeout(tick, PAUSE_START);
      }
    }
  }

  tick();
})();
