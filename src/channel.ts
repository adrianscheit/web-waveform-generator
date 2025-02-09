import { Generator } from "./generator";

export class Channel {
    readonly gain: GainNode;
    readonly element = document.createElement('section');

    constructor(audioContext: AudioContext, index: number) {
        this.gain = audioContext.createGain();

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
            newGenerator.gain.connect(this.gain);
        });
    }
}