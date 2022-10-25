import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Card } from './components/cards/card';

export interface Inputs {
  idgames?: number;
  name: string;
  cost: number | undefined | string;
  category: string;
}

const App = () => {
  const [values, setValues] = useState<Inputs>({
    name: '',
    cost: undefined,
    category: '',
  });
  const [listGames, setListGames] = useState<Inputs[]>([]);

  const handleChangeValues = (value: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/register', {
        name: values.name,
        cost: values.cost,
        category: values.category,
      })
      .then((response) => {
        setListGames([
          ...listGames,
          {
            name: values.name,
            cost: values.cost,
            category: values.category,
          },
        ]);
      });

    setValues({
      name: '',
      cost: '',
      category: '',
    });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/getCards').then((response) => {
      console.log('response:', response);
      setListGames(response.data);
    });
  }, [setListGames]);

  return (
    <form className="app--container" onSubmit={onFormSubmit}>
      <div className="register--container">
        <h1 className="register--title">Games Shop</h1>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={values.name}
          className="register--input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="cost"
          placeholder="Preço"
          value={values.cost}
          className="register--input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="category"
          placeholder="Categoria"
          value={values.category}
          className="register--input"
          onChange={handleChangeValues}
        />
        <button className="register--button">Cadastrar</button>
      </div>
      {typeof listGames !== 'undefined' &&
        listGames.map((value: Inputs) => {
          return (
            <Card
              key={value.idgames}
              listCard={listGames}
              setListCard={setListGames}
              id={value.idgames ? value.idgames : 0}
              name={value.name}
              cost={value.cost ? value.cost : ''}
              category={value.category}
            ></Card>
          );
        })}
    </form>
  );
};

export default App;
