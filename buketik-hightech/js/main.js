// БУКЕТИК концепт · спільні скрипти для всіх сторінок
document.addEventListener('DOMContentLoaded', () => {

  // хедер при скролі
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, {passive: true});
  onScroll();

  // мобільне меню
  const burger = document.querySelector('.burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    }));
  }

  // поява блоків при скролі
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // лічильники
  const io2 = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io2.unobserve(e.target);
      const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || '';
      const t0 = performance.now(), dur = 1400;
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('uk-UA') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, {threshold: .6});
  document.querySelectorAll('[data-count]').forEach(el => io2.observe(el));

  // форма замовлення (демо-режим)
  const form = document.getElementById('orderForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const toast = document.getElementById('toast');
      toast.textContent = name
        ? `${name}, дякуємо! Передзвонимо протягом 15 хвилин для підтвердження 🌷`
        : 'Дякуємо! Передзвонимо протягом 15 хвилин для підтвердження 🌷';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3600);
      form.reset();
    });
  }
});
