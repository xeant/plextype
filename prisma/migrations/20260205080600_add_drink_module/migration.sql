-- CreateTable
CREATE TABLE "DrinkCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DrinkCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinkCountry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isoCode" TEXT,

    CONSTRAINT "DrinkCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinkProducer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DrinkProducer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinkBeverage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    "producerId" INTEGER NOT NULL,
    "abv" DOUBLE PRECISION NOT NULL,
    "volume" INTEGER,
    "description" TEXT,
    "imageUrl" TEXT,
    "specData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DrinkBeverage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinkTasting" (
    "id" SERIAL NOT NULL,
    "beverageId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "nose" TEXT,
    "palate" TEXT,
    "finish" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DrinkTasting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinkPrice" (
    "id" SERIAL NOT NULL,
    "beverageId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'KRW',
    "shopName" TEXT,
    "boughtAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DrinkPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DrinkCategory_name_key" ON "DrinkCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DrinkCategory_code_key" ON "DrinkCategory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "DrinkCountry_name_key" ON "DrinkCountry"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DrinkCountry_isoCode_key" ON "DrinkCountry"("isoCode");

-- AddForeignKey
ALTER TABLE "DrinkProducer" ADD CONSTRAINT "DrinkProducer_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "DrinkCountry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkBeverage" ADD CONSTRAINT "DrinkBeverage_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "DrinkCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkBeverage" ADD CONSTRAINT "DrinkBeverage_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "DrinkCountry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkBeverage" ADD CONSTRAINT "DrinkBeverage_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "DrinkProducer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkTasting" ADD CONSTRAINT "DrinkTasting_beverageId_fkey" FOREIGN KEY ("beverageId") REFERENCES "DrinkBeverage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkPrice" ADD CONSTRAINT "DrinkPrice_beverageId_fkey" FOREIGN KEY ("beverageId") REFERENCES "DrinkBeverage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
