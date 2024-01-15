import { Link } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'

import styles from './home.module.css'

export const Home = () => {
  return(
    <main className={styles.container}>
      <form className={styles.form}>
        <input
          placeholder="Digite o símbolo da moeda: BTC..."
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
            <th scope='col'>Cap. de Mercado</th>
            <th scope='col'>Volume</th>
          </tr>
        </thead>
        <tbody id='tbody'>
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-label="Moeda">
              <Link to="/detail/btc" className={styles.link}>
                <span>Bitcoin</span> | BTC
              </Link>
            </td>
            <td className={styles.tdLabel} data-label="Preço">
              R$ 40.962
            </td>
            <td className={styles.tdLabel} data-label="Cap. de Mercado">
              R$ 19.293.478
            </td>
            <td className={styles.tdLoss} data-label="Volume">
              <span>-5.3%</span>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}
