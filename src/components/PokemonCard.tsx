import React, { useState, useEffect } from 'react';

interface PokemonDetailsType {
    id: number;
    name: string;
    image: string;
}

interface ChildComponentProps {
    data: any | null;
  }

const PokemonCard: React.FC<ChildComponentProps> = ({ data }) => {
    const [pokemonDetails, setData] = useState<PokemonDetailsType>({
        id: 0,
    name: "",
    image: ""
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    
        // Clean up function (optional)
        return () => {
          // perform any cleanup here, like canceling a fetch request or clearing timers
        };
      }, []);

      async function fetchData(): Promise<void> {
        try {
          await fetch(data.url).then(async response => {
            console.log(response);
            const fetchedData = await response.json();
            console.log(fetchedData);
    
            // Modify the data before setting it in the state
            const pokemonDetails: PokemonDetailsType = {
                ...fetchedData,
                name: fetchedData.name,
                image: fetchedData.sprites.other.dream_world.front_default
              }
    
              console.log(pokemonDetails);
          setData(pokemonDetails);
          setLoading(false);
          });
        } catch (error) {
          setError('Error fetching data');
          setLoading(false);
        }
      };
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }
    
      return (
        <div>
            { data ? (
            <><div className="number">
                      <small>#0{pokemonDetails.id}</small>
                  </div><img src={pokemonDetails.image} alt={pokemonDetails.name} /><div className="detail-wrapper">
                          <h3>{pokemonDetails.name.toUpperCase()}</h3>
                          {/* <small>Type : {type}</small>
    <button className="pokeinfo" onClick={()=>setShow(!show)}>{show===true?"Know less...":"Know more..."}</button>
    {show===true?<Description weightpok={weight} heightpok={height} pokstat1={stat1}
    pokstat2={stat2}
    pokstat3={stat3}
    pokstat4={stat4}
    pokstat5={stat5}
    pokstat6={stat6}
    
    posbs1={bs1}
    posbs2={bs2}
    posbs3={bs3}
    posbs4={bs4}
    posbs5={bs5}
    posbs6={bs6}
     /> :<></>} */}

                      </div></>
            ) : (
                <div>No data available.</div>
              )}
        </div>
      );
}

export default PokemonCard;