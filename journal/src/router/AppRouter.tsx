import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useCheckAuth } from "../hooks/";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui";

export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }
  return (
    <Routes>
      {status === "authenticated" ? (
        //JournalApp
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        // Login y registro
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      {/* <navigate/> se usa cuando elemento no va a renderizar un componente sino que se redirecciona a otra ruta*/}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
function useDisptach() {
  throw new Error("Function not implemented.");
}
