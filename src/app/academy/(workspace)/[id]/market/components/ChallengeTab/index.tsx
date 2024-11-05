'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function ChallengeTab() {
  const currentPath = usePathname();

  return (
    <ul className="flex gap-4">
      <li
        className={`${currentPath === '/academy/123/market' ? 'border-b-2 border-solid border-main-pink font-bold text-main-deep-pink' : 'text-gray-600'} h-7 transition-transform duration-300 hover:scale-95 hover:border-b-2 hover:border-solid hover:border-main-pink hover:font-bold hover:text-main-deep-pink`}
      >
        <Link href="market" className="text-lg">
          크래빗 공식
        </Link>
      </li>
      <li className="text-gray-600' h-7 cursor-not-allowed">
        <div className="text-lg">학원 챌린지</div>
      </li>
      {/* <li */}
      {/*  className={`${currentPath === '/academy/123/academy' ? 'border-b-2 border-solid border-main-pink font-bold text-main-deep-pink' : 'text-gray-600'} h-7 transition-transform duration-300 hover:scale-95 hover:border-b-2 hover:border-solid hover:border-main-pink hover:font-bold hover:text-main-deep-pink`} */}
      {/* > */}
      {/*  <Link href="market/academy" className="text-lg"> */}
      {/*    학원 챌린지 */}
      {/*  </Link> */}
      {/* </li> */}
    </ul>
  );
}

export default ChallengeTab;
