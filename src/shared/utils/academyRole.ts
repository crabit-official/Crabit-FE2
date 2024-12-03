import { ACADEMY_ROLE } from '@/shared/enums/academy';

export function getRoleName(role: ACADEMY_ROLE) {
  switch (role) {
    case ACADEMY_ROLE.STUDENT:
      return '학생';
    case ACADEMY_ROLE.PRINCIPAL:
      return '대표';
    case ACADEMY_ROLE.INSTRUCTOR:
      return '관리자';
    default:
      return '학생';
  }
}
