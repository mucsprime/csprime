import React from "react";
import ModuleBlock from "@/components/ModuleBlock";
import module_json from "@/public/module_info.json";

function Page() {
  return (
    <div className="flex w-full p-4 justify-between flex-wrap">
      {Object.entries(module_json).map((module, i) => (
        <ModuleBlock code={module[0]} title={module[1].title} />
      ))}
    </div>
  );
}

export default Page;
