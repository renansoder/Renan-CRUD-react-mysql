import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Inputs } from '../../App';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';

interface Iopen {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  cost: number | undefined | string;
  category: string;
  listCard: Inputs[];
  setListCard: Dispatch<SetStateAction<Inputs[]>>;
  id: number;
}

export const FormDialog = ({
  open,
  setOpen,
  name,
  cost,
  category,
  listCard,
  setListCard,
  id,
}: Iopen) => {
  const [editValues, setEditValues] = useState({
    id: id,
    name: name,
    cost: cost,
    category: category,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeValues = (value: ChangeEvent<HTMLInputElement>) => {
    setEditValues((prevValue) => ({
      ...prevValue,
      [value.target.id]: value.target.value,
    }));
  };

  const handleEditGame = () => {
    axios
      .put('http://localhost:3001/edit', {
        id: editValues.id,
        name: editValues.name,
        cost: editValues.cost,
        category: editValues.category,
      })
      .then(() => {
        setListCard(
          listCard.map((item) => {
            return item.idgames === editValues.id
              ? {
                  id: editValues.id,
                  name: editValues.name,
                  cost: editValues.cost,
                  category: editValues.category,
                }
              : item;
          })
        );
      });
    handleClose();
  };

  const handleDeleteGame = () => {
    axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      setListCard(
        listCard.filter((item) => {
          return item.idgames !== editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Jogo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome do Jogo"
          defaultValue={name}
          onChange={handleChangeValues}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="cost"
          label="Preço do Jogo"
          defaultValue={cost}
          onChange={handleChangeValues}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="category"
          label="Categoria do Jogo"
          defaultValue={category}
          onChange={handleChangeValues}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditGame}>Salvar</Button>
        <Button onClick={handleDeleteGame}>Excluir</Button>
        <Button onClick={handleClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};
