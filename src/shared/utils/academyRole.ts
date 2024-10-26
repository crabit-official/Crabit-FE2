import { ACADEMY_ROLE } from '@/shared/enums/academy';

export function getRoleName(role: ACADEMY_ROLE) {
  switch (role) {
    case ACADEMY_ROLE.STUDENT:
      return '학생';
    case ACADEMY_ROLE.PRINCIPAL:
      return '원장';
    case ACADEMY_ROLE.INSTRUCTOR:
      return '강사';
    default:
      return '학생';
  }
}
