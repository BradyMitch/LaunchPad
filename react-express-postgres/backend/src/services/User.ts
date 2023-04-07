import { User } from '../entities';
import { UserRepository } from '../repositories';
import { IKeycloakUser } from '../keycloak';

/**
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @returns An object with methods for performing operations on users.
 */
export const UserService = () => {
  const userRepository = UserRepository();

  // Create user if they don't exist, or update an existing user.
  const activateKeycloakIdirUser = async (userData: IKeycloakUser): Promise<User | undefined> => {
    // Find user if exists.
    if (!userData.idir_user_guid) return undefined;
    const idirUser = await userRepository.getUserByGuid(userData.idir_user_guid);

    if (!idirUser) {
      // User does not exist, create user.
      const newUser = {
        guid: userData.idir_user_guid,
        username: userData.idir_username,
        email: userData.email,
        firstName: userData.given_name,
        lastName: userData.family_name,
        roles: userData.client_roles ?? [],
        lastUpdated: new Date(),
        lastLogin: new Date(),
      };
      return await userRepository.createUser(newUser);
    }

    // Update user.
    const updatedUser = {
      roles: userData.client_roles ?? [],
      lastUpdated: new Date(),
      lastLogin: new Date(),
    };
    return await userRepository.updateUser(idirUser.guid as string, updatedUser);
  };

  // Retrieve a user by their id.
  const getUserById = async (id: number): Promise<User | undefined | null> => {
    return await userRepository.getUserById(id);
  };

  // Retrieve a user by their guid.
  const getUserByGuid = async (guid: string): Promise<User | undefined | null> => {
    return await userRepository.getUserByGuid(guid);
  };

  return {
    activateKeycloakIdirUser,
    getUserById,
    getUserByGuid,
  };
};
