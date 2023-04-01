import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SinglePostLayout = ({ children }) => {

  return <>
    <Header />
    <div id="single-post-content">
      {children}
    </div>
    <Footer />
  </>
}

export default SinglePostLayout;