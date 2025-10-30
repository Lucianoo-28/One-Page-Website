// one_page_website.js — Simple Lightbox
(() => {
  const links = Array.from(document.querySelectorAll('a[data-lightbox]'));
  if (!links.length) return;

  // Make the popup once
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = `
    <button class="lightbox__close" aria-label="Close">&times;</button>
    <button class="lightbox__btn lightbox__prev" aria-label="Previous">&#10094;</button>
    <img class="lightbox__img" src="" alt="">
    <div class="lightbox__caption"></div>
    <button class="lightbox__btn lightbox__next" aria-label="Next">&#10095;</button>
  `;
  document.body.appendChild(box);

  const imgEl = box.querySelector('.lightbox__img');
  const capEl = box.querySelector('.lightbox__caption');
  const btnPrev = box.querySelector('.lightbox__prev');
  const btnNext = box.querySelector('.lightbox__next');
  const btnClose = box.querySelector('.lightbox__close');

  let i = 0;
  let lastFocus = null;

  function open(index) {
    i = (index + links.length) % links.length;
    const a = links[i];
    const thumb = a.querySelector('img');
    imgEl.src = a.getAttribute('href');
    imgEl.alt = thumb ? thumb.alt || '' : '';
    capEl.textContent = thumb ? thumb.alt || '' : '';
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
    lastFocus = document.activeElement;
    btnClose.focus();
  }
  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
    imgEl.src = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  const next = () => open(i + 1);
  const prev = () => open(i - 1);

  links.forEach((a, idx) => {
    a.addEventListener('click', (e) => { e.preventDefault(); open(idx); });
  });
  btnClose.addEventListener('click', close);
  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);

  box.addEventListener('click', (e) => {
    const inside = e.target.closest('.lightbox__img, .lightbox__btn, .lightbox__close');
    if (!inside) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
})();
