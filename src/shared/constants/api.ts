const VERSION = 'v1';

export enum ACADMEY_ROLE {
  INSTRUCTOR = 'INSTRUCTOR',
  PRINCIPAL = 'PRINCIPAL',
  STUDENT = 'STUDENT',
}

export const API_PATHS = {
  ACADEMY: {
    GET_MY_ACADEMY: ({ academyRole, cursor, take }: { academyRole: ACADMEY_ROLE; cursor: number; take: number }) =>
      `/api/${VERSION}/member?academyRole=${academyRole}&cursor=${cursor}&take=${take}`,
  },
};
