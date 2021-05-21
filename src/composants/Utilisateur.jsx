import './Utilisateur.scss';
import { Avatar, Button } from '@material-ui/core';
import { deconnexion } from '../services/crud-utilisateurs';

export default function Utilisateur({utilisateur}) {
  return (
    <div className="Utilisateur">
      <span className="nom">{utilisateur.displayName}</span>
      <Avatar className="avatar" alt="Alibaba" src={utilisateur.photoURL} />
      <Button 
        variant="outlined"
        size="small"
        className="btnDeconnexion"
        onClick={() => deconnexion()}
      >
        Déconnexion
      </Button>
    </div>
  );
}