import { Generator } from "./generator";

export class Channels {
    readonly channelMergerNode: ChannelMergerNode;
    readonly element: HTMLElement = document.createElement('div');

    constructor(private readonly audioContext: AudioContext) {
        const channelCount = audioContext.destination.channelCount;
        this.channelMergerNode = audioContext.createChannelMerger(channelCount);
        for (let i = 0; i < channelCount; ++i) {
            this.element.appendChild(this.createChannelDom(i));
        }
        this.channelMergerNode.connect(audioContext.destination);
    }

    private createChannelDom(index: number): HTMLElement {
        const section = document.createElement('section');
        const h3 = section.appendChild(document.createElement('h3'));
        h3.appendChild(document.createTextNode(`Channel ${index}`));
        const table = section.appendChild(document.createElement('table'));
        const tr = table.appendChild(document.createElement('tr'));
        tr.appendChild(document.createTextNode('Type'));
        tr.appendChild(document.createTextNode('Frequency'));
        tr.appendChild(document.createTextNode('Gain'));
        const tbody = table.appendChild(document.createElement('tbody'));
        const button = section.appendChild(document.createElement('button'));
        button.appendChild(document.createTextNode('Add'));
        button.addEventListener('click', () => {
            const newGenerator = new Generator(this.audioContext);
            tbody.appendChild(newGenerator.tr);
            newGenerator.gain.connect(this.channelMergerNode, 0, index);
        });
        return section;
    }
}