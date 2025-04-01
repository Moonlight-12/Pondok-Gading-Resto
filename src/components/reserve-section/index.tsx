import ReserveForm from "./reserve-form";

export default function ReserveSection() {
  return (
    <>
      <ReserveForm />
      <div className="w-full bg-neutral-900 py-8 relative flex flex-col items-center justify-center gap-8">
        Jika lebih dari 10 orang, silahkan hubungi kami di nomor
        <a
          href="https://wa.me/6281288888888"
          className="text-[#FFD700] font-bold"
        >
          {" "}
          081288888888
        </a>
        <br />
      </div>
    </>
  );
}
