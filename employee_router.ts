import express from "express";
import { Client } from 'pg'
import { DataSource, FindOptionsWhere, Like } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "./Employee";
import dataSource from "./data-source";

const employeeRouter = express.Router();
let count = 2;


employeeRouter.get('/', async (req, res) => {
    const nameFilter = req.query.name;
    const emailFilter = req.query.email
    const employeeRepository = dataSource.getRepository(Employee);
    
    // const filters: FindOptionsWhere<Employee> = {};
    // if(nameFilter){
    //     filters.name = Like(`${nameFilter}%`);
    // }
    // const newEmployee = await employeeRepository.find({
    //     where: filters
    // });

    const qb = employeeRepository.createQueryBuilder();
    if(nameFilter){
        qb.andWhere("name LIKE :name", {name: `${nameFilter}%`});
    }
    if(emailFilter){
        qb.andWhere("email LIKE :email", {email: `%${emailFilter}%`});
    }

    const newEmployee = await qb.getMany();

    res.status(200).send(newEmployee);
})

employeeRouter.get('/:id', async (req, res) => {

    const employeeRepository = dataSource.getRepository(Employee);
    const newEmployee = await employeeRepository.findOneBy(
        {
            id: Number(req.params.id)
        }
    );


    res.status(200).send(newEmployee);
})

employeeRouter.post('/', async (req, res) => {

    const newEmployee = new Employee();
    newEmployee.email = req.body.email;
    newEmployee.name = req.body.name;


    const employeeRepository = dataSource.getRepository(Employee);
    const savedEmployee = await employeeRepository.save(newEmployee)

    res.status(201).send(savedEmployee);
})

employeeRouter.put('/:id', async (req, res) => {
    const employeeRepository = dataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy(
        {
            id: Number(req.params.id)
        }
    );

    employee.name = req.body.name;
    employee.email = req.body.email;
    await employeeRepository.save(employee)

    res.status(201).send(employee);
})

employeeRouter.delete('/:id', async (req, res) => {
    const employeeRepository = dataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy(
        {
            id: Number(req.params.id)
        }
    );


    await employeeRepository.softRemove(employee)

    res.status(201).send(employee);
})

export default employeeRouter;