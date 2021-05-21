import { useEffect, useState } from 'react';
import logo from '../images/memo-logo.png';
import './Appli.scss';
import Controle from './Controle';
import Taches from './Taches';
import * as crudUtilisateurs from '../services/crud-utilisateurs';
import Accueil from './Accueil';
import Utilisateur from './Utilisateur';

export default function Appli() {
  // État de l'utilisateur
  const [utilisateur, setUtilisateur] = useState(null);
  const etatFiltre = useState('toutes');

  // Observer le changement d'état de la connexion utilisateur
  useEffect(() => crudUtilisateurs.observerConnexion(setUtilisateur), []);

  // État des tâches
  const etatTaches = useState([]);
  return (
    utilisateur ?
      <div className="Appli">
        <header className="appliEntete">
          <img src={logo} className="appliLogo" alt="Memo" />
          <Utilisateur utilisateur={utilisateur} />
        </header>
        <Taches etatTaches={etatTaches} utilisateur={utilisateur} etatFiltre={etatFiltre} />
        <Controle etatTaches={etatTaches} utilisateur={utilisateur}  etatFiltre={etatFiltre}  />
      </div>
    :
      <Accueil />
  );
}
