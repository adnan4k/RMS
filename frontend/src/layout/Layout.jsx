import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

// eslint-disable-next-line react/prop-types
function Layout() {
  return (
    <div>
        <div className="mb-10">
        <Navbar />
        </div>
        <Outlet />
        <div className="mt-5">
        <Footer />
        </div>
    </div>
  )
}

export default Layout