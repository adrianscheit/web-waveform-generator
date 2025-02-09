import { Channel } from "./channel";

export class Channels {
    readonly channelMerger: ChannelMergerNode;
    readonly element: HTMLElement = document.createElement('div');

    constructor(private readonly audioContext: AudioContext) {
        const channelCount = audioContext.destination.channelCount;
        this.channelMerger = audioContext.createChannelMerger(channelCount);
        for (let i = 0; i < channelCount; ++i) {
            const newChannel = new Channel(audioContext, i);
            newChannel.gain.connect(this.channelMerger, 0, i)
            this.element.appendChild(newChannel.element);
        }
        this.channelMerger.connect(audioContext.destination);
    }
}