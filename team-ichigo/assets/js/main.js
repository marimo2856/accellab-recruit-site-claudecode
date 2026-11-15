/**
 * Team ICHIGO — main.js
 * Minimal Vanilla JS. Only what the design needs.
 * - Mobile navigation drawer (safe: close on item click, Escape, outside click)
 * - Subtle in-view reveal (respects reduced-motion)
 * - Smooth-hide sticky CTA when footer visible
 */
(function () {
  'use strict';

  /* ---- Loader：window.load で消す（登場アニメーションが見えるよう最低 1000ms 表示） ---- */
  (function () {
    var loader = document.getElementById('loader');
    if (!loader) return;
    var start = Date.now();
    var hide = function () {
      var elapsed = Date.now() - start;
      var wait = Math.max(0, 1000 - elapsed);
      setTimeout(function () { loader.classList.add('is-done'); }, wait);
    };
    if (document.readyState === 'complete') hide();
    else window.addEventListener('load', hide);
  })();

  /* ---- Mobile nav drawer ---- */
  var toggle = document.querySelector('.nav-toggle');
  var drawer = document.getElementById('nav-drawer');

  function closeDrawer() {
    if (!drawer || !toggle) return;
    drawer.setAttribute('data-open', 'false');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'メニューを開く');
    document.body.style.overflow = '';
  }
  function openDrawer() {
    if (!drawer || !toggle) return;
    drawer.setAttribute('data-open', 'true');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'メニューを閉じる');
    document.body.style.overflow = 'hidden';
  }

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = drawer.getAttribute('data-open') === 'true';
      if (open) closeDrawer(); else openDrawer();
    });
    // Close when a link inside drawer is clicked
    drawer.addEventListener('click', function (e) {
      if (e.target && e.target.tagName === 'A') closeDrawer();
    });
    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.getAttribute('data-open') === 'true') closeDrawer();
    });
    // Close on outside click (clicking outside drawer and toggle when open)
    document.addEventListener('click', function (e) {
      if (drawer.getAttribute('data-open') !== 'true') return;
      if (drawer.contains(e.target) || toggle.contains(e.target)) return;
      closeDrawer();
    });
    // Close when crossing to desktop breakpoint
    var mq = window.matchMedia('(min-width:960px)');
    if (mq && mq.addEventListener) {
      mq.addEventListener('change', function (ev) { if (ev.matches) closeDrawer(); });
    } else if (mq && mq.addListener) {
      mq.addListener(function (ev) { if (ev.matches) closeDrawer(); });
    }
  }

  /* ---- Subtle in-view reveal (respects reduced-motion) ---- */
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    var revealTargets = document.querySelectorAll('.reveal');
    if (revealTargets.length) {
      var reveal = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            reveal.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealTargets.forEach(function (el) { reveal.observe(el); });
    }
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- Set aria-current on active nav link based on URL ---- */
  (function () {
    var path = location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav a, .nav-drawer a, .footer__links a').forEach(function (a) {
      try {
        var href = a.getAttribute('href') || '';
        if (!href || href.startsWith('http') || href.startsWith('#')) return;
        var normalized = href.replace(/\/$/, '') || '/';
        if (normalized === path) a.setAttribute('aria-current', 'page');
      } catch (_) {}
    });
  })();

  /* ---- Method pin-scroll：文章にあわせて写真を切替（PC/SP対応） ---- */
  (function () {
    var steps = document.querySelectorAll('.method-pin__step');
    var photos = document.querySelectorAll('.method-pin__photo');
    if (!steps.length || !photos.length || !('IntersectionObserver' in window)) return;
    photos[0].classList.add('is-active');
    var mqSP = window.matchMedia('(max-width:899px)');
    var pinObserver = null;
    function build() {
      if (pinObserver) pinObserver.disconnect();
      // SPは写真が上端stickyのため、アクティブ帯を画面下寄せに
      var rm = mqSP.matches ? '-55% 0px -25% 0px' : '-35% 0px -45% 0px';
      pinObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var step = entry.target.getAttribute('data-step');
            photos.forEach(function (p) { p.classList.remove('is-active'); });
            var active = document.querySelector('.method-pin__photo[data-step="' + step + '"]');
            if (active) active.classList.add('is-active');
          }
        });
      }, { rootMargin: rm, threshold: 0 });
      steps.forEach(function (s) { pinObserver.observe(s); });
    }
    build();
    if (mqSP.addEventListener) mqSP.addEventListener('change', build);
    else if (mqSP.addListener) mqSP.addListener(build);
  })();

  /* ---- Sticky CTA：FV（ページ先頭の見出し）を過ぎたら表示・フッター付近では隠す ---- */
  var sticky = document.querySelector('.sticky-cta');
  var footer = document.querySelector('.footer');
  var heroEl = document.querySelector('.hero, .page-hero');
  if (sticky && 'IntersectionObserver' in window) {
    var pastHero = !heroEl;
    var nearFooter = false;
    var applySticky = function () {
      var show = pastHero && !nearFooter;
      sticky.style.transform = show ? 'translateY(0)' : 'translateY(120%)';
      sticky.style.pointerEvents = show ? '' : 'none';
    };
    sticky.style.transition = 'transform .3s ease';
    applySticky();
    if (heroEl) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { pastHero = !entry.isIntersecting; });
        applySticky();
      }, { threshold: 0 }).observe(heroEl);
    }
    if (footer) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { nearFooter = entry.isIntersecting; });
        applySticky();
      }, { rootMargin: '-40px 0px 0px 0px' }).observe(footer);
    }
  }
})();

/* ---- NEWS カテゴリー絞り込み（リンク先が "#" のチップだけ。WP版は実リンクなので対象外） ---- */
(function () {
  var nav = document.querySelector('.cat-chips');
  var list = document.querySelector('.news-list');
  if (!nav || !list) return;
  var chips = nav.querySelectorAll('a[href="#"]');
  if (!chips.length) return;
  var items = list.querySelectorAll('.news-item');
  var empty = document.createElement('p');
  empty.className = 'text-center mt-lg muted';
  empty.style.fontSize = '13px';
  empty.textContent = 'このカテゴリーの記事は、まだありません。';
  empty.style.display = 'none';
  list.parentNode.insertBefore(empty, list.nextSibling);
  chips.forEach(function (chip, i) {
    chip.addEventListener('click', function (e) {
      e.preventDefault();
      chips.forEach(function (c) { c.removeAttribute('aria-current'); });
      chip.setAttribute('aria-current', 'true');
      var name = chip.textContent.trim();
      var shown = 0;
      items.forEach(function (item) {
        var cat = item.querySelector('.news-item__cat');
        var match = i === 0 || (cat && cat.textContent.trim() === name);
        item.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      empty.style.display = shown > 0 ? 'none' : '';
    });
  });
})();
