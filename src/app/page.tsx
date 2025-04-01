import Header from "../components/header";
import AboutUsButton from "../components/about-us-button";
import Link from "next/link";
import Image from "next/image";
import HomeBackground from "../components/parallax-background";
import InformationSection from "../components/information-section";
import ContactSection from "@/components/contact-section";
import ReserveSection from "@/components/reserve-section";
import MenuSlider from "@/components/menu-slider";

//to do:
// - change Logo
// - Add social media
// - Rooms pictures
// - set limits to the reservation form
// - add timeout to the reservation form to prevent spamming
// - contact form is not done yet

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className="relative min-h-screen" id="Home">
        <Header />
        <HomeBackground />
        <AboutUsButton />
      </section>

      <section className="w-full bg-white py-8 relative" id="About">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
          <div className="flex flex-col items-center justify-center p-8">
            <div className="text-2xl font-bold text-[#FFD700]">About Us</div>
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
      <section className="w-full bg-neutral-900 py-8 relative" id="Menu">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-64">
          <div className="flex justify-center items-center">
            {/* <FlipGroupSwiper /> */}
            <MenuSlider />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-white text-center">Lihat menu disini</div>
            <Link
              href="https://drive.google.com/drive/u/0/folders/1FrAqT7YYH8N2wWm2Qldcc-MKRAORBri3?sort=13&direction=a"
              className=" w-full flex justify-center"
            >
              <button className="bg-[#FFD700] px-6 py-2 rounded-md hover:bg-yellow-500 transition duration-300 text-black">
                Menu
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-white  py-40 relative" id="Information">
        <div className="flex justify-center text-black items-center text-2xl font-bold mb-12 ">
          Information
        </div>

        <div className="flex justify-center">
          <div className="bg-gradient-to-b from-neutral-400 to-neutral-600 p-4 w-full max-w-6xl rounded-md">
            <InformationSection />
          </div>
        </div>
      </section>

      <section className="w-full bg-neutral-900 relative py-40" id="Reserve">
        <div className="text-2xl text-[#FFD700] flex justify-center items-center mb-4">
          Reservation
        </div>

        <ReserveSection />
      </section>

      <section className="w-full bg-white py-40 relative" id="Contact">
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
          <div>© 2025 Pondok Gading Resto. All Rights Reserved.</div>
            <div className="flex items-center gap-4">
              <Link
              href="https://www.instagram.com/pondokgadingresto/"
              target="_blank"
              className="text-black hover:text-[#FFD700] transition duration-300"
              aria-label="Instagram"
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.281.059-2.563.334-3.637 1.408-1.074 1.074-1.349 2.356-1.408 3.637-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.059 1.281.334 2.563 1.408 3.637 1.074 1.074 2.356 1.349 3.637 1.408 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.281-.059 2.563-.334 3.637-1.408 1.074-1.074 1.349-2.356 1.408-3.637.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.059-1.281-.334-2.563-1.408-3.637-1.074-1.074-2.356-1.349-3.637-1.408-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.324c-2.296 0-4.162-1.866-4.162-4.162s1.866-4.162 4.162-4.162 4.162 1.866 4.162 4.162-1.866 4.162-4.162 4.162zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z" />
              </svg>
              </Link>
              

              <Link
              href="https://wa.me/6281288888888"
              target="_blank"
              className="text-black hover:text-[#FFD700] transition duration-300"
              aria-label="WhatsApp"
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.04 2c-5.523 0-10.04 4.477-10.04 10 0 1.77.46 3.44 1.33 4.93l-1.4 5.07 5.2-1.36c1.44.79 3.07 1.22 4.91 1.22 5.523 0 10.04-4.477 10.04-10s-4.517-10-10.04-10zm0 18.13c-1.59 0-3.12-.41-4.48-1.2l-.32-.18-3.09.81.83-3.01-.2-.33c-.83-1.37-1.27-2.95-1.27-4.62 0-4.41 3.59-8 8.04-8 4.41 0 8 3.59 8 8 0 4.41-3.59 8-8 8zm4.61-5.98c-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.57.12-.17.25-.65.81-.8.98-.15.17-.3.2-.55.08-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.39.11-.51.11-.11.25-.3.37-.45.12-.15.15-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.57-1.37-.78-1.88-.2-.48-.4-.41-.55-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2 0 1.18.86 2.33.98 2.49.12.17 1.7 2.59 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.15 1.53.09.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
              </svg>
              </Link>

              <Link
              href="https://www.google.com/maps/place/Pondok+Gading+Resto/@-6.4497889,106.9072093,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69eb76dbbedd59:0xa8cf09b6f0eb60f5!8m2!3d-6.4497889!4d106.909398!16s%2Fg%2F11c1gqj7lq"
              target="_blank"
              className="text-black hover:text-[#FFD700] transition duration-300"
              aria-label="Google Maps"
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2c-4.97 0-9 4.03-9 9 0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9zm0 16.2c-3.97 0-7.2-3.23-7.2-7.2s3.23-7.2 7.2-7.2 7.2 3.23 7.2 7.2-3.23 7.2-7.2 7.2zm-.6-10.8h1.2v4.8h-1.2v-4.8zm0 6h1.2v1.2h-1.2v-1.2z" />
              </svg>
              </Link>
            </div>
        </div>
      </footer>
    </main>
  );
}
