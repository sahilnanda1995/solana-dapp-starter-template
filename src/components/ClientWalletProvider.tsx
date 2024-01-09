"use client";

import type { WalletProviderProps } from "@solana/wallet-adapter-react";
import { WalletProvider } from "@solana/wallet-adapter-react";

import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  GlowWalletAdapter,
  BackpackWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { useMemo } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

export default function ClientWalletProvider(
  props: Omit<WalletProviderProps, "wallets">
): JSX.Element {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter(),
      new SolletExtensionWalletAdapter(),
      new GlowWalletAdapter(),
      new BackpackWalletAdapter(),
    ],
    []
  );

  return (
    <WalletProvider wallets={wallets} {...props}>
      <WalletModalProvider {...props} />
    </WalletProvider>
  );
}
