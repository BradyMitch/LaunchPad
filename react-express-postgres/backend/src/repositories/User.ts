import { User } from '../entities';
import dataSource from '../../dataSource';

/**
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @returns An object with methods for performing CRUD operations on users.
 */
export const UserRepository = () => {
  const repository = dataSource.getRepository(User);

  // Retrieve a user by their id.
  const getUserById = async (id: number): Promise<User | undefined | null> => {
    return await repository.findOne({ where: { id } });
  };

  // Retrieve a user by their guid.
  const getUserByGuid = async (guid: string): Promise<User | undefined | null> => {
    return await repository.findOne({ where: { guid } });
  };

  // Creates a new user.
  const createUser = async (userData: Partial<User>): Promise<User> => {
    const user = repository.create(userData);
    return await repository.save(user);
  };

  // Updates an existing user.
  const updateUser = async (guid: string, userData: Partial<User>): Promise<User | undefined> => {
    const user = await getUserByGuid(guid);
    if (!user) return undefined;
    Object.assign(user, userData);
    return await repository.save(user);
  };

  // Return an object with the defined methods.
  return {
    createUser,
    updateUser,
    getUserById,
    getUserByGuid,
  };
};
