import type { HttpHandler } from 'msw';

import { getParticipateAcademyList } from '@/features/academy/my/api/get-participate-academy-list.mock';
import { getMockVideosPopularList } from '@/features/main/api/get-videos-popular-list.mock';

export const handlers: HttpHandler[] = [getMockVideosPopularList, getParticipateAcademyList];
