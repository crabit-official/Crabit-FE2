import { isMocking } from '@/shared/constants';

function Home() {
  return <div className="p-4">{isMocking() ? 'Mocking' : 'Not Mocking'} 안녕하세요, Crabit 입니다 .</div>;
}

export default Home;
