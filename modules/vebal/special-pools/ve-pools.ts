/*
  The following hardcoded pools are missing in the subgraph but we have their pool data so we just need to provide a match between poolId and RootGauge address
*/
export const vePools: Record<string, string> = {
    '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014': '0xb78543e00712c3abba10d0852f6e38fde2aaba4d', //veBAL
    '0x9232a548dd9e81bac65500b5e0d918f8ba93675c000200000000000000000423': '0x56124eb16441a1ef12a4ccaeabdd3421281b795a', //veLIT
    '0xd689abc77b82803f22c49de5c8a0049cc74d11fd000200000000000000000524': '0x5b79494824bc256cd663648ee1aad251b32693a9', //veUSH
};

export const veGauges = Object.values(vePools).map((v) => v.toLowerCase());

export function getHardcodedVotingGauge(poolId: string) {
    // Make sure that root addresses and poolIds are lowercase
    const hardcoded: Record<string, string> = {};
    Object.entries(vePools).forEach(([key, value]) => {
        hardcoded[key.toLowerCase()] = value.toLowerCase();
    });

    const veRootGaugeAddress = hardcoded[poolId];
    if (!veRootGaugeAddress) return;
    return {
        relativeWeightCap: null,
        id: veRootGaugeAddress,
        status: 'ACTIVE' as const,
    };
}
