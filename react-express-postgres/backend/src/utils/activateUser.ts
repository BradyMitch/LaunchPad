import { KeycloakUser } from '@bcgov/keycloak-express';
import { UserService } from '../services';

// Called after login to create or update a user.
const activateUser = async (userInfo: KeycloakUser) => {
  // Determine the provider.
  const provider = userInfo?.identity_provider;
  if (provider !== 'idir') return;

  // Create or update the user.
  const userService = UserService();
  await userService.activateKeycloakIdirUser(userInfo);
};

export default activateUser;
