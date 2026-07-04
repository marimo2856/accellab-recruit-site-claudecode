/* =========================================================
   ACCEL LAB RECRUIT — Interactions
   ========================================================= */
(function () {
  'use strict';

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header scroll state ---------- */
  const header = $('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const burger = $('.burger');
  if (burger) {
    burger.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
    });
    $$('.mnav a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('nav-open')));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          // bar fills
          $$('.bar-fill', e.target).forEach(b => { if (b.dataset.w) b.style.width = b.dataset.w; });
          // count up
          if (e.target.dataset.count !== undefined) animateCount(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
    $$('.bar-fill').forEach(b => { if (b.dataset.w) b.style.width = b.dataset.w; });
  }

  /* ---------- Count up ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const dur = 1400, t0 = performance.now();
    const suffix = el.dataset.suffix || '';
    const isFloat = String(target).includes('.');
    function step(now) {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.firstChild ? null : 0;
      el.querySelector('.cval').textContent = isFloat ? val.toFixed(1) : Math.round(val).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    if (el.querySelector('.cval')) requestAnimationFrame(step);
  }

  /* ---------- FAQ accordion ---------- */
  $$('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const ans = $('.faq-a', item);
      const open = item.classList.contains('open');
      if (open) {
        item.classList.remove('open');
        ans.style.maxHeight = null;
      } else {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Member tabs ---------- */
  const tabs = $$('.tab');
  if (tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.cat;
        $$('.member-card').forEach(card => {
          const show = cat === 'all' || card.dataset.cat === cat;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Member modal ---------- */
  const modal = $('#member-modal');
  if (modal) {
    $$('.member-card').forEach(card => {
      card.addEventListener('click', () => {
        $('#mm-hero').style.background = card.dataset.color || 'linear-gradient(135deg,#00689E,#00A6D6)';
        $('#mm-hero').textContent = card.dataset.initial || '';
        $('#mm-role').textContent = card.dataset.role || '';
        $('#mm-name').textContent = card.dataset.name || '';
        $('#mm-body').innerHTML = card.dataset.bio || '';
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    const closeModal = () => { modal.classList.remove('open'); document.body.style.overflow = ''; };
    $('.modal .backdrop', modal).addEventListener('click', closeModal);
    $('.modal .close', modal).addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  /* ---------- Mobile fixed CTA visibility ---------- */
  const mCta = $('.mobile-cta');
  if (mCta) {
    const heroEl = $('.hero') || $('.page-hero');
    const footEl = $('.site-footer');
    const toggleCta = () => {
      const y = window.scrollY;
      const pastHero = heroEl ? y > heroEl.offsetHeight - 200 : y > 300;
      const nearFoot = footEl ? y + window.innerHeight > footEl.offsetTop + 120 : false;
      mCta.classList.toggle('show', pastHero && !nearFoot);
    };
    window.addEventListener('scroll', toggleCta, { passive: true });
    toggleCta();
  }

  /* ---------- Hero canvas: IoT node network ---------- */
  const canvas = $('#hero-canvas');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    let w, h, dpr, nodes = [], raf;
    const CY = '0,166,214';

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.floor(w * h / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8,
        pulse: Math.random() * Math.PI * 2
      }));
    }

    const mouse = { x: -9999, y: -9999 };
    canvas.addEventListener('pointermove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('pointerleave', () => { mouse.x = -9999; mouse.y = -9999; });

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const maxDist = Math.min(160, w / 7);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy; n.pulse += 0.02;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        // mouse attraction
        const mdx = mouse.x - n.x, mdy = mouse.y - n.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 140) { n.x += mdx * 0.008; n.y += mdy * 0.008; }
        // links
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < maxDist) {
            const a = (1 - d / maxDist) * 0.5;
            ctx.strokeStyle = `rgba(${CY},${a})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        const glow = 0.5 + Math.sin(n.pulse) * 0.3;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CY},${0.12 * glow})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,220,255,${0.7 * glow})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 200); });
    // pause when hero off-screen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { if (!raf) draw(); }
        else { cancelAnimationFrame(raf); raf = null; }
      }, { threshold: 0 }).observe(canvas);
    }
  }

  /* ---------- Year ---------- */
  $$('.js-year').forEach(el => { el.textContent = String(new Date().getFullYear()); });
})();
