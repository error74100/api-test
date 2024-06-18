import './App.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

const SERVICE_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const pageNo = useRef(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const URL = `/api/6510000/ratInsttService/getRatInsttList?serviceKey=${SERVICE_KEY}&pageNo=${pageNo.current}&numOfRows=5`;

    try {
      setError(null);
      // setData(null);
      setLoading(true);

      const response = await axios.get(URL, {});

      if (data === null) {
        setData(response.data.response.body.items.item);
      } else {
        setData([...data, ...response.data.response.body.items.item]);
      }
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const moreButton = () => {
    const no = pageNo.current + 1;
    pageNo.current = no;

    fetchData();
  };

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (!data) return null;

  return (
    <div className="App">
      <h2>
        제주특별자치도 제주시
        <br />
        신속항원검사기관 조회 서비스
        <br />
        (OPEN API)
      </h2>
      {data &&
        data.map((item) => (
          <div key={item.dataCd} className="item">
            <p className="tit">{item.hsplNm}</p>
            <p>{item.rnAdres}</p>
          </div>
        ))}
      <div className="btn_wrap">
        <button onClick={moreButton}>+5 더보기</button>
      </div>
    </div>
  );
}

export default App;
