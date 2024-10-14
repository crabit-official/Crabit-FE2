import { setupWorker } from 'msw/browser';

import { handlers } from '@/shared/mocks/handler';

export const worker = setupWorker(...handlers);
