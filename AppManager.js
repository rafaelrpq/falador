class AppManager {

    static Activate () {
        let newWorker;

        let snackbar = document.createElement ('dialog');
        snackbar.setAttribute ('id', 'snackbar');
        snackbar.innerHTML = '<span>Nova versão disponível.</span> <a href="#" id="reload">ATUALIZANDO</a>'

        function showUpdateBar() {
            let dialog = document.querySelector ('dialog')
            if (dialog) dialog.close ()
            document.body.appendChild (snackbar);
            snackbar.className = 'show';
            snackbar.showModal ();
            console.log ('Updating PWA...')
        }

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
