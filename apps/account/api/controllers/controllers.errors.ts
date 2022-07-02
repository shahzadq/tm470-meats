import { interfaces } from '@tm470-meats/server/controllers';

export function constructNotFoundError(
  section: string
): interfaces.errors.IServerResponseError {
  return {
    message: `No ${section} account(s) found.`,
    status: 400,
  };
}
