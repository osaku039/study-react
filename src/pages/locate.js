import React, { useState, useEffect, useRef } from 'react';
import Modal from "./Modal";
import styles from "@/styles/Home.module.css";

// エラーテキストコンポーネント
const ErrorText = () => (
  <p className={styles.locate-error-text}>Geolocation is NOT available</p>
);

export default function LocateAndDisplay() {
  const [isAvailable, setAvailable] = useState(false);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [responseData, setResponseData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [currentShop, setCurrentShop] = useState(null);

  const isFirstRef = useRef(true);

  useEffect(() => {
    isFirstRef.current = false;
    if ('geolocation' in navigator) {
      setAvailable(true);
    }
  }, [isAvailable]);

  const getCurrentPosition = (range) => {
    
  let rangeRatio = document.getElementsByName('range');
  let len = rangeRatio.length;
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      setPosition({ latitude, longitude });
      let checkValue = '';

      for (let i = 0; i < len; i++){
        if (rangeRatio.item(i).checked){
          checkValue = rangeRatio.item(i).value;
        }
      }
      fetchData(latitude, longitude, checkValue);
    });
  };

  async function fetchData(lat, lng, range) {
    try {
      const response = await fetch(`/api/gourmetapi?lat=${lat}&lng=${lng}&range=${range}`);
      const data = await response.json();
      console.log(`lat=${lat}, lng=${lng}, range=${range}`);
      setResponseData(data);
    } catch (error) {
      console.error("データ取得エラー:", error);
      setIsError(true);
    }
  }

  const handleCardClick = (shop) => {
    setIsOpenModal(true);
    setCurrentShop(shop);
    // alert(`ショップ名: ${shop.name}\n住所: ${shop.address}`);
  };

  const createCard = (data) => {
    if (!data || !data.results || !data.results.shop) return;

    const shopArray = data.results.shop;
    const cardContainer = document.getElementById("card-container");

    cardContainer.innerHTML = ''; // 既存のカードをクリア

    shopArray.forEach((shop) => {
      const myCard = document.createElement("div");
      const myCardTitle = document.createElement("h3");
      const myCardType = document.createElement("p");
      const myCardFood = document.createElement("p");
      const myCardAge = document.createElement("p");
      const myCardImage = document.createElement("img");

      myCard.classList.add("card-item");
      myCardTitle.textContent = shop.name; // 店名
      myCardType.textContent = `住所: ${shop.address}`; // 住所
      myCardFood.textContent = `アクセス: ${shop.access}`; // アクセス情報
      myCardAge.textContent = `営業時間: ${shop.open}`; // 営業時間
      myCardImage.src = shop.logo_image; // 画像のURLを設定

      myCard.appendChild(myCardTitle);
      myCard.appendChild(myCardImage);
      myCard.appendChild(myCardType);
      myCard.appendChild(myCardFood);
      myCard.appendChild(myCardAge);

      // クリックイベントを追加
      myCard.addEventListener('click', () => handleCardClick(shop));

      cardContainer.appendChild(myCard);
    });
  };

  useEffect(() => {
    if (responseData) {
      createCard(responseData);
    }
  }, [responseData]);

  if (isError) {
    return <p>データ取得エラー</p>;
  }

  if (isFirstRef.current) return <div className={styles.locate}>Loading...</div>;

  return (
    <div className={styles.locate}>
      <h1>ご飯検索システム</h1>
      {!isAvailable && <ErrorText />}
      {isAvailable && (
        <div>
          <button onClick={getCurrentPosition}>お店を検索</button>
          <div>
            <label><input type="radio" name="range" value="1" />300m</label>
            <label><input type="radio" name="range" value="2" />500m</label>
            <label><input type="radio" name="range" value="3" />1000m</label>
            <label><input type="radio" name="range" value="4" />2000m</label>
            <label><input type="radio" name="range" value="5" />3000m</label>
          </div>
          <div>
            latitude: {position.latitude}
            <br />
            longitude: {position.longitude}
          </div>
          <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} shop={currentShop} />
          <div id="card-container"></div>
        </div>
      )}
    </div>
  );
}
