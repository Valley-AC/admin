import React from 'react'
import SwipeableTemporaryDrawer from '../DrawerNav/DrawerNav'
import styles from './styles.module.css';
import logo from '../../assets/logo.png';
export default function Nav() {
  return (
    <div>
        	<nav className={styles.navbar}>
			<img style= {{width:'20%'}} alt='logo' src={logo}/>
			

				
				<SwipeableTemporaryDrawer/>
			</nav>
    </div>
  )
}
