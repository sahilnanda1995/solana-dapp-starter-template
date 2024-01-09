"use client";

import {
  ConnectionProvider,
  ConnectionProviderProps,
} from "@solana/wallet-adapter-react";

export default function ClientConnectionProvider({
  children,
  ...props
}: ConnectionProviderProps) {
  return <ConnectionProvider {...props}>{children}</ConnectionProvider>;
}
