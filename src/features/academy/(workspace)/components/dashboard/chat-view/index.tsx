import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function ChatView() {
  return (
    <Flex column="center" className="px-4">
      <Typography size="h4">현황 한눈에 보기</Typography>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        <Flex className="w-full bg-red-100">dd</Flex>
        <Flex className="w-full bg-red-100">dd</Flex>
        <Flex className="w-full bg-red-100">dd</Flex>
      </div>
    </Flex>
  );
}

export default ChatView;
