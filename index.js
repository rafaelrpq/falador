
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
    this.oncontextmenu = function (e) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation();
        return false;
    }

    let texto = btn.getAttribute ('data-value');
    btn.innerHTML = texto;
    try {
        if (texto.length > 1) {
            btn.style.background = `url(res/bichos/${texto}.avif)`;
        }
    } catch (e) {
        // console.log (e)
    }
    btn.addEventListener ('click', (e) => {
        e.preventDefault ();
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
