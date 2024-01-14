import React from "react";
import { useState, useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import heart from "../assets/Heart.svg";
import whiteHeart from "../assets/Heart-Hover.svg";
import star from "../assets/Star-border.svg"

function Main() {
	const [isHeartClicked, setIsHeartClicked] = useState(false);
	const [heartClickedIds, setHeartClickedIds] = useState([]);
	const { recipes, isLoading, setMealId, category } = useContext(RecipeContext);

	const onClickHandler = (idMeal) => {
		isHeartClicked ? setIsHeartClicked(false) : setIsHeartClicked(true);
		if (heartClickedIds.includes(idMeal)) {
			setHeartClickedIds(heartClickedIds.filter((id) => id !== idMeal));
		} else {
			setHeartClickedIds([...heartClickedIds, idMeal]);
		}
	}

	return (
		<div>
			<Navbar />
			<SearchBar />
			<div className="max-container px-[20px] py-[20px] flex-col md:flex-row md:padding-container flex items-start">
				<div className="text-center md:basis-1/4">
					<h2 className="text-[32px] font-medium my-[50px]">{category}</h2>
				</div>
				<div className="flex flex-col md:basis-3/4">
					{isLoading ? (
						<ul className="flex flex-wrap items-start gap-[15px] md:gap-[30px] justify-center">
							{recipes && recipes.length > 0 ? (
								recipes.map((recipe) => (
									<li key={recipe.idMeal} className="basis-[48%] md:basis-1/3 min-w-[250px] md:max-w-[250px] recipe-transition hover:scale-[1.1] relative">
										{/* <button onClick={() => onClickHandler(recipe.idMeal)} className="absolute top-[10px] right-[10px] z-10 ">
											<img src={heartClickedIds.includes(recipe.idMeal) ? whiteHeart : heart} alt="heart" />
										</button> */}
										<Link to={`/singlePage/${recipe.idMeal}`} onClick={() => setMealId(recipe.idMeal)}>
											<div className="relative">
												<img src={recipe.strMealThumb} alt={recipe.strMeal} className=""/>
											</div>
											<div className="flex justify-between items-start text-[12px] leading-[100%] mt-[10px]">
												<p className="basis-1/2 max-w-[276px] text-gray64 ">{recipe.strMeal}</p>
												<div className="flex items-center basis-1/2 justify-end w-[12px] h-[12px]">
													<img src={star} alt="star" />
													<p>0/5</p>	
												</div>	
											</div>
										</Link>
									</li>
								))
							) : (
								<p>No recipes available</p>
							)}
						</ul>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Main;
