import s from './News.module.scss';

import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NotFound } from '../../pages/NotFound';

const apiUrl = process.env.REACT_APP_API_URL;

News.propTypes = {
  id: PropTypes.string,
  all: PropTypes.bool,
}

export function News({ id, all }) {
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

  if (error && all) {
    return (
      <div>
        <p>Villa kom upp: {error}</p>
        <Link to="/">Til baka</Link>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Villa kom upp: {error}</p>
      </div>
    );
  }  

  if (all) {
    return (
      <div className={s.news}>
        <div className={s.news__row}>
          <div className={s.news__col}>
            <h2 className={s.news__header}>{data.title}</h2>
            {data.items && data.items.map((item, i) => {
              console.log('category :>> ', item);
              const {
                title,
                link,
              } = item;
              return (
                <a href={link} className={s.news__item__link}> 
                  <p key={i} className={s.news__item}>{title}</p> 
                </a>
              );
            })}
            <Link to="/" className={s.news__back__link}>
              <p className={s.news__back}>Til baka</p>
            </Link>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={s.news}>
        <div className={s.news__row}>
          <div className={s.news__col}>
            <h2 className={s.news__header}>{data.title}</h2>
            {data.items && data.items.slice(0, 5).map((item, i) => {
              console.log('category :>> ', item);
              const {
                title,
                link,
              } = item;
              return (
                <a href={link} className={s.news__item__link}> 
                  <p key={i} className={s.news__item}>{title}</p> 
                </a>
              );
            })}
            <Link to={id} className={s.news__allnews__link}>
              <p className={s.news__allnews}>Allar fréttir</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
