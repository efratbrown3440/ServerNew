import { Customer } from "./models/Customer";
import {Restaurant} from "./services/RestuarantManager"
import { Table } from "./models/Table"; 
import { Order } from "./models/Order";


function countDigits(num: number): number {
    const digits = num.toString().length;
    console.log(`מספר הספרות הוא: ${digits}`);
    return digits;
}



const input = process.argv[2];

if (!input) {
    console.log("לא נשלח פרמטר ");
    process.exit(1);
}

const num = Number(input);

if (isNaN(num)) {
    console.log("הפרמטר חייב להיות מספר!");
    process.exit(1);
}


countDigits(num);

const restaurant: Restaurant = new Restaurant()
console.log("Welcome to the Restaurant Management System");
restaurant.addCustomer(1234,"yael");
const currentCustomer: Customer | undefined =restaurant.findCustomer(1234);
if(currentCustomer != undefined)
    console.log(currentCustomer.name);
else
    console.log("No customer");
//יצירת שני שולחנות
restaurant.addTable(2);
restaurant.addTable(4);
//יצירת שלוש לקוות חדשים
restaurant.addCustomer(5678,"David");
restaurant.addCustomer(9012,"Leah");
restaurant.addCustomer(3456,"Miriam");
//יצירת שלוש הזמנות שאחת מהן לא יהיה שולחן פנוי
restaurant.addOrder(1234,2);
restaurant.addOrder(5678,4);
restaurant.addOrder(9012,6);
//מציאת מספר הזמנות ע"י מספר שולחן
const order=restaurant.findorderbytable(101);
if (order != undefined){
    order.addItem("Pizza",20);
    order.addItem("Coke",5);}
//מציאת הזמנה עפ"י פרטי הלקוח
const order2=restaurant.findorderbycustomerditails(1234);
if (order2 != undefined){
    order2.addItem("Pasta",54);
    order2.addItem("fish",60);
    let schom=order2.closeOrder();
    let total:number=0;
    order2.items.forEach(c => total+=c.price);
    if (schom!=total)
        console.log("טעות בחשבון נשתדל בפעם הבאה יותר,עמכם הסליחה!!");
}
restaurant.addOrder(3456,3);









