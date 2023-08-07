import { MigrationInterface, QueryRunner } from "typeorm";

export class DepartmentIdAddedInEmployee1691397703338 implements MigrationInterface {
    name = 'DepartmentIdAddedInEmployee1691397703338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "department_id" integer NOT NULL DEFAULT '3'`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "department_id"`);
    }

}
