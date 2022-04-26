import React, {useState, useContext} from 'react';
import { Link } from '../Link';
import { SideMenuContext } from './SideMenu';
const HamburgerLine = ({title, isTitle, size, link, onClick}) => (
	<Link href={link || "#"}>
			<a>

			<div className={`container ${!isTitle ? "link" : ""}`} onClick={onClick && (() => onClick())}>
			<div className={`title`}>{title}</div>
			{!isTitle && <div className="chevron dak-right-circle"></div>}
	</div>
		<style jsx>
				{`
				a {
					color: white;
					cursor: default;
				}
					.container {
						font-size: ${size}px;
						display: flex;
						margin-top: 5px;
						align-items: center;
					}

					.title {
						width: calc(100% - 20px);
						word-wrap: break-word;
					}

					.chevron {
						font-weight: 800;
						font-size: 20px;
						width: 20px;
					}

					.link:hover {
						color: var(--primary-color);
						cursor: pointer;
					}
				`}
			</style>
			</a>
		</Link>
)

const HamburgerItem = ({ navigationItem }) => {
	const {close} = useContext(SideMenuContext);
	return (
		<div className="container">
			<div className="title">
				<HamburgerLine isTitle title={navigationItem.title} size={14} noChevron />
			</div>

			{navigationItem.groups.map((x, i) => (<HamburgerLine title={x.title} key={i} size={18} link={x.url} onClick={() => close()} />))}
			<style jsx>
				{`
				.title {
					color: rgb(161, 161, 161);
				}
				`}
			</style>
		</div>
	);
};

const HamburgerGroup = ({ navigationItem, setMultiData, close }) => {
	const isMulti = navigationItem.multiMenu?.length > 0;
	return (
		<div className="container">
				<HamburgerLine title={navigationItem.title} size={26} link={!isMulti && navigationItem?.url} onClick={() => {
					if(isMulti) {
						setMultiData(navigationItem.multiMenu)
					} else {

						close();
					}

				}} />

			<style jsx>
				{`
					.container {
						display: flex;
						flex-direction: column;
					}

					.title-container {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
					.group-title {
						font-weight: 700;
						font-size: 30px;
						width: calc(100% - 20px);
						word-wrap: break-word;
					}

					.chevron {
						font-weight: 700;
						font-size: 20px;
						width: 20px;
					}

					.title-container:hover {
						color: ${!isMulti ? "var(--primary-color)" : "inherit"};
						cursor: pointer;
					}
				`}
			</style>
		</div>
	);
};

const HamburgerNavigation = ({navigation, setBackCallback, close}) => {
	const items = [...navigation.left, ...navigation.right];

	const [isSelected, setSelected] = useState(false);
	const [data, setData] = useState([]);

	const setMultiData = (data) => {
		setSelected(!isSelected);
		setData(data);
		setBackCallback({
			goBack: () => {
				setSelected(null);
				setBackCallback({});
				setData(null)
			}
		});
	}
	return (
		<div>
			<div className={`scroller ${isSelected ? "selected" : ""}`}>
				<div className="left">
					<div className="content">
						{items.map((x, i) => (
							<div key={i} className="container">
								<HamburgerGroup close={close} navigationItem={x} setMultiData={setMultiData} />
							</div>
						))}
					</div>
				</div>
				{data && 
				<div className="right">
					<div className="content">
						{data.map((x, i) => 
							<div key={i} className="container"><HamburgerItem key={i} navigationItem={x} /></div>)}
					</div>
				</div>}
			</div>

			<style jsx>
				{`
					.left,
					.right {
						width: calc(50% - 40px);
					}
					.scroller {
						display: flex !important;
						flex-direction: row;
						width: calc(200% + 80px);
						max-width: 800px;
						color: white;
						transition: 250ms all;
					}
					.selected {
                        -webkit-transform: translate3d(0, 0, 0);
						transform: translate(calc(-50% - 40px), 0);
					}

					.content {
						display: flex;
						flex-direction: column;
					}

					.container {
						margin-bottom: 20px;
					}

					.left {
						margin-right: 80px;
					}
				`}
			</style>
		</div>
	);
};

export {HamburgerNavigation};