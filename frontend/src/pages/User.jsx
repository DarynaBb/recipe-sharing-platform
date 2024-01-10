import React, { useContext, useEffect } from "react";
import UpperNav from "../components/UpperNav";
import UserProfile from "../components/UserProfile";
import { UserContext } from "../context/UserContext";
import UserRecipes from "../components/UserRecipes";

const User = () => {
	const { fetchUserData } = useContext(UserContext);

	useEffect(() => {
		fetchUserData();
	}, []);

	return (
		<>
			<UpperNav />
			<UserProfile />
			<UserRecipes />
		</>
	);
};

export default User;
