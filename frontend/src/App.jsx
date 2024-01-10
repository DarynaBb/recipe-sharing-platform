import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router";

function App() {
	return (
		<div className="">
			<RouterProvider router={router} />
		</div>
	);
  }

export default App;
  