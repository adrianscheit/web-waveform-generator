export class WaveShaperCurve {
    private slope: number = 0; // [-1,1]
    private shift: number = 0; // [-1,1]

    readonly curve: Float32Array = new Float32Array(101);
    readonly canvas = document.createElement('canvas');
    private readonly canvasContext: CanvasRenderingContext2D = this.canvas.getContext('2d')!;

    constructor() {
        this.canvas.width = 101;
        this.canvas.height = 101;
        this.canvasContext.fillStyle = '#234';
        this.canvasContext.strokeStyle = '#dcb';
        this.updateCurve();
    }

    setSlope(percentage: number): void {
        this.slope = (percentage - 50) / 50;
        this.updateCurve();
    }

    setShift(percentage: number): void {
        this.shift = (percentage - 50) / 50;
        this.updateCurve();
    }

    private updateCurve(): void {
        for (let i = 0; i <= 100; ++i) {
            const x = (i - 50) / 50 + this.shift; // [-1,1]
            const y = Math.pow(Math.abs(x), this.slope >= 0 ? 1 - this.slope : 1 / (1 + this.slope));
            this.curve[i] = Math.min(1, Math.max(-1, y * (x < 0 ? -1 : 1)));
        }

        this.drawCurve();
    }

    private drawCurve() {
        this.canvasContext.fillRect(0, 0, 101, 101);
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(0.5, this.curve[0] * -50 + 50.5);
        for (let i = 1; i <= 100; ++i) {
            this.canvasContext.lineTo(i + 0.5, this.curve[i] * -50 + 50.5);
        }
        this.canvasContext.stroke();
    }
}