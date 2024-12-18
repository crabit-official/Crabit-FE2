'use client';

import { FaCheck, FaCreditCard } from 'react-icons/fa6';
import { motion } from 'framer-motion';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { TCardInfo } from '@/shared/constants/card';

function CardInfoBox({ title, contents, id }: TCardInfo) {
  return (
    <motion.div
      className={`${id % 2 !== 0 ? 'justify-start' : 'justify-end'} flex`}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{
        ease: 'easeOut',
        duration: 1.5,
      }}
    >
      <Flex column="start" className="w-full gap-5 rounded-xl border border-solid border-gray-100 p-6 shadow-custom md:w-[700px]">
        <Flex column="start" className="gap-2">
          <FaCreditCard size={25} className="text-main-deep-pink" />
          <Typography size="h3" className="whitespace-pre">
            {title}
          </Typography>
        </Flex>
        <Flex as="ul" column="start" className="gap-2">
          {contents.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-gray-600">
              <FaCheck className="shrink-0" />
              <Typography size="h5" className="break-keep text-h7 font-normal sm:text-h5 sm:font-normal">
                {item.content}
              </Typography>
            </li>
          ))}
        </Flex>
      </Flex>
    </motion.div>
  );
}
export default CardInfoBox;
