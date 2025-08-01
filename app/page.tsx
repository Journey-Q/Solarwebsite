import Header from "./components/header"
import Hero from "./components/hero"
import WhyChooesus from "./components/how-we-help"
import Packages from "./components/packages"
import LatestProducts from "./components/latest-products"
import OurProducts from "./components/our-products"
import OurServices from "./components/Our-services"
import FacebookPost from "./components/facebook-post"
import Testimonials from "./components/testimonials"
import InvestorModules from "./components/investor-modules"
import Footer from "./components/footer"
import ContactUs from "./components/Contactus"
import BecomeReseller from "./components/Directors"
import StickyProductBanner from "./components/Stickybanner"

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden m-0 p-0">
      <Header />
      {/* <StickyProductBanner /> */}
      <Hero />
      <WhyChooesus />
      <OurServices />
      <Packages />
      <LatestProducts />
      <OurProducts />
      <BecomeReseller />
      <FacebookPost />
      <Testimonials />
      <InvestorModules />
      <ContactUs />
      <Footer />
    </main>
  )
}
