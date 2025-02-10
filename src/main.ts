import { Channels } from "./channels";

const audioContext = new AudioContext();
audioContext.suspend();
const infoText: Text = document.getElementById('info')!.appendChild(document.createTextNode(
    `destination: ${audioContext.destination.numberOfInputs}, channelCount: ${audioContext.destination.channelCount}, sample rate: ${audioContext.sampleRate}`
));
console.log(audioContext);

const channels = new Channels(audioContext);
document.getElementById('channels')!.appendChild(channels.element);
console.log(channels);

const pause = document.getElementById('pause') as HTMLInputElement;
pause.addEventListener('change', () => {
    if (pause.checked) {
        audioContext.suspend();
    } else {
        audioContext.resume();
    }
});
