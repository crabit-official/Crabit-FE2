export const initMocking = async () => {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');

    server.listen({ onUnhandledRequest: 'bypass' });
  } else {
    const { worker } = await import('./browser');

    await worker.start({ onUnhandledRequest: 'bypass' });
  }
};
