import {Customer} from "../models/Customer";
import { Table } from  "../models/Table";
import { Order } from "../models/Order";
export class Restaurant
{
    private TablesIndex: number = 100;
    Tables: Table[] = [];
    Customers: Customer[] = [];
    
    addTable(seats: number): boolean
    {
        this.Tables.push(new Table(this.TablesIndex++, seats));
        this.Tables.sort((tab) => tab.seats);
        return true;
    }

    addCustomer(Id: number, Name: string):boolean
    {
        if(this.Customers.find((cust) => cust.id == Id) != undefined)
            return false;
        this.Customers.push(new Customer(Id, Name));
        console.log(`Customer ${Name} id ${Id} added successfully.`);
        return true;
    }

    findCustomer(Id:number):Customer | undefined
    {
        return this.Customers.find((cust) => cust.id == Id)
    }

    addOrder(customerId:number, NumOfPeoples: number):Order | undefined
    {
        const table = this.Tables.find((tab)=> !tab.isOccupied && tab.seats >= NumOfPeoples);
        if(table == undefined)
        {
            console.log("there is no avalable table for this order");
            return undefined; 
        }
        const customer = this.findCustomer(customerId);
        if(customer == undefined)
        {
            console.log("The customer cannot be found, please register.");
            return undefined; 
        }
        const order =  new Order(table);
        customer.addOrder(order);
        return order;
    }
    findorderbytable(tableId:number):Order | undefined
    {
        for(const lakoch of this.Customers)
        {
            const order = lakoch.orders.find((ord) => ord.table.tableId == this.TablesIndex && ord.orderStatus == 1);
            if(order != undefined)
                return order;
        }
        return undefined;
    }   
    findorderbycustomerditails(customerId:number):Order | undefined
    {
        const customeridd = this.findCustomer(customerId);
        if(customeridd == undefined)
            return undefined;
        return customeridd.orders.find((ord) => ord.orderStatus == 1);
    }  



}