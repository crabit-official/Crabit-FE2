import InvitationTab from '@/app/academy/(workspace)/[id]/setting/management/invitation/components/Invitation';
import Flex from '@/shared/components/Flex';
import Heading from '@/shared/components/Heading';

function InvitationPage() {
  return (
    <Flex column="start" className="w-full gap-20 rounded-2xl bg-white p-5">
      <Heading title="학원 초대 코드 발급" subTitle="초대 코드 발급" />
      <InvitationTab />
    </Flex>
  );
}

export default InvitationPage;
