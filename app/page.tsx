import Header from "./components/header"
import Hero from "./components/hero"
import WhyChooesus from "./components/how-we-help"
import Packages from "./components/packages"
import LatestProducts from "./components/latest-products"
import OurProducts from "./components/our-products"
import Gallery from "./components/gallery"
import FacebookPost from "./components/facebook-post"
import Testimonials from "./components/testimonials"
import InvestorModules from "./components/investor-modules"
import Footer from "./components/footer"
import ContactUs from "./components/Contactus"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <WhyChooesus />
      <Packages />
      <LatestProducts />
      <OurProducts />
      <FacebookPost />
      <Testimonials />
      <InvestorModules />
      <ContactUs />
      <Footer />
    </main>
  )
}
