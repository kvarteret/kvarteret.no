import { SideMenu } from "./SideMenu";
import React, {useState} from 'react';
import { HamburgerNavigation } from "./HamburgerNavigation";

const HamburgerMenuContext = React.createContext()


const HamburgerMenu = ({logo, navigation, children}) => {

	const items = [...navigation.left, ...navigation.right];
	if(items.length === 0) return <></>
    const [isOpen, setOpen] = useState(false);
    const [backCallback, setBackCallback] = useState({});

    const context = {
        open: () => {
            setOpen(true);
            if(backCallback?.goBack) {
                backCallback.goBack();
            }
            setBackCallback({});
        },
    }

    return <div>
        <SideMenu open={isOpen} logo={logo} goBackCallback={backCallback} onClose={() => setOpen(false)} >
            <HamburgerNavigation navigation={navigation} setBackCallback={setBackCallback} />
        </SideMenu>

        <HamburgerMenuContext.Provider value={context}>
            {children}
        </HamburgerMenuContext.Provider>
    </div>
}

export {HamburgerMenu, HamburgerMenuContext};