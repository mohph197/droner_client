import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const pages = [
    {
      id: 1,
      name: "Missions",
      link: "/manage",
    },
    {
      id: 2,
      name: "Live Map",
      link: "/",
    },
    {
      id: 3,
      name: "Settings",
      link: "/settings",
    },
  ];

  const [selectedPageId, setSelectedPageId] = React.useState(2);

  return (
    <Box
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#fff"
      zIndex={1}
      className="text-base border-b-black border-b"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <img src={Logo} alt="logo" />
          </nav>
          <nav>
            <HStack spacing={50} className="text-black">
              {pages.map((page) => (
                <Link
                  to={page.link}
                  key={page.name}
                  onClick={() => setSelectedPageId(page.id)}
                  className={`text-lg font-bold ${
                    selectedPageId === page.id &&
                    " text-[#0073E6] underline underline-thickness:2px underline-offset-4"
                  }`}
                >
                  {page.name}
                </Link>
              ))}
            </HStack>
          </nav>
          <nav></nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
