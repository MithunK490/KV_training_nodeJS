import { DataSource, Repository } from "typeorm";
import Department from "../entity/department-entity";
import dataSource from "../db/postgres.db";

class DepartmentRepository {
    private dataSource: DataSource;

    constructor(private departmentRepository: Repository<Department>) {
        this.dataSource = dataSource;
    }

    findAlldepartments(): Promise<Department[]> {
        return this.departmentRepository.find();
    }

    findDepartmentById(id: number): Promise<Department> {
        return this.departmentRepository.findOne({
            where: { id: id },
        })
    };

    createDepartment(department: Department): Promise<Department> {
        return this.departmentRepository.save(department);
    }

    updateDepartment(department: Department): Promise<Department>{
        return this.departmentRepository.save(department)
    }

    deleteDepartment(department: Department): Promise<Department>{
        return this.departmentRepository.softRemove(department)
    }
}

export default DepartmentRepository