"use client";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div className="flex w-full px-5 pt-4 items-center">
      <div className="relative flex items-center flex-grow bg-(--secondary-soft) rounded-xl border-none">
        <CiSearch className="absolute left-2 text-lg" />

        <input
          title="Search"
          className="bg-secondary-soft flex-grow pl-8 pr-2 py-2.5 rounded-lg border-none placeholder:text-gray-900"
          placeholder="Search"
        />
      </div>

      {/* <CreateGroup /> */}
    </div>
  );
};

export default SearchBar;
