import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1722040038621 implements MigrationInterface {
    name = 'CreateDatabase1722040038621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "bio" character varying, "image" character varying, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
