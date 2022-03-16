import Navbar from "./navbar/navbar";
import Footer from './Footer'
import Auth from "./auth/auth";


const Layout = ({ children }) => {
    return (
        <>
            <div>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </div>
            <Auth />
        </>
    )
}
export default Layout;
