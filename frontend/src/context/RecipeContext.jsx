import { createContext, useState, useEffect } from "react";

const RecipeContext = createContext();

const RecipeContextProvider = ({ children }) => {
	const [recipes, setRecipes] = useState([]);
	const [category, setCategory] = useState("Seafood");
	const [isLoading, setIsLoading] = useState(false);
	const [dishName, setDishName] = useState("");
	const [mealId, setMealId] = useState("52959");

	useEffect(() => {
		const fetchRecipes = async () => {
			const response = await fetch(
				`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
			);
			const data = await response.json();
			setRecipes(data.meals);
			setIsLoading(true);
		};
		fetchRecipes();
	}, [category]);

	return (
		<RecipeContext.Provider
			value={{
				recipes,
				setRecipes,
				isLoading,
				setIsLoading,
				setCategory,
				category,
				dishName,
				setDishName,
				mealId,
				setMealId,
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};

export { RecipeContext, RecipeContextProvider };
