import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <h3>404 Villa - Síða fannst ekki!</h3>
      <Link to="/">Til baka</Link>
    </div>
  );
}
