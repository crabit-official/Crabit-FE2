import InstructorDetail from '../components/InstructorDetail';

interface IInstructorDetailProps {
  params: {
    id: string;
    memberId: string;
  };
}

function InstructorDetailPage({ params }: IInstructorDetailProps) {
  return <InstructorDetail academyId={Number(params.id)} academyMemberId={Number(params.memberId)} />;
}

export default InstructorDetailPage;
