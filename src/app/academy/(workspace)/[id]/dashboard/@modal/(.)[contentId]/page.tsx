import Flex from '@/shared/components/Flex';

function ContentModal() {
  return (
    <Flex className="fixed left-0 top-0 z-10 size-full bg-[rgb(0,0,0,0.6)]">
      <Flex rowColumn="center" className="size-full">
        <Flex className="min-h-60 w-2/3 max-w-[800px] rounded-xl bg-white">테스트 모달</Flex>
      </Flex>
    </Flex>
  );
}

export default ContentModal;
