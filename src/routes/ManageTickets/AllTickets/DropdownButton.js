import React, {Component} from "react"
import {Dropdown, Menu} from "antd";


class DropdownButton extends Component {
  state= {
    items : ""
  }

  selectHeaderOptionMenu = (menu) => {
    switch (menu) {
      case '10': {
        this.setState({items: menu})
        break;
      }

      case '25': {
        this.setState({items: menu})
        break;
      }
      case '50': {
        this.setState({items: menu})
        break;
      }
      case '100': {
        this.setState({items: menu})
        break;
      }
      default:
        return null;
    }
  }
  render() {

    const menu = (
      <Menu >
        {this.props.options.map(option => {
          return (
            <Menu.Item key={option.id} onClick={() => this.selectHeaderOptionMenu(option.value)
            }>
              {option.value}
            </Menu.Item>
          )

        })}
      </Menu>
    );

    return (

      <Dropdown overlay={menu} trigger={['click']}>
        {this.props.children}
      </Dropdown>

    )
  }
}

export default DropdownButton