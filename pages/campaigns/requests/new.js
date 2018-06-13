import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Form, Message, Input } from 'semantic-ui-react';
import { Link, Router } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';

class RequestNew extends Component {

  state = { 
    description: '',
    value: '',
    recipient: '',
    errorMessage: '',
    loading: false
  }

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(
        description, 
        web3.utils.toWei(value, 'ether'), 
        recipient)
          .send({
            from: accounts[0]
          });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  }

  render() {
    return (
      <Layout>
        <h3>Create a Request</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input 
            value={this.state.description}
            onChange={event => 
              this.setState({ description: event.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Value</label>
          <Input 
            label="ether" 
            labelPosition="right" 
            value={this.state.value}
            onChange={event => 
              this.setState({ value: event.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input 
            value={this.state.recipient}
            onChange={event => 
              this.setState({ recipient: event.target.value })
            }
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button loading={this.state.loading} primary>Create!</Button>
      </Form>
      </Layout>
    );
  }
}

export default RequestNew;