import type { SupportedGames } from "./SupportedGames";

export enum UserRoles {
  AllPermissions = `allpermissions`,
  Admin = `admin`,
  Poster = `poster`,
  Approver = `approver`,
  Moderator = `moderator`,
  Banned = `banned`,
}

export interface UserRolesObject {
  sitewide: UserRoles[];
  perGame: {
    [gameName in SupportedGames]?: UserRoles[];
  };
}

export function checkUser(
  roles: UserRolesObject,
  checkingRole: UserRoles,
  game: string,
) {
  let hasCheckingRole =
    roles.sitewide.includes(checkingRole) ||
    (roles.perGame[game as SupportedGames] || []).includes(checkingRole);
  let hasAllPermissions =
    roles.sitewide.includes(UserRoles.AllPermissions) ||
    (roles.perGame[game as SupportedGames] || []).includes(
      UserRoles.AllPermissions,
    );
  return hasCheckingRole || hasAllPermissions;
}