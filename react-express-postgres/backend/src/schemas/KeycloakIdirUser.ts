import { z } from 'zod';

export const KeycloakIdirUser = z.object({
  idir_user_guid: z.string(),
  identity_provider: z.string(),
  idir_username: z.string(),
  name: z.string(),
  preferred_username: z.string(),
  email: z.string(),
  given_name: z.string(),
  display_name: z.string(),
  family_name: z.string(),
  client_roles: z.array(z.string()).optional(),
});
