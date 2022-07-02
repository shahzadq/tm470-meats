import { serverMiddleware } from './server-middleware';

describe('serverMiddleware', () => {
  it('should work', () => {
    expect(serverMiddleware()).toEqual('server-middleware');
  });
});
