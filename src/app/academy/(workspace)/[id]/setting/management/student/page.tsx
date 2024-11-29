import StudentList from '@/app/academy/(workspace)/[id]/setting/components/StudentList';

interface IManagementProps {
  params: {
    id: string;
  };
}

function StudentManagementPage({ params }: IManagementProps) {
  return <StudentList academyId={Number(params.id)} />;
}
export default StudentManagementPage;
