import * as iron from 'iron-session';

export const ironSessionConfig = {
  cookieName: 'auth',
  password:
    'tm470-meats_auth_3aa46c72-a9f5-11ec-b909-0242ac120002+02a6de14-b809-11ec-b909-0242ac120002',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  secure: process.env.NODE_ENV === 'production',
};

declare module 'iron-session' {
  interface IronSessionData {
    user: {
      _id: string;
      email: string;
    },
    verified: boolean
  }
}
