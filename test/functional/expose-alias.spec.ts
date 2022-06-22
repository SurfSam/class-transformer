import 'reflect-metadata';
import { plainToInstance } from '../../src/index';
import { defaultMetadataStorage } from '../../src/storage';
import { Expose } from '../../src/decorators';

describe('exposing via alias', () => {
  beforeEach(() => defaultMetadataStorage.clear());
  afterEach(() => defaultMetadataStorage.clear());

  it('should expose the property based on the given alias', () => {
    class User {
      @Expose({ name: 'username', alias: ['user_name'] })
      name: string;
    }

    const plainUser = {
      user_name: 'John',
    };

    const firstUser = plainToInstance(User, plainUser);
    expect(firstUser.name).toEqual('John');
  });

  it('should prioritize name over alias', () => {
    class User {
      @Expose({ name: 'username', alias: ['user_name'] })
      name: string;
    }

    const plainUser = {
      username: 'John',
      user_name: 'Wick',
    };

    const firstUser = plainToInstance(User, plainUser);
    expect(firstUser.name).toEqual('John');
  });

  it('should override default values via alias', () => {
    class User {
      @Expose({ alias: ['user_name'] })
      name: string = 'John';
    }

    const plainUser = {
      user_name: 'Wick',
    };

    const firstUser = plainToInstance(User, plainUser);
    expect(firstUser.name).toEqual('Wick');
  });
});
