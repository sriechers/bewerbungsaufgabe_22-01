import Footer from "./Footer";

function Layout({ children, ...rest }) {
  return (
    <>
      <main {...rest}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
