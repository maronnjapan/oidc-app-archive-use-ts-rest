import { contract } from "@repo/ts-rest";
import { initQueryClient } from "@ts-rest/react-query";
export const tsRestClient = initQueryClient(contract, {
    baseUrl: "http://localhost:3000/api",
    baseHeaders: {},
});