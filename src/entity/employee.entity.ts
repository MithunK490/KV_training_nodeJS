import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";
import AbstractEntity from "./abstract-entity";
import { Role } from "../utils/role.enum";
import Department from "./department-entity";

@Entity("employees")
class Employee extends AbstractEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    age: number

    @OneToOne(() => Address, (address) => address.employee, { cascade: true })
    address: Address;

    @Column()
    password: string;

    @Column({ default: Role.DEVELOPER })
    role: Role;

    @ManyToOne(() => Department, (department) => department.id, { cascade: true })
    department: Department

    @Column({default: 3})
    department_id: number
}

export default Employee;