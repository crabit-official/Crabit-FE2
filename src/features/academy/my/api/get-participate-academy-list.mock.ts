import type { HttpHandler } from 'msw';
import { http, HttpResponse } from 'msw';

export const GET_MOCK_PARTICIPATE_ACADEMY_LIST = {
  success: {
    isSuccess: true,
    code: 'string',
    message: 'string',
    result: {
      memberAcademyList: [
        {
          academyId: 0,
          academyName: 'string',
          academyMainImageUrl: 'string',
          academyMemberId: 0,
          academyRole: 'PRINCIPAL',
          academyMemberNickname: 'string',
          academyMemberProfileImageUrl: 'string',
        },
      ],
      nextCursor: 0,
      hasNext: true,
    },
    error: {
      isSuccess: false,
    },
  },
};

export const getParticipateAcademyList: HttpHandler = http.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/api/v1/members`, () =>
  HttpResponse.json(GET_MOCK_PARTICIPATE_ACADEMY_LIST.success),
);
