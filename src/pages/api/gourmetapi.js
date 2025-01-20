// pages/api/fetchGourmet.js
export default async function handler(req, res) {
    const { lat, lng, range } = req.query;
    const url = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=";
    const api_url = `${url}${process.env.API_KEY}&lat=${lat}&lng=${lng}&range=${range}&format=json`;
  
    try {
      console.log("データ取得中です...");
      const response = await fetch(api_url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("データ取得エラー", error);
      res.status(500).json({ error: "データ取得エラー" });
    }
}
  