import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button } from "@mui/material";
import { useState, useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isGaming, setIsGaming] = useState(false);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [isLastSecond, setIsLastSecond] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(null);
  const intervalRef = useRef(null);

  const handleClick = () => {
    if (isRunning) {
      setCount(prevCount => prevCount + 1);
    }
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsLastSecond(false);
    setTime(0);
    setCount(0);

    setCurrentTitle('Preparados');
    setTimeout(() => {
      setCurrentTitle('Listos');
      setTimeout(() => {
        setCurrentTitle('¡YA!');
        setTimeout(() => {
          setCurrentTitle(null);
          setIsGaming(true);
          setTimeout(() => {
            setIsRunning(true);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  useEffect(() => {
    if (isRunning && time < 5000 && currentTitle === null) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 100);
      }, 100);
    }

    if (time >= 4000) {
      setIsLastSecond(true);
    } else if (time === 5000) {
      setIsLastSecond(false);
      setIsRunning(false);
      if (count > score) {
        setScore(count);
      }
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, time, count, score, currentTitle]);

  useEffect(() => {
    if (time === 5000) {
      setIsRunning(false);
      setIsGaming(false);
      if (count > score) {
        setScore(count);
      }
    }
  }, [time, count, score]);


  return (
    <>
      <Head>
        <title>Juego Contador</title>
        <meta name="description" content="Juego Contador" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Juego Contador</h1>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '150px' }}>
            <h1 style={{ color: isLastSecond ? 'red' : 'inherit' }}>
              Tiempo: {Math.floor(time / 1000)}:{(time % 1000).toString().padStart(3, '0').substring(0, 2)}
            </h1>
            <h1>Clicks: {count}</h1>
          </div>
          <div>
            <h1> Puntaje máximo: {score}</h1>
          </div>
        </div>
        {currentTitle && <h1>{currentTitle}</h1>}
        <Button onClick={handleStart} disabled={isRunning} size="large" variant="contained" sx={{ width: '150px' }}>
          Iniciar Juego
        </Button>
        <Button onClick={handleClick} disabled={!isGaming} size="large" variant="contained" sx={{ width: '150px' }}>
          Clickear Aquí
        </Button>
      </main>
    </>
  );
}
