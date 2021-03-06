import { useEthers } from '@usedapp/core';
import React from 'react';
import helperConfig from '../helper-config.json';
import networkMapping from '../chain-info/deployments/map.json';
import { constants } from 'ethers';
import brownieConfig from '../brownie-config.json';
import dapp from '../assets/dapp.png';
import eth from '../assets/eth.png';
import dai from '../assets/dai.png';
import { Wallet } from '.';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.white,
    textAlign: 'center',
    padding: theme.spacing(4),
  },
}));

export type Token = {
  image: string;
  address: string;
  name: string;
};

const Main = () => {
  const classes = useStyles();

  const { chainId } = useEthers();
  const networkName = chainId ? helperConfig[chainId] : 'dev';

  const dappTokenAddress = chainId
    ? networkMapping[String(chainId)]['DappToken'][0]
    : constants.AddressZero;
  const wethTokenAddress = chainId
    ? brownieConfig['networks'][networkName]['weth_token']
    : constants.AddressZero;
  const fauTokenAddress = chainId
    ? brownieConfig['networks'][networkName]['fau_token']
    : constants.AddressZero;

  const supportedTokens: Array<Token> = [
    { image: dapp, address: dappTokenAddress, name: 'DAPP' },
    { image: eth, address: wethTokenAddress, name: 'WETH' },
    { image: dai, address: fauTokenAddress, name: 'FAU' },
  ];

  return (
    <>
      <h2 className={classes.title}>Dapp Token App</h2>
      <Wallet supportedTokens={supportedTokens} />;
    </>
  );
};

export default Main;
