import React, {Component} from "react"
import {Dropdown, Menu} from "antd";
import PropTypes from "prop-types";

class DropdownButton extends Component {
  state= {
    items : ""
  };
  selectHeaderOptionMenu = (menu) => {
    switch (menu) {
      case '1': {
        this.setState({items: menu});
        break;
      }
      case '2': {
        this.setState({items: menu});
        break;
      }
      case '3': {
        this.setState({items: menu});
        break;
      }
      case '4': {
        this.setState({items: menu});
        break;
      }
      default:
        return null;
    }
  };
  render() {
    const menu = (
      <Menu onClick = {(event) => event.stopPropagation()}>
        {this.props.options.map(option => {
          return (
            <Menu.Item key={option.id} onClick={() =>
              this.selectHeaderOptionMenu(option.value)}>
              {option.value}
            </Menu.Item>
          )
        })}
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']} onClick = {(e) => e.stopPropagation()}>
        {this.props.children}
      </Dropdown>
    )
  }
}

export default DropdownButton

DropdownButton.defaultProps = {
  options: []
};

DropdownButton.propTypes = {
  option: PropTypes.array
};