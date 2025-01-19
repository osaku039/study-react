// pages/api/fetchGourmet.js
export default async function handler(req, res) {
    const url = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=";
    const api_url = `${url}${process.env.API_KEY}&large_area=Z011&format=json`;
  
    try {
      console.log("データ取得中です...");
      const response = await fetch(api_url);
      const data = await response.json();
      res.status(200).json(data);  // クライアントにレスポンスを返す
    } catch (error) {
      console.error("データ取得エラー", error);
      res.status(500).json({ error: "データ取得エラー" });
    }
  }
  