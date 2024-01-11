import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import heart from "../assets/Heart.svg";
import heartHover from "../assets/Heart-Hover.svg";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { UserContext } from "../context/UserContext";
import clock from "../assets/Clock.svg";
import difficulty from "../assets/Difficulty.svg";
import star from "../assets/Star_half.svg";


function SinglePage({ mealIdProp }) {

    let { id } = useParams();
    const { users, fetchUserData, deleteOrder, selectedUserId, url} =
        useContext(UserContext);
    const { setMealId } = useContext(RecipeContext);
    const [singleMeal, setSingleMeal] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isHeartActive, setIsActiveHeart] = useState(false);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        // mealId wird standardmäßig aus den Props geladen. Und wenn sie in den props nicht vorhanden ist, aus dem context
        (async function fetchMealById() {
            let lookupId = "";
            if (id) {
                lookupId = id;
                setMealId(id);
            }
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${lookupId}`
            );
            const data = await response.json();
            setSingleMeal(data);
            setTitle(data.meals[0].strMeal);
            setIsLoading(true);
        })();
    }, []);

    const onClickHandler = async () => {
      if (isHeartActive) {
          const findMeal = users[0].recipes.find((meal) => meal.title === title);
          if (findMeal) {
              deleteOrder("65956bcb1bb0197d3b42c6e5", findMeal._id);
          } else {
              console.log("Meal not found");
          }
      } else {
          let newRecipeItem = singleMeal.meals?.map((meal) => ({
              title: meal?.strMeal,
              ingredients: meal?.strIngredient1,
              steps: meal?.strInstructions,
              image: meal?.strMealThumb,
              mealId: meal?.idMeal,
          }));
  
          if (newRecipeItem && newRecipeItem.length > 0) {
              const response = await axios.post(url, newRecipeItem[0]);
          } else {
              console.log("No recipe items found");
          }
      }
      setIsActiveHeart(!isHeartActive);
  };
  
    return (
        <>
            <div>
                <Navbar />
                <SearchBar />
                <div className="my-[40px] max-container-nav p-[20px] md:padding-container">
                    {isLoading ? (
                        singleMeal.meals?.map((item) => (
                            <div key={item.id}>
                                <div className="flex flex-col md:flex-row justify-center gap-[20px]">
                                    <div className="relative md:basis-[50%] grow-0 flex md:justify-start justify-center">
                                        <img className="w-[75%] md:max-w-[500px] md:w-full object-cover aspect-[3/4]" src={item.strMealThumb} alt={item.strMeal} />
                                        <button
                                                className="absolute text-black font-semibold right-3 top-3 cursor-pointer"
                                                onClick={onClickHandler}
                                            >
                                                <img
                                                    className={`w-12 h-12 ${
                                                        isHeartActive ? "hidden" : "flex"
                                                    }`}
                                                    src={heart}
                                                />
                                                <img
                                                    className={`w-12 h-12 ${
                                                        isHeartActive ? "flex" : "hidden"
                                                    }`}
                                                    src={heartHover}
                                                />
                                            </button>
                                    </div>
                                    <div className="md:basis-[50%] flex flex-col justify-center items-center">
                                        <h2 className="text-[26px] md:text-[38px] font-poppins-semi-bold text-center">{item.strMeal}</h2>
                                        <div className="pb-[16px] border-b-[1px] border-black flex justify-between gap-[50px] md:gap-[80px] mt-[20px]">
                                            <div className="flex whitespace-nowrap gap-[7px]">
                                                <img src={clock} alt="" />
                                                <p className="text-[14px] font-poppins-semi-bold">1 H 20 M</p>
                                            </div>
                                            <div className="flex">
                                                <img src={star} alt="" />
                                                <p>4/5</p>
                                            </div>
                                        </div>
                                        <div className="flex mt-[20px] gap-[12px]">
                                            <img src={difficulty} alt="difficulty level" />
                                            <p className="uppercase font-poppins-regular">difficult</p>
                                        </div>
                                        <ul className="flex mt-[40px] md:mt-[70px] gap-[10px] md:gap-[16px]">
                                            <li>
                                                <a href="#">
                                                    <img width={40} src="/X.svg" alt="x" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img width={40} src="/Fb.svg" alt="facebook" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img width={40} src="/Insta.svg" alt="instagram" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img width={40} src="/Pinterest.svg" alt="pinterest" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row mt-[40px] md:mt-[70px] gap-[20px]">
                                    <ul className="font-poppins-regular text-gray64 basis-1/2 text-[14px] md:text-[17px] flex flex-col items-center md:items-start">
                                        <li>{item.strIngredient1}</li>
                                        <li>{item.strIngredient2}</li>
                                        <li>{item.strIngredient3}</li>
                                        <li>{item.strIngredient4}</li>
                                        <li>{item.strIngredient5}</li>
                                        <li>{item.strIngredient6}</li>
                                        <li>{item.strIngredient7}</li>
                                        <li>{item.strIngredient8}</li>
                                        <li>{item.strIngredient9}</li>
                                        <li>{item.strIngredient10}</li>
                                        <li>{item.strIngredient11}</li>
                                        <li>{item.strIngredient12}</li>
                                        <li>{item.strIngredient13}</li>
                                        <li>{item.strIngredient14}</li>
                                        <li>{item.strIngredient15}</li>
                                        <li>{item.strIngredient16}</li>
                                        <li>{item.strIngredient17}</li>
                                        <li>{item.strIngredient18}</li>
                                        <li>{item.strIngredient19}</li>
                                        <li>{item.strIngredient20}</li>
                                    </ul>
                                    <div className="basis-1/2">
                                        <p className="font-pt text-[14px] md:text-[17px]">{item.strInstructions}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Is loading...</p>
                    )}
                </div>
                

                             
             </div>
        </>
    );
}
export default SinglePage;