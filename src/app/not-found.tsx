import Link from 'next/link';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function NotFoundPage() {
  return (
    <Flex rowColumn="center" className="h-full min-h-[500px] gap-5">
      <Typography size="h1" className="text-7xl font-extrabold text-main-deep-pink">
        404
      </Typography>
      <Flex rowColumn="center" className="gap-1">
        <Typography size="h3" as="span" className="font-normal">
          페이지를 찾지 못했어요
        </Typography>
        <Typography size="h6" as="p" className="font-normal opacity-80">
          페이지 주소를 다시 한번 확인해 주세요.
        </Typography>
      </Flex>
      <Flex>
        <Typography size="h6" as="p" className="font-normal">
          <Link href="/" className="text-main-deep-pink">
            홈 페이지
          </Link>
          로 돌아가기
        </Typography>
      </Flex>
    </Flex>
  );
}
export default NotFoundPage;
