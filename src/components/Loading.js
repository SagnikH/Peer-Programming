import RingLoader from "react-spinners/RingLoader";

const Loading = () => {
	const color = "#4c3b4d";
	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<RingLoader color={color} size={150} />
			<h4 className="mt-5" style={{color: "#4c3b4d"}}>Please wait, Loading your content...</h4>
		</div>
	)
};

export default Loading;