import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Footer } from "../components/Footer";
import { Links } from "../components/Links";
import { Headline } from "../components/Headline";
import { Header } from "../components/Header";
import { useCallback } from "react";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "./modal";

// エラーテキストコンポーネント
const ErrorText = () => (
  <p className={styles.locate-error-text}>Geolocation is NOT available</p>
);

export default function Home() {
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

  //現在地取得
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

  //グルメAPIからの取得
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

  //モーダル表示するためのもの
  const handleCardClick = (shop) => {
    setIsOpenModal(true);
    setCurrentShop(shop);
  };

  //お店のカードをつくる
  const createCard = (data) => {
    if (!data || !data.results || !data.results.shop) return;
  
    const shopArray = data.results.shop;
    const cardContainer = document.getElementById("card-container");
  
    cardContainer.innerHTML = ''; // 既存のカードをクリア
  
    shopArray.forEach((shop) => {
      const myCard = document.createElement("div");
      myCard.classList.add(styles.shop); // CSSモジュールでスタイル適用
  
      const myCardTitle = document.createElement("h3");
      myCardTitle.classList.add(styles.shopTitle); // タイトル用クラス
      myCardTitle.textContent = shop.name; // 店名
  
      const myCardImage = document.createElement("img");
      myCardImage.classList.add(styles.shopImage); // 画像用クラス
      myCardImage.src = shop.logo_image; // 画像のURLを設定
  
      const myCardType = document.createElement("p");
      myCardType.classList.add(styles.shopType); // 住所用クラス
      myCardType.textContent = `住所: ${shop.address}`; // 住所
  
      const myCardFood = document.createElement("p");
      myCardFood.classList.add(styles.shopFood); // アクセス情報用クラス
      myCardFood.textContent = `アクセス: ${shop.access}`; // アクセス情報
  
      const myCardAge = document.createElement("p");
      myCardAge.classList.add(styles.shopAge); // 営業時間用クラス
      myCardAge.textContent = `営業時間: ${shop.open}`; // 営業時間
  
      // カードに要素を追加
      myCard.appendChild(myCardTitle);
      myCard.appendChild(myCardImage);
      myCard.appendChild(myCardType);
      myCard.appendChild(myCardFood);
      myCard.appendChild(myCardAge);
  
      myCard.addEventListener('click', () => handleCardClick(shop)); // モーダルの表示関数へ
  
      cardContainer.appendChild(myCard); // カードをコンテナに追加
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
      <Head>
        <title>ごはん屋さーち</title>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Header className={styles.header1}>
        <div className={styles.headerInner}>
        </div>
      </Header>
      {!isAvailable && <ErrorText />}
      {isAvailable && (
        <div>
          <div>
            <label><input type="radio" name="range" value="1" />300m</label>
            <label><input type="radio" name="range" value="2" />500m</label>
            <label><input type="radio" name="range" value="3" />1000m</label>
            <label><input type="radio" name="range" value="4" />2000m</label>
            <label><input type="radio" name="range" value="5" />3000m</label>
          </div>
          <button onClick={getCurrentPosition} className={styles.button}>ごはんを検索</button>
          <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} shop={currentShop} />
          <div id="card-container"></div>
        </div>
      )}
    </div>
  );
}
