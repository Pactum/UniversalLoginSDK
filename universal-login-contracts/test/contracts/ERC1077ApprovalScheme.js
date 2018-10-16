import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {solidity} from 'ethereum-waffle';
import basicIdentity from '../fixtures/basicIdentity';
import {utils} from 'ethers';
import {EXECUTION_TYPE_MANAGEMENT, EXECUTION_TYPE_ACTION, OPERATION_CALL} from 'universal-login-contracts/lib/consts';
import TestHelper from '../testHelper';

chai.use(chaiAsPromised);
chai.use(solidity);

const {parseEther} = utils;
const to = '0x0000000000000000000000000000000000000001';
const ETHER = '0x0000000000000000000000000000000000000000';


describe('ERC1077 Approval scheme', async () => {
  const testHelper = new TestHelper();
  let provider;
  let identity;

  beforeEach(async () => {
    ({provider, identity} = await testHelper.load(basicIdentity));
  });


  it('properly construct', async () => {
    expect(await identity.requiredSignatures(EXECUTION_TYPE_MANAGEMENT)).to.eq(1);
    expect(await identity.requiredSignatures(EXECUTION_TYPE_ACTION)).to.eq(1);
    expect(await identity.lastNonce()).to.eq(0);
  });


  describe('successful execution of transfer', () => {
    it('transfers funds', async () => {
      await identity.executeSigned(to, parseEther('1.0'), [], 0, 0, 0, ETHER, OPERATION_CALL, [], []);
      expect(await provider.getBalance(to)).to.eq(parseEther('1.0'));
      expect(await identity.lastNonce()).to.eq(2);
    });

    it('emits ExecutedSigned event', async () => {
      await expect(identity.executeSigned(to, parseEther('1.0'), [], 0, 0, 0, ETHER, OPERATION_CALL, [], []))
        .to.emit(identity, 'ExecutedSigned')
        .withArgs('0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470', 0, true);
    });
    xit('refunds');
  });

  describe('fails if invalid nonce', () => {
    it('fails if nonce too low', async () => {
      await identity.executeSigned(to, parseEther('1.0'), [], 0, 0, 0, ETHER, OPERATION_CALL, [], []);
      await expect(identity.executeSigned(to, parseEther('1.0'), [], 0, 0, 0, ETHER, OPERATION_CALL, [], []))
        .to.be.revertedWith('Invalid nonce');
    });

    it('fails if nonce too high', async () => {
      await expect(identity.executeSigned(to, parseEther('1.0'), [], 2, 0, 0, ETHER, OPERATION_CALL, [], []))
        .to.be.revertedWith('Invalid nonce');
    });
  });

  describe('successful execution of call', () => {
    xit('called method');
    xit('increase nonce');
    xit('refunded');
  });

  describe('successful execution of transfer (multiple keys)', () => {
    xit('transfered funds');
    xit('increase nonce');
    xit('refunded');
  });


  xdescribe('fails if not enough signatures', () => {
    xit('increase nonce');
    xit('refunded');
  });

  xdescribe('fails if invalid signature', () => {
    xit('increase nonce');
    xit('refunded');
  });

  xdescribe('fails if call fails', () => {
    xit('increase nonce');
    xit('refunded');
  });

  xdescribe('fails if not enough balance to refund', () => {
    xit('increase nonce');
    xit('refunded');
  });

  xdescribe('successful execution of create');
  xdescribe('successful execution of delegate call');
});
