import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import Typography from '@mui/material/Typography';

const NotFound = () =>{
	return (
        <>
      		<Container component="main" maxWidth="md">
      		<Box
	          sx={{
	            marginTop: 8,
	            display: 'flex',
	            flexDirection: 'column',
	            alignItems: 'center'
	          }}
	        >
	        <Typography component="h1" variant="h5">
	            Page Not Found
	        </Typography>
	        <Typography component="p" sx={{marginTop: 2 }}>
	            Maybe the page you are looking for has been removed, or you typed in the wrong URL
	        </Typography> 
      		
      		<Link to="/"><Button variant="contained" sx={{marginTop: 2 }}>Go to homepage</Button></Link>

      		</Box>
            </Container>
    	</>
    )
}

export default NotFound;