import s from './NewsList.module.scss';

import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { News } from '../news/News';

const apiUrl = process.env.REACT_APP_API_URL;

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
    <ReactLoading type="spin" color="#000" height={'3%'} width={'3%'} className={s.newslist__loading} />
   );
  }

  if (error) {
    return (
      <p className={s.newslist__error}>Villa kom upp: {error}</p>
    );
  }

  return (
    <div className={s.newslist}>
      <div className={s.newslist__row}>
        {data.length > 0 && data.map((category, i) => {
          console.log('category :>> ', category);
          console.log('i :>> ', i);
          const {
            id,
          } = category;
          return (
            <div key={i} className={s.newslist__col}>
              <News id={id} all={false} />
            </div>
          )
        })}
      </div>
    </div>
  );
}
