import { AppManager } from './AppManager.js'
import { Falador } from './Falador.js'

AppManager.Activate ();
/****************************************************************************/

// document.addEventListener ('DOMContentLoaded', () => {
//     let dialog = document.createElement ('dialog');
//     let button = document.createElement ('button');

//     dialog.innerHTML = "Bem vindo ao aplicativo Falador<br>Clique no botão abaixo para iniciar"
//     button.innerHTML = "Iniciar";
//
//     button.onclick = () => {
//         dialog.close ()
//         location.href='#animais'
//         Falador.falar ('animais');
//     }

//     document.addEventListener ('keydown', e => {
//         if (e.key === 'Escape') {
//             e.preventDefault ();
//         }
//     })

//     document.body.appendChild (dialog);
//     dialog.appendChild (button);
//     dialog.showModal ();

// // })

// let dialog = document.querySelector ('dialog');
// let iniciar = document.querySelector ('dialog button');
// // dialog.showModal ()

// iniciar.addEventListener ('click', () => {
//     dialog.close ()
//     //         location.href='#animais'
//     //         Falador.falar ('animais');
// })

let buttons = document.querySelectorAll ('button ')
buttons.forEach (btn => {
    btn.oncontextmenu = function (e) {
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
            Falador.falar (texto);
        });
    } catch (e) {
        console.log (e)
    }

})

// document.querySelector ('.ativo').click ();
