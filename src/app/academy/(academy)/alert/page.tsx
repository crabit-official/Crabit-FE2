import { HiDotsHorizontal } from 'react-icons/hi';

import ListRow from '@/features/academy/alert/components/ListRow';
import Container from '@/features/main/components/Container';

function AcademyAlertPage() {
  return (
    <Container>
      <div className="m-auto mt-5 h-dvh max-w-xl rounded-md bg-main-white">
        <ListRow
          icon={HiDotsHorizontal}
          contents={<ListRow.Texts title="안예원님이 키보드 구매를 실패했습니다." subTitle="아마도" />}
          // eslint-disable-next-line @next/next/no-img-element
          left={<img src="/images/logo_app.png" alt="이미지" />}
        />
        <ListRow
          icon={HiDotsHorizontal}
          contents={<ListRow.Texts title="안예원님이 키보드 구매를 실패했습니다." subTitle="아마도" />}
          // eslint-disable-next-line @next/next/no-img-element
          left={<img src="/images/logo_app.png" alt="이미지" />}
        />
        <ListRow
          icon={HiDotsHorizontal}
          contents={<ListRow.Texts title="안예원님이 키보드 구매를 실패했습니다." subTitle="아마도" />}
          // eslint-disable-next-line @next/next/no-img-element
          left={<img src="/images/logo_app.png" alt="이미지" />}
        />
        <ListRow
          icon={HiDotsHorizontal}
          contents={<ListRow.Texts title="안예원님이 키보드 구매를 실패했습니다." subTitle="아마도" />}
          // eslint-disable-next-line @next/next/no-img-element
          left={<img src="/images/logo_app.png" alt="이미지" />}
        />
      </div>
    </Container>
  );
}

export default AcademyAlertPage;
