class Falador {
    static synth = window.speechSynthesis;
    static speaker = new SpeechSynthesisUtterance ();

    static falar (texto) {
        this.speaker.text = texto
        this.synth.cancel ()
        this.synth.speak (this.speaker)
    }
}
