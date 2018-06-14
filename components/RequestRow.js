import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {

  state = {
    errorMessage: '',
    approvalLoading: false,
    finaliseLoading: false
  };

  onApprove = async () => {
    this.setState({ approvalLoading: true, errorMessage: '' });
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods.approveRequest(this.props.id)
      .send({
        from: accounts[0]
      });
    } catch (err) {
      this.setState({ errorMessage: err.message});
    }
    this.setState({ approvalLoading: false });
    Router.replaceRoute(`/Campaigns/${this.props.address}/requests`);
  };
  
  onFinalise = async () => {
    this.setState({ finaliseLoading: true, errorMessage: '' });
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods.finaliseRequest(this.props.id)
      .send({
        from: accounts[0]
      });
    } catch (err) {
      this.setState({ errorMessage: err.message});
    }
    this.setState({ finaliseLoading: false });
    Router.replaceRoute(`/Campaigns/${this.props.address}/requests`);
  }

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalise = request.approvalCount > approversCount / 2;
    
    return (
      <Row disabled={request.complete} positive={readyToFinalise && !request.complete}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}/{approversCount}</Cell>
        <Cell>
          { !request.complete && !readyToFinalise ?  
            (<Button color="green" basic onClick={this.onApprove} loading={this.state.approvalLoading}>Approve</Button>)
            : null
          }
        </Cell>
        <Cell>
          { !request.complete && readyToFinalise ?  
            <Button color="teal" basic onClick={this.onFinalise} loading={this.state.finaliseLoading}>Finalise</Button>
            : null
          }
        </Cell>
      </Row>
    )
  }
};

export default RequestRow;

