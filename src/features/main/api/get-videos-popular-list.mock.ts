import type { HttpHandler } from 'msw';
import { http, HttpResponse } from 'msw';

export const GET_MOCK_VIDEOS_POPULAR_LIST = {
  success: {
    lists: [
      {
        videoId: 'nYJH2lChijE',
        title: '옥상으로 따라와 고기 먹게 | 🔥나영석의 지글지글',
        description: '황정민 정우성이랑 옥상에서 삼겹살 먹은 썰 푼다 (이왜진)\n\n#채널십오야 #지글지글 #유료광고포함\n#황정민 #정우성 #서울의봄',
        channelId: 'UCQ2O-iftmnlfrBuNsUUTofQ',
        channelTitle: '채널십오야',
        thumbnail: {
          url: 'https://i.ytimg.com/vi/nYJH2lChijE/mqdefault.jpg',
          width: 320,
          height: 180,
        },
        publishedAt: '2023-11-24T09:00:43Z',
        publishedAtDisplayText: '1일 전',
        viewCount: 2189821,
        viewCountDisplayText: '218만',
      },
      {
        videoId: 'U_-csilw6XA',
        title: '[무대풀버젼] 골든걸스 - Good-Bye Baby (미쓰에이) [골든걸스] | KBS 방송',
        description:
          '✨[무대풀버젼] 골든걸스 - Good-Bye Baby (미쓰에이)✨\n\n\n\n감히 레전드 무대라고 자신있게 말씀드립니다.\n\n\n\n#골든걸스 #goldengirls #jyp #박진영 #인순이 #박미경 #신효범 #이은미 #god #스트레이키즈 #원더걸스 #비 #박지윤 #itzy #nmixx #량현량하 #kbs #kpop #twice #수지 #아니고 #수니 #미쓰에이 #MissA #무대풀버젼 #레전드\n\n#골든걸스 #goldengirls #jyp #박진영 #인순이 #박미경 #신효범 #이은미 #god #스트레이키즈 #원더걸스 #비 #박지윤 #itzy #nmixx #량현량하 #kbs #kpop #twice #Goldengirls \n\n----------------------------------------------\n        ▶ Homepage : https://www.kbs.co.kr/\n        ▶ Wavve : https://www.wavve.com/\n        ▶ Youtube : https://www.youtube.com/@KBSgoldengirls\n----------------------------------------------',
        channelId: 'UC5HpbZB-E-DzFpWZmVlcV9A',
        channelTitle: 'KBS 골든걸스',
        thumbnail: {
          url: 'https://i.ytimg.com/vi/U_-csilw6XA/mqdefault.jpg',
          width: 320,
          height: 180,
        },
        publishedAt: '2023-11-24T15:34:13Z',
        publishedAtDisplayText: '1일 전',
        viewCount: 880302,
        viewCountDisplayText: '88만',
      },
    ],
    nextPageToken: 'CAoQAA',
    totalResults: 200,
  },
};

export const getMockVideosPopularList: HttpHandler = http.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/popular-list`, () =>
  HttpResponse.json(GET_MOCK_VIDEOS_POPULAR_LIST.success),
);
