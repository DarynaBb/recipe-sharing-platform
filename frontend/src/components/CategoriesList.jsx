import React, { useState, useContext, useEffect } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { useNavigate, useLocation } from 'react-router-dom';

function CategoriesList() {
  const [categories, setCategories] = useState([]);  
  const { isLoading, setIsLoading, setCategory } = useContext(RecipeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await response.json();
        console.log(data);
        setCategories(data);
        setIsLoading(true);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [setIsLoading]);

  const handleCategoryClick = (category) => {
    setCategory(category);
    if (currentPath.startsWith('/singlePage/')) {
      navigate('/'); 
    }
  };

  return (
    <div>
      {isLoading ? (
        <>
          <div className="py-[20px] px-[20px] md:px-0 border-border-gray border-b-[1px]">
            <ul className="flex flex-wrap gap-[10px] lg:gap-[24px] justify-center text-[14px] uppercase">
              {categories.categories?.slice(0, 10).map((item, index) => (
                <li key={item.idCategory} className="hover:underline cursor-pointer flex items-center">
                  <p onClick={() => handleCategoryClick(item.strCategory)}>
                    {item.strCategory}
                  </p>
                  {index === 6 ? 
                    (<div className="rounded-[50%] bg-black w-[10px] h-[10px] mx-[15px] lg:mx-[40px]"></div>)
                    : ""
                  }
                </li>
              ))}
            </ul>
          </div>
          <div className="py-[20px] px-[20px] md:px-[0] border-border-gray border-b-[1px]">
            <ul className="flex flex-wrap gap-[10px] lg:gap-[24px] justify-center text-[14px] uppercase">
              {categories.categories?.slice(10).map((item, index) => (
                <li key={item.idCategory} className="hover:underline cursor-pointer flex items-center">
                  <p onClick={() => handleCategoryClick(item.strCategory)}>
                    {item.strCategory}
                  </p>
                  {index === 1 ? 
                    (<div className="rounded-[50%] bg-black w-[10px] h-[10px] mx-[15px] lg:mx-[40px]"></div>)
                    : ""
                  }
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CategoriesList;
