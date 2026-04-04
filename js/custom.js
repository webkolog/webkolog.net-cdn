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