import { makeStyles } from '@material-ui/core/styles';
// hum css mai lik sakte hai then why we wrting style code in javascript because when we use material ui ,using their own way of styling components
//  make everything easier,it is basically css in  js ,kuki yaha everyting in string,and key oaurs ki formmai hum use karenge
export default makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '45vh',
    padding: '10%',
    borderRadius: 10,
    color: 'white',
  },
  infoCard: {
    display: 'flex', flexDirection: 'column', textAlign: 'center',
  },
  container: {
    padding: '0 5%', width: '100%', margin: 0,
  },
});