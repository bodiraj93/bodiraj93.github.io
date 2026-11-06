// Galleries: [file, title, caption, wide?]. Images sit next to this file as .webp (full size) + -sm.webp (grid).
// <div data-gallery> uses window.SHOTS; <div data-gallery="name"> uses window.GALLERIES.name.
const box = document.getElementById('lightbox');
const boxImg = box.querySelector('img');
const boxCap = box.querySelector('.cap');

for (const grid of document.querySelectorAll('[data-gallery]')) {
  const key = grid.dataset.gallery;
  const shots = key ? (window.GALLERIES || {})[key] || [] : window.SHOTS || [];
  for (const [file, title, caption, wide] of shots) {
    const fig = document.createElement('figure');
    fig.className = 'shot' + (wide ? ' wide' : '');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', `${title}: open full size`);
    const img = document.createElement('img');
    img.src = `${file}-sm.webp`;
    img.alt = caption;
    img.loading = 'lazy';
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
}

box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
