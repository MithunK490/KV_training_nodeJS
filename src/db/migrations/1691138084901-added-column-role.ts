import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedColumnRole1691138084901 implements MigrationInterface {
    name = 'AddedColumnRole1691138084901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "role" character varying NOT NULL DEFAULT 'Developer'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
    }

}
