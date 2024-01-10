import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { GoClock } from "react-icons/go";
import { IoIosStarHalf } from "react-icons/io";
import { MdRoomService } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import heart from "../assets/Heart.svg";
import heartHover from "../assets/Heart-Hover.svg";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { UserContext } from "../context/UserContext";

function SinglePage({ mealIdProp }) {

    let { id } = useParams();
    const { users, fetchUserData, deleteOrder, selectedUserId} =
        useContext(UserContext);
    const { setMealId } = useContext(RecipeContext);
    const [singleMeal, setSingleMeal] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isHeartActive, setIsActiveHeart] = useState(false);
    const [title, setTitle] = useState("");
    const url = "https://rezept-share-plattform.onrender.com";
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
        console.log("delete is here")
          const findMeal = users[0].recipes.find((meal) => meal.title === title);
          if (findMeal) {
            console.log("we are inside if", selectedUserId, findMeal._id)
              deleteOrder("65956bcb1bb0197d3b42c6e5", findMeal._id);
              console.log(findMeal._id);
          } else {
              console.log("Meal not found");
          }
      } else {
        console.log("post is here")
          let newRecipeItem = singleMeal.meals?.map((meal) => ({
              title: meal?.strMeal,
              ingredients: meal?.strIngredient1,
              steps: meal?.strInstructions,
              image: meal?.strMealThumb,
              mealId: meal?.idMeal,
          }));
          console.log(newRecipeItem[0]?.mealId);
  
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
                {isLoading
                    ? singleMeal.meals?.map((item) => (
                            <div
                                key={item.idMeal}
                                className="bg-white min-h-screen text-black p-10"
                            >
                                <h2 className=" text-black text-5xl font-Poppins text-center font-medium">
                                    {item.strCategory}
                                </h2>
                                {console.log("user" + title)}
                                <SearchBar />
                                <div className="max-container padding-container">
                                    <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-12 place-items-center">
                                        <div className="relative col-span-6 flex justify-center">
                                            <img
                                                className="max-w-[400px] object-cover aspect-[3/4]"
                                                src={item.strMealThumb}
                                                alt="image"
                                            />
                                            <button
                                                className=" absolute text-black font-semibold right-3 top-3 cursor-pointer"
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
                                        <div className=" col-span-6 flex flex-col items-center">
                                            <h2 className="text-3xl font-bold mb-4 my-[20px]">
                                                {item.strMeal}
                                            </h2>
                                            <div className="w-[300px] flex justify-between border-b-2 border-black py-2">
                                                <div className=" flex items-center gap-2 font-bold">
                                                    <GoClock className="w-6 h-6" />
                                                    <p className="">1 H 20 M</p>
                                                </div>
                                                <div className="flex items-center gap-2 text-xl font-bold">
                                                    <IoIosStarHalf />
                                                    <p>4/5</p>
                                                </div>
                                            </div>
                                            <div className="mt-3 text-xl flex items-center gap-4 uppercase font-bold">
                                                <MdRoomService />
                                                <h4>Difficult</h4>
                                            </div>
                                            <div className="flex text-3xl mt-16 gap-4">
                                                <a href="https://twitter.com/">
                                                    {" "}
                                                    <FaSquareXTwitter />
                                                </a>
                                                <a href="https://facebook.com/">
                                                    {" "}
                                                    <FaFacebookSquare />
                                                </a>
                                                <a href="https://instagram.com/">
                                                    {" "}
                                                    <FaInstagramSquare />
                                                </a>
                                                <a href="https://pinterest.com/">
                                                    {" "}
                                                    <FaPinterest />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 mt-8 lg:padding-container">
                                        <div className="col-span-6 flex justify-start">
                                            <ul className=" text-start font-Poppins text-base text-gray-600 leading-[150%] ">
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
                                        </div>
                                        <div className=" col-span-6 flex justify-center">
                                            <p className="w-[400px] text-start font-serif text-black text-base leading-[150%]">
                                                {item.strInstructions}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                      ))
                    : "is loading"}
            </div>
        </>
    );
}
export default SinglePage;