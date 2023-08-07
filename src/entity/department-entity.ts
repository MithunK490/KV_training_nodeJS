import { Column, Entity, OneToMany } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Employee from "./employee.entity";

@Entity("departments")
class Department extends AbstractEntity {

    @Column()
    name: string;

    @Column()
    location: string

    @OneToMany(() => Employee, (employee) => employee.id, { cascade: true })
    employee: Employee[]
}

export default Department