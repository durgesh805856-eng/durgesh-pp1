(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---- Icons (consistent 24px outline set) ---- */
  var P = {
    cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7.5 15h9"/>',
    brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M9 7h6"/>',
    monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    proj: '<rect x="3" y="4" width="18" height="11" rx="1"/><path d="M12 15v4M8 20h8M7 9l3 3 3-4 3 3"/>',
    bus: '<rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 11h16M8 21v-3M16 21v-3"/><circle cx="8" cy="14.5" r=".8"/><circle cx="16" cy="14.5" r=".8"/>',
    cup: '<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h2a2 2 0 0 1 0 4h-2M8 3v2M12 3v2"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"/>',
    code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
    flag: '<path d="M5 22V3M5 4h12l-2 4 2 4H5"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.5-4 3-6 6.5-6s6 2 6.5 6M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2 .7 3.2 2.6 3.5 6"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9 11h6M9 14h4"/>',
    factory: '<path d="M3 21V9l6 4V9l6 4V4h3v17zM7 17h2M12 17h2"/>',
    ball: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    bird: '<path d="m12 3 3 8h-6zM9 11l-2 10h10l-2-10"/>',
    chess: '<path d="M9 3h6M12 3v3M8 21h8M9 21l1-7M15 21l-1-7M8 14h8l-1-4H9z"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'
  };
  document.querySelectorAll('[data-icon]').forEach(function (el) {
    var d = P[el.dataset.icon];
    if (!d) return;
    el.insertAdjacentHTML('afterbegin', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>');
  });

  /* ---- Mobile menu ---- */
  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setMenu(false); burger.focus(); } });
  window.addEventListener('resize', function () { if (innerWidth > 980) setMenu(false); });

  /* ---- Active nav link on scroll ---- */
  var links = {};
  menu.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
          links[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });

    /* ---- Scroll reveal ---- */
    var rv = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 70 + 'ms';
      rv.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Course links preselect the enquiry form ---- */
  var course = document.getElementById('course');
  document.querySelectorAll('[data-course]').forEach(function (a) {
    a.addEventListener('click', function () { course.value = a.dataset.course; clearErr('course'); });
  });

  /* ---- Enquiry form ---- */
  var form = document.getElementById('enquiry'), status = document.getElementById('status');
  function setErr(id, msg) {
    var f = document.getElementById(id);
    document.getElementById('e-' + id).textContent = msg;
    f.parentNode.classList.add('invalid');
    f.setAttribute('aria-invalid', 'true');
    f.setAttribute('aria-describedby', 'e-' + id);
  }
  function clearErr(id) {
    var f = document.getElementById(id);
    document.getElementById('e-' + id).textContent = '';
    f.parentNode.classList.remove('invalid');
    f.removeAttribute('aria-invalid');
  }
  var rules = {
    name: function (v) { return v.length < 2 ? 'Enter your full name.' : ''; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter a valid email, such as name@example.com.'; },
    phone: function (v) { var d = v.replace(/\D/g, ''); return /^[+\d\s()-]+$/.test(v) && d.length >= 10 && d.length <= 13 ? '' : 'Enter a 10-digit phone number.'; },
    course: function (v) { return v ? '' : 'Select the course you are interested in.'; }
  };
  Object.keys(rules).forEach(function (id) {
    var f = document.getElementById(id);
    f.addEventListener('blur', function () { var m = rules[id](f.value.trim()); m ? setErr(id, m) : clearErr(id); });
    f.addEventListener('input', function () { if (f.parentNode.classList.contains('invalid') && !rules[id](f.value.trim())) clearErr(id); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var first = null;
    Object.keys(rules).forEach(function (id) {
      var m = rules[id](document.getElementById(id).value.trim());
      if (m) { setErr(id, m); first = first || document.getElementById(id); } else clearErr(id);
    });
    status.className = 'status full';
    if (first) {
      status.classList.add('bad');
      status.textContent = 'Please fix the highlighted fields and try again.';
      first.focus();
      return;
    }
    var v = function (id) { return document.getElementById(id).value.trim(); };
    var body = 'Name: ' + v('name') + '\nEmail: ' + v('email') + '\nPhone: ' + v('phone') + '\nCourse: ' + v('course') + '\n\n' + v('message');
    var href = 'mailto:info@abccollege.edu?subject=' + encodeURIComponent('Admission enquiry: ' + v('course')) + '&body=' + encodeURIComponent(body);
    status.classList.add('ok');
    status.innerHTML = 'Thank you, ' + v('name').replace(/[<>&]/g, '') + '. Your enquiry for <strong>' + v('course').replace(/[<>&]/g, '') + '</strong> is ready. This demo does not send data to a server. <a href="' + href + '">Send it by email</a> from your own mail app.';
    form.reset();
  });

  /* ---- Copy buttons ---- */
  document.querySelectorAll('.copy').forEach(function (b) {
    var label = b.textContent;
    b.addEventListener('click', function () {
      function done(ok) { b.textContent = ok ? 'Copied' : 'Copy failed'; setTimeout(function () { b.textContent = label; }, 1800); }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(b.dataset.copy).then(function () { done(true); }, function () { done(false); });
      else {
        var t = document.createElement('textarea'); t.value = b.dataset.copy; document.body.appendChild(t); t.select();
        var ok = false; try { ok = document.execCommand('copy'); } catch (_) {} t.remove(); done(ok);
      }
    });
  });
})();
