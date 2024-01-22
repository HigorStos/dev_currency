import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { BiSearch } from 'react-icons/bi'

import styles from './home.module.css'

interface CoinProps {
  symbol: string
  name: string
  price: string
  market_cap: string
  volume_24h: string
  delta_24h: string
  formatedPrice: string
  formatedMarketCap: string
}

interface DataProps {
  coins: CoinProps[]
}

export const Home = () => {
  const [coins, setCoins] = useState<CoinProps[]>([])
  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    function getData() {
      fetch("https://coinlib.io/api/v1/coinlist?key=67f9141787211428&pref=BRL")
      .then(response => response.json())
      .then((data: DataProps) => {
        const coinsData = data.coins.slice(1, 16)

        const formatPrice = Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL"
        })

        const formatResult = coinsData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: formatPrice.format(Number(item.price)),
            formatedMarketCap: formatPrice.format(Number(item.market_cap))
          }

          return formated;
        })

        setCoins(formatResult);
      })
    }

    getData();
  }, [])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if(inputValue === "") return;

    navigate(`/detail/${inputValue}`);
  }

  return(
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          placeholder="Digite o símbolo da moeda: BTC..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type='submit'>
          <BiSearch size={30} color="#fff" />
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th scope='col'>Moeda</th>
            <th scope='col'>Preço</th>
            <th scope='col'>Valor de Mercado</th>
            <th scope='col'>Volume</th>
          </tr>
        </thead>
        <tbody id='tbody'>
          {coins.map((coin) => (
            <tr key={coin.name} className={styles.tr}>
              <td className={styles.tdLabel} data-label="Moeda">
                <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                  <span className={styles.tdSpan}>{coin.name}</span> | {coin.symbol}
                </Link>
              </td>
              <td className={styles.tdLabel} data-label="Preço">
                {coin.formatedPrice}
              </td>
              <td className={styles.tdLabel} data-label="Valor de Mercado">
                {coin.formatedMarketCap}
              </td>
              <td className={parseInt(coin?.delta_24h || "0") > 0 ? styles.tdProfit : styles.tdLoss} data-label="Volume">
                <span>{coin?.delta_24h}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
