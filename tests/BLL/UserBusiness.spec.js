const db = require('@/DAL/Models');
const userBusiness = require('@/BLL/UserBusiness');

describe('UserBusiness', () => {
  beforeEach(async () => {
    await db.Users.destroy({
      where: {},
      force: true,
    });
  });
  describe('AddUser', () => {
    it('should add user successfully and return user created', async () => {
      // arrange
      const user = {
        UserId: 1,
        Email: 'test@gmail.com',
        Password: '123456',
        PhoneNumber: '0298293821',
        LastName: 'Bridgerton',
        FirstName: 'Daphne',
        IsFemale: true,
      };

      // act
      const addedUser = await userBusiness.AddUser(user);

      // assert
      const dbUser = await db.Users.findByPk(1);
      expect(dbUser).not.toBeUndefined();
      expect(addedUser.UserId).toEqual(dbUser.UserId);
    });
  });

  describe('GetUser', () => {
    it('should get the user by provided email', async () => {
      // arrange
      const email = 'test@gmail.com';

      await db.Users.create({
        UserId: 1,
        Email: 'test@gmail.com',
        Password: '123456',
        PhoneNumber: '0298293821',
        LastName: 'Bridgerton',
        FirstName: 'Daphne',
        IsFemale: true,
      });
      await db.Users.create({
        UserId: 2,
        Email: 'test1@gmail.com',
        Password: '123456',
        PhoneNumber: '0298293821',
        LastName: 'Bridgerton',
        FirstName: 'Jessie',
        IsFemale: true,
      });

      // act
      const user = await userBusiness.GetUser(email);

      // assert
      expect(user.UserId).toEqual(1);
    });

    it('should return undefined when there is no user found', async () => {
      // arrange
      const email = 'test@gmail.com';

      await db.Users.create({
        UserId: 2,
        Email: 'test1@gmail.com',
        Password: '123456',
        PhoneNumber: '0298293821',
        LastName: 'Bridgerton',
        FirstName: 'Jessie',
        IsFemale: true,
      });

      // act
      const user = await userBusiness.GetUser(email);

      // assert
      expect(user).toBeUndefined();
    });
  });

  describe('GetUserById', () => {
    it('should get user by provided user id', async () => {
      // arrange
      const userId = 1;

      await db.Users.create({
        UserId: 1,
        Email: 'test@gmail.com',
        Password: '123456',
        PhoneNumber: '0298293821',
        LastName: 'Bridgerton',
        FirstName: 'Daphne',
        IsFemale: true,
      });
      await db.Users.create({
        UserId: 2,
        Email: 'test1@gmail.com',
        Password: '123456',
        PhoneNumber: '0298293821',
        LastName: 'Bridgerton',
        FirstName: 'Jessie',
        IsFemale: true,
      });

      // act
      const user = await userBusiness.GetUserById(userId);

      // assert
      expect(user.UserId).toEqual(1);
    });

    it('should return undefined when no user founđ', async () => {
      // arrange
      const userId = 1;

      await db.Users.create({
        UserId: 2,
        Email: 'test1@gmail.com',
        Password: '123456',
        PhoneNumber: '0298293821',
        LastName: 'Bridgerton',
        FirstName: 'Jessie',
        IsFemale: true,
      });

      // act
      const user = await userBusiness.GetUserById(userId);

      // assert
      expect(user).toBeUndefined();
    });
  });

  describe('GetOrAddUserByFacebookProfile', () => {
    it('should get user info when the profile is already stored in db', async () => {
      // arrange
      const profile = {
        id: 1,
        name: {
          givenName: 'Daphne',
          familyName: 'Bridgerton',
        },
      };

      await db.Users.create({
        UserId: 1,
        Email: 'test@gmail.com',
        Password: '123456',
        PhoneNumber: '0298293821',
        LastName: 'Bridgerton',
        FirstName: 'Daphne',
        IsFemale: true,
        FacebookId: 1,
      });

      // act
      const user = await userBusiness.GetOrAddUserByFacebookProfile(profile);

      // assert
      expect(user).not.toBeUndefined();
      expect(user.UserId).toEqual(1);
    });

    it('should add user with facebook info when user has not logged in by facebook', async () => {
      // arrange
      const profile = {
        id: 1,
        name: {
          givenName: 'Daphne',
          familyName: 'Bridgerton',
        },
      };

      // act
      const user = await userBusiness.GetOrAddUserByFacebookProfile(profile);

      // assert
      const addedUser = await db.Users.findByPk(user.UserId);
      expect(addedUser).not.toBeUndefined();
      expect(addedUser.FacebookId).toEqual('1');
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
