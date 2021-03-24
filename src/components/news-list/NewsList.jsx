import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

// TODO importa sass

export function NewsList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      let json;

      try {
        const result = await fetch(apiUrl);
        
        if (!result.ok) {
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
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }

  if (error) {
    return (
      <p>Villa kom upp: {error}</p>
    );
  }

  return (
    <div className="newslist">
      <div className="newslist__row">
        {data.length > 0 && data.map((category, i) => {
          console.log('category :>> ', category);
          console.log('i :>> ', i);
          const {
            title,
            id,
          } = category;
          return (
            <div key={i} className="newslist__col">
              <h3>{title}</h3>
              <Link to={id}>Allar fréttir</Link>
            </div>
          )
        })}
      </div>
    </div>
  );
}

/*
        {newsList.length > 0 && newsList.map((category) => {
          const {
            title,
          } = category.properties;
          return (
            <div className="newslist__col">
              <h3>{title}</h3>
            </div>
          )
        })}
        */
