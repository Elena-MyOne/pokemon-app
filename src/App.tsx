import React from 'react';
import Header from './components/Header';

interface AppProps {
  searchQuery: string;
}

export default class App extends React.Component<object, AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    return (
      <>
        <Header value='' />
        <main className="m-auto p-0 md:container">Hello</main>
      </>
    )
  }
}

