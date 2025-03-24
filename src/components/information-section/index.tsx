import Map from "./location-map";

export default function InformationSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 px-16 gap-12 md:gap-4">
      <div className="md:col-span-2">
        <Map />
      </div>
      <div className="flex flex-col items-center mb-8 md:mb-0">
        <div className="mb-12 text-xl text-black">Address</div>
        <div className="text-center w-64 mb-4">
          3, Jl. Tlajung Udik No.10, RT.3/RW.12, Tlajung Udik, Kec. Gn. Putri,
          Kabupaten Bogor, Jawa Barat 16962, Indonesia
        </div>
        <div className="mb-4">Email</div>
        <div>
          Phone:{" "}
          <a
            href="tel:+6281282028851"
            className="text-white underline hover:text-blue-700"
          >
            +62 812-8202-8851
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-12 text-xl text-black">Opening Hours</div>
        <div className="">Monday - Sunday</div>
        <div className="">10:00 am - 7:30 pm</div>
      </div>
    </div>
  );
}
