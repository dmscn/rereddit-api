import { apiHelper } from '../../helpers/api-helper';
import { throws } from 'smid';

describe('nonexisting routes', () => {
  it('returns 404 with the path and method info', async () => {
    const { client } = await apiHelper();
    const { response } = await throws(client.get('/nonexisting'));
    expect(response.status).toBe(404);
    expect(response.data.message).toMatch(/GET \/nonexisting/);
  });
});
