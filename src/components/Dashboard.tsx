import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetchData();

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

  async function fetchData(): Promise<void> {
    try {
      await fetch('https://pokeapi.co/api/v2/pokemon?limit=20').then(async response => {
        const fetchedData = await response.json();

        // Modify the data before setting it in the state
      const pokemonDataList = fetchedData.results.map((item: any, index: number) => ({
        ...item,
        id: index
      }));

      setData(pokemonDataList);
      setLoading(false);
      });
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  return (
    <div>
      
      <div className="app-container">
     <h1>Pokemon Kingdom .</h1>
    
     <div className="pokemon-container">
       <div className="all-container">
        {
          pokemonDataList.map((pokemon)=> 
            <PokemonCard data={pokemon} />
          )}
       </div>
       <button className="load-more" onClick={()=>fetchData()}>More Pokemons</button>
     </div>
    </div>
    
    </div>
  );
};

export default Dashboard;
