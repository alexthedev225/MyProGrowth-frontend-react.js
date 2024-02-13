import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="MyProGrowth" />
      <main className="flex-grow mx-4 md:mx-8 lg:mx-16 xl:mx-24 my-14">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
