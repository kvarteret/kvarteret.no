import { SideMenu } from "./SideMenu";
import React, { useState } from "react";
import { HamburgerNavigation } from "./HamburgerNavigation";

const HamburgerMenuContext = React.createContext();

const HamburgerMenu = ({ logo, navigation, children }) => {
  const items = [...navigation.left, ...navigation.right];
  const [isOpen, setOpen] = useState(false);
  const [backCallback, setBackCallback] = useState({});

  const context = {
    open: () => {
      setOpen(true);
      if (backCallback?.goBack) {
        backCallback.goBack();
      }
      setBackCallback({});
    },
  };
  if (items.length === 0)
    return (
      <HamburgerMenuContext.Provider value={context}>
        {children}
      </HamburgerMenuContext.Provider>
    );
  return (
    <div>
      <SideMenu
        open={isOpen}
        logo={logo}
        goBackCallback={backCallback}
        onClose={() => setOpen(false)}
      >
        {({startClosing}) => (

        <HamburgerNavigation
        navigation={navigation}
        setBackCallback={setBackCallback}
        close={() => startClosing(false)}
      />
        )}
      </SideMenu>

      <HamburgerMenuContext.Provider value={context}>
        {children}
      </HamburgerMenuContext.Provider>
    </div>
  );
};

export { HamburgerMenu, HamburgerMenuContext };
