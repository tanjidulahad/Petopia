import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { SearchInput, SearchIcon, SearchContainer } from './styled';
function Searchbar() {
  return (

    <SearchContainer className="relative flex flex-row mx-2  align-center">
      <AiOutlineSearch className="text-gray-400 my-2 ml-4" size={'25px'} />
      <SearchInput type="text" className=" w-full mx-2 focus:outline-none " placeholder="Search for items" />
    </SearchContainer>


  )
}

export default Searchbar