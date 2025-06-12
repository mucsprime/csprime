import ModuleBlock from "@/components/ModuleBlock";
import module_json from "@/public/module_info.json";

export default function Home() {
  return (
    <>
      <div className="flex flex-col md:mt-6 p-4 pb-20 items-center max-w-[1200px]">
        <h1 className="sm:text-[60px] text-[40px] font-bold sm:mt-8 text-center">
          Your Educational Compass
        </h1>
        <h3 className="text-2xl text-gray-700 p-8 pt-4 pb-8 text-center">
          <span>Planting the seeds of knowledge</span>
          <br></br>
          <span>for a flourishing degree and career</span>
        </h3>
        <button className="bg-black py-2 px-6 text-white rounded-3xl shadow">
          Get Started
        </button>
      </div>
      <div
        className="flex flex-col items-center w-full bg-gray-50 relative
            bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
            bg-[size:24px_24px]"
      >
        <div className="max-w-[1200px] w-full">
          <h3 className="text-4xl font-semibold mt-8 mb-8 text-center">
            Explore Modules
          </h3>
          <div className="flex w-full justify-around flex-wrap">
            {Object.entries(module_json)
              .slice(0, 15)
              .map(([code, data]) => (
                <ModuleBlock key={code} code={code} title={data.title} />
                  //fff
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
