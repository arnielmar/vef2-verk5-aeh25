import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NotFound } from '../../pages/NotFound';

const apiUrl = process.env.REACT_APP_API_URL;

// TODO importa sass

News.propTypes = {
  id: PropTypes.string,
}

export function News({ id }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  useEffect(() => {
    async function fetchData(id) {
      setLoading(true);
      setError(null);

      let json;
      const url = `${apiUrl}${id}`;

      try {
        const result = await fetch(url);

        if (!result.ok) {
          if (result.status === 404) {
            setError(404);
            return;
          }
          throw new Error('Result not ok!');
        }

        json = await result.json();
      } catch (e) {
        setError('Gat ekki sótt gögn!');
        return;
      } finally {
        setLoading(false);
      }

      setData(json);
    }

    fetchData(id);
  }, [id]);

  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }

  if (error === 404) {
    return (
      <Route component={NotFound} />
    );
  }

  if (error) {
    return (
      <div>
        <p>Villa kom upp: {error}</p>
        <Link to="/">Til baka</Link>
      </div>
    );
  }

  return (
    <div className="news">
      <h3>{data.title}</h3>
    </div>
  );
}