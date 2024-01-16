import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import star from "../assets/Star-border.svg"
import AddRecipeForm from "./AddRecipeForm";
import Button from "./Button";

function UserRecipes() {
    const [hoveredItemId, setHoveredItemId] = useState(null);

    const {users, fetchUserData, isLoading, setIsAddingRecipe, updateRecipe, deleteRecipe} = useContext(UserContext);

    useEffect(() => {
        fetchUserData();
      }, []);

      const handleHover = (itemId) => {
        setHoveredItemId(itemId);
      };
      
      const handleMouseLeave = () => {
        setHoveredItemId(null);
      };

  return (
    <section className="max-container-nav p-[20px] md:padding-container mb-[20px] md:mb-[50px]">
  {isLoading ? (
    <>
      <div className="mb-[25px]">
        <h2 className="uppercase text-[14px] font-poppins-regular">my recipes</h2>
      </div>
      <ul className="flex gap-[20px] md:gap-[30px] flex-wrap justify-center">
        {users?.map((user) =>
          user.recipes?.map((recipe) => (
            <li
              key={recipe?._id}
              className="basis-[48%] md:basis-1/4 max-w-[276px] recipe-transition md:hover:scale-[1.1] relative"
              onMouseEnter={() => handleHover(recipe?._id)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`${hoveredItemId === recipe._id ? "flex" : "hidden"}  recipe-transition  flex absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] z-20 flex-col gap-[8px] md:gap-[16px]`}
              >
                <Button
                  title="edit"
                  bg="white"
                  onClickFunction={() => updateRecipe(user._id, recipe._id)}
                />
                <Button
                  title="delete"
                  bg="white"
                  onClickFunction={() => deleteRecipe(user._id, recipe._id)}
                />
              </div>
              <div>
                <img src={recipe.image} alt={recipe.title} className="" />
              </div>
              <div className="flex justify-between items-start text-[12px] leading-[100%] mt-[10px]">
                <p className="basis-1/2 max-w-[276px] text-gray64">
                  {recipe.title}
                </p>
                <div className="flex items-center basis-1/2 justify-end w-[12px] h-[12px]">
                  <img src={star} alt="star" />
                  <p>0/5</p>
                </div>
              </div>
            </li>
          ))
        )}
        <li className="bg-pinkF5 max-w-[276px] aspect-square basis-[48%] md:basis-1/4 flex items-center justify-center recipe-transition hover:scale-[1.1]">
          <button
            onClick={() => setIsAddingRecipe(true)}
            className="uppercase text-[14px] font-poppins-semi-bold border-[1px] border-black px-[10px] md:px-[40px] py-[10px]"
          >
            add new recipe
          </button>
        </li>
      </ul>
      <AddRecipeForm />
    </>
  ) : (
    <p></p>
  )}
</section>
  )
}

export default UserRecipes