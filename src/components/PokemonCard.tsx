import React, { useState, useEffect } from "react";
import "../styles/PokemonCard.css";

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
    image: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(data);
    fetchData();

    // Clean up function (optional)
    return () => {
      // perform any cleanup here, like canceling a fetch request or clearing timers
    };
  }, []);

  async function fetchData(): Promise<void> {
    try {
      await fetch(data.url).then(async (response) => {
        // console.log(response);
        const fetchedData = await response.json();
        // console.log(fetchedData);

        // Modify the data before setting it in the state
        const pokemonDetails: PokemonDetailsType = {
          ...fetchedData,
          name: fetchedData.name,
          image: fetchedData.sprites.other.dream_world.front_default,
        };

        //   console.log(pokemonDetails);
        setData(pokemonDetails);
        setLoading(false);
      });
    } catch (error) {
      setError("Error fetching details data");
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  function onClickReadMore() {

  }

  return (
    <div className="pokemon-card-container">
      {data ? (
        <>
          <div className="card">
            <img
              src={pokemonDetails.image}
              alt={pokemonDetails.name}
              className="pokemon-image"
            />
            <div className="details-container">
              <h4>
                <b>#0{pokemonDetails.id}</b>
              </h4>
              <div className="name-container">{pokemonDetails.name.toUpperCase()} 
              <span><button className="read-more-btn" onClick={()=>onClickReadMore()}>Read more</button></span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No data available.</div>
      )}
    </div>
  );
};

export default PokemonCard;
