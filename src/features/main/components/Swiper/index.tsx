import 'swiper/css';

import type { ReactNode } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper } from 'swiper/react';

export default function SwiperComponent({ children }: { children: ReactNode }) {
  return (
    <Swiper
      slidesPerView={4}
      centeredSlides
      spaceBetween={10}
      autoplay={{ delay: 0, disableOnInteraction: false }}
      modules={[Autoplay]}
      loop
      loopAdditionalSlides={1}
      speed={2000}
      breakpoints={{
        640: {
          slidesPerView: 5,
        },
        768: {
          slidesPerView: 10,
        },
      }}
    >
      {children}
    </Swiper>
  );
}
