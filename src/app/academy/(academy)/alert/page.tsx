import Image from 'next/image';

import ListRow from '@/features/academy/alert/components/ListRow';
import Container from '@/features/main/components/Container';

function AcademyAlertPage() {
  return (
    <Container>
      <div className="m-auto mt-5 h-dvh max-w-xl rounded-md bg-main-white">
        <ListRow
          contents={<ListRow.Texts title="안예원님이 키보드 구매를 실패했습니다." subTitle="아마도" />}
          left={<Image src="/images/logo_app.png" alt="이미지" width="60" height="60" />}
          withArrow
        />
        <ListRow
          contents={<ListRow.Texts title="안예원님이 키보드 구매를 실패했습니다." subTitle="아마도" />}
          left={<Image src="/images/logo_app.png" alt="이미지" width="60" height="60" />}
          withArrow
        />
      </div>
    </Container>
  );
}

export default AcademyAlertPage;
