import "./header.css";
import { useState, useEffect } from "react";
import { createMedia } from "@artsy/fresnel";
import React from "react";
import { Link } from "react-router-dom";
import { Icon, Image, Menu, Sidebar, Dropdown } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../logo.png";
import { nanoid } from 'nanoid';
import { isUserExists, authoriseUser } from "../../Services/api";

const AppMedia = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920,
  },
});

const { Media, MediaContextProvider } = AppMedia;

const NavBarMobile = ({ children, leftItems, onPusherClick, onToggle, rightItems, visible }) => {
  return (
    <Sidebar.Pushable>
    <Sidebar.Pusher id="left-pusher" dimmed={visible} onClick={onPusherClick}>
        <Sidebar
        key={nanoid()}
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          items={leftItems}
          vertical
          visible={visible}
        />
    </Sidebar.Pusher>
      <Sidebar.Pusher
      >
        <Menu fixed="top" inverted>
          <Menu.Item>
            <Image as={Link} to="/" size="mini" src={logo} className="logoIcon" />
          </Menu.Item>
          <Menu.Item onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>

          <Menu.Menu position="right" key="rightItems">
            {rightItems.map((item, index) => {
              if (item.children) {
                return (
                  <Menu.Item key={`rightParams${index}`}>
                    {item.children}
                  </Menu.Item>
                );
              }
              return item ;
            })}
          </Menu.Menu>
        </Menu>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const NavBarDesktop = ({leftItems, rightItems }) => {
  return (
    <>
      <Menu fixed="top" inverted>
        <Menu.Item>
          <Image as={Link} to="/" size="mini" src={logo} className="logoIcon"/>
        </Menu.Item>

        {leftItems.map((item) => (
          <Menu.Item {...item} />
        ))}
        
        <Menu.Menu position="right" key={nanoid()}>
          {rightItems.map((item, index) => {
            if (item.children) {
              return (
                <Menu.Item key={`rightParams${index}`}>
                  {item.children}
                </Menu.Item>
              );
            }
            return item;
          })}
        </Menu.Menu>
      </Menu>
    </>
  );
};

function NavBar({ leftItems, rightItems }) {
  const [visible, setVisible] = useState(false);

  const handlePusher = () => {
    if (visible) setVisible(false);
  };
  const handleToggle = () => setVisible(!visible);

  return (
    <div className="customHeader">
      <Media at="mobile">
        <NavBarMobile
          leftItems={leftItems}
          onPusherClick={handlePusher}
          onToggle={handleToggle}
          rightItems={rightItems}
          visible={visible}
        ></NavBarMobile>
      </Media>

      <Media greaterThan="mobile">
        <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
      </Media>
    </div>
  );
}

const leftItems = [
  { as: Link, to: "/", content: "Home", key: "home" },
  { as: Link, to: "/Products", content: "Products", key: "products" },
];

const rightItems = [
];

function Header() {
  const { user, isAuthenticated, logout, loginWithRedirect, getAccessTokenSilently} = useAuth0();

  rightItems.length = 0;

  if (isAuthenticated) {
    console.log(user);
    rightItems.push({
      children: [
        <Image avatar spaced="right" src={user.picture} key="image" />,
        <Dropdown pointing="top left" text={user.name} key="userDropdown">
          <Dropdown.Menu key="userDropdownMenu">
            <Dropdown.Item text={user.name} key={user.name} />
            <Dropdown.Item
              as={Link}
              to="/dashboard"
              text="Dashboard"
              key="userDashboard"
            />
            <Dropdown.Item
              onClick={logout}
              text="Sign out"
              icon="power"
              key="userSignout"
            />
          </Dropdown.Menu>
        </Dropdown>,
      ],
    }); 
  } else { 
    rightItems.push(
     <Menu.Item onClick={loginWithRedirect}  text="login" key={nanoid()}>LogIn</Menu.Item>
    );
  }
  console.log("rightItems  ", rightItems)
useEffect(()=>{
  (async function(){
    if(isAuthenticated && localStorage.getItem("authoriseUser") === user.nickname) {
      let authorised;
      const isExists = await isUserExists(user.sub)
      if(!isExists || (isExists.httpStatus === "OK" && !isExists.info.exists)) {
        const token = await getAccessTokenSilently();
        authorised = await authoriseUser(user, token);
      }
      if (authorised && authorised.httpStatus === "OK" || isExists){
        localStorage.setItem("authoriseUser", user.nickname);
      }
    }
  })()

}, [isAuthenticated])

  return (
    <MediaContextProvider>
      <NavBar leftItems={leftItems} rightItems={rightItems}></NavBar>
    </MediaContextProvider>
  );
}

export default Header;
