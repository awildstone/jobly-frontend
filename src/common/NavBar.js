import React, { useContext } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import UserContext from '../context/UserContext';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

/**
 * Renders a NavBar conditionally for an activeUser or noUser.
 * 
 * Consumes currentUser context.
 * 
 * Props: logout function to log out the currentUser.
 */

const NavBar = ({ logout }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { currentUser } = useContext(UserContext);

    if (isMobile) {
      return <MobileNav currentUser={currentUser} logout={logout} />
    } else {
      return <DesktopNav currentUser={currentUser} logout={logout} />
    }
};

export default NavBar;