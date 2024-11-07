'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import ChallengeDetail from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeDetail';
import ChallengeStatistics from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeStatistics';
import StudentCard from '@/app/academy/(workspace)/[id]/dashboard/components/StudentCard';
import Flex from '@/shared/components/Flex';

const menu = [
  { id: 0, text: '챌린지' },
  { id: 1, text: '학생' },
  { id: 2, text: '통계' },
];

function ContentDetail() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  let content;

  if (selectedMenu === 0) {
    content = <ChallengeDetail />;
  }

  if (selectedMenu === 1) {
    content = (
      <Flex column="between" className="w-full gap-2">
        <StudentCard color="blue" academyNickname="안예원" school="대진고등학교" challengeLogSubmissionStatus="진행 중" />
        <StudentCard color="gray" academyNickname="정혜원" school="한수중학교" challengeLogSubmissionStatus="시작 전" />
      </Flex>
    );
  }

  if (selectedMenu === 2) {
    content = <ChallengeStatistics />;
  }

  return (
    <Flex className="w-full">
      <Flex column="start" className="min-h-[550px] w-full lg:w-2/3">
        <motion.div className="flex w-full justify-center">
          <ul className="flex gap-3">
            {menu.map((item) => (
              <li key={item.id} onClick={() => setSelectedMenu(item.id)} className="relative cursor-pointer py-1">
                <p className={`${selectedMenu === item.id ? 'font-bold text-main-deep-pink' : 'font-medium text-gray-600'}`}>{item.text}</p>
                {selectedMenu === item.id && <motion.div layoutId="underline" className="absolute inset-x-0 bottom-0 h-[2px] bg-main-deep-pink" />}
              </li>
            ))}
          </ul>
        </motion.div>
        <Flex rowColumn="center" className="z-10 mt-1 w-full gap-20 py-10">
          {content}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ContentDetail;
