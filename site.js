// Gallery: [file, title, caption, wide?]. Images sit next to this file as .webp (full size) + -sm.webp (grid).
const SHOTS = window.SHOTS || [];

const grid = document.querySelector('[data-gallery]');
const box = document.getElementById('lightbox');
const boxImg = box.querySelector('img');
const boxCap = box.querySelector('.cap');

for (const [file, title, caption, wide] of SHOTS) {
  const fig = document.createElement('figure');
  fig.className = 'shot' + (wide ? ' wide' : '');
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-label', `${title}: open full size`);
  const img = document.createElement('img');
  img.src = `${file}-sm.webp`;
  img.alt = caption;
  img.loading = 'lazy';
  img.width = 1440; img.height = 900;
  btn.append(img);
  btn.addEventListener('click', () => {
    boxImg.src = `${file}.webp`;
    boxImg.alt = caption;
    boxCap.textContent = `${title}. ${caption}`;
    box.showModal();
  });
  const cap = document.createElement('figcaption');
  const b = document.createElement('b');
  b.textContent = title;
  cap.append(b, caption);
  fig.append(btn, cap);
  grid.append(fig);
}

box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
