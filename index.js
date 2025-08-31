const POPUP_SHOW_TIME = 200;

const imagePopup = document.getElementById('popup');
const videoController = document.getElementById('video-controller');

imagePopup.onclick = () => {
    imagePopup.animate([{opacity: 1}, {opacity: 0}], {duration: POPUP_SHOW_TIME, iterations: 1});
    setTimeout(() => {
        imagePopup.style.display = 'none';
        videoController.pause();
        videoController.currentTime = 0;
    }, POPUP_SHOW_TIME-10);
};

function setInfo(title, author, date, comment) {
    document.getElementById('title').innerHTML = title;
    document.getElementById('author').innerHTML = `by <b>${author}</b> on ${new Date(Date.parse(date)).toISOString().slice(0,10)}`;
    document.getElementById('comment').innerHTML = comment;
    if (comment == "" || comment == undefined) document.getElementById('comment').classList.add('d-none');
    else document.getElementById('comment').classList.remove('d-none');
}

function showImag(filename) {
    let img = images.find(i => i.filename == filename);
    document.getElementById('img-big').setAttribute('src', `img/${filename}`);
    setInfo(img.title, img.author, img.date, img.comment)
    document.getElementById('video-container').style.display='none';
    document.getElementById('imag-container').style.display='';
    imagePopup.style.display = '';
    imagePopup.animate([{opacity: 0}, {opacity: 1}], {duration: POPUP_SHOW_TIME, iterations: 1});
}

function showVideo(filename, type) {
    let video = images.find(i => i.filename == filename);
    document.getElementById('video-big').setAttribute('src', `video/${filename}`);
    document.getElementById('video-big').setAttribute('type', `video/${type}`);
    videoController.load();
    setInfo(video.title, video.author, video.date, video.comment)
    document.getElementById('imag-container').style.display='none';
    document.getElementById('video-container').style.display='';
    imagePopup.style.display = '';
    imagePopup.animate([{opacity: 0}, {opacity: 1}], {duration: POPUP_SHOW_TIME, iterations: 1});
}

addEventListener('load', _ => {
    let gallery = document.getElementById('gallery');
    images.forEach(img => {
        if (Object.hasOwn(img, "videoType")) {
            gallery.innerHTML += `<div class="imag" id="${img.filename}" data-bs-toggle="tooltip" title="${img.title.replace(/"/g, '&quot;')}"><img onclick="showVideo('${img.filename}', '${img.videoType}')" src="video/${img.filename}-thumb.png"></div>`;
        } else {
            gallery.innerHTML += `<div class="imag" id="${img.filename}" data-bs-toggle="tooltip" title="${img.title.replace(/"/g, '&quot;')}"><img onclick="showImag('${img.filename}')" src="img/${img.filename}"></div>`;
        }
        new bootstrap.Tooltip(gallery.children[gallery.children.length - 1]);
    });
    [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    });
});
