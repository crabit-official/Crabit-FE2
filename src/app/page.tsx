import { isMocking } from '@/shared/constants/constants';

function Home() {
  return (
    <div className="w-full p-4">
      <h1>{isMocking() ? 'Mocking' : 'Not Mocking'}.</h1>
    </div>
  );
}

export default Home;
