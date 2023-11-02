import { PrismaClient } from '@prisma/client'

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default prisma;
// use `prisma` in your application to read and write data in your DB

