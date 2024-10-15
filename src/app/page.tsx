import { AiOutlinePlus } from 'react-icons/ai';

import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { isMocking } from '@/shared/constants/constants';

function Home() {
  return (
    <div className="p-4">
      <h1>{isMocking() ? 'Mocking' : 'Not Mocking'}.</h1>
      <Flex column="center">
        <Flex row="center">
          <Typography size="h5" color="main-pink">
            안녕하세요, Crabit 입니다 CI Check
          </Typography>
          <Typography size="h5" color="main-pink">
            안녕하세요, Crabit 입니다 CI Check
          </Typography>
        </Flex>
        <Flex row-column="center">
          <Typography size="h5" color="main-pink">
            안녕하세요, Crabit 입니다 CI Check
          </Typography>
          <Typography className="cursor-pointer" size="h5" color="main-pink">
            안녕하세요, Crabit 입니다 CI Check
          </Typography>
          <Flex column="center">
            <Button size="sm" variant="outline" icon={AiOutlinePlus}>
              456 123
            </Button>
            <Button size="md">
              <Typography size="h5" color="main-white">
                123
              </Typography>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default Home;
