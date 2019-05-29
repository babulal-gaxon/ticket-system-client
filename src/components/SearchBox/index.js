import React from "react";
import {Input} from "antd";

const SearchBox = ({styleName, placeholder, onChange, value}) => {

  return (
    <div className={`gx-search-bar ${styleName}`}>
      <div className="gx-form-group">
        <Input type="search" placeholder={placeholder} onChange={onChange}
               value={value}/>
        <span className="gx-search-icon gx-pointer"><i className="icon icon-search"/></span>
      </div>
    </div>
  )
};
export default SearchBox;

SearchBox.defaultProps = {
  styleName: "",
  value: "",
};
