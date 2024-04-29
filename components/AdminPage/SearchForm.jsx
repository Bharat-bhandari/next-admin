// import React, { useState } from "react";
// import { Input } from "@material-tailwind/react";
// import { CiSearch } from "react-icons/ci";
// import { useRouter } from "next/navigation";
// export default function SearchForm() {
//   const [query, setQuery] = useState("");
//   const router = useRouter();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!query.trim()) return; // Trimmed whitespace from query
//     router.push(`/products/search?query=${encodeURIComponent(query)}`); // Encoded query parameter
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex items-center w-full max-w-sm md:max-w-lg"
//     >
//       <Input
//         placeholder="Search"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="w-full py-2 rounded-l-md"
//       />

//       <button
//         type="submit"
//         className="px-3 py-2 text-white bg-blue-500 rounded-r-md"
//       >
//         <CiSearch className="w-5 h-5" />
//       </button>
//     </form>
//   );
// }

import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!query) return;
        router.push(`/products/search?query=${query}`);
      }}
      className="w-full md:w-72"
    >
      <Input
        label="Search"
        // icon={
        //   <button className="flex justify-end p-2 w-72">
        //     <CiSearch className="w-6 h-6 " />
        //   </button>
        // }
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
    </form>
  );
}
