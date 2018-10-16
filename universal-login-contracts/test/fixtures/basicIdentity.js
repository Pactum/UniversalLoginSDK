import ERC1077ApprovalScheme from '../../build/ERC1077ApprovalScheme';
import MockToken from '../../build/MockToken';
import MockContract from '../../build/MockContract';
import {utils} from 'ethers';
import {deployContract} from 'ethereum-waffle';
import {addressToBytes32} from '../utils';

const {parseEther} = utils;

export default async function basicIdentity(provider, wallet) {
  const managementKey = addressToBytes32(wallet.address);
  const identity = await deployContract(wallet, ERC1077ApprovalScheme, [managementKey]);
  const mockToken = await deployContract(wallet, MockToken);
  const mockContract = await deployContract(wallet, MockContract);
  await wallet.send(identity.address, parseEther('1.0'));
  await mockToken.transfer(identity.address, parseEther('1.0'));
  return {managementKey, identity, mockToken, mockContract};
}
