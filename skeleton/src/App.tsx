

import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CharacterSkeleton from "./components/CharacterSkeleton";
import axios from 'axios'
import { Characters, Result } from "./interface/characterInterface";
import { Character } from "./components/Character";


const fakePromise = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

const Imagenes=[0,1,2]

export default function App() {
  const [data, setData] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
        getData();
    }, 4000);
  
  }, []);

  const getData = async () => {
    try {
      //await fakePromise();
      const {data} = await axios.get<Characters>("https://rickandmortyapi.com/api/character/");
      
      setData(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography
        variant="h3"
        component="h1"
        textAlign="center"
        my={3}
      >
        Rick and Morty
      </Typography>

      <Box sx={{ display: "grid", gap: 2, maxWidth: 250, mx: "auto" }}>
        {loading
          ?
          
            // Array.from(new Array(3)).map((_, index) => (
            //   <CharacterSkeleton key={index} />
            // ))
            Imagenes.map((_,ix)=>{
              return <CharacterSkeleton key={ix} />
            })

          : data.map((character) => (
              <Character
              key={character.id}
              image={character.image}
              name={character.name}                
              />
            ))}
      </Box>
    </Container>
  );
}
