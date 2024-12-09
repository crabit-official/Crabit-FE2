import Container from '@/features/main/components/Container';
import Form from '@/features/space/enroll/components/form';
import Heading from '@/shared/components/Heading';

function Page() {
  return (
    <Container>
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-3 text-3xl font-bold">기관 등록하기</h1>
        <Heading title="크래빗에 오신 것을 환영합니다!" subTitle=" 기관을 등록하고 크래빗의 다양한 서비스를 이용해보세요." className="mb-5" />
        <Form />
      </div>
    </Container>
  );
}

export default Page;
