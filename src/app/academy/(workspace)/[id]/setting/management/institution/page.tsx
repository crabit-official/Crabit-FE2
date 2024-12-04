import InstitutionEdit from './components/InstitutionEdit';

interface IAcademyManageProps {
  params: {
    id: string;
  };
}

function InstitutionManagementPage({ params }: IAcademyManageProps) {
  return <InstitutionEdit academyId={Number(params.id)} />;
}
export default InstitutionManagementPage;
