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

export { loginSchema, signUpSchema };
