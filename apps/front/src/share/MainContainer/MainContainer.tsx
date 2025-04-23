import {iMainContainerProps} from '../../../../front/types'
import styles from './MainContainer.module.css'

const MainContainer = ({children}: iMainContainerProps) => {
  return (
    <div className={styles.mainContainer}>
        {children}
    </div>
  )
}

export default MainContainer

