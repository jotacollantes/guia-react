import { LoadingButton } from "@mui/lab";
import { Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Weather } from "./interface/resposeWeather";


export const App = () => {
  const API_WEATHER_URL = `https://api.weatherapi.com/v1/current.json?key=${
    import.meta.env.VITE_API_KEY
  }&lang=es&q=`;

  const [ciudad, setCiudad] = useState("");
  //console.log(import.meta.env.VITE_API_KEY)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });

  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temp: 0,
    condition: 0,
    icon: "",
    conditionText: "",
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError({ error: false, message: "" });
    try {
      if (!ciudad.trim()) throw { message: "El campo es obligatorio" };
      const { data } = await axios.get<Weather>(
        `${API_WEATHER_URL}${ciudad}`
      );
      //if(!data) throw {message:"Ciudad no existe"}
      setWeather({
        city: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.code,
        icon: data.current.condition.icon,
        conditionText: data.current.condition.text,
      });
      //console.log(data);
    } catch (error) {
      //
      //console.log(error)
      setError({
        error: true,
        message: "city not found",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 3 }}>
      <Typography variant="h3" component={"h1"} align={"center"} gutterBottom>
        Weather App
      </Typography>
      <Box
        sx={{ display: "grid", gap: 2 }}
        component="form"
        autoComplete="off"
        onSubmit={(e) => {
          return onSubmit(e);
        }}
      >
        <TextField
          id="city"
          label="Ciudad"
          variant="outlined"
          size="small"
          required
          onChange={(e) => setCiudad(e.target.value)}
          value={ciudad}
          error={error.error}
          helperText={error.message}
        />
        <LoadingButton
          variant="contained"
          type="submit"
          loading={loading}
          loadingIndicator="Buscando Ciudad"
        >
          Buscar
        </LoadingButton>

        {weather.city && (
          <Box
            sx={{
              mt: 2,
              display: "grid",
              gap: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" component="h2">
              {weather.city},{weather.country}
            </Typography>
            <Box
              component="img"
              alt={weather.conditionText}
              src={weather.icon}
              sx={{ margin: "0 auto" }}
            />
            <Typography variant="h5" component="h3">
              {weather.temp} C
            </Typography>
            <Typography variant="h6" component="h4">
              {weather.conditionText}
            </Typography>
          </Box>
        )}
      </Box>
      <Typography textAlign="center" sx={{ mt: 2, fontSize: "10px" }}>
        Powered by:{" "}
        <a href="https://www.weatherapi.com/" title="Weather API">
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  );
};
//export default App
