
/****************************************************************************/

var synth = null;
var speaker = null

window.onload = function () {
    synth = window.speechSynthesis
    speaker = new SpeechSynthesisUtterance ();
}

function ptBR (voices) {
    for (v of voices) {
        if (v.lang === 'pt-BR') {
            return (v)
        }
    }
}

function falar (texto) {
    // let voices  = synth.getVoices ()
    // let speaker = new SpeechSynthesisUtterance ();
    // speaker.lang = 'pt-BR'
    // speaker.voice = ptBR (voices);

    speaker.text = texto


    synth.cancel ()
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
    let tipo = btn.getAttribute ('data-type');
    btn.innerHTML = texto;
    try {
        switch (tipo) {
            case 'bichos' :
                btn.style.background = `url(res/bichos/${texto}.avif)`;
                break
            case 'switcher' :
                btn.addEventListener ('click', (e) => {
                    e.preventDefault ();
                    location.href = './#'+texto.toLowerCase ();

                    for (let iBtn of buttons) {
                        iBtn.classList.remove ('ativo');
                    }

                    btn.classList.add ('ativo')
                });
            default :
                btn.style.backgroundColor = btn.getAttribute ('data-color') ?? btn.style.backgroundColor;
        }

        btn.addEventListener ('click', (e) => {
            e.preventDefault ();
            falar (texto);
        });
    } catch (e) {
        console.log (e)
    }

})

// if ('serviceWorker' in navigator) {
//     window.addEventListener ('load', () => {
//         navigator.serviceWorker.register ('sw.js')
//         .then (reg => {
//             console.log ('registrado!')
//             console.log (reg)
//         })
//         .catch (err => {
//             console.log ('falha ao registrar')
//             console.log (err)
//         })
//     })
// }
