import SettingList from '@/app/academy/(workspace)/[id]/setting/components/setting-list';
import Container from '@/features/main/components/Container';
import Heading from '@/shared/components/Heading';
import Spacing from '@/shared/components/Spacing/spacing';

function AcademySettingBoardPage({ params }: { params: { id: string } }) {
  return (
    <Container>
      <div className="m-auto mt-10 max-w-[600px]">
        <Heading title="설정" subTitle="학원 관리의 모든 것" />
        <Spacing direction="vertical" size={24} />
        <SettingList id={params.id} />
      </div>
    </Container>
  );
}

export default AcademySettingBoardPage;
