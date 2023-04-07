import styles from "./styles.module.css";
import ButtonAdmin from "../buttons/ButtonAdmin";
import { Box } from "@mui/system";
import Chart from "../Chart/Chart";
import CustomToolbarGrid from "../UsersList/UsersList";
import Nav from "../Nav/Nav";
const Main = () => {


	return (
		<div className={styles.main_container}>

			<Nav/>
			<Box sx={{margin:2}}>
			<h2>Dashboard</h2>
			<ButtonAdmin/>
			</Box>
			<Box sx={{margin:2}}>
			<h2>Statistique de vente </h2>
			<Chart/>
			</Box>
			<Box sx={{margin:2}}>
			<h2>Liste des utilisateurs</h2>
			<CustomToolbarGrid/>
			</Box>
			
				</div>
	);
};

export default Main;
