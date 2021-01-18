interface UserData {
  sshd: string;
  fullName?: string;
  roles: string[];
  firstName?: string;
}

interface TokenPayload {
  sub: string;
  roles: string[];
  fullname?: string;
}

const handleTokenPayload = (token: string): TokenPayload => {
  const flatToken = token.split('.');
  const decoded = atob(flatToken[1]);
  const tokenJson = JSON.parse(decoded);

  return tokenJson;
};

const getFirstName = (fullName?: string): string => {
  if (fullName) {
    const names = fullName.split(' ');
    const firstName = names[0].toLowerCase();
    const capitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    return capitalized;
  }
  return '';
};

const getUser = (token: string): UserData => {
  const user = {} as UserData;

  const { sub, fullname: fullName, roles } = handleTokenPayload(token);

  user.sshd = sub;
  user.fullName = fullName;
  user.roles = roles;
  user.firstName = getFirstName(fullName);

  return user;
};

export { getUser };
export type { UserData };
