// yarn vitest sor-debug.test.ts
import { Chain } from '@prisma/client';
import { initRequestScopedContext, setRequestScopedContextValue } from '../context/request-scoped-context';
import { poolService } from '../pool/pool.service';
import { sorService } from './sor.service';
import { chainIdToChain } from '../network/chain-id-to-chain';
import { PoolController } from '../controllers/pool-controller'; // Add this import statement

describe('sor debugging', () => {
    it('sor v2 arb eth->usdc', async () => {
        const chain = Chain.MAINNET;

        const chainId = Object.keys(chainIdToChain).find((key) => chainIdToChain[key] === chain) as string;
        initRequestScopedContext();
        setRequestScopedContextValue('chainId', chainId);
        //only do once before starting to debug
        // await poolService.syncAllPoolsFromSubgraph();
        // await poolService.loadOnChainDataForAllPools();
        // await poolService.updateLiquidityValuesForPools();

        const swaps = await sorService.getSorSwapPaths({
            chain,
            tokenIn: '0xba100000625a3754423978a60c9317c58a424e3d', // BAL
            tokenOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
            swapType: 'EXACT_IN',
            swapAmount: '1000000',
            queryBatchSwap: false,
            useProtocolVersion: 2,
            // callDataInput: {
            //     receiver: '0xb5e6b895734409Df411a052195eb4EE7e40d8696',
            //     sender: '0xb5e6b895734409Df411a052195eb4EE7e40d8696',
            //     slippagePercentage: '0.1',
            // },
        });

        console.log(swaps.returnAmount);
        expect(parseFloat(swaps.returnAmount)).toBeGreaterThan(0);
    }, 5000000);

    it.only('sor v3 sepolia eth->usdc', async () => {
        const chain = Chain.SEPOLIA;

        const chainId = Object.keys(chainIdToChain).find((key) => chainIdToChain[key] === chain) as string;
        initRequestScopedContext();
        setRequestScopedContextValue('chainId', chainId);
        //only do once before starting to debug
        await PoolController().addPoolsV3(chainId);
        await PoolController().syncPoolsV3(chainId);
        await PoolController().reloadPoolsV3(chain);

        const swaps = await sorService.getSorSwapPaths({
            chain,
            tokenIn: '0x8a88124522dbbf1e56352ba3de1d9f78c143751e', // USDC (aave)
            tokenOut: '0xde46e43f46ff74a23a65ebb0580cbe3dfe684a17', // DAI (aave)
            swapType: 'EXACT_IN',
            swapAmount: '0.01',
            queryBatchSwap: false,
            useProtocolVersion: 3,
            // callDataInput: {
            //     receiver: '0xb5e6b895734409Df411a052195eb4EE7e40d8696',
            //     sender: '0xb5e6b895734409Df411a052195eb4EE7e40d8696',
            //     slippagePercentage: '0.1',
            // },
        });

        console.log(swaps.returnAmount);
        expect(parseFloat(swaps.returnAmount)).toBeGreaterThan(0);
    }, 5000000);
});
