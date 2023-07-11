import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTipoX1689118919816 implements MigrationInterface {
    name = 'CreateTipoX1689118919816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_surveys_users" ("id" uuid PRIMARY KEY NOT NULL, "user_id" uuid NOT NULL, "survey_id" uuid NOT NULL, "value" number, "created_at" timestamp NOT NULL DEFAULT (NOW()))`);
        await queryRunner.query(`INSERT INTO "temporary_surveys_users"("id", "user_id", "survey_id", "value", "created_at") SELECT "id", "user_id", "survey_id", "value", "created_at" FROM "surveys_users"`);
        await queryRunner.query(`DROP TABLE "surveys_users"`);
        await queryRunner.query(`ALTER TABLE "temporary_surveys_users" RENAME TO "surveys_users"`);
        await queryRunner.query(`CREATE TABLE "tipo_x" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "email", "created_at") SELECT "id", "name", "email", "created_at" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_surveys" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_surveys"("id", "title", "description", "created_at") SELECT "id", "title", "description", "created_at" FROM "surveys"`);
        await queryRunner.query(`DROP TABLE "surveys"`);
        await queryRunner.query(`ALTER TABLE "temporary_surveys" RENAME TO "surveys"`);
        await queryRunner.query(`CREATE TABLE "temporary_surveys_users" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "survey_id" varchar NOT NULL, "value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_surveys_users"("id", "user_id", "survey_id", "value", "created_at") SELECT "id", "user_id", "survey_id", "value", "created_at" FROM "surveys_users"`);
        await queryRunner.query(`DROP TABLE "surveys_users"`);
        await queryRunner.query(`ALTER TABLE "temporary_surveys_users" RENAME TO "surveys_users"`);
        await queryRunner.query(`CREATE TABLE "temporary_surveys_users" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "survey_id" varchar NOT NULL, "value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_aff7fa2cc60afd965ffd7fc99d6" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_51346a475a75d7fbd85a894fa16" FOREIGN KEY ("survey_id") REFERENCES "surveys" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_surveys_users"("id", "user_id", "survey_id", "value", "created_at") SELECT "id", "user_id", "survey_id", "value", "created_at" FROM "surveys_users"`);
        await queryRunner.query(`DROP TABLE "surveys_users"`);
        await queryRunner.query(`ALTER TABLE "temporary_surveys_users" RENAME TO "surveys_users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "surveys_users" RENAME TO "temporary_surveys_users"`);
        await queryRunner.query(`CREATE TABLE "surveys_users" ("id" varchar PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL, "survey_id" varchar NOT NULL, "value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "surveys_users"("id", "user_id", "survey_id", "value", "created_at") SELECT "id", "user_id", "survey_id", "value", "created_at" FROM "temporary_surveys_users"`);
        await queryRunner.query(`DROP TABLE "temporary_surveys_users"`);
        await queryRunner.query(`ALTER TABLE "surveys_users" RENAME TO "temporary_surveys_users"`);
        await queryRunner.query(`CREATE TABLE "surveys_users" ("id" uuid PRIMARY KEY NOT NULL, "user_id" uuid NOT NULL, "survey_id" uuid NOT NULL, "value" number, "created_at" timestamp NOT NULL DEFAULT (NOW()))`);
        await queryRunner.query(`INSERT INTO "surveys_users"("id", "user_id", "survey_id", "value", "created_at") SELECT "id", "user_id", "survey_id", "value", "created_at" FROM "temporary_surveys_users"`);
        await queryRunner.query(`DROP TABLE "temporary_surveys_users"`);
        await queryRunner.query(`ALTER TABLE "surveys" RENAME TO "temporary_surveys"`);
        await queryRunner.query(`CREATE TABLE "surveys" ("id" uuid PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (NOW()))`);
        await queryRunner.query(`INSERT INTO "surveys"("id", "title", "description", "created_at") SELECT "id", "title", "description", "created_at" FROM "temporary_surveys"`);
        await queryRunner.query(`DROP TABLE "temporary_surveys"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (NOW()))`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "email", "created_at") SELECT "id", "name", "email", "created_at" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`DROP TABLE "tipo_x"`);
        await queryRunner.query(`ALTER TABLE "surveys_users" RENAME TO "temporary_surveys_users"`);
        await queryRunner.query(`CREATE TABLE "surveys_users" ("id" uuid PRIMARY KEY NOT NULL, "user_id" uuid NOT NULL, "survey_id" uuid NOT NULL, "value" number, "created_at" timestamp NOT NULL DEFAULT (NOW()), CONSTRAINT "FK_51346a475a75d7fbd85a894fa16" FOREIGN KEY ("survey_id") REFERENCES "surveys" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_aff7fa2cc60afd965ffd7fc99d6" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "surveys_users"("id", "user_id", "survey_id", "value", "created_at") SELECT "id", "user_id", "survey_id", "value", "created_at" FROM "temporary_surveys_users"`);
        await queryRunner.query(`DROP TABLE "temporary_surveys_users"`);
    }

}
