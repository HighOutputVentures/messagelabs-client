import request from 'request-promise';

export default class {
  constructor() {
    this.uri = 'http://localhost:8080';
    this.version = 'v1';
    this.token = '';
    this.userId = '';
  }

  async login(email, password) {
    const response = await request({
      uri: this.uri,
      method: 'GET',
      headers: { authorization: `Basic ${Buffer.from(`${email}:${password}`, 'utf-8').toString('base64')}` },
      json: true,
    });

    this.token = response.token;
    this.userId = response.userId;
  }

  addSubscription(name, description) {
    return request({
      uri: `${this.uri}/${this.version}/subscriptions`,
      method: 'POST',
      headers: {
        authorization: `Bearer ${this.token}`,
        'content-type': 'application/json',
      },
      body: {
        data: {
          attributes: { name, description },
        },
      },
      json: true,
    });
  }

  getSubscription(id) {
    return request({
      uri: `${this.uri}/${this.version}/subscriptions/${id}`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${this.token}`,
        'content-type': 'application/json',
      },
      json: true,
    });
  }
}
