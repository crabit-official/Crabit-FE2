'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import MenuItem from '@/features/main/components/MenuItem';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetInfiniteAcademyList from '@/shared/hooks/academy/useGetInfiniteAcademyList';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';

function AcademyMenu() {
  const router = useRouter();
  const params = useParams();
  const { useGetAcademyInfo } = useManageAcademy();
  const { data: academyInfo } = useGetAcademyInfo({ academyId: Number(params.id) });
  const { data: academies, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteAcademyList();

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) {
        void fetchNextPage();
      }
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div className="relative">
      <Flex onClick={toggleOpen} className="cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition duration-500 ease-in-out hover:bg-gray-100">
        {academyInfo?.result.academy.mainImageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${academyInfo?.result.academy.mainImageUrl}`}
            alt="academy logo"
            width={35}
            height={35}
            className="size-[35px] rounded-xl border border-solid border-gray-200 object-cover"
          />
        ) : (
          <Image
            src="/images/logo_app.png"
            alt="default academy logo"
            width={35}
            height={35}
            className="rounded-xl border border-solid border-gray-200 object-cover"
          />
        )}
        <Typography size="h5">{academyInfo?.result.academy.academyName}</Typography>
        <IoIosArrowDown />
      </Flex>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onMouseLeave={() => setIsOpen(false)}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-14 max-h-64 w-[40vw] overflow-hidden overflow-y-auto rounded-xl bg-white text-sm shadow-custom md:w-[150%]"
          >
            <div className="flex max-h-64 cursor-pointer flex-col">
              {academies?.pages.map((page) =>
                page.result.memberAcademyList.map((academy) => (
                  <MenuItem
                    icon={
                      academy?.academyMainImageUrl ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${academy.academyMainImageUrl}`}
                          alt="academy logo"
                          width={25}
                          height={25}
                          className="size-[25px] rounded-lg border border-solid border-gray-200 object-cover"
                        />
                      ) : (
                        <Image
                          src="/images/logo_app.png"
                          alt="default academy logo"
                          width={25}
                          height={25}
                          className="rounded-lg border border-solid border-gray-200 object-cover"
                        />
                      )
                    }
                    key={academy.academyId}
                    onClick={() => {
                      setIsOpen(false);
                      router.push(`/academy/${academy.academyId}/dashboard`);
                    }}
                    label={academy.academyName}
                  />
                )),
              )}
              <div ref={ref} className="h-5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AcademyMenu;
