import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function Links() {
  return (
          <div className={styles.ctas}>
            <a
              href="/gourmet"
              className={styles.secondary}
            >
              <Image
                className={styles.logo}
                src="/window.svg"
                alt="logomark"
                width={20}
                height={20}
              />
              お店を検索
            </a>
          </div>
  );
}
