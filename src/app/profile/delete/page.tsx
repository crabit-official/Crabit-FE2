import DeleteForm from '@/app/profile/components/DeleteForm';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function DeletePage() {
  return (
    <Flex rowColumn="center" className="gap-10">
      <Flex rowColumn="center" className="gap-2">
        <Typography size="h2" className="opacity-80">
          계정 탈퇴
        </Typography>
        <Typography size="h5" className="break-keep px-10 text-center text-sm font-normal opacity-70 sm:text-base">
          계정 탈퇴를 진행하시면, 본 계정 및 모든 관련 정보가 즉시 삭제되고, <br /> 탈퇴 후에는 다시 복구할 수 없습니다.
        </Typography>
      </Flex>
      <DeleteForm />
    </Flex>
  );
}
export default DeletePage;
