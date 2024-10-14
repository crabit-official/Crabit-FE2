import { setupServer } from 'msw/node';

import { handlers } from '@/shared/mocks/handler';

export const server = setupServer(...handlers);
