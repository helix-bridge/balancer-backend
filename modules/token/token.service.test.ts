import { initRequestScopedContext, setRequestScopedContextValue } from '../context/request-scoped-context';
import { tokenService } from './token.service';

describe('Token service', () => {
    test('same token address for in two chains', async () => {
        const address = '0x1509706a6c66ca549ff0cb464de88231ddbe213b';
        const prices = await tokenService.getWhiteListedTokenPrices(['GNOSIS', 'ARBITRUM']);
        const filtered = prices.filter((token) => token.tokenAddress === address);
        expect(filtered.length).toBe(2);
    });

    test('update prices', async () => {
        initRequestScopedContext();
        setRequestScopedContextValue('chainId', '11155111');

        await tokenService.syncTokenContentData();
        await tokenService.updateTokenPrices(['SEPOLIA']);
    }, 500000);

    test('sync tokens from pool tokens', async () => {
        initRequestScopedContext();
        setRequestScopedContextValue('chainId', '34443');
        await tokenService.syncTokenContentData();
    });

    test('get tokens', async () => {
        initRequestScopedContext();
        setRequestScopedContextValue('chainId', '250');
        const list = await tokenService.getTokenDefinitions(['FANTOM']);
        expect(list.length).toBeGreaterThan(0);
    });
});
