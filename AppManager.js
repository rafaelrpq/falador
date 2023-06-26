export class AppManager {

    static Activate () {
        let newWorker;

        let snackbar = document.createElement ('div');
        snackbar.setAttribute ('id', 'snackbar');
        snackbar.innerHTML = '<span>Nova versão disponível.</span> <a href="#" id="reload">ATUALIZANDO</a>'

        function showUpdateBar() {
            document.body.appendChild (snackbar);
            snackbar.className = 'show';
            console.log ('PWA updating...')
        }

        //The click event on the pop up notification
        // document.getElementById ('reload').addEventListener ('click', function() {
        //     console.log ('requesting PWA update')
        //     newWorker.postMessage ({ action: 'skipWaiting' });
        // });

        if ('serviceWorker' in navigator) {

            navigator.serviceWorker.register ('serviceWorker.js').then(reg => {
                reg.addEventListener ('updatefound', () => {
                    newWorker = reg.installing;

                    newWorker.addEventListener ('statechange', () => {
                        switch (newWorker.state) {
                            case 'installed':
                                if (navigator.serviceWorker.controller) {
                                    showUpdateBar();
                                }
                                break;
                        }
                    });
                });
            });

            let refreshing;
            navigator.serviceWorker.addEventListener ('controllerchange', function () {
                if (refreshing) return;
                window.location.reload ();
                refreshing = true;
            });
        }
    }
}
