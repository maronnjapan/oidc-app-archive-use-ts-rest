import { PrismaClient } from "@prisma/client";
import { initialize } from "../src/__generated__/fabbrica/index";

const prisma = new PrismaClient()
initialize({ prisma })

afterEach(async () => {
    const allProperties = Object.keys(prisma);
    // 関数たちを取り除いたものがモデル名
    // 関数は全て "$" "_" 始まりなのを利用している
    const modelNames = allProperties.filter(
        (x) => !(typeof x === "string" && (x.startsWith("$") || x.startsWith("_")))
    );

    for (const modelName of modelNames) {
        await prisma[modelName].deleteMany();
    }
})

afterAll(async () => {
    await prisma.$disconnect()
})