
var synth   = window.speechSynthesis

function ptBR (voices) {
    for (v of voices) {
        if (v.lang === 'pt-BR') {
            return (v)
        }
    }
}

function falar (texto) {
    let voices  = synth.getVoices ()
    let speaker = new SpeechSynthesisUtterance ();
    speaker.lang = 'pt-BR'
    speaker.voice = ptBR (voices);

    speaker.text = texto

    synth.speak (speaker);
}


let buttons = document.querySelectorAll ('button')
buttons.forEach (btn => {
    let texto = btn.getAttribute ('data-value');
    btn.innerHTML = texto;
    btn.style.background = `url(res/bichos/${texto}.avif)`;
    btn.addEventListener ('click', () => {
        falar (texto);
    });
})

const details = document.querySelectorAll("details");
details.forEach((targetDetail) => {
  targetDetail.addEventListener("click", () => {
    details.forEach((detail) => {
      if (detail !== targetDetail) {
        detail.removeAttribute("open");
      }
    });
  });
});
