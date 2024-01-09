import "@solana/wallet-adapter-react-ui/styles.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import ClientConnectionProvider from "@/components/ClientConnectionPrivider";
import ClientWalletProvider from "@/components/ClientWalletProvider";

const endpoint =
  "https://rpc.helius.xyz/?api-key=b2d0a3f1-846c-43f5-aec4-f7f6e9d7fd60";

export const metadata: Metadata = {
  title: "Solana dApp Starter template - next.js using app router",
  description: "Solana dApp Starter template - next.js using app router",
  openGraph: {
    images: "/opengraph-image.png",
  },
  twitter: { images: "/opengraph-image.png" },
  metadataBase: new URL("https://solana-dapp-starter.vercel.app/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-white">
        <ClientConnectionProvider endpoint={endpoint}>
          <ClientWalletProvider>{children}</ClientWalletProvider>
        </ClientConnectionProvider>
        <Analytics />
      </body>
    </html>
  );
}
