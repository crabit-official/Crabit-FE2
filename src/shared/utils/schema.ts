import { z } from 'zod';

// 공통 스키마
export const email = z.string().email({ message: '유효한 이메일을 입력하세요.' });
export const password = z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/, {
  message: '비밀번호는 8~16자이며, 영문자, 숫자, 특수문자를 포함해야 합니다.',
});
const name = z.string().min(1, { message: '이름을 입력해주세요.' });
const points = z.number().min(0, { message: '포인트는 0 이상이어야 합니다.' });
const days = z.number().min(3, { message: '최소 3일 이상이어야 합니다.' }).max(31, { message: '최대 31일까지만 가능합니다.' });
const participationMethod = z.enum(['ASSIGNED', 'SELF_PARTICIPATING']);
const challengeCategory = z.enum(['STUDYING', 'EXERCISE', 'READING', 'NEWSPAPER', 'COPYING', 'DIARY_WRITING', 'LIFESTYLE_HABITS', 'ETC']);
const visibility = z.enum(['PUBLIC', 'PROTECTED']);
const booleanAgreement = z.boolean().refine((e) => e, {
  message: '필수 동의 사항입니다.',
});
const academyName = z.string();
const address = z.string();
const addressDetail = z.string();
const mainImageUrl = z.string();
const contactNumber = z.string();
const profileImageUrl = z.string();
const introduction = z.string().max(500);
const nickname = z.string();
const school = z.string();

const loginSchema = z.object({
  email,
  password,
});

const signUpSchema = z.object({
  name,
  email,
  password,
  privacyPolicyAllowed: booleanAgreement,
  termsOfServiceAllowed: booleanAgreement,
});

const challengeSchema = z.object({
  challengeParticipationMethod: participationMethod,
  studentIdList: z.array(z.number()).optional(),
  challengeCategory,
  challengeMarketVisibility: visibility,
});

const challengeTwoSchema = z.object({
  points,
  totalDays: days,
});

const marketSchema = challengeTwoSchema.merge(
  z.object({
    challengeParticipationMethod: participationMethod,
  }),
);

const emailSchema = z.object({
  email,
});

const passwordSchema = z.object({
  password,
});

const institutionSchema = z.object({
  academyName,
  address,
  addressDetail,
  mainImageUrl,
  contactNumber,
});

const institutionProfileSchema = z.object({
  profileImageUrl,
  school,
  nickname,
  introduction,
});

export {
  challengeSchema,
  challengeTwoSchema,
  emailSchema,
  institutionProfileSchema,
  institutionSchema,
  loginSchema,
  marketSchema,
  passwordSchema,
  signUpSchema,
};
