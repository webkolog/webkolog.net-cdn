function createSummaryAndThumb(pID){
	var div = document.getElementById(pID);
	var imgtag = "";
	var img = div.getElementsByTagName("img");
	var summ = summary_noimg;
	if(img.length>=1) {	
		imgtag = '<img src="'+img[0].src+'" class="pbtthumbimg"/>';
		summ = summary_img;
	}
	
	var summary = imgtag + '<div>' + removeHtmlTag(div.innerHTML,summ) + '</div>';
	div.innerHTML = summary;
}

/* Musick Player */
const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-pause-btn');
const playIcon = playBtn.querySelector('i');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');

// Oynat - Durdur
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        audio.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
    }
});

// İlerleme Çubuğunu Güncelle
audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + '%';
});

// Çubuğa Tıklayarak İlerletme
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Şarkı Bittiğinde Simgayi Değiştir
audio.addEventListener('ended', () => {
    playIcon.classList.replace('fa-pause', 'fa-play');
    progressBar.style.width = '0%';
});