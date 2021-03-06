import { useEthers, useTokenBalance } from '@usedapp/core';
import React from 'react';
import { Token } from '../Main';
import { formatUnits } from '@ethersproject/units';
import { BalanceMsg } from '..';

type WalletBalanceProps = {
  token: Token;
};

const WalletBalance = ({ token }: WalletBalanceProps) => {
  const { image, address, name } = token;
  const { account } = useEthers();
  const balance = useTokenBalance(address, account);
  const formattedBalance = balance ? parseFloat(formatUnits(balance, 18)) : 0;
  return (
    <div>
      <BalanceMsg
        label={`Your unstaked ${name} balance`}
        amount={formattedBalance}
        tokenImgSrc={image}
      />
    </div>
  );
};

export default WalletBalance;
