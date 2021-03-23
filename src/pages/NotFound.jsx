import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';

export function NotFound() {
  return (
    <Layout title="404">
      <h1>404 Villa - Síða fannst ekki!</h1>
      <Link to="/">Til baka</Link>
    </Layout>
  )
}
