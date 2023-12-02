import { tsRestRoute } from '@monorepo-oidc-app/ts-router/dist';
import { nestControllerContract } from '@ts-rest/nest';

export const c = nestControllerContract(tsRestRoute);
