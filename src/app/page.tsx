import Header from "./components/header";
import ParallaxBackground from "./components/parallax-background";
import AboutUsButton from "./components/about-us-button";

export default function Home() {
  return (
    <main>
      <section className="relative h-screen">
        <Header />
        <ParallaxBackground imageUrl="/background.jpg" />

        <AboutUsButton />
      </section>

      <section className="w-full bg-neutral-500 py-8 relative" id="About">
        <div className="container mx-auto flex flex-col md:flex-row">
          <div className="flex flex-col items-center justify-center p-8">
            <div className="text-2xl font-bold text-green-200">About Us</div>
            <div className="text-white">
              Pondok Gading Resto merupakan satu satunya Tempat Makan dan Kedai
              Kopi berkelas Premium di jalan Raya Tlanjung Udik Gunung Putri.
              Menyediakan hidangan dengan menu masakan menggunakan resep
              istimewa dan Coffe Shop berkualitas terbaik. Tersedia Fasilitas
              Ruang Rapat besar dan kecil.
            </div>
          </div>

          <div className="flex items-center justify-center p-8">
            <div className="bg-gray-300 w-64 h-64 flex items-center justify-center">
              Image Placeholder
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-neutral-500 py-8 relative" id="About">
        <img src="/menu-cover.jpg"/>
      </section>

      <section className="w-full bg-neutral-500 py-8 relative" id="About">
        Contact
      </section>

      <section className="w-full bg-neutral-500 py-8 relative" id="About">
        Reserve
      </section>
    </main>
  );
}
