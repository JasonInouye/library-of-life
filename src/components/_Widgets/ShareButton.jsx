// import React from "react";
// import { useState } from 'react';


// /******* icon  ********/
// import { SiSlideshare } from "react-icons/si";

// /******* nested menu dropdowns  ********/
// import { Menu, Button } from "@mui/material";
// import NestedMenuItem from "material-ui-nested-menu-item";
// import MenuItem from '@mui/material/MenuItem';



// function ShareButton() {

//     const [menuPosition, setMenuPosition] = useState(null);

//     const handleClick = (event) => {
//       if (menuPosition) {
//         return;
//       }
//       event.preventDefault();
//       setMenuPosition({
//         top: event.pageY,
//         left: event.pageX
//       });
//     };
  
//     const handleItemClick = (event) => {
//       setMenuPosition(null);
//     };
  
//     const handleCreateLink = (event) => {
//       console.log('clicked create link');
//       setMenuPosition(null);
//     };
  
//     return (
//       <>
//       <Button 
//       onClick={handleClick}
//       variant='contained'
//       >
//         Share <span style={{ paddingLeft: '5px' }}><SiSlideshare /> </span>
//         </Button>
//         <Menu
//           open={!!menuPosition}
//           onClose={() => setMenuPosition(null)}
//           anchorReference="anchorPosition"
//           anchorPosition={menuPosition}
//         >
//           <MenuItem onClick={handleItemClick}>Share with everyone</MenuItem>
//           <NestedMenuItem
//             label="Choose from my connections"
//             parentMenuOpen={!!menuPosition}
//             onClick={handleItemClick}
//           >
//             <MenuItem onClick={handleItemClick}>Sub-Button 1</MenuItem>
//             <MenuItem onClick={handleItemClick}>Sub-Button 2</MenuItem>
//             <NestedMenuItem
//               label="sub category"
//               parentMenuOpen={!!menuPosition}
//               onClick={handleItemClick}
//             >
//               <MenuItem onClick={handleItemClick}>Sub-Sub-Button 1</MenuItem>
//               <MenuItem onClick={handleItemClick}>Sub-Sub-Button 2</MenuItem>
//             </NestedMenuItem>
//           </NestedMenuItem>
//           <MenuItem onClick={handleCreateLink}>Create a link to send</MenuItem>
          
//         </Menu>
//       </>
//     );
// }

// export default ShareButton;


import React from "react";
import { useState } from 'react';

/******* sweet alert  ********/
import swal from 'sweetalert';

/******* icon  ********/
import { SiSlideshare } from "react-icons/si";

/******* nested menu dropdowns  ********/
import { Menu, Button } from "@mui/material";
import NestedMenuItem from "material-ui-nested-menu-item";
import MenuItem from '@mui/material/MenuItem';


function ShareButton() {

    //TODO make dispatch instead of useState
    const [share, setShare] = useState('');

    const handleItemClick = (event) => {
        //Change to dispatch when hooked up to DB
        setShare(event.target.value);
        // if (share == 'friends' || 'family') {
        //     swal(`You have shared this with ${share}`);
        // }
        setMenuPosition(null);
    };
    console.log('selected share is:', share);




    const [menuPosition, setMenuPosition] = useState(null);

    const openShareMenu = (event) => {
        if (menuPosition) {
            return;
        }
        event.preventDefault();
        setMenuPosition({
            top: event.pageY,
            left: event.pageX
        });
    };

    // const handleItemClick = () => {
    //     setMenuPosition(null);
    // };


    return (
        <>
            <Button
                size="small"
                variant='contained'
                onClick={openShareMenu}
                style={{ backgroundColor: '#667b68' }}>
                Share
                <span style={{ paddingLeft: '5px' }}>
                    <SiSlideshare />
                </span>
            </Button>

            <Menu
                open={!!menuPosition}
                onClose={() => setMenuPosition(null)}
                anchorReference="anchorPosition"
                anchorPosition={menuPosition}
            >
                <NestedMenuItem
                    label="Choose from Friends"
                    parentMenuOpen={!!menuPosition}
                    onClick={handleItemClick}
                    
                >
                    <MenuItem
                        onClick={handleItemClick}
                        >
                        All Friends
                    </MenuItem>
                    <br />
                    <MenuItem onClick={handleItemClick}>
                        Dave
                    </MenuItem>
                </NestedMenuItem>

                <NestedMenuItem
                    label="Choose from Family"
                    parentMenuOpen={!!menuPosition}
                    onClick={handleItemClick}
                >
                    <MenuItem onClick={handleItemClick}>
                        All Family
                    </MenuItem>
                    <br />
                    <MenuItem onClick={handleItemClick}>
                        Mom
                    </MenuItem>
                </NestedMenuItem>

                <NestedMenuItem
                    label="Create link to send"
                    parentMenuOpen={!!menuPosition}
                    onClick={handleItemClick}
                >
                    {/* <MenuItem onClick={handleItemClick}>Create link to send</MenuItem> */}
                </NestedMenuItem>

            </Menu>
        </>
    )
}

export default ShareButton;
