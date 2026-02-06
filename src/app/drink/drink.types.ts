// src/app/drink/drink.types.ts

// 1. 외부 API에서 받아오는 데이터의 규격
export interface ExternalCountryResponse {
  name: { common: string };
  translations: {
    kor: { common: string };
  };
  cca2: string;
  continents: string[];
  flags: {
    svg: string;
    png: string;
  };
}

// 2. 우리 DB(Prisma)에서 꺼내온 데이터의 규격
export interface DrinkCountry {
  countryId: number;
  nameKo: string;
  nameEn: string | null;
  isoCode: string | null;
  continent: string | null;
  flagPath: string | null;
  listOrder: number;
  status: string;
}