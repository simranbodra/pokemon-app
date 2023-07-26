import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import PokemonCard from './PokemonCard';

interface PokemonDataType {
  id: number;
  name: string;
  url: string;
}

const Dashboard: React.FC = () => {
  const [pokemonDataList, setData] = useState<PokemonDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);

  // let offset = 0;

  useEffect(() => {
    fetchData(true, offset);

    // Clean up function (optional)
    return () => {
      // perform any cleanup here, like canceling a fetch request or clearing timers
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  async function fetchData(loadMore: boolean, offset: number): Promise<void> {
    try {
      await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`).then(async response => {
        const fetchedData = await response.json();

        // Modify the data before setting it in the state
      let pokemonIndex = pokemonDataList.length;
      let pokemonDataListFetched = fetchedData.results.map((item: any) => {
        pokemonIndex++;
        return {
          ...item,
          id: pokemonIndex
        }
      });

      if(loadMore) {
        pokemonDataListFetched = [...pokemonDataList, ...pokemonDataListFetched]
      }

      console.log(pokemonDataListFetched);
      offset = pokemonDataList.length;
      setData(pokemonDataListFetched);
      setLoading(false);
      });
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
    setOffset(offset + 20);
  };

  function onClickMorePokemon() {
    fetchData(true, offset);
  }

  return (
    <div>
      
      <div className="app-container">
        <h1>Pokemon Kingdom</h1>
        <div className='description'>
          <h3>The Pokémon franchise revolves around 1010 fictional species of collectible monsters, each having unique designs, skills and powers. Conceived by Satoshi Tajiri in early 1989, Pokémon (or Pocket Monsters) are fictional creatures that inhabit the fictional Pokémon World.</h3>
        </div>
        <div className="pokemon-container">
       <div className="all-container">
        {
          pokemonDataList.map((pokemon)=> 
            <PokemonCard data={pokemon} key={pokemon.id}/>
          )}
       </div>
       <button className="load-more" onClick={()=>onClickMorePokemon()}>More Pokemons</button>
        </div>
      </div>
    
    </div>
  );
};

export default Dashboard;
