import { IKeycloakUser } from '../keycloak';
import { UserService } from '../services';

// Called after login to create or update a user.
const activateUser = async (userInfo: IKeycloakUser) => {
  // Determine the provider.
  const provider = userInfo?.identity_provider;
  if (provider !== 'idir') return;

  // Create or update the user.
  const userService = UserService();
  await userService.activateKeycloakIdirUser(userInfo);
};

export default activateUser;
