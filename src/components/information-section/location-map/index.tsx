export default function Map() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 max-w-md mx-auto h-64 sm:h-72 md:h-96">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5654821597063!2d106.9072092750513!3d-6.4497888935416245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69eb76dbbedd59%3A0xa8cf09b6f0eb60f5!2sPondok%20Gading%20Resto%20%26%20Kedai%20Kopi!5e0!3m2!1sen!2sau!4v1742784705373!5m2!1sen!2sau"
        width="100%"
        height="100%"
        allowFullScreen={true}
        loading="lazy"
        className="rounded-lg border-2 border-gray-300"
      ></iframe>


    </div>
  );
}
