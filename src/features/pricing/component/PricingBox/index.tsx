import { IoCheckmark } from 'react-icons/io5';

import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';

interface IPricingProps {
  contents: { content: string; highlight?: boolean }[];
  id: number;
  price: string;
  subTitle: string;
  title: string;
}

function PricingBox({ title, price, contents, subTitle, id }: IPricingProps) {
  return (
    <Framer duration={id * 0.6} className="flex h-[450px] w-full flex-col gap-14 rounded-4xl border border-solid border-gray-200 p-10 shadow-custom md:w-72">
      <Flex rowColumn="center" className="gap-2">
        <Typography size="h4" className="font-bold">
          {title}
        </Typography>
        <Typography size="h1" className="text-3xl font-extrabold">
          {price}
        </Typography>
        <Typography size="h6" className="font-medium opacity-60">
          {subTitle}
        </Typography>
      </Flex>
      <ul className="flex w-full flex-col gap-5">
        {contents.map((item, idx) => (
          <li key={idx} className="flex gap-2">
            <IoCheckmark className="opacity-70" />
            <span className={`${item.highlight ? 'font-bold text-main-deep-pink' : 'text-black opacity-70'} break-keep text-[15px]`}>{item.content}</span>
          </li>
        ))}
      </ul>
    </Framer>
  );
}
export default PricingBox;
