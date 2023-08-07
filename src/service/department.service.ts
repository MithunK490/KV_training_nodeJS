import CreateDepartmentDto from "../dto/create-department-dto";
import Department from "../entity/department-entity";
import HttpException from "../exception/http.exception";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService {
    constructor(private departmentRepository: DepartmentRepository) { }

    getAllDepartments = async (): Promise<Department[]> => {
        return this.departmentRepository.findAlldepartments();
    }

    getDepartmentById = async (id: number): Promise<Department | null> => {
        const department = await this.departmentRepository.findDepartmentById(id);
        if (!department) {
            throw new HttpException(404, `Department not found with id ${id}`);
        }
        return department;
    }

    createDepartment =async (departmentDto:CreateDepartmentDto): Promise<Department> => {
        const department = new Department();
        department.name = departmentDto.name;
        department.location = departmentDto.location;
        return this.departmentRepository.createDepartment(department);
    }

    updateDepartment =async (departmentDto:CreateDepartmentDto, departmentId: number): Promise<Department> => {
        const department = await this.getDepartmentById(departmentId);
        department.name = departmentDto.name;
        department.location = departmentDto.location;
        return this.departmentRepository.updateDepartment(department);
    }

    deleteDepartment = async(id: number)=>{
        const department = await this.getDepartmentById(id)
        return this.departmentRepository.deleteDepartment(department);
    }


}

export default DepartmentService