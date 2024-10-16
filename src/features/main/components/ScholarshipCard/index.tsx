import { BiSolidRightArrow } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

interface IScholarshipCardProps {
  contents: {
    id: number;
    title: string;
  }[];
  position: string;
  title: string;
}

function ScholarshipCard({ title, contents, position = 'left' }: IScholarshipCardProps) {
  return (
    <Flex className={position === 'left' ? 'justify-start' : 'justify-end'}>
      <Flex column="center" className="w-full gap-16 rounded-xl bg-neutral-50 p-12 md:w-[700px]">
        <Flex column="center" className="gap-4">
          <Typography size="h1" className="break-keep text-xl font-extrabold text-main-pink md:text-2xl">
            {title}
          </Typography>
          <Flex column="center">
            {contents.map((e) => (
              <Flex key={e.id} className="items-start justify-start gap-1">
                <BiSolidRightArrow size={9} className="mt-1.5 md:mt-2" />
                <Typography size="h5" as="p" className="w-96 break-keep text-sm font-normal md:text-base">
                  {e.title}
                </Typography>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex className="items-center justify-start gap-1">
          <Typography as="p" size="h5" className="text-sm text-neutral-200 md:text-base">
            더 알아보기
          </Typography>
          <IoIosArrowForward className="text-neutral-200" />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ScholarshipCard;
