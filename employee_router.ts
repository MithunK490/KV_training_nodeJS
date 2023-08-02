import express from "express";
import Employee from "./Employee";

const employeeRouter = express.Router();
let count = 2;
const employees: Employee[] = [
    {
        id: 1,
        name: "Name1",
        email: "email1@gmail.com",
        crteatedAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        name: "Name2",
        email: "email2@gmail.com",
        crteatedAt: new Date(),
        updatedAt: new Date()
    }
]

employeeRouter.get('/', (req, res) => {
    console.log(req.url);
    res.status(200).send(employees);
})

employeeRouter.get('/:id', (req, res) => {
    console.log(req.url);
    const id = Number(req.params.id);
    const employee = employees.find(element => element.id == id);
    res.status(200).send(employee);
})

employeeRouter.post('/', (req, res) => {
    console.log(req.url);
    const newEmployee = new Employee();
    newEmployee.email = req.body.email;
    newEmployee.name = req.body.name;
    newEmployee.id = ++count;
    newEmployee.crteatedAt = new Date();
    newEmployee.updatedAt = new Date();
    employees.push(newEmployee);
    res.status(201).send(newEmployee);
})

employeeRouter.put('/:id', (req, res) => {
    console.log(req.url);
    const employee = employees.find(element => element.id == Number(req.params.id));
    employee.email = req.body.email;
    employee.name = req.body.name;
    employee.updatedAt = new Date();
    res.status(200).send(employee);
})

employeeRouter.delete('/:id', (req, res) => {
    console.log("employee deleted");
    const employeeIndexToDelete = employees.findIndex(element => element.id == Number(req.params.id));
    employees.splice(employeeIndexToDelete, 1);
    res.status(204).send();
})

export default employeeRouter;