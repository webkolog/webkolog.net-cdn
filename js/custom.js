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

// Global ses nesnesi
let currentAudio = new Audio();
let currentBtn = null;

document.querySelectorAll('.play-audio-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault(); // Kartın linkine gitmesini engelle
        e.stopPropagation();

        const lang = this.getAttribute('data-lang');
        const audioUrl = `https://raw.githubusercontent.com/webkolog/webkolog.net-cdn/main/audio/music/${lang}.mp3`;
        const icon = this.querySelector('i');

        // Eğer aynı butona basıldıysa ve çalıyorsa durdur
        if (currentBtn === this && !currentAudio.paused) {
            currentAudio.pause();
            icon.className = 'bi bi-play-fill';
            return;
        }

        // Başka bir şey çalıyorsa durdur ve ikonunu düzelt
        if (currentBtn) {
            currentBtn.querySelector('i').className = 'bi bi-play-fill';
        }

        // Yeni kaynağı yükle ve oynat
        currentAudio.src = audioUrl;
        currentAudio.play();
        currentBtn = this;
        icon.className = 'bi bi-stop-fill';

        // Müzik bittiğinde ikonu geri döndür
        currentAudio.onended = () => {
            icon.className = 'bi bi-play-fill';
        };
    });
});


/* About Music Player */
document.addEventListener('DOMContentLoaded', function() {
const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-pause-btn');
const playIcon = playBtn.querySelector('i');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const timeDisplay = document.getElementById('current-time');

// Saniye formatlama (00:00)
function formatTime(seconds) {
	let min = Math.floor(seconds / 60);
	let sec = Math.floor(seconds % 60);
	return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
}

playBtn.addEventListener('click', () => {
	if (audio.paused) {
		audio.play();
		playIcon.className = 'fa fa-pause';
	} else {
		audio.pause();
		playIcon.className = 'fa fa-play';
	}
});

audio.addEventListener('timeupdate', () => {
	const percent = (audio.currentTime / audio.duration) * 100;
	progressBar.style.width = percent + '%';
	timeDisplay.innerText = formatTime(audio.currentTime);
});

progressContainer.addEventListener('click', (e) => {
	const width = progressContainer.clientWidth;
	const clickX = e.offsetX;
	audio.currentTime = (clickX / width) * audio.duration;
});
});