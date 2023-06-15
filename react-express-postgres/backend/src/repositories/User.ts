import { User } from '../entities';
import dataSource from '../../dataSource';

/**
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @returns An object with methods for performing CRUD operations on users.
 */
export const UserRepository = () => {
  const repository = dataSource.getRepository(User);

  // Retrieve a user by their id.
  const getById = async (id: number): Promise<User | undefined | null> => {
    return await repository.findOne({ where: { id } });
  };

  // Retrieve a user by their guid.
  const getByGuid = async (guid: string): Promise<User | undefined | null> => {
    return await repository.findOne({ where: { guid } });
  };

  // Creates a new user.
  const create = async (userData: Partial<User>): Promise<User> => {
    const user = repository.create(userData);
    return await repository.save(user);
  };

  // Updates an existing user.
  const update = async (guid: string, userData: Partial<User>): Promise<User | undefined> => {
    const user = await getByGuid(guid);
    if (!user) return undefined;
    Object.assign(user, userData);
    return await repository.save(user);
  };

  // Return an object with the defined methods.
  return {
    create,
    update,
    getById,
    getByGuid,
  };
};
