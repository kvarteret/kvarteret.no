import React, { useState, useEffect } from "react";
import { BlurImage, Link } from "..";

const SideMenuContext = React.createContext();

const callFunction = (func) => {
	if (!func || typeof func !== "function") return;
	func();
};

const SideMenu = ({ open, children, goBackCallback, onClose, logo }) => {
	const [width, setWidth] = useState(400);
	const [isClosing, setClosing] = useState(true);

	const startClosing = () => {
		if (isClosing) return;
		setClosing(true);
		setTimeout(() => {
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

	const getTouchX = (event) => event?.targetTouches[0]?.screenX;

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
		if (width / 400.0 < 0.5) {
			startClosing();
		}
		setWidth(400);
	};

	return (
		<SideMenuContext.Provider value={{close: () => startClosing()}}>
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
						{!goBackCallback?.goBack && <div className="dak-cancel close" onClick={() => startClosing()}>
						</div>}
                        {goBackCallback?.goBack && <div className="dak-left-open back" onClick={() => callFunction(goBackCallback.goBack)}>
                            </div>
                            }
						<div className="logo">
							<Link href={"/"}>
									<BlurImage layout="fill" image={logo} priority noLoad></BlurImage>
							</Link>
						</div>
						<div className="spacing"></div>
					</div>
					{children({
						startClosing
					})}
				</div>
			</div>
			<style jsx>
				{`
                    .wrapper {
						display: ${open ? "block" : "none"};
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
						transition: all 0.25s ease 0s !important;
					}

                    .backdrop {
                        opacity: 0;
                        transition: opacity 0.25s ease-in-out;
                    }

					.backdrop-open {
						display: block;
						position: fixed;
						left: 0;
						right: 0;
                        opacity: 1;
						top: 0;
						bottom: 0;
						z-index: 1000;
						background: rgba(0, 0, 0, 0.7);
						backdrop-filter: blur(4px);
                        transition: opacity 0.25s ease-in-out;
					}

					.open {
						z-index: 1000;
						display: block;
						position: fixed;
						left: 0;
						top: 0;
						bottom: 0;
                        width: 100%;
						max-width: 400px;
                        -webkit-transform: translate3d(0, 0, 0);
                        transform: translate(-${400 - width}px, 0);
						background: rgba(40, 40, 53, 0.95);
						display: flex;
						flex-direction: column;
						padding: 40px;
                        overflow-x: hidden;
					}

					.closing {
						transform: translate(-100%, 0);
					}

					.top-bar {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 30px;
					}

					.spacing {
						width: 30px;
						height: 30px;
					}

					.close {
                        font-size: 40px;
						color: white;
						cursor: pointer;
						position: relative;
						background-color: rgba(0, 0, 0, 0.01);
					}

					.close:hover {
						color: var(--primary-color);
					}

					.logo {
						position: relative;
						width: 60px;
						height: 60px;
						cursor: pointer;
					}
					
					@media only screen and (min-width: 1280px) {
						.wrapper {
							display: none;
						}
					}

                    .back {
                        color: white;
                        font-size: 40px;
						cursor:pointer;
                    }
				`}
			</style>
		</div>
		</SideMenuContext.Provider>
	);
};

export { SideMenu, SideMenuContext };
