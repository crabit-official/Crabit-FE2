'use client';

import Image from 'next/image';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import PricingBox from '@/features/pricing/component/PricingBox';
import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import FramerScale from '@/shared/components/FramerScale';
import Typography from '@/shared/components/Typography';
import { PRICING } from '@/shared/constants/pricing';

function PricingPage() {
  return (
    <Flex column="start" className="min-h-[800px] w-full gap-24 px-5 py-20 sm:px-20 lg:px-40">
      <FramerScale className="flex flex-col gap-8">
        <Flex column="start" className="gap-1">
          <StateLabel label="챌린지" className="w-fit" variant="red" />
          <Typography size="h2">크래빗 챌린지 요금제</Typography>
          <p className="break-keep text-sm font-medium opacity-60 md:text-base">아직 베타 테스트 중에 있어, 요금제는 추후 업데이트 될 예정입니다</p>
        </Flex>
        <Flex className="w-full flex-wrap gap-4 px-4 sm:px-10 2xl:px-0">
          {PRICING.map((item) => (
            <PricingBox key={item.id} {...item} />
          ))}
        </Flex>
      </FramerScale>
      <Framer duration={0.6} className="flex flex-col gap-8">
        <Flex column="start" className="gap-1">
          <StateLabel label="장학카드" className="w-fit" variant="red" />
          <Typography size="h2">크래빗 장학카드 요금제</Typography>
          <p className="break-keep text-sm font-medium opacity-60 md:text-base">디자인 의뢰 요청 시, 전체 금액에서 40,000원이 추가됩니다</p>
        </Flex>
        <Flex column="center" className="w-full gap-3">
          <Flex row="center" className="w-full flex-col gap-3 md:flex-row">
            <Framer duration={0.3} className="flex min-h-52 w-full flex-col justify-between gap-4 rounded-2xl bg-[#121212] p-10 text-white">
              <Flex column="start" className="gap-3">
                <Image src="/images/card.webp" alt="card img" width={50} height={50} />
                <Typography size="h3" className="text-white">
                  교통카드 기능 포함
                </Typography>
              </Flex>
              <Typography size="h4" className="text-end text-white">
                ▸ 장당 5,000원
              </Typography>
            </Framer>
            <Framer duration={0.6} className="flex min-h-52 w-full flex-col justify-between gap-4 rounded-2xl bg-[#121212] p-10 text-white">
              <Flex column="start" className="gap-3">
                <Image src="/images/card.webp" alt="card img" width={50} height={50} />
                <Typography size="h3" className="text-white">
                  교통카드 기능 미포함
                </Typography>
              </Flex>
              <Typography size="h4" className="text-end text-white">
                ▸ 장당 4,500원
              </Typography>
            </Framer>
          </Flex>
          <Framer className="flex w-full flex-col gap-8 rounded-2xl border border-solid border-gray-200 bg-[#F9FAFB] p-10 text-sm md:text-base">
            <Typography size="h1" className="pb-2 text-center font-bold">
              참고사항
            </Typography>
            <Flex column="start" className="gap-2">
              <p className="font-normal">
                • 배송비는 <strong className="font-bold">착불</strong>입니다.
              </p>
              <p>
                • 최소 주문수량은 <strong className="font-bold text-main-deep-pink">50장</strong>입니다.
              </p>
              <p>• 교통카드로 충전된 금액은 크래빗 결제 잔액으로 사용이 불가능합니다.</p>
              <p className="break-keep px-3 text-xs font-normal opacity-80 md:text-sm">
                교통카드(태그 결제)로 결제한 내역은 교통카드 충전 금액에서 결제가 되고, 결제카드로(카드를 꽂거나 긁는 방식)로 결제하셔야 원장님이 충전해주신
                금액에서 차감됩니다.
              </p>
              <p className="font-normal">
                • 직접 디자인하시는 경우, <strong className="font-bold">디자인 가이드</strong>를 꼭 참고하여 작업해 주세요. (규격, 주의사항 등)
              </p>
              <p className="font-normal">
                • 카드 관련 문의 사항은 <strong className="font-bold">채널톡, 카카오톡 채널 또는 인스타그램</strong>으로 문의해 주세요.
              </p>
            </Flex>
            <p className="font-normal">* 공동구매를 통해 가격 할인 혜택을 받고자 하는 경우, 카카오채널 @크래빗 으로 문의 바랍니다.</p>
          </Framer>
        </Flex>
      </Framer>
    </Flex>
  );
}

export default PricingPage;
