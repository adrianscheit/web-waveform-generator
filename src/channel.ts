import { Generator } from "./generator";

export class Channel {
    static readonly fftSize: number = 512;

    readonly analyser: AnalyserNode;
    private readonly analyserData = new Uint8Array(Channel.fftSize);
    readonly gain: GainNode;
    readonly element = document.createElement('section');
    readonly canvasContext: CanvasRenderingContext2D;

    constructor(audioContext: AudioContext, index: number) {
        this.analyser = audioContext.createAnalyser();
        this.analyser.fftSize = Channel.fftSize;
        this.gain = audioContext.createGain();
        this.analyser.connect(this.gain);

        const h3 = this.element.appendChild(document.createElement('h3'));
        h3.appendChild(document.createTextNode(`Channel ${index}`));
        h3.appendChild(Generator.createGainInput(this.gain));
        const table = this.element.appendChild(document.createElement('table'));
        const tr = table.appendChild(document.createElement('tr'));
        tr.appendChild(document.createElement('th')).appendChild(document.createTextNode('Type'));
        tr.appendChild(document.createElement('th')).appendChild(document.createTextNode('Frequency'));
        tr.appendChild(document.createElement('th')).appendChild(document.createTextNode('Wave Shaper'));
        tr.appendChild(document.createElement('th')).appendChild(document.createTextNode('Gain'));
        const tbody = table.appendChild(document.createElement('tbody'));
        const button = this.element.appendChild(document.createElement('button'));
        button.appendChild(document.createTextNode('Add'));
        button.addEventListener('click', () => {
            const newGenerator = new Generator(audioContext);
            tbody.appendChild(newGenerator.tr);
            newGenerator.gain.connect(this.analyser);
        });
        const canvas = this.element.appendChild(document.createElement('canvas'));
        canvas.width = Channel.fftSize;
        canvas.height = 256;
        this.canvasContext = canvas.getContext('2d')!;
        this.canvasContext.fillStyle = '#ddd';
        this.canvasContext.strokeStyle = '#000';
    }

    drawAnalyser(): void {
        const data = this.analyser.getByteTimeDomainData(this.analyserData);

        this.canvasContext.fillRect(0, 0, Channel.fftSize, 256);
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(0, this.analyserData[0]);
        for (let i = 1; i < this.analyserData.length; ++i) {
            this.canvasContext.lineTo(i, 255.5 - this.analyserData[i]);
        }
        this.canvasContext.stroke();
    }
}