import InstructorStudentList from '@/app/academy/(workspace)/[id]/setting/components/InstructorStudentList';
import PrincipalStudentList from '@/app/academy/(workspace)/[id]/setting/components/PrincipalStudentList';
import { fetchData } from '@/shared/apis/fetch-data';
import { ACADEMY_ROLE } from '@/shared/enums/academy';
import type { IAcademyProfile, IAcademyResponse } from '@/shared/types/acadmy';

async function StudentManagementPage({ params }: { params: { id: string } }) {
  const res = await fetchData<IAcademyResponse<IAcademyProfile>>(`/api/v1/academies/${Number(params.id)}`, 'GET');

  if (res.result.academyRole === ACADEMY_ROLE.PRINCIPAL) return <PrincipalStudentList academyId={Number(params.id)} />;

  return <InstructorStudentList academyId={Number(params.id)} />;
}
export default StudentManagementPage;
