import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
  password: z.string().min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
});

const signUpSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
  password: z.string().min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
  privacyPolicyAllowed: z.boolean().refine((e) => e, {
    message: '개인정보 처리 방침에 동의해야 합니다.',
  }),
  termsOfServiceAllowed: z.boolean().refine((e) => e, {
    message: '서비스 약관에 동의해야 합니다.',
  }),
});

const challengeSchema = z.object({
  challengeParticipationMethod: z.enum(['ASSIGNED', 'SELF_PARTICIPATING']),
  studentIdList: z.array(z.number()).optional(),
});

const challengeTwoSchema = z.object({
  challengeCategory: z.enum(['STUDYING', 'EXERCISE', 'READING', 'NEWSPAPER', 'COPYING', 'DIARY_WRITING', 'LIFESTYLE_HABITS', 'ETC']),
  challengeMarketVisibility: z.enum(['PUBLIC', 'PROTECTED']),
  points: z.number().min(0, { message: '포인트는 0 이상이어야 합니다' }),
  totalDays: z.number().min(3, { message: '최소 3일이상이어야 합니다.' }).max(31, { message: '최대 31일까지만 가능합니다' }),
});

export { challengeSchema, challengeTwoSchema, loginSchema, signUpSchema };
