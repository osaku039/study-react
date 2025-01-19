import Link from "next/link";
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

export function Header() {
  return (
        <header className={styles.header}>
            <Link href="/" className={styles.anchor}>
                Index
            </Link>
            <Link href="/about" className={styles.anchor}>
                About
            </Link>
            <Link href="/gourmet" className={styles.anchor}>
                Api
            </Link>
            <Link href="/locate" className={styles.anchor}>
                Locate
            </Link>
        </header>
  );
}
