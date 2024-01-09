"use client";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import * as anchor from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import * as buffer from "buffer";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

if (typeof window !== "undefined") {
  window.Buffer = buffer.Buffer;
}

const connection = new anchor.web3.Connection(
  `https://rpc.helius.xyz/?api-key=${process.env.NEXT_PUBLIC_HELIUS}`
);
const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const lamportsToSol = (lamports: number) => {
  return lamports / LAMPORTS_PER_SOL;
};
export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [txSuccess, setTxSuccess] = useState(false);
  const [txHash, setTxHash] = useState<string[] | []>([]);
  const { connection: conn } = useConnection();

  // mount on render
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      const signer = wallet.publicKey;

      if (!signer) throw new Error("Wallet not connected");
      console.log("signer :: ", signer.toString());

      setAddress(signer.toString());

      const lamports = await conn.getBalance(signer);

      setBalance(lamportsToSol(lamports));
    };
    fetchBalance().catch(() => setBalance(0));

    // Listen for balance changes
    const signer = wallet.publicKey;

    // if (!signer) throw new Error("Wallet not connected");
    let id = 0;
    if (signer) {
      id = conn.onAccountChange(signer, (a) =>
        setBalance(lamportsToSol(a.lamports))
      );
    }

    return () => {
      conn.removeAccountChangeListener(id);
    };
  }, [conn, wallet]);

  // for fixing hydration failed error
  if (!hasMounted) {
    return null;
  }

  return (
    <div
      className={`${
        txSuccess
          ? "bg-black transition ease-in-out duration-700"
          : "bg-primary transition ease-in-out duration-700"
      }`}
    >
      {txSuccess ? (
        <section className="relative min-h-screen items-center justify-center flex text-text px-4">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
          />
          <div className="flex flex-col w-full max-w-4xl justify-center items-center font-futurabold space-y-8"></div>
        </section>
      ) : (
        <section
          id="hero"
          className="relative min-h-screen items-center flex flex-col text-text py-20 px-2"
        >
          <div className="flex w-full max-w-4xl justify-center font-futurabold">
            <div className="w-full flex justify-between">
              <div className="flex h-auto flex-row justify-center">
                Solana frontend starter template
              </div>
            </div>
          </div>
          <div className="flex w-full sm:flex-row flex-col max-w-4xl mt-12 justify-center font-futurabold sm:space-x-6">
            <div className="flex flex-col items-center w-full sm:w-1/2 px-4 sm:px-0 sm:mt-0 mt-8 mb-8">
              <div className="w-full flex flex-col items-center font-semibold whitespace-nowrap text-white p-10 bg-secondary rounded-xl space-y-6">
                <p className="text-4xl">Connect Your Wallet</p>
                <div className="flex flex-col w-full space-y-2"></div>
                <div className="flex w-full justify-center">
                  {/* <WalletMultiButton className="bg-white text-[#535353] font-futurabold w-full text-center flex justify-center rounded-xl hover:text-white" /> */}
                  {wallet.publicKey ? (
                    <></>
                  ) : (
                    <WalletMultiButton className="bg-white text-[#535353] font-futurabold w-full text-center flex justify-center py-[36px] rounded-xl hover:text-white" />
                  )}
                </div>
                {address !== "" && (
                  <div className="flex w-full justify-between">
                    <p>
                      {address.slice(0, 4)}...{address.slice(-4)}
                    </p>
                    <p>Balance: {balance.toFixed(2)} SOL</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
