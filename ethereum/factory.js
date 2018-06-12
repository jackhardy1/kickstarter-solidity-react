import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x407412EBAaB0e59B77FDF352d6bD4033a65F2947'
);

export default instance;