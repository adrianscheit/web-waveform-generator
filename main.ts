const audioContext = new AudioContext();
audioContext.suspend();
const infoText: Text = document.getElementById('info')!.appendChild(document.createTextNode(''));

console.log(audioContext);

class Generator {
    readonly oscilator = audioContext.createOscillator();
    readonly gain = audioContext.createGain();
    readonly tr: HTMLTableRowElement;

    constructor() {
        this.tr = document.createElement('tr');
        this.tr.appendChild(document.createElement('td')).appendChild(this.createTypeSelect());
        this.tr.appendChild(document.createElement('td')).appendChild(this.createFrequencyInput());
        this.tr.appendChild(document.createElement('td')).appendChild(this.createGainInput());

        this.oscilator.connect(this.gain);
        this.gain.connect(audioContext.destination);

        document.querySelector('tbody')!.appendChild(this.tr);
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
        const text = document.createTextNode('');
        const input = document.createElement('input');
        input.type = 'range';
        input.min = '1';
        input.max = '20000';
        input.step = '1';
        input.value = '432';
        const change = () => {
            this.oscilator.frequency.value = +input.value;
            text.nodeValue = `${input.value}Hz`;
        };
        input.addEventListener('change', () => change());
        change();
        const label = document.createElement('label');
        label.appendChild(input);
        label.appendChild(text);
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

new Generator();

document.getElementById('add')!.addEventListener('click', () => new Generator());
const pause = document.getElementById('pause') as HTMLInputElement;
pause.addEventListener('change', () => {
    if (pause.checked) {
        audioContext.suspend();
    } else {
        audioContext.resume();
    }
});