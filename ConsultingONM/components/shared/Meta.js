import React, { Component } from 'react';
import Head from 'next/head';
import '../../styles/style.css';

class Meta extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>AI B2B Platform</title>
      </Head>
    );
  }
}

export default Meta;
