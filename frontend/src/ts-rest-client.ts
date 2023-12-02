import { tsRestRoute } from '@monorepo-oidc-app/ts-router';
import { initQueryClient } from '@ts-rest/react-query';

export const tsRestClient = initQueryClient(tsRestRoute, {
    baseUrl: window.location.origin + '/api',
    baseHeaders: {},
});