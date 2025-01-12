import React from 'react';
import useSWR from 'swr';

function Profile() {
  const fetcher = (url) =>
    fetch(url, {
      method: 'GET',
      // mode: 'no-cors',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Lỗi khi tải dữ liệu');
        }
        return res.json();
      })
      .catch((error) => {
        console.error(error);
      });

  React.useEffect(() => {}, []);

  const { data, error, isLoading } = useSWR('http://localhost:8000/home', fetcher);

  if (error) return <div>Có lỗi xảy ra: {error.message}</div>;
  if (isLoading) return <div>Đang tải dữ liệu...</div>;

  return <div>Xin chào, {data?.message}!</div>;
}

export default Profile;
