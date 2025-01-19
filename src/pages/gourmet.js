"use client"

import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Footer } from "../components/Footer";
import { Links } from "../components/Links";
import { Headline } from "@/components/Headline";
import { Header } from "@/components/Header";
import { fetchGourmet } from "./data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
        <form action={fetchGourmet}>
        <button type="submit">データを取得する</button>
        </form>
    </>
  );
}
