import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ICurrentUser } from "../../interfaces/auth";

function HeaderLinks({ currentUser }: Props) {
  const [currentLinks, setCurrentLinks] = useState<CurrentLinks>([]);

  useEffect(() => {
    let headerLinks: { name: string; link: string }[] = [];
    switch (currentUser?.role) {
      case "student": {
        headerLinks = [
          {
            name: "Chat",
            link: "/students/chat",
          },
          {
            name: "Dashboard",
            link: "/students/dashboard",
          },
          {
            name: "Compliant",
            link: "/students/compliants",
          },
          {
            name: "Meals",
            link: "/students/meals",
          },
        ];
        break;
      }
      case "staff": {
        if (currentUser?.currentUser?.department === "chef") {
          headerLinks = [
            {
              name: "Chat",
              link: `/staffs/chat`,
            },
            {
              name: `Dashboard`,
              link: `/staffs/dashboard`,
            },
            {
              name: `Compliant`,
              link: `/staffs/compliants`,
            },
            {
              name: `Meals`,
              link: `/staffs/meals`,
            },
          ];
        } else if (currentUser?.currentUser?.department === "maintenance") {
          headerLinks = [
            {
              name: "Chat",
              link: `/staffs/chat`,
            },
            {
              name: `Dashboard`,
              link: `/staffs/dashboard`,
            },
            {
              name: `Compliant`,
              link: `/staffs/compliants`,
            },
            {
              name: `Maintenance`,
              link: `/staffs/maintenance`,
            },
          ];
        } else if (currentUser?.currentUser?.department === "warden") {
          headerLinks = [
            {
              name: "Chat",
              link: `/staffs/chat`,
            },
            {
              name: `Dashboard`,
              link: `/staffs/dashboard`,
            },
            {
              name: `Compliant`,
              link: `/staffs/compliants`,
            },
            {
              name: `Warden`,
              link: `/staffs/warden`,
            },
          ];
        }
        break;
      }
      case "chiefWarden":
        headerLinks = [
          {
            name: "Chat",
            link: `/chief-wardens/chat`,
          },
          {
            name: `Dashboard`,
            link: `/chief-wardens/dashboard`,
          },
          {
            name: `Compliant`,
            link: `/chief-wardens/compliants`,
          },
          {
            name: `Notices`,
            link: `/chief-wardens/notices`,
          },
          {
            name: `Blocks`,
            link: `/chief-wardens/blocks`,
          },
        ];
        break;
    }
    setCurrentLinks(headerLinks);
    // eslint-disable-next-line
  }, []);

  const displayLinks =
    currentLinks &&
    currentLinks.map((el: { name: string; link: string }) => (
      <NavLink
        className="text-sm text-primary font-black"
        to={el?.link}
        key={el?.name}
      >
        {el?.name}
      </NavLink>
    ));

  return <>{displayLinks}</>;
}

type CurrentLinks = { name: string; link: string }[] | [];

interface Props {
  currentUser: ICurrentUser;
}

export default HeaderLinks;