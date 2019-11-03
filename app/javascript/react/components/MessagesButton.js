import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { withChatkit } from "@pusher/chatkit-client-react";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// withChatkit gives us all the hcatkit props related to the useRef
const MessagesButton = withChatkit(props => {
  let history = useHistory();
  const [unreadMessageCount, setUnreadMessageCount] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMessageMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = event => {
    setAnchorEl(null);
  };

  const handleRoomClick = room => {
    // we don't know hwo the other user is unti lwe subscribe to the room
    props.chatkit.currentUser
      .subscribeToRoom({
        roomId: room.id
      })
      .then(() => {
        // chatkit magically adds all the data to the room that was input as an argument
        console.log("subscribed room", room);

        // get hte other user's id so we can navigate to the chats page
        let otherUserId = null;
        // props.userId is the one that was passed in, it's MY user id. we are checking below to make sure that if it's not our id, it will be the other preson since thiss is only a 1 to 1 chat.
        room.userIds.forEach(userId => {
          if (userId !== props.userId) {
            otherUserId = userId;
          }
        });

        if (otherUserId) {
          history.push(`/chats/${props.userId}/${otherUserId}`);
        }
      });
  };

  useEffect(() => {
    if (!props.chatkit.isLoading) {
      console.log(props.chatkit.currentUser);
      console.log(props.chatkit.currentUser.rooms);

      let unreadMessageCount = 0;
      props.chatkit.currentUser.rooms.forEach(room => {
        unreadMessageCount += room.unreadCount;
      });

      setRooms(props.chatkit.currentUser.rooms);
      setUnreadMessageCount(unreadMessageCount);
    }
  }, [props.chatkit.currentUser]); // this waits until currentUser is truthy to run useEffect

  const menuId = "messages-menu";

  const menuItems = rooms.map(room => (
    // after hashrocket, parentheses and not curly braces cause JSX. below, has to use an anonymous function because we need to give the room as an argument
    <MenuItem key={room.id} onClick={() => handleRoomClick(room)}>
      {room.name}
    </MenuItem>
  ));

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {menuItems}
    </Menu>
  );

  return (
    <div>
      <IconButton color="inherit" onClick={handleMessageMenuOpen}>
        <Badge badgeContent={unreadMessageCount} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      {renderMenu}
    </div>
  );
});

export default MessagesButton;
