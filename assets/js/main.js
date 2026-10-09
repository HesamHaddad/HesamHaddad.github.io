(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('sitenav');

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  btn.addEventListener('click', function () {
    setOpen(!nav.classList.contains('is-open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) setOpen(false);
  });

  // Highlight the nav link for the section in view
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
  var sections = Object.keys(byId)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('is-active'); });
          var a = byId[entry.target.id];
          if (a) a.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
