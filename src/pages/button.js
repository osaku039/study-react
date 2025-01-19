"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [responseData, setResponseData] = useState("");
  const [isError, setIsError] = useState(false);

  const url = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=";
  const api_url = `${url}${process.env.NEXT_PUBLIC_API_KEY}&large_area=Z011&format=json`;

  useEffect(() => {
    // 非同期でAPIからデータを取得
    async function fetchData() {
      try {
        console.log("Fetching data from:", api_url);
        const response = await fetch(api_url);
        const text = await response.text(); // すべてのレスポンスをテキストとして取得
        setResponseData(text); // レスポンスをそのまま保存
      } catch (error) {
        console.error("データ取得エラー:", error);
        setIsError(true); // エラーフラグを立てる
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

  // テキストを改行ごとに分割して、配列として処理
  const formattedData = responseData.split("\n");
  return (
    <>
      <h1>APIの返却データ</h1>
      <div>
        {formattedData.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </>
  );
}
