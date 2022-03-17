import Navbar from "./navbar/navbar";
import Footer from './Footer'
import Auth from "./auth/auth";


const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Auth />
        </>
    )
}
export default Layout;
