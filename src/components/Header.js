import React, { useContext } from "react";
import { AdditionSolverContext } from "../state/AdditionSolverContext";

function Header() {
	const { showGuide, setShowGuide, setAnswer } = useContext(AdditionSolverContext);

	const handleShowGuide = () => {
		setShowGuide(!showGuide);
		setAnswer("");
	};
	return (
		<div className="Header">
			{showGuide ? (
				<>
					<h3>Sovle the problem by working through each part.</h3>
					<button onClick={handleShowGuide}>Close Guide</button>
				</>
			) : (
				<>
					<h3>Solve the problem by typing your answer in the box.</h3>
					<button onClick={handleShowGuide}>STEP-BY-STEP</button>
				</>
			)}
		</div>
	);
}

export default Header;
