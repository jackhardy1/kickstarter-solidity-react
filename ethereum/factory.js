import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xaF5f8aeF025656D1676135e213b37f1d1f56523e'
);

export default instance;