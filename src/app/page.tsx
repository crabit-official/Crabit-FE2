import Typography from '@/shared/components/Typography';
import { isMocking } from '@/shared/constants/constants';

function Home() {
  return (
    <div className="p-4">
      <h1>{isMocking() ? 'Mocking' : 'Not Mocking'}.</h1>
      <Typography size="h5" color="main-pink">
        안녕하세요, Crabit 입니다 CI Check
      </Typography>
      <Typography size="h5" color="main-pink">
        안녕하세요, Crabit 입니다 CI Check
      </Typography>
      <Typography size="h5" color="main-pink">
        안녕하세요, Crabit 입니다 CI Check
      </Typography>
      <Typography size="h5" color="main-pink">
        안녕하세요, Crabit 입니다 CI Check
      </Typography>
    </div>
  );
}

export default Home;
