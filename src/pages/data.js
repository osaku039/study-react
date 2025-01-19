"use server";

export async function fetchGourmet() {
  const place = "Tokyo";
  const url = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=";
  const api_url = `${url}${process.env.NEXT_PUBLIC_API_KEY}&large_area=Z011&format=json`;
  try {
    console.log("データ取得中です...");
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("データ取得エラー");
  }
}