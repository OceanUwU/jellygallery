const POPUP_SHOW_TIME = 200;

const imagePopup = document.getElementById('popup');

imagePopup.onclick = () => {
    imagePopup.animate([{opacity: 1}, {opacity: 0}], {duration: POPUP_SHOW_TIME, iterations: 1});
    setTimeout(() => imagePopup.style.display = 'none', POPUP_SHOW_TIME-10);
};

function showImag(filename) {
    let img = images.find(i => i.filename == filename);
    document.getElementById('img-big').setAttribute('src', `img/${filename}`);
    document.getElementById('title').innerHTML = img.title;
    document.getElementById('author').innerHTML = `by <b>${img.author}</b> on ${new Date(Date.parse(img.date)).toISOString().slice(0,10)}`;
    document.getElementById('comment').innerHTML = img.comment;
    if (img.comment == "") document.getElementById('comment').classList.add('d-none');
    else document.getElementById('comment').classList.remove('d-none');
    imagePopup.style.display = '';
    imagePopup.animate([{opacity: 0}, {opacity: 1}], {duration: POPUP_SHOW_TIME, iterations: 1});
}

addEventListener('load', _ => {
    let gallery = document.getElementById('gallery');
    images.forEach(img => {
        gallery.innerHTML += `<div class="imag" id="${img.filename}" data-bs-toggle="tooltip" title="${img.title.replace(/"/g, '&quot;')}"><img onclick="showImag('${img.filename}')" src="img/${img.filename}"></div>`;
        new bootstrap.Tooltip(gallery.children[gallery.children.length - 1]);
    });
    [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    });
});
