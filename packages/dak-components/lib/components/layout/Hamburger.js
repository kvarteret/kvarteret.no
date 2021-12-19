import { slide as Menu } from "react-burger-menu";

const HamburgerItem = ({navigationItem} ) => {
    return <div className="container">
        <div className="title">{navigationItem.title}</div>
        <div className="chevron dak-right-circle"></div>
        <style jsx>
            {`
                .container {
                    font-size: 18px;
                    display: flex;
                    justify-content: space-between;
                }

                .title {
                }

                .chevron {
                    font-weight: 800;
                    font-size: 20px;
                }

                .container:hover {
                    color: var(--primary-color);
                    cursor: pointer;
                }
            `}
        </style>
    </div>
}

const HamburgerGroup = ({ navigationItem }) => {
    const isMulti = navigationItem.multiMenu?.length > 0;
	return <div className="container">
        <div className="group-title">
            {navigationItem.title}
        </div>
        {isMulti &&
            navigationItem.multiMenu.map((x, i) => <div key={i}><HamburgerItem navigationItem={x} /></div>)
        }
        <style jsx>
            {`
            .container {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            .group-title {
                font-weight: 700;
                font-size: 30px;
            }

            .group-title:hover {
                color: ${!isMulti ? "var(--primary-color)" : "inherit"};
                cursor: pointer;
            }
            `}
        </style>
        </div>;
};

const Hamburger = ({ navigation }) => {
	const items = [...navigation.left, ...navigation.right];
	return (
		<Menu width={400}>
			<div className="content">
				{items.map((x, i) => (
                    <div key={i} className="container">
					    <HamburgerGroup navigationItem={x} />
                    </div>
				))}
			</div>

			<style jsx>
				{`
					.content {
						height: 100%;
						width: 100%;
                        gap: 15px;
						display: flex !important;
						justify-content: center;
						flex-direction: column;
					}
				`}
			</style>

			<style jsx global>
				{`
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
						height: 100vh !important;
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
					}

					/* Individual item */
					.bm-item {
						display: inline-block;
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
