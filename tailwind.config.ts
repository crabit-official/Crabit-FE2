import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '18px', letterSpacing: '0', fontWeight: '400' }],
        'sm': ['14px', { lineHeight: '21px', letterSpacing: '0', fontWeight: '400' }],
        'base': ['14px', { lineHeight: '24px', letterSpacing: '0', fontWeight: '400' }],
        'xl': ['20px', '30px'],
        '2xl': ['24px', { lineHeight: '36px', letterSpacing: '0', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
};
export default config;
