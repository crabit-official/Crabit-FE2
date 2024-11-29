import StudentList from '@/app/academy/(workspace)/[id]/setting/components/StudentList';

interface IManagementProps {
  params: {
    id: string;
  };
}

function StudentManagementPage({ params }: IManagementProps) {
  // if (res.result.academyRole === ACADEMY_ROLE.PRINCIPAL) return <PrincipalStudentList academyId={Number(params.id)} />;

  return <StudentList academyId={Number(params.id)} />;
}
export default StudentManagementPage;
