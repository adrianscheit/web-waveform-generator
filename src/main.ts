import { Channels } from "./channel";

const audioContext = new AudioContext();
audioContext.suspend();
const infoText: Text = document.getElementById('info')!.appendChild(document.createTextNode(
    `destination ${audioContext.destination.numberOfInputs} channelCount ${audioContext.destination.channelCount}`
));
console.log(audioContext);
document.getElementById('channels')!.appendChild(new Channels(audioContext).element);
const pause = document.getElementById('pause') as HTMLInputElement;
pause.addEventListener('change', () => {
    if (pause.checked) {
        audioContext.suspend();
    } else {
        audioContext.resume();
    }
});
