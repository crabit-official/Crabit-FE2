'use client';

import { useState } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { MdDashboard } from 'react-icons/md';
import { useRouter } from 'next/navigation';

import Menu from '@/features/academy/my/components/Sidebar/menu';
import MenuItem from '@/features/main/components/MenuItem';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

const sidebarMenu = [
  {
    title: '역할',
    list: [
      {
        title: '학생',
        path: '/academy/my?academyRole=STUDENT',
        icon: <MdDashboard />,
      },
      {
        title: '선생님',
        path: '/academy/my?academyRole=INSTRUCTOR',
        icon: <MdDashboard />,
      },
      {
        title: '원장님',
        path: '/academy/my?academyRole=PRINCIPAL',
        icon: <MdDashboard />,
      },
    ],
  },
];

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="hidden w-full max-w-[300px] list-none md:block">
        {sidebarMenu.map((menu) => (
          <li key={menu.title}>
            {menu.list.map((item) => (
              <Menu
                key={item.title}
                item={item}
                onClick={() => {
                  router.push(item.path);
                  setIsOpen(false);
                }}
              />
            ))}
          </li>
        ))}
      </div>
      <>
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative mb-3 flex h-[48px] w-full cursor-pointer items-center gap-3 rounded-2xl border-8 border-main-black py-4 transition hover:bg-neutral-100 md:hidden"
        >
          <BiMenuAltLeft size={40} />
          <Typography size="h4">필터</Typography>
        </div>
        {isOpen &&
          sidebarMenu.map((menu) => (
            <li key={menu.title} className="relative block md:hidden">
              <div className="absolute top-0 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
                <Flex column="start" className="cursor-pointer">
                  {menu.list.map((item) => (
                    <MenuItem
                      key={item.title}
                      label={item.title}
                      onClick={() => {
                        router.push(item.path);
                        setIsOpen(false);
                      }}
                    />
                  ))}
                </Flex>
              </div>
            </li>
          ))}
      </>
    </>
  );
}

export default SideBar;
