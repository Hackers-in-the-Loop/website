/* Web edition: small enhancements only. Without this file every page still reads in full:
   both lanes show one after the other, term cards open on hover or focus, checks use <details>. */
(function () {
  'use strict';
  var d = document;
  d.documentElement.classList.add('js');

  /* Read / Watch switch: show one lane at a time; the URL hash (#read, #watch) picks it. */
  var lanes = [].slice.call(d.querySelectorAll('[data-lane]'));
  var tabs = [].slice.call(d.querySelectorAll('[data-lane-tab]'));
  var bar = d.querySelector('.lanes-switch');
  function show(name) {
    lanes.forEach(function (l) { l.hidden = l.getAttribute('data-lane') !== name; });
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-lane-tab') === name;
      t.classList.toggle('on', on);
      if (on) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current');
    });
  }
  function fromHash() {
    if (lanes.length < 2) return;
    var id = decodeURIComponent(location.hash.slice(1));
    var target = id && d.getElementById(id);
    var lane = target && target.closest('[data-lane]');
    show(lane ? lane.getAttribute('data-lane') : 'read');
  }
  if (lanes.length > 1) {
    fromHash();
    window.addEventListener('hashchange', fromHash);
    tabs.forEach(function (t) {
      t.addEventListener('click', function (e) {
        e.preventDefault();
        var name = t.getAttribute('data-lane-tab');
        show(name);
        history.replaceState(null, '', '#' + name);
        if (bar) {
          var top = bar.getBoundingClientRect().top + window.scrollY - 1;
          if (window.scrollY > top) window.scrollTo(0, top);
        }
      });
    });
  }

  /* Copy button on every listing. */
  [].slice.call(d.querySelectorAll('figure.listing')).forEach(function (fig) {
    var cap = fig.querySelector('figcaption');
    var code = fig.querySelector('pre code');
    if (!cap || !code) return;
    var b = d.createElement('button');
    b.type = 'button';
    b.className = 'copy';
    b.textContent = 'Copy';
    b.setAttribute('aria-label', 'Copy ' + (fig.getAttribute('data-file') || 'the listing'));
    cap.appendChild(b);
    b.addEventListener('click', function () {
      var text = code.textContent.replace(/\n$/, '') + '\n';
      var done = function () {
        b.textContent = 'Copied';
        b.classList.add('done');
        setTimeout(function () { b.textContent = 'Copy'; b.classList.remove('done'); }, 1600);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
      } else { fallback(text); done(); }
    });
  });
  function fallback(text) {
    var t = d.createElement('textarea');
    t.value = text;
    t.setAttribute('readonly', '');
    t.style.position = 'fixed';
    t.style.opacity = '0';
    d.body.appendChild(t);
    t.select();
    try { d.execCommand('copy'); } catch (e) { /* nothing to do */ }
    d.body.removeChild(t);
  }

  /* Term cards: keep them inside the viewport; tap toggles; Escape closes. */
  function place(wrap) {
    var card = wrap.querySelector('.term-card');
    if (!card || window.matchMedia('(max-width: 640px)').matches) return;
    card.style.left = '0px';
    var r = card.getBoundingClientRect();
    var over = r.right - (d.documentElement.clientWidth - 12);
    if (over > 0) card.style.left = (-Math.min(over, r.left - 12)) + 'px';
  }
  [].slice.call(d.querySelectorAll('.term-wrap')).forEach(function (wrap) {
    var dfn = wrap.querySelector('dfn');
    wrap.addEventListener('mouseenter', function () { wrap.classList.remove('closed'); place(wrap); });
    dfn.addEventListener('focus', function () { wrap.classList.remove('closed'); place(wrap); });
    dfn.addEventListener('blur', function () { wrap.classList.remove('closed'); });
    dfn.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { wrap.classList.add('closed'); }
    });
    dfn.addEventListener('mousedown', function (e) {
      if (d.activeElement === dfn) { e.preventDefault(); dfn.blur(); wrap.classList.add('closed'); }
    });
  });
  d.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && d.activeElement && d.activeElement.matches('dfn.term')) d.activeElement.blur();
  });

  /* Watch cards: the thumbnail is a plain link to YouTube; with JavaScript a click swaps in the
     privacy-enhanced (youtube-nocookie) player instead, so nothing loads from YouTube before then. */
  [].slice.call(d.querySelectorAll('a.yt[data-yt]')).forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button > 0) return;
      e.preventDefault();
      var f = d.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(a.getAttribute('data-yt')) + '?autoplay=1&rel=0';
      f.title = a.getAttribute('data-title') || 'Video';
      f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      f.setAttribute('allowfullscreen', '');
      var card = a.closest('.watch-card');
      if (card) card.classList.add('playing');
      a.parentNode.replaceChild(f, a);
      f.focus();
    });
  });

  /* Contents: mark the section being read. */
  var links = [].slice.call(d.querySelectorAll('.toc-side a'));
  if (links.length && 'IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && byId[en.target.id]) {
          links.forEach(function (a) { a.classList.remove('here-now'); });
          byId[en.target.id].classList.add('here-now');
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px' });
    Object.keys(byId).forEach(function (id) { var s = d.getElementById(id); if (s) io.observe(s); });
  }
})();
