import React from "react";
import UpperNav from "../components/UpperNav";

function NotFoundPage() {
	return (
		<>
			<UpperNav/ >
			<h1 className="text-center my-[30px] text-[30px]">404 PAGE NOT FOUND  :(</h1>
			<div className="max-container padding-container flex flex-col items-center gap-[15px] mb-[50px] text-[20px]">
				<p>Oh, fabulous! You've just stumbled upon the mystical land of missing recipes.</p>
				<p>Clearly, our culinary geniuses have outdone themselves by creating a recipe so exclusive, it's invisible!</p>
				<p>Don't worry, it's not like you were craving a delightful dish or anything.</p>
				<p>Enjoy the sight of this empty plate, and imagine the flavors you won't get to taste.</p>
				<p>Happy imaginary cooking!</p>
			</div>
		</>
	)
	
}

export default NotFoundPage;
