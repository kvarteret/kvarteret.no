import React from "react"
import Backdrop from "../Backdrop/Backdrop"
import KvarteretLogo from '../../images/logo.png'
import NavigationItems from "../../components/NavigationItems/NavigationItems"
import classes from "./Sidedrawer.module.css"

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <div>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <KvarteretLogo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </div>
    );
};

export default sideDrawer;