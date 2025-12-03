import  fs from 'fs'; 
import SuperAgent, { Response } from 'superagent';


let toCurrency: string = "ILS";
let amountToConvert: number = 1;

const writeCallback = function (err:any) { 
    if (err) {
        console.log(" Failed writing result to file:", err);
    } else {
        console.log("Finish writing");
    }
}

const getCallback = function (err: any, res: Response) {
    let finalRate: number = 1;
    
    if (err) {
        console.log(`API request to the url has failed: ${err}`);
        finalRate = 1; 
    } 
    else { 
        try {
            finalRate = res.body.rates[toCurrency]; 
        } catch (parseError) {
            console.log(` Failed to parse API response or currency: ${toCurrency} not found.`);
            finalRate = 1;
        }
    }
    
    const result = finalRate * amountToConvert;
    fs.writeFile('output.txt', result.toString(), writeCallback);
}

const readCallBack = function (err:any, data: Buffer) {
    if (err) {
        console.log("Failed reading input data:", err);
        return;
    }
    
    const input = data.toString().split(" ");
    
    const fromCurrency = input[0]; 
    toCurrency = input[1]; 
    amountToConvert = parseFloat(input[2]); 

    console.log(`Input read: Converting ${amountToConvert} from ${fromCurrency} to ${toCurrency}`);
    
   const url = `https://api.frankfurter.dev/v1/latest?from=${fromCurrency}&to=${toCurrency }`;
    
    SuperAgent.get(url, getCallback); 
}


fs.readFile('src/input.txt', readCallBack); 
console.log("finish");