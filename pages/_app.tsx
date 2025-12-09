import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Merriweather, Roboto } from 'next/font/google';

// 1. Configure the Serif Font (Headlines / Body)
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-serif', // CSS Variable name
  display: 'swap',
});

// 2. Configure the Sans Font (UI / Metadata)
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans', // CSS Variable name
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    // 3. Apply the font variables to the root of the app
    <main className={`${merriweather.variable} ${roboto.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}