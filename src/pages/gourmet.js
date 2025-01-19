// クライアント側のコンポーネント
import { useEffect, useState } from "react";

export default function Page() {
  const [responseData, setResponseData] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/gourmetapi");
        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        console.error("データ取得エラー:", error);
        setIsError(true);
      }
    }

    fetchData();
  }, []);

  if (isError) {
    return <p>データ取得エラー</p>;
  }

  if (!responseData) {
    return <p>データ取得中です...</p>;
  }

  return (
    <div>
      <h1>APIの返却データ</h1>
      <pre>{JSON.stringify(responseData, null, 2)}</pre>
    </div>
  );
}
