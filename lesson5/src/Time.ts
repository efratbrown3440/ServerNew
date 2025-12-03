
import EventEmitter from 'events';

 class Time extends EventEmitter {

    public value: number;
    public maxValue: number;


    constructor(maxValue: number, startValue: number = 0) {
        super();
        this.maxValue = maxValue;
        this.value = startValue;
    }



    public TIC(): void {
        this.value++;
        if (this.value >= this.maxValue) {
            this.value = 0;
            this.emit('reset');

        }

    }
  
}

const hours = new Time(24, 18);
const minutes = new Time(60, 57);
const seconds = new Time(60, 55);


seconds.on('reset', () => minutes.TIC());
minutes.on('reset', () => hours.TIC());
hours.on('reset',()=>seconds.TIC());


    
function displayTime() {
    
    const s = String(seconds.value);
    const m = String(minutes.value);
    const h = String(hours.value);
    
    console.log(`${s} : ${m} : ${h}`);
}

displayTime(); 


const clockInterval = setInterval(() => {
    seconds.TIC(); 
    displayTime();  
}, 1000);