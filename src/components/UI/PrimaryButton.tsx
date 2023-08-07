import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
	type: "button" | "reset" | "submit" | "link";
	onClick?: () => void;
	buttonPreset: "primary" | "secondary" | "error" | "success";
	children: React.ReactNode;
	className?: string;
	animationCheck?: boolean;
	to?: string;
	disabled?: boolean;
};

const PrimaryButton = (props: Props) => {
	const [mousePress, setMousePress] = useState<boolean>(false);

	const buttonClassName = `h-full text-base border border-r-0 border-b-0 rounded-md px-6 py-1 duration-75 ${
		props.animationCheck && "animate-pulse"
	} ${mousePress && "scale-95"} ${
		props.buttonPreset === "primary"
			? "bg-purple-600 border-purple-400 hover:bg-purple-400"
			: props.buttonPreset === "secondary"
			? "bg-amber-500 border-amber-400 hover:bg-amber-400"
			: props.buttonPreset === "error"
			? "bg-red-600 border-red-400 hover:bg-red-400"
			: props.buttonPreset === "success" 
			&& "bg-lime-500 border-lime-300 hover:bg-lime-300"
	} disabled:bg-gray-400 disabled:border-gray-300 ${props.className}`;

	return (
		<>
			{props.type === "link" ? (
				<Link
					onMouseDown={() => {
						setMousePress(true);
					}}
					onMouseUp={() => {
						setMousePress(false);
					}}
					onMouseLeave={() => {
						setMousePress(false);
					}}
					className={buttonClassName}
					to={props.to !== undefined ? props.to : ""}>
					{props.children}
				</Link>
			) : (
				<button
					onMouseDown={() => {
						setMousePress(true);
					}}
					onMouseUp={() => {
						setMousePress(false);
					}}
					onMouseLeave={() => {
						setMousePress(false);
					}}
					className={buttonClassName}
					type={props.type}
					onClick={props.onClick}
					disabled={props.disabled}>
					{props.children}
				</button>
			)}
		</>
	);
};

export default PrimaryButton;
