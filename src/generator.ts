export class Generator {
    readonly oscilator: OscillatorNode;
    readonly waveShaper: WaveShaperNode;
    readonly gain: GainNode;
    readonly tr: HTMLTableRowElement;

    constructor(audioContext: AudioContext) {
        this.oscilator = audioContext.createOscillator();
        this.waveShaper = audioContext.createWaveShaper();
        this.gain = audioContext.createGain();

        this.tr = document.createElement('tr');
        this.tr.appendChild(document.createElement('td')).appendChild(this.createTypeSelect());
        this.tr.appendChild(document.createElement('td')).appendChild(this.createFrequencyInput());
        this.tr.appendChild(document.createElement('td')).appendChild(this.createGainInput());

        this.oscilator.connect(this.waveShaper);
        this.waveShaper.connect(this.gain);
        this.gain.connect(audioContext.destination);

        this.oscilator.start();
    }

    private createTypeSelect(): HTMLSelectElement {
        const select = document.createElement('select');
        select.appendChild(document.createElement('option')).appendChild(document.createTextNode('sine'));
        select.appendChild(document.createElement('option')).appendChild(document.createTextNode('square'));
        select.appendChild(document.createElement('option')).appendChild(document.createTextNode('sawtooth'));
        select.appendChild(document.createElement('option')).appendChild(document.createTextNode('triangle'));
        const change = () => {
            this.oscilator.type = select.value as any;
        };
        select.addEventListener('change', change);
        change();
        return select;
    }

    private createFrequencyInput(): HTMLLabelElement {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '1';
        input.max = '50000';
        input.step = '1';
        input.value = '432';
        const change = () => {
            this.oscilator.frequency.value = +input.value;
        };
        input.addEventListener('change', () => change());
        change();
        const label = document.createElement('label');
        label.appendChild(input);
        label.appendChild(document.createTextNode('Hz'));
        return label;
    }

    private createGainInput(): HTMLLabelElement {
        const text = document.createTextNode('');
        const input = document.createElement('input');
        input.type = 'range';
        input.min = '0';
        input.max = '3';
        input.step = '0.05';
        input.value = '0.5';
        const change = () => {
            this.gain.gain.value = +input.value;
            text.nodeValue = `${Math.round(+input.value * 100)}%`;
        };
        input.addEventListener('change', () => change());
        change();
        const label = document.createElement('label');
        label.appendChild(input);
        label.appendChild(text);
        return label;
    }
}
