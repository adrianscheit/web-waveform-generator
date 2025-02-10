import { Channel } from "./channel";

export class Channels {
    readonly channelMerger: ChannelMergerNode;
    readonly element: HTMLElement = document.createElement('div');
    readonly channels: Channel[];

    constructor(audioContext: AudioContext) {
        const channelCount = audioContext.destination.channelCount;
        this.channelMerger = audioContext.createChannelMerger(channelCount);
        this.channels = Array(channelCount).fill(undefined).map((_, index) => new Channel(audioContext, index));
        for (let i = 0; i < channelCount; ++i) {
            this.channels[i].gain.connect(this.channelMerger, 0, i)
            this.element.appendChild(this.channels[i].element);
        }
        this.channelMerger.connect(audioContext.destination);
    }
}