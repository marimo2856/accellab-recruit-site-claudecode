/**
 * Team ICHIGO — render.js
 * /assets/data/site-data.js の内容を、各ページの [data-render] 要素へ描画します。
 * 更新作業は site-data.js だけで完結します（このファイルは編集不要）。
 */
(function () {
  'use strict';
  var D = window.TEAM_ICHIGO_DATA;
  if (!D) return;

  var DAY_ORDER = ['月', '火', '水', '木', '金', '土', '日'];
  var DAY_EN = { '月': 'MON', '火': 'TUE', '水': 'WED', '木': 'THU', '金': 'FRI', '土': 'SAT', '日': 'SUN' };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function venueById(id) {
    for (var i = 0; i < D.venues.length; i++) if (D.venues[i].id === id) return D.venues[i];
    return null;
  }
  function classById(id) {
    for (var i = 0; i < D.classes.length; i++) if (D.classes[i].id === id) return D.classes[i];
    return null;
  }
  function venueLabel(s) {
    if (s.venueText) return s.venueText;
    var v = venueById(s.venue);
    return v ? v.name : '';
  }
  function fmtDate(d) { return String(d).replace(/-/g, '.'); }
  function mapEmbed(q) { return 'https://maps.google.com/maps?q=' + encodeURIComponent(q) + '&z=15&output=embed'; }
  function mapLink(q) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q); }
  function isExternal(u) { return /^https?:\/\//.test(u); }
  function linkAttrs(u) { return isExternal(u) ? ' target="_blank" rel="noopener noreferrer"' : ''; }
  function imgStyle(pos) { return pos ? ' style="object-position:' + esc(pos) + '"' : ''; }

  function scheduleDl(c) {
    var days = c.schedule.map(function (s) { return s.day; }).join('・');
    var rows = c.schedule.map(function (s) {
      return '<li><b>' + esc(s.day) + '</b> ' + esc(s.time) + '<span>' + esc(venueLabel(s)) + '</span></li>';
    }).join('');
    return '<div><dt>対象</dt><dd>' + esc(c.target) + '</dd></div>' +
      '<div><dt>曜日</dt><dd>' + esc(days) + '曜日</dd></div>' +
      '<div><dt>日時・会場</dt><dd><ul class="sched-mini">' + rows + '</ul></dd></div>';
  }
  function priceHtml(c, cls) {
    return c.courses.map(function (p) {
      return '<div class="' + cls + '"><span class="price-course">' + esc(p.name) + '</span><strong>' + esc(p.price) + '</strong><small>' + esc(p.unit) + '</small></div>';
    }).join('');
  }

  var R = {};

  /* トップ：クラスカード */
  R['class-cards'] = function (el) {
    el.innerHTML = D.classes.map(function (c) {
      var p = c.courses[0];
      return '<a href="' + esc(c.url) + '" class="class-impact__item">' +
        '<div class="class-impact__photo"><img src="' + esc(c.photo) + '" alt="' + esc(c.name) + 'の練習風景" loading="lazy"' + imgStyle(c.photoPos) + ' /></div>' +
        '<p class="class-impact__target">' + esc(c.target) + '</p>' +
        '<h3 class="class-impact__name">' + esc(c.name) + '</h3>' +
        '<p class="class-impact__sched">' + c.schedule.map(function (s) { return esc(s.day); }).join('・') + '曜日 ／ ' + esc(p.name) + ' 月額' + esc(p.price) + '円</p>' +
        '<p class="class-impact__desc">' + esc(c.summary) + '</p>' +
        '</a>';
    }).join('');
  };

  /* クラス・料金ページ：交互レイアウト */
  R['class-features'] = function (el) {
    el.innerHTML = D.classes.map(function (c, i) {
      return '<article class="class-feature' + (i % 2 ? ' class-feature--reverse' : '') + ' reveal is-in" id="' + esc(c.id) + '">' +
        '<div class="class-feature__photo"><img src="' + esc(c.photo) + '" alt="' + esc(c.name) + 'の練習風景" loading="lazy"' + imgStyle(c.photoPos) + ' /><span class="class-feature__photo-label">' + esc(c.label) + '</span></div>' +
        '<div class="class-feature__text">' +
        '<h3 class="class-feature__name">' + esc(c.name) + '</h3>' +
        '<p class="class-feature__desc">' + esc(c.summary) + '</p>' +
        (c.scheduleLead ? '<p class="class-feature__note">' + esc(c.scheduleLead) + '</p>' : '') +
        '<dl class="class-feature__meta">' + scheduleDl(c) + '</dl>' +
        priceHtml(c, 'class-feature__price') +
        '<p class="class-feature__more"><a href="' + esc(c.url) + '">' + esc(c.name) + 'の詳細 →</a></p>' +
        '</div></article>';
    }).join('');
  };

  /* 各クラスページ：料金カード */
  R['class-card'] = function (el) {
    var c = classById(el.getAttribute('data-class'));
    if (!c) return;
    el.innerHTML = '<article class="class-card" style="max-width:640px;margin:0 auto;width:100%">' +
      '<p class="class-card__label">' + esc(c.label) + '</p>' +
      '<h3 class="class-card__name">' + esc(c.name) + '</h3>' +
      (c.scheduleLead ? '<p class="class-feature__note">' + esc(c.scheduleLead) + '</p>' : '') +
      '<dl class="class-card__meta">' + scheduleDl(c) + '</dl>' +
      priceHtml(c, 'class-card__price') +
      '</article>';
  };

  /* 入会金・年会費 */
  R['fees'] = function (el) {
    el.innerHTML = '<div class="common-fee">' +
      '<div class="common-fee__label">入会金・年会費<small>（月会費とは別にかかる費用）</small></div>' +
      '<dl class="common-fee__list">' + D.fees.joining.map(function (f) {
        return '<div><dt>' + esc(f.label) + '</dt><dd><strong>' + esc(f.price) + '</strong>' + (f.note ? '<span>' + esc(f.note) + '</span>' : '') + '</dd></div>';
      }).join('') + '</dl>' +
      '<p class="common-fee__note">' + esc(D.fees.taxNote) + '</p></div>';
  };

  /* 料金一覧表（月会費） */
  R['fee-table'] = function (el) {
    var rows = [];
    D.classes.forEach(function (c) {
      c.courses.forEach(function (p) {
        rows.push('<tr><th scope="row"><a href="' + esc(c.url) + '">' + esc(c.name) + '</a><small>' + esc(c.target) + '</small></th><td>' + esc(p.name) + '</td><td class="num">' + esc(p.price) + '円</td></tr>');
      });
    });
    el.innerHTML = '<table class="fee-table"><caption>月会費（税込）</caption><thead><tr><th scope="col">クラス</th><th scope="col">コース</th><th scope="col">月額</th></tr></thead><tbody>' + rows.join('') + '</tbody></table>';
  };

  /* 週間スケジュール */
  R['schedule'] = function (el) {
    var items = [];
    D.classes.forEach(function (c) {
      c.schedule.forEach(function (s) { items.push({ c: c, s: s }); });
    });
    var html = DAY_ORDER.map(function (day) {
      var list = items.filter(function (x) { return x.s.day === day; });
      if (!list.length) return '';
      return '<div class="week__day"><p class="week__label"><span>' + DAY_EN[day] + '</span>' + day + '曜日</p><ul>' + list.map(function (x) {
        return '<li><span class="week__time">' + esc(x.s.time) + '</span><a href="' + esc(x.c.url) + '" class="week__class">' + esc(x.c.name) + '</a><span class="week__venue">' + esc(venueLabel(x.s)) + '</span></li>';
      }).join('') + '</ul></div>';
    }).join('');
    el.innerHTML = '<div class="week">' + html + '</div>';
  };

  /* 活動場所（地図つき） */
  R['venues'] = function (el) {
    var withMap = el.getAttribute('data-map') === 'true';
    el.innerHTML = D.venues.map(function (v) {
      return '<article class="venue venue--full" id="venue-' + esc(v.id) + '">' +
        (withMap
          ? '<div class="venue__map"><iframe src="' + mapEmbed(v.mapQuery) + '" title="' + esc(v.name) + 'の地図" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>'
          : '<div class="venue__thumb"><img src="' + esc(v.photo) + '" alt="' + esc(v.name) + '" loading="lazy"' + imgStyle(v.photoPos) + ' /></div>') +
        '<div class="venue__body">' +
        '<p class="venue__area">' + esc(v.area) + '</p>' +
        '<h3 class="venue__name">' + esc(v.name) + '</h3>' +
        '<dl class="venue__meta"><div><dt>所在地</dt><dd>' + esc(v.address) + '</dd></div>' +
        '<div><dt>開催日時</dt><dd><ul class="sched-mini">' + v.days.map(function (d) {
          return '<li><b>' + esc(d.day) + '</b> ' + esc(d.time) + '<span>' + esc(d.cls) + '</span></li>';
        }).join('') + '</ul></dd></div></dl>' +
        '<div class="venue__actions"><a href="' + mapLink(v.mapQuery) + '" target="_blank" rel="noopener noreferrer">Googleマップで開く →</a></div>' +
        '</div></article>';
    }).join('');
  };

  R['schedule-note'] = function (el) { el.textContent = D.site.scheduleNote; };

  /* お知らせ（トップ・最新3件） */
  R['news-latest'] = function (el) {
    var n = parseInt(el.getAttribute('data-limit') || '3', 10);
    el.innerHTML = D.news.slice(0, n).map(function (x) {
      var href = x.url || '/news';
      return '<li><a href="' + esc(href) + '"' + linkAttrs(href) + '><time datetime="' + esc(x.date) + '">' + esc(fmtDate(x.date)) + '</time><span class="news-beta__item-title">' + esc(x.title) + '</span><span class="news-beta__item-arrow" aria-hidden="true">→</span></a></li>';
    }).join('');
  };

  /* お知らせ一覧（カテゴリー絞り込みつき） */
  R['news-list'] = function (el) {
    var cats = ['すべて'];
    D.news.forEach(function (x) { if (cats.indexOf(x.category) < 0) cats.push(x.category); });
    var chips = '<nav class="cat-chips" aria-label="カテゴリー">' + cats.map(function (c, i) {
      return '<button type="button" data-cat="' + esc(c) + '"' + (i === 0 ? ' aria-pressed="true"' : ' aria-pressed="false"') + '>' + esc(c) + '</button>';
    }).join('') + '</nav>';
    var list = '<div class="news-list">' + D.news.map(function (x) {
      var tag = x.url ? 'a' : 'div';
      var href = x.url ? ' href="' + esc(x.url) + '"' + linkAttrs(x.url) : '';
      return '<' + tag + href + ' class="news-item" data-cat="' + esc(x.category) + '"><div class="news-item__body">' +
        '<div class="news-item__meta"><time datetime="' + esc(x.date) + '">' + esc(fmtDate(x.date)) + '</time><span class="news-item__cat">' + esc(x.category) + '</span></div>' +
        '<h3 class="news-item__title">' + esc(x.title) + '</h3>' +
        (x.body ? '<p class="news-item__excerpt">' + esc(x.body) + '</p>' : '') +
        '</div></' + tag + '>';
    }).join('') + '</div>';
    el.innerHTML = chips + list;
    var buttons = el.querySelectorAll('.cat-chips button');
    var items = el.querySelectorAll('.news-item');
    Array.prototype.forEach.call(buttons, function (b) {
      b.addEventListener('click', function () {
        var cat = b.getAttribute('data-cat');
        Array.prototype.forEach.call(buttons, function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        Array.prototype.forEach.call(items, function (it) {
          it.style.display = (cat === 'すべて' || it.getAttribute('data-cat') === cat) ? '' : 'none';
        });
      });
    });
  };

  /* 大会実績 */
  R['results'] = function (el) {
    var n = parseInt(el.getAttribute('data-limit') || '0', 10);
    var list = n ? D.results.slice(0, n) : D.results;
    el.innerHTML = list.map(function (r) {
      var p = String(r.date).split('-');
      var label = p[0] + (p[1] ? ' / ' + p[1] : '');
      return '<li><time>' + esc(label) + '</time><div><h3>' + esc(r.title) + '</h3>' + (r.body ? '<p>' + esc(r.body) + '</p>' : '') + '</div></li>';
    }).join('');
  };

  /* ギャラリー（無限スクロール用に2周分） */
  R['gallery'] = function (el) {
    var one = D.gallery.map(function (g) { return '<div class="marquee__item"><img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy" /></div>'; }).join('');
    var two = D.gallery.map(function (g) { return '<div class="marquee__item" aria-hidden="true"><img src="' + esc(g.src) + '" alt="" loading="lazy" /></div>'; }).join('');
    el.innerHTML = one + two;
  };

  /* Instagram：投稿URLがあれば公式埋め込み、無ければ写真グリッド＋ボタン */
  R['instagram'] = function (el) {
    var posts = (D.instagramPosts || []).filter(Boolean);
    if (posts.length) {
      el.innerHTML = '<div class="ig-embeds">' + posts.map(function (u) {
        return '<blockquote class="instagram-media" data-instgrm-permalink="' + esc(u) + '" data-instgrm-version="14"><a href="' + esc(u) + '" target="_blank" rel="noopener noreferrer">Instagramで見る</a></blockquote>';
      }).join('') + '</div>';
      var s = document.createElement('script');
      s.async = true; s.src = 'https://www.instagram.com/embed.js';
      document.body.appendChild(s);
    } else {
      el.innerHTML = '<div class="ig-grid">' + D.gallery.slice(0, 6).map(function (g) {
        return '<a href="' + esc(D.site.instagramUrl) + '" target="_blank" rel="noopener noreferrer" class="ig-grid__item"><img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy" /></a>';
      }).join('') + '</div>';
    }
  };

  /* 無料体験ページ：体験できるクラス */
  R['trial-classes'] = function (el) {
    el.innerHTML = D.classes.map(function (c) {
      return '<article class="t-class"><div class="t-class__photo"><img src="' + esc(c.photo) + '" alt="' + esc(c.name) + '" loading="lazy"' + imgStyle(c.photoPos) + ' /><span class="t-class__photo-label">' + esc(c.label) + '</span></div>' +
        '<div class="t-class__body"><h3 class="t-class__name">' + esc(c.name) + '</h3><div class="t-class__meta">' +
        '<p><strong>対象</strong>　' + esc(c.target) + '</p>' +
        c.schedule.map(function (s) { return '<p><strong>' + esc(s.day) + '曜</strong>　' + esc(s.time) + '｜' + esc(venueLabel(s)) + '</p>'; }).join('') +
        '</div></div></article>';
    }).join('');
  };

  /* テキスト差し込み（例：data-text="site.catch"） */
  function textOf(path) {
    return path.split('.').reduce(function (o, k) { return o ? o[k] : undefined; }, D);
  }

  function run() {
    var nodes = document.querySelectorAll('[data-render]');
    Array.prototype.forEach.call(nodes, function (el) {
      var fn = R[el.getAttribute('data-render')];
      if (fn) { try { fn(el); } catch (e) { if (window.console) console.error(e); } }
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-text]'), function (el) {
      var v = textOf(el.getAttribute('data-text'));
      if (v != null) el.textContent = v;
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-href]'), function (el) {
      var v = textOf(el.getAttribute('data-href'));
      if (v) el.setAttribute('href', v);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
