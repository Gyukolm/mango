"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [cookies, setCookies] = useState(0);
  const [secretMessage, setSecretMessage] = useState("");
  const [clickPower, setClickPower] = useState(1);
  const [autoPower, setAutoPower] = useState(0);
  const [bakerLevel, setBakerLevel] = useState(0);
  const [ovenLevel, setOvenLevel] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCookies((current) => current + autoPower);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [autoPower]);

  useEffect(() => {
    let typed = "";

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === "backspace") {
        typed = typed.slice(0, -1);
        return;
      }

      if (/^[a-z]$/.test(key)) {
        typed += key;
      }

      if (typed.includes("mango")) {
        setCookies((current) => current + 1000000);
        setSecretMessage("Secret activated: +1,000,000 mangoes!");
        typed = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const bakerCost = 10 + bakerLevel * 5;
  const ovenCost = 25 + ovenLevel * 15;

  const handleCookieClick = () => {
    setCookies((current) => current + clickPower);
  };

  const buyBaker = () => {
    if (cookies >= bakerCost) {
      setCookies((current) => current - bakerCost);
      setClickPower((current) => current + 1);
      setBakerLevel((current) => current + 1);
    }
  };

  const buyOven = () => {
    if (cookies >= ovenCost) {
      setCookies((current) => current - ovenCost);
      setAutoPower((current) => current + 1);
      setOvenLevel((current) => current + 1);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Mango farm
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
          Farm mangoes, buy upgrades, and grow your orchard.
        </h1>

        <div className="mt-6 rounded-2xl bg-zinc-100 p-6 text-center dark:bg-zinc-800">
          <div className="text-5xl font-semibold text-zinc-900 dark:text-zinc-50">
            {cookies}
          </div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Mangoes • {clickPower} per click • {autoPower} per second
          </div>
          {secretMessage ? (
            <p className="mt-3 text-sm font-medium text-amber-600 dark:text-amber-400">
              {secretMessage}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleCookieClick}
            className="flex-1 rounded-full bg-amber-500 px-5 py-4 text-lg font-semibold text-zinc-950 transition hover:bg-amber-400"
          >
            🥭 Farm Mango
          </button>
          <button
            onClick={() => {
              setCookies(0);
              setClickPower(1);
              setAutoPower(0);
              setBakerLevel(0);
              setOvenLevel(0);
            }}
            className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Reset
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-zinc-950 dark:text-zinc-50">🪴 Expand Orchard</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Level {bakerLevel}
                </p>
              </div>
              <span className="text-sm text-zinc-500">Cost: {bakerCost}</span>
            </div>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Increases your mangoes per click by 1.
            </p>
            <button
              onClick={buyBaker}
              disabled={cookies < bakerCost}
              className="mt-4 w-full rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-700"
            >
              Buy Upgrade
            </button>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-zinc-950 dark:text-zinc-50">Hire Worker</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Level {ovenLevel}
                </p>
              </div>
              <span className="text-sm text-zinc-500">Cost: {ovenCost}</span>
            </div>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Adds 1 mango per second automatically.
            </p>
            <button
              onClick={buyOven}
              disabled={cookies < ovenCost}
              className="mt-4 w-full rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-700"
            >
              Hire Worker
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
