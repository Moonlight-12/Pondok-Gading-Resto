import Header from "../components/header";
import AboutUsButton from "../components/about-us-button";
import Link from "next/link";
import Image from "next/image";
import FlipGroupSwiper from "../components/menu-section";
import HomeBackground from "../components/parallax-background";
import InformationSection from "../components/information-section";
import ContactSection from "@/components/contact-section";
import ReserveSection from "@/components/reserve-section";

//to do:
// - Gallery page
// - Make the Navbar scroll to the section
// - Include available rooms
// - change color to black, gold and white
// - change Logo
// - Fix typing in reserve form


export default function Home() {
  return (
    <main>
      <section className="relative min-h-screen" id="Home">
        <Header />
        <HomeBackground />
        <AboutUsButton />
      </section>

      <section className="w-full bg-white py-8 relative" id="About">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
          <div className="flex flex-col items-center justify-center p-8">
            <div className="text-2xl font-bold text-green-200">About Us</div>
            <div className="text-neutral-500 w-82 text-center">
              Pondok Gading Resto merupakan satu satunya Tempat Makan dan Kedai
              Kopi berkelas Premium di jalan Raya Tlanjung Udik Gunung Putri.
              Menyediakan hidangan dengan menu masakan menggunakan resep
              istimewa dan Coffe Shop berkualitas terbaik. Tersedia Fasilitas
              Ruang Rapat besar dan kecil.
            </div>
          </div>

          <div className="flex items-center justify-center p-8">
            <div className="bg-gray-300 w-64 h-64 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="logo"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="w-full bg-neutral-500 py-8 relative" id="Menu">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-64">
          <div className="flex justify-center items-center">
            <FlipGroupSwiper />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-black text-center">Lihat menu disini</div>
            <Link
              href="https://drive.google.com/drive/u/0/folders/1FrAqT7YYH8N2wWm2Qldcc-MKRAORBri3?sort=13&direction=a"
              className=" w-full flex justify-center"
            >
              <button className="bg-amber-700 px-6 py-2 rounded-md hover:bg-amber-900">
                Menu
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="w-full bg-white relative py-40"
        id="Reserve"
      >
        <div className="text-2xl text-black flex justify-center items-center mb-4">
        Reservation
        </div>
        
        <ReserveSection />
      </section>

      <section className="w-full bg-neutral-500 py-40 relative" id="Contact">
        <div className="flex justify-center items-center text-2xl font-bold mb-12 text-black">
          Information
        </div>

        <div className="flex justify-center">
          <div className="bg-gradient-to-b from-neutral-400 to-neutral-600 p-4 w-full max-w-6xl rounded-md">
            <InformationSection />
          </div>
        </div>
      </section>

      <section
        className="w-full bg-white py-40 relative"
        id="Contact"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 p-4">
          <div className="flex flex-col justify-center items-center text-center p-6">
            <div className="text-2xl font-semibold mb-4 text-black">
              Contact
            </div>
            <div className="text-black w-94">
              Jangan Ragu untuk memberitahukan kepada kami mengenai keinginan
              anda terhadap pelayanan kami. Kami akan menanggapinya dengan penuh
              sukacita, Silahkan Tinggalkan Pesan anda.
            </div>
          </div>

          <ContactSection />
        </div>
      </section>

      <footer className="relative z-20 bg-neutral-300 text-black p-8">
        <div className="flex justify-between">
        <div>
        © 2018 Pondok Gading Resto. All Rights Reserved.
        </div>
        <div>

        </div>

        </div>
      </footer>
    </main>
  );
}
