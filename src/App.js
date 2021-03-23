import React from 'react';
import { Route } from 'react-router-dom';

import { Layout } from './components/layout/Layout';

import { Index } from './pages/Index';
import { NewsPage } from './pages/News';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <Layout title="RÚV fréttir">
      <Route exact path="/" component={Index} />
      <Route path="/:id" component={NewsPage} />
      <Route component={NotFound} />
    </Layout>
  );
}
