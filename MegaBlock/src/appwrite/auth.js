import conf from "../conf/conf";

import { Client, ID, Account } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriterUrl)
      .setProject(conf.appwriterProject);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      return error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("appwrite service:: getCurrentUser:: error", error);
    }

    return null;
  }

  async logOut() {
    try {
      await this.account.deleteSession();
    } catch (error) {
      console.log("appwrite service:: getCurrentUser:: error", error);
    }
  }
}

const authservice = new AuthService();

export default authservice;

///IMP FUTURE CODE

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1')

//     .setProject('[PROJECT_ID]');

//     const account = new Account(Client);

//     const user = await account.create(
//         Id.unique(),
//         'email@example.com',
//         'password'
//     );
