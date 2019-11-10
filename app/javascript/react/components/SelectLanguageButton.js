import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TranslateIcon from "@material-ui/icons/Translate";
import IconButton from "@material-ui/core/IconButton";
import { useTranslation } from "react-i18next";
import moment from "moment";
import koLocale from "moment/locale/ko";
import esLocale from "moment/locale/es";

const SelectLanguageButton = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t, i18n } = useTranslation();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = language => {
    i18n.changeLanguage(language);
    moment.locale(language);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <TranslateIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleLanguageChange("en")}>English</MenuItem>
        <MenuItem onClick={() => handleLanguageChange("es")}>Español</MenuItem>
        <MenuItem onClick={() => handleLanguageChange("ko")}>한국어</MenuItem>
      </Menu>
    </div>
  );
};

export default SelectLanguageButton;
