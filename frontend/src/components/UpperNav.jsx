import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/Avatar.svg";
import { UserContext } from "../context/UserContext";
function UpperNav() {
	const [userFirstName, setUserFirstName] = useState("");
	const [userLastName, setUserLastName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const {url} = useContext(UserContext);

	useEffect(() => {
		const fetchUserName = async () => {
			const response = await fetch(url);
			const data = await response.json();
			console.log(data[0]);
			setUserFirstName(data[0].firstName);
			setUserLastName(data[0].lastName);
			setIsLoading(true);
		};
		fetchUserName();
	}, []);
	return (
		<>
			<div className="border-border-gray border-b-[1px]">
				<div className="flex justify-between items-center pb-[20px] max-container-nav px-[20px] py-[20px] md:padding-container">
					<div className="hidden md:flex gap-[24px] uppercase text-[14px] font-poppins-regular text-text-gray ">
						<Link to="/">Recipes</Link>
						<p>Tips & Tricks</p>
					</div>
					<h1 className="text-[26px] md:text-[36px] font-poppins-semi-bold leading-[110%]">
						<Link to="/">GOOD FOOD</Link>
					</h1>
					<div className="flex items-center gap-[12px] uppercase text-[14px] font-poppins-regular text-text-gray">
						<img src={avatar} alt="avatar" className="w-[24px] h-[24px]" />
						<div className="border-l-[1px]">
						<Link className="pl-[12px]" to="/user">
							{`${isLoading ? userFirstName + " " + userLastName : "is Loading..."}`}
						</Link>
					</div>
					
						
					</div>
				</div>
			</div>
		</>
	);
}
export default UpperNav;
