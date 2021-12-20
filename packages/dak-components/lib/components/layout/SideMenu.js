import React, { useState, useEffect } from "react";
import { BlurImage, Link } from "..";

const callFunction = (func) => {
	if (!func || typeof func !== "function") return;
	func();
};

const SideMenu = ({ open, children, onClose, logo }) => {
	const [width, setWidth] = useState(400);
	const [isClosing, setClosing] = useState(true);

	const startClosing = () => {
		if (isClosing) return;
		setClosing(true);
		console.log("Start closing");
		setTimeout(() => {
			console.log("Closing");
			callFunction(onClose);
		}, 250);
	};

    useEffect(() => {
        if(open) {
            setClosing(false);
        }
    }, [open])

	const [dragging, setDragging] = useState(false);
	const [startX, setStartX] = useState(0);

	const getTouchX = (event) => event?.targetTouches[0]?.pageX;

	const onDragStart = (e) => {
		setDragging(true);
		setStartX(getTouchX(e));
	};

	const onDrag = (e) => {
		if (dragging) {
			setWidth(400 - (startX - getTouchX(e)));
		}
	};

	const onDragEnd = (e) => {
		setDragging(false);
		if (width / 400.0 < 0.3) {
			startClosing();
		}
		setWidth(400);
	};

	return (
		<div className="wrapper">
			<div
				onClick={() => startClosing()}
				className={`backdrop${open ? "-open" : ""}`}
				onTouchStart={(e) => onDragStart(e)}
				onTouchMove={(e) => onDrag(e)}
				onTouchCancel={(e) => onDragEnd(e)}
				onTouchEnd={(e) => onDragEnd(e)}
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className={`container ${open ? "open" : ""} ${isClosing ? "closing" : ""}`}
				>
					<div className="top-bar">
						<div className="close" onClick={() => startClosing()}>
							<div></div>
							<div></div>
						</div>
						<div className="logo">
							<Link href={"/"}>
								<a>
									<BlurImage layout="fill" image={logo} priority noLoad></BlurImage>
								</a>
							</Link>
						</div>
						<div className="spacing"></div>
					</div>
					{children}
				</div>
			</div>
			<style jsx>
				{`
                    .wrapper {
                        position: absolute;
                        left: 0;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                    }
					.container,
					.backdrop {
						display: none;
					}

					.backdrop-open {
						display: block;
						position: fixed;
						left: 0;
						right: 0;
						top: 0;
						bottom: 0;
						z-index: 1000;
						background: rgba(0, 0, 0, 0.7);
						backdrop-filter: blur(4px);
					}

					.open {
						z-index: 1000;
						display: block;
						position: fixed;
						left: 0;
						top: 0;
						bottom: 0;
						width: 400px;
                        transform: translate(-${400 - width}px, 0);
						background: rgba(40, 40, 53, 0.95);
						display: flex;
						flex-direction: column;
						padding: 40px;
						transition: all 0.25s ease 0s !important;
                        overflow: hidden;
                        gap: 60px;
					}

					.closing {
						transform: translate(-100%, 0);
					}

					.top-bar {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
					}

					.spacing,
					.close {
						width: 30px;
						height: 30px;
					}

					.close {
						font-size: 30px;
						color: white;
						cursor: pointer;
						position: relative;
						background-color: rgba(0, 0, 0, 0.01);
					}

					.close > div:before {
						content: " ";
						position: relative;
						display: block;
						width: 3px;
						height: 30px;
						transform: translate(13.5px, 0) rotate(45deg);
						background-color: white;
					}

					.close:hover > div:before {
						background-color: var(--primary-color);
					}

					.close > div:last-child:before {
						top: -30px;
						transform: translate(13.5px, 0) rotate(-45deg);
					}

					.logo {
						position: relative;
						width: 60px;
						height: 60px;
						cursor: pointer;
					}
				`}
			</style>
		</div>
	);
};

export { SideMenu };
