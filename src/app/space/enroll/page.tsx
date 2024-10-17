import Container from '@/features/main/components/Container';
import Form from '@/features/space/enroll/components/form';
import Heading from '@/shared/components/Heading';

function Page() {
  return (
    <Container>
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-3 text-3xl font-bold">학원 등록 페이지</h1>
        <Heading title="Crabit에 오신 것을 환영합니다." subTitle="학원을 등록해주세요!" className="mb-5" />
        <Form />
      </div>
    </Container>
  );
}

export default Page;
