import type { HttpHandler } from 'msw';

import { getMockVideosPopularList } from '@/features/main/api/get-videos-popular-list.mock';

export const handlers: HttpHandler[] = [getMockVideosPopularList];
