import * as fs from 'fs';

console.log(1); 
const timer = setTimeout(() => { 
    console.log(8); 
}, 5000); 
 
console.log(2); 


let count=5;
const interval = setInterval(() => { 
    console.log(`${count}`); 
    count++; 
    if (count > 7){
        clearInterval(interval)
    }
}, 1000);

fs.writeFile('input.txt', '4',(err: NodeJS.ErrnoException | null) => {
    if (err) {
        console.error("Failed to write 4:", err);
        return;
    }
    console.log(4)
fs.readFile('input.txt', 'utf8',(err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            console.error("Failed to read:", err);
            return;
        }
    });
});

console.log(3); 
