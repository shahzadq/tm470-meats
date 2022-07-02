import { internalWithAuth, handlerWithAuth } from './withAuth';

export const auth = { internal: internalWithAuth, handler: handlerWithAuth };
