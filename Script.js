(function () {
  'use strict';
  document.documentElement.classList.add('js');

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