import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"



export const AppRouter = () => {
  return (
    <Routes>
                {/* Login y registro */}
                //! si se entra por este path se cargan las sub rutas en AuthRoutes
        <Route path="/auth/*" element={<AuthRoutes/>} />
                    {/* Journal */}
                    //! si se entra por este path se cargan las sub rutas en JournalRoutes
         <Route path="/*" element={<JournalRoutes/>} />
    </Routes>

  )
}
