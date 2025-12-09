import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* Added bg-[#FDFBF7] to match your Layout background.
         Added text-slate-900 for default text color.
      */}
      <body className="antialiased bg-[#FDFBF7] text-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}