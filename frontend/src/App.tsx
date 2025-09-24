import { RouterProvider } from "react-router-dom"
import { router } from "./routes"

function App() {

  return (
    <div className="bg-[#130f40]">
      <RouterProvider router={router} />
    </div>
  )
}

export default App