import React, { Dispatch, SetStateAction } from 'react';
import { Inputs } from '../../App';
import './card.css';
import { FormDialog } from '../dialog/formDialog';

interface Icard {
  listCard: Inputs[];
  setListCard: Dispatch<SetStateAction<Inputs[]>>;
  id: number;
  name: string;
  cost: number | string | undefined;
  category: string;
}

export const Card = ({
  listCard,
  setListCard,
  id,
  name,
  cost,
  category,
}: Icard) => {
  const [open, setOpen] = React.useState(false);

  const handleClickCard = () => {
    setOpen(true);
  };

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        name={name}
        cost={cost}
        category={category}
        listCard={listCard}
        setListCard={setListCard}
        id={id}
      />
      <div className="card--container" onClick={handleClickCard}>
        <h1 className="card--title">{name}</h1>
        <p className="card--category">{category}</p>
        <p className="card--cost">R$ {cost}</p>
      </div>
    </>
  );
};
