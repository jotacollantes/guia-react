import { Box, CircularProgress, Typography } from "@mui/material";
export const FullScreenLoading = () => {
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
      height={"calc(100vh - 200px)"}
    >
      <Typography sx={{ mb: 5 }} variant="h2" fontWeight={200} fontSize={20}>
        Cargando...
      </Typography>
      <CircularProgress thickness={4} />
    </Box>
  );
};
