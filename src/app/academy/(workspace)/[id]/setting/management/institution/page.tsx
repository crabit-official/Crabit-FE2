import AcademyEditForm from './components/AcademyEditForm';

interface IAcademyManageProps {
  params: {
    id: string;
  };
}

function AcademyManagementPage({ params }: IAcademyManageProps) {
  return <AcademyEditForm academyId={Number(params.id)} />;
}
export default AcademyManagementPage;
