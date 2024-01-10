import { React, useContext, useState } from "react";
import { RecipeContext } from '../context/RecipeContext';
import search from "../assets/Search.svg";
import { useNavigate } from 'react-router-dom';


function SearchBar () {
  const {dishName, setDishName, setIsLoading, setRecipes} = useContext(RecipeContext);
  const navigate = useNavigate();
  const [setOnFocus] = useState(false);

  const fetchDish = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`);
    const data = await response.json(); 
    setRecipes(data.meals);
    setIsLoading(true);
  }

  const onClickhandlerSearch = async (event) => {
    event.preventDefault();
    await fetchDish();
    setDishName("");
    navigate('/');
  };

  return (
    <div className='mt-[50px] mb-[20px] text-center'>
      <form action="" className='border-black border-b-[2px] inline-block'>
        <img className='w-[24px] h-[24px] inline' src={search} alt="search" />
          <input 
            className='outline-none'
            type="text" 
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
            value={dishName}
            onChange={(event) => setDishName((prevValue) => event.target.value)}
            placeholder="Dish"
          />
        <button type="submit" onClick={onClickhandlerSearch} className="">SEARCH</button>
      </form>
    </div>
  )
}

export default SearchBar