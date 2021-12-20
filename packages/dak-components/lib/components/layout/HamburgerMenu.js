import { SideMenu } from "./SideMenu";
import React, {useState} from 'react';

const HamburgerMenuContext = React.createContext()


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
		<div className="title-container">
			<div className="group-title">
				{navigationItem.title}
			</div>
			{!isMulti && <div className="chevron dak-right-circle"></div>}
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

			.title-container {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
            .group-title {
                font-weight: 700;
                font-size: 30px;
            }

			.chevron {
                    font-weight: 700;
                font-size: 20px;

			}

            .title-container:hover {
                color: ${!isMulti ? "var(--primary-color)" : "inherit"};
                cursor: pointer;
            }
            `}
        </style>
        </div>;
};

const HamburgerMenu = ({logo, navigation, children}) => {

	const items = [...navigation.left, ...navigation.right];
	if(items.length === 0) return <></>
    const [isOpen, setOpen] = useState(false);

    const context = {
        open: () => setOpen(true)
    }

    return <div>
        <SideMenu open={isOpen} logo={logo} onClose={() => setOpen(false)} >

        <div className="scroller">
				<div className="left">
					<div className="content">

						{items.map((x, i) => (
							<div key={i} className="container">
								<HamburgerGroup navigationItem={x} />
							</div>
						))}
					</div>
				</div>
				<div className="right">
					<div className="content">
						<div>Hello world</div>
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
                        color: white;
					}
				.selected {
					transform: translate(calc(-50% - 40px), 0);

				}

                .content {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
				`}
			</style>
        </SideMenu>

        <HamburgerMenuContext.Provider value={context}>
            {children}
        </HamburgerMenuContext.Provider>
    </div>
}

export {HamburgerMenu, HamburgerMenuContext};