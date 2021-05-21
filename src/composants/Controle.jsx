import './Controle.scss';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import  * as crudtache from '../services/crud-taches';
import { useEffect } from 'react';

export default function Controle({etatTaches, utilisateur, etatFiltre}) {
 
  const [taches, setTache] = etatTaches;
  const [,setFiltre]= etatFiltre;


 const nbTaches = taches.filter(t => t.completee == false).length;

  console.log(nbTaches);

  function supprimerTout() {
    crudtache.supprimerTout(utilisateur.uid).then(
      () => {
        setTache(taches.filter(t => t.completee == false))
      }
    )
  }


  return (
    <footer className="Controle">
      <ToggleButtonGroup 
        size="small" 
        exclusive={true} 
      >
      <ToggleButton value={'toutes'} onClick={() => setFiltre('toutes') }>Toutes</ToggleButton>
        <ToggleButton value={true} onClick={() => setFiltre(true)} >Complétées</ToggleButton>
        <ToggleButton value={false} onClick={() => setFiltre(false)}>Actives</ToggleButton>
      </ToggleButtonGroup>
      <span className="compte">
        ({nbTaches} tâches restantes)
      </span>
      <IconButton 
        aria-label="delete" 
        size="small" 
        variant="contained" 
        color="secondary" 
        onClick={() => supprimerTout()} 
        title="Supprimer les tâches complétées"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </footer>
  );
}