import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import styles from './detail.module.css'

interface CoinProp {
  symbol: string
  name: string
  price: string
  market_cap: string
  low_24h: string
  high_24h: string
  total_volume_24h: string
  delta_24h: string
  formatedPrice: string
  formatedMarket: string
  formatedLowPrice: string
  formatedHighPrice: string
  numberDelta?: number
  error?: string
}

export const Detail = () => {
  const { cripto } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState<CoinProp>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = () => {
      fetch(`https://coinlib.io/api/v1/coin?key=67f9141787211428&pref=BRL&symbol=${cripto}`)
      .then(response => response.json())
      .then((data: CoinProp) => {
        if(data.error) {
          navigate("/")
        }

        const formatPrice = Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL"
        })

        const resultData = {
          ...data,
          formatedPrice: formatPrice.format(Number(data.price)),
          formatedMarket: formatPrice.format(Number(data.market_cap)),
          formatedLowPrice: formatPrice.format(Number(data.low_24h)),
          formatedHighPrice: formatPrice.format(Number(data.high_24h)),
          numberDelta: parseFloat(data.delta_24h.replace(",", "."))
        }

        setDetail(resultData);
        setLoading(false);
      })
    }

    getData();
  }, [cripto])

  if(loading) {
    return(
      <div className={styles.container}>
        <h4 className={styles.center}>Carregando informações...</h4>
      </div>
    )
  }

  return(
    <div className={styles.container}>
      <h1 className={styles.center}>{detail?.name}</h1>
      <p className={styles.center}>{detail?.symbol}</p>
      <section className={styles.content}>
        <p>
          <strong>Preço:</strong> {detail?.formatedPrice}
        </p>
        <p>
          <strong>Maior Preço 24h:</strong> {detail?.formatedHighPrice}
        </p>
        <p>
          <strong>Menor Preço 24h:</strong> {detail?.formatedLowPrice}
        </p>
        <p> 
          <strong>Volume 24h:</strong>
          <span className={detail?.numberDelta && detail.numberDelta >= 0 ? styles.profit : styles.loss}>
            {detail?.delta_24h}%
          </span>
        </p>
        <p>
          <strong>Valor de Mercado:</strong> {detail?.formatedMarket}
        </p>
      </section>
      <Link className={styles.backButton} to="/">
        Voltar para página principal
      </Link>
    </div>
  )
}
