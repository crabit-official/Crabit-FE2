import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

interface IMainCardProps {
  content: string;
  title: string;
}

function MainCard({ title, content }: IMainCardProps) {
  return (
    <Flex rowColumn="center" className="w-2/3 gap-2 rounded-xl bg-main-pink px-2 py-5 md:min-w-60 md:px-14 md:py-10">
      <Typography size="h2" className="break-keep text-center text-sm font-bold text-white sm:font-extrabold md:text-xl">
        {title}
      </Typography>
      <Typography as="p" size="h5" className="break-keep text-center text-[10px] font-medium text-white md:text-sm">
        {content}
      </Typography>
    </Flex>
  );
}

export default MainCard;
