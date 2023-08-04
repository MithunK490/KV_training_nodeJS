import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordAdded1691125776776 implements MigrationInterface {
    name = 'PasswordAdded1691125776776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);
    }

}
