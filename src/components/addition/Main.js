import { AdditionSolverProvider } from "../../state/AdditionSolverContext";
import AdditionSolver from "./AdditionSolver";
import Header from "../Header";

function Main() {
	return (
		<AdditionSolverProvider>
			<div className="add-wrapper">
				<Header />
				<AdditionSolver />
			</div>
		</AdditionSolverProvider>
	);
}

export default Main;
