'use server';

import { PrismaClient } from "@prisma/client";
interface UserListParams {
  page: number | null
  keyword: string | null
  target: string | null
}
