/*
  Warnings:

  - You are about to drop the `DrinkBeverage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DrinkCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DrinkCountry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DrinkPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DrinkProducer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DrinkTasting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DrinkBeverage" DROP CONSTRAINT "DrinkBeverage_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "DrinkBeverage" DROP CONSTRAINT "DrinkBeverage_countryId_fkey";

-- DropForeignKey
ALTER TABLE "DrinkBeverage" DROP CONSTRAINT "DrinkBeverage_producerId_fkey";

-- DropForeignKey
ALTER TABLE "DrinkPrice" DROP CONSTRAINT "DrinkPrice_beverageId_fkey";

-- DropForeignKey
ALTER TABLE "DrinkProducer" DROP CONSTRAINT "DrinkProducer_countryId_fkey";

-- DropForeignKey
ALTER TABLE "DrinkTasting" DROP CONSTRAINT "DrinkTasting_beverageId_fkey";

-- DropTable
DROP TABLE "DrinkBeverage";

-- DropTable
DROP TABLE "DrinkCategory";

-- DropTable
DROP TABLE "DrinkCountry";

-- DropTable
DROP TABLE "DrinkPrice";

-- DropTable
DROP TABLE "DrinkProducer";

-- DropTable
DROP TABLE "DrinkTasting";

-- CreateTable
CREATE TABLE "drink_country" (
    "country_id" SERIAL NOT NULL,
    "name_ko" VARCHAR(100) NOT NULL,
    "name_en" VARCHAR(100),
    "iso_code" VARCHAR(10),
    "continent" VARCHAR(50),
    "flag_path" VARCHAR(255),
    "list_order" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',

    CONSTRAINT "drink_country_pkey" PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "drink_category" (
    "category_id" SERIAL NOT NULL,
    "parent_id" INTEGER NOT NULL DEFAULT 0,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "depth" SMALLINT NOT NULL DEFAULT 1,
    "list_order" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',

    CONSTRAINT "drink_category_pkey" PRIMARY KEY ("category_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drink_country_iso_code_key" ON "drink_country"("iso_code");

-- CreateIndex
CREATE INDEX "idx_name_ko" ON "drink_country"("name_ko");

-- CreateIndex
CREATE INDEX "idx_iso_code" ON "drink_country"("iso_code");
