import Image from "next/image";
import ban1 from '../utils/images/landing/banner1.jpg'
import mban1 from '../utils/images/landing/mbanner1.jpg'

export default function Home() {
  return (
    <main className="mt-[2rem]">
      <Image
        src={ban1}
        alt="banner for miner game"
        className="w-[100%] rounded-[5px] cursor-pointer"
      />
      <section className="w-[100%]">
        <div className="">

        </div>
      </section>
    </main>
  );
}
