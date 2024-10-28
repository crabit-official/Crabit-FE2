import InvitationTab from '@/app/academy/(workspace)/[id]/invitation/components/Invitation';
import Container from '@/features/main/components/Container';
import Heading from '@/shared/components/Heading';
import Spacing from '@/shared/components/Spacing/spacing';

function InvitationPage() {
  return (
    <Container>
      <Spacing direction="vertical" size={32} />
      <div className="w-100 rounded-2xl bg-white p-5">
        <Heading title="학원 초대 코드 발급" subTitle="초대 코드 발급" />
        <InvitationTab />
      </div>
    </Container>
  );
}

export default InvitationPage;
