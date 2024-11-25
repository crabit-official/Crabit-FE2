import { z } from 'zod';

// 공통 스키마
const emailSchema = z.string().email({ message: '유효한 이메일을 입력하세요.' });
const passwordSchema = z.string().min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' });
const nameSchema = z.string().min(1, { message: '이름을 입력해주세요.' });
const pointsSchema = z.number().min(0, { message: '포인트는 0 이상이어야 합니다' });
const daysSchema = z.number().min(3, { message: '최소 3일이상이어야 합니다.' }).max(31, { message: '최대 31일까지만 가능합니다' });
const participationMethodSchema = z.enum(['ASSIGNED', 'SELF_PARTICIPATING']);
const challengeCategorySchema = z.enum(['STUDYING', 'EXERCISE', 'READING', 'NEWSPAPER', 'COPYING', 'DIARY_WRITING', 'LIFESTYLE_HABITS', 'ETC']);
const visibilitySchema = z.enum(['PUBLIC', 'PROTECTED']);
const booleanAgreementSchema = z.boolean().refine((e) => e, {
  message: '필수 동의 사항입니다.',
});

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  privacyPolicyAllowed: booleanAgreementSchema,
  termsOfServiceAllowed: booleanAgreementSchema,
});

const challengeSchema = z.object({
  challengeParticipationMethod: participationMethodSchema,
  studentIdList: z.array(z.number()).optional(),
  challengeCategory: challengeCategorySchema,
  challengeMarketVisibility: visibilitySchema,
});

const challengeTwoSchema = z.object({
  points: pointsSchema,
  totalDays: daysSchema,
});

const marketSchema = challengeSchema.merge(
  z.object({
    points: pointsSchema,
    totalDays: daysSchema,
  }),
);

const emailSchama = z.object({
  email: emailSchema,
});

const passwordSchama = z.object({
  password: passwordSchema,
});

export { challengeSchema, challengeTwoSchema, emailSchama, loginSchema, marketSchema, passwordSchama, signUpSchema };
