import { Fragment } from 'react';
import Image from 'next/image';
import { getServerSession } from 'next-auth';

import ListRow from '@/features/academy/alert/components/ListRow';
import Container from '@/features/main/components/Container';
import { authOptions } from '@/shared/utils/authOptions';

type TAcademy = {
  academyId: number;
  academyMainImageUrl: string;
  academyMemberId: number;
  academyMemberNickname: string;
  academyMemberProfileImageUrl: string;
  academyName: string;
  academyRole: string;
};

type TMyAcademyResult = {
  result: {
    hasNext: boolean;
    memberAcademyList: TAcademy[];
    nextCursor: number;
  };
};

function MyAcademyPage() {
  return (
    <Container>
      <div className="mt-5 h-dvh max-w-2xl rounded-md md:ml-20">
        <ListRow
          contents={<ListRow.Texts title="Craft Your Habit 학원." subTitle="Crabit 학원 " />}
          left={<Image src="/images/logo_app.png" alt="이미지" width={60} height={60} />}
          withArrow
        />
        <MyAcademy />
      </div>
    </Container>
  );
}

async function MyAcademy() {
  const session = await getServerSession(authOptions);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member?cursor=0&take=10`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const data: TMyAcademyResult = await response.json();

  return (
    <div>
      {data.result?.memberAcademyList.map((academy) => (
        <Fragment key={academy.academyId}>
          <ListRow
            right={academy.academyRole}
            left={academy.academyMainImageUrl == null ? <Image src="/images/logo_app.png" alt="이미지" width={60} height={60} /> : academy.academyMainImageUrl}
            contents={<ListRow.Texts title={academy.academyName} subTitle={academy.academyMemberId} />}
            withArrow
          />
        </Fragment>
      ))}
    </div>
  );
}

export default MyAcademyPage;
