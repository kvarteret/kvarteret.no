import { slide as Menu } from "react-burger-menu";
import { BlurImage, Link } from "..";


const Hamburger = ({ navigation, logo }) => {
	const items = [...navigation.left, ...navigation.right];
	if(items.length === 0) return <></>
	return (
		<Menu width={400} className="content">
			<div className="bm-logo">
				<Link href={"/"}>
					<BlurImage layout="fill" image={logo} priority noLoad></BlurImage>
				</Link>
			</div>
			<div className="scroller selected">
				<div className="left">
					<div className="bm-content">

						{items.map((x, i) => (
							<div key={i} className="bm-container">
								<HamburgerGroup navigationItem={x} />
							</div>
						))}
					</div>
				</div>
				<div className="right">
					<div className="bm-content">
					</div>
				</div>
			</div>
			
			<style jsx>
				{`
					.left, .right {
						width: calc(50% - 40px);
					}
					.scroller {
						display: flex !important;
						flex-direction: row;
						gap: 80px;
						width: calc(200% + 80px);
						transition: all 0.25s ease 0s !important;
					}
				.selected {
					transform: translate(calc(-50% - 40px), 0);

				}
				`}
			</style>

			<style jsx global>
				{`
				.bm-logo {
					position: relative;
					left: calc(50% - 30px);
					top: -60px;
					width: 60px;
					height: 60px;
				}
				.bm-content {
						transition: all 0.25s ease 0s !important;
				}

					/* Position and sizing of burger button */
					.bm-burger-button {
						position: fixed;
						width: 25px;
						height: 20px;
						left: 47.5px;
						top: 30px;
					}

					/* Color/shape of burger icon bars */
					.bm-burger-bars {
						background: white;
						height: 10% !important;
					}

					/* Color/shape of burger icon bars on hover*/
					.bm-burger-bars-hover {
						background: var(--primary-color);
					}

					/* Position and sizing of clickable cross button */
					.bm-cross-button {
						left: 40px !important;
						top: 20px !important;
						height: 40px !important;
						width: 30px !important;
					}

					/* Color/shape of close button cross */
					.bm-cross {
						background: #bdc3c7;
						height: 30px !important;
						width: 5px !important;
					}

					.bm-cross-button:hover .bm-cross {
						background: var(--primary-color) !important;
					}

					/*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
					.bm-menu-wrap {
						position: fixed !important;
                        width: 100vw !important;
						max-width: 400px !important;
						transition: all 0.25s ease 0s !important;
					}

					/* General sidebar styles */
					.bm-menu {
						background: rgba(40, 40, 53, 0.98);
						padding: 3.5em 1.5em 0;
						font-size: 1.15em;
					}

					/* Morph shape necessary with bubble or elastic */
					.bm-morph-shape {
						fill: #373a47;
					}

					/* Wrapper for item list */
					.bm-item-list {
						color: #b8b7ad;
						padding: 0.8em;
						height: 100%;
						width: 100%;
                        gap: 15px;
						display: flex !important;
						flex-direction: column;
					}

					/* Individual item */
					.bm-item {
						display: inline-block;
					}

					.bm-item:focus-visible {
						outline: none !important;
					}

					/* Styling of overlay */
					.bm-overlay {
						background: rgba(0, 0, 0, 0.7) !important;
						backdrop-filter: blur(4px);
					}

					@media (min-width: 992px) {
						.bm-overlay,
						.bm-menu-wrap,
						.bm-burger-button {
							display: none !important;
						}
					}
				`}
			</style>
		</Menu>
	);
};

export { Hamburger };
