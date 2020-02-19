import authentication from 'react-azure-b2c';
import decodeJWT from 'jwt-decode';

class Auth {
  isLoggedIn = () => authentication.getAccessToken() ? true : false;
  logout = () => authentication.signOut();
  getToken = () => authentication.getAccessToken();

  currentUser = () => {
    const decoded = decodeJWT(authentication.getAccessToken());

    return {
      name: decoded.name,
      firstName: decoded.given_name,
      lastName: decoded.family_name,
      emails: decoded.emails,
      city: decoded.city,
      country: decoded.country,
      jobTitle: decoded.jobTitle
    };
  }
}

export default Auth;