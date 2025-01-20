import React, { useEffect, useRef } from "react";
import styles from "@/styles/Home.module.css";

export default function Modal({ isOpenModal, setIsOpenModal, shop}) {

    // モーダル外をクリックした時の処理
    const modalRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpenModal(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef, setIsOpenModal]);

    // モーダル表示中: 背面のスクロールを禁止
    useEffect(() => {
        if (isOpenModal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpenModal]);
    
    console.log(`shop=${shop}`)

    return (
        <>
            {isOpenModal && shop &&
                <div className={styles.modalO}>
                    <div className={styles.modalC} ref={modalRef}>

                        {/* ここにモーダルの中身 */}
                        ショップ名: {shop.name}<br />住所:{shop.address}

                    </div>
                </div>
            }
        </>
    );
}
