import { HiDotsHorizontal } from 'react-icons/hi';

import ListRow from '@/features/academy/alert/components/ListRow';
import Container from '@/features/main/components/Container';

function MyAcademyPage() {
  return (
    <Container>
      <div className="mt-5 h-dvh max-w-2xl rounded-md md:ml-20">
        <ListRow
          icon={HiDotsHorizontal}
          contents={<ListRow.Texts title="Craft Your Habit 학원." subTitle="Crabit 학원 " />}
          // eslint-disable-next-line @next/next/no-img-element
          left={<img src="/images/logo_app.png" alt="이미지" />}
        />
      </div>
    </Container>
  );
}

export default MyAcademyPage;
