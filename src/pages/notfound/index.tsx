import { Link } from 'react-router-dom'

import styles from './notfound.module.css'

export const Notfound = () => {
  return(
    <div className={styles.container}>
      <h1>Essa página não existe!</h1>
      <Link to="/">
        Voltar para página principal
      </Link>
    </div>
  )
}
