class Permissions {
  permissions = [];

  static setPermissions(userPermission) {
    this.permissions = userPermission;
  }

  static canTicketAdd = () => {
    if (this.permissions.tickets) {
      return this.permissions.tickets.filter((key) => key.name === "tickets.store").length > 0
    }
    return false;
  };

  static canTicketEdit = () => {
    if (this.permissions.tickets) {
      return this.permissions.tickets.filter((key) => key.name === "tickets.update").length > 0
    }
    return false;
  };

  static canTicketView = () => {
    if (this.permissions.tickets) {
      return this.permissions.tickets.filter((key) => key.name === "tickets.index").length > 0
    }
    return false;
  };

  static canViewTicketDetail = () => {
    if (this.permissions.tickets) {
      return this.permissions.tickets.filter((key) => key.name === "tickets.show").length > 0
    }
    return false;
  };

  static canTicketDelete = () => {
    if (this.permissions.tickets) {
      return this.permissions.tickets.filter((key) => key.name === "tickets.destroy").length > 0
    }

    return false;
  };

  // Department
  static canDepartmentAdd = () => {
    if (this.permissions.departments) {
      return this.permissions.departments.filter((key) => key.name === "departments.store").length > 0
    }
    return false;
  };

  static canDepartmentEdit = () => {
    if (this.permissions.departments) {
      return this.permissions.departments.filter((key) => key.name === "departments.update").length > 0
    }
    return false;
  };

  static canDepartmentView = () => {
    if (this.permissions.departments) {
      return this.permissions.departments.filter((key) => key.name === "departments.show").length > 0
    }
    return false;
  };

  static canDepartmentDelete = () => {
    if (this.permissions.departments) {
      return this.permissions.departments.filter((key) => key.name === "departments.destroy").length > 0
    }

    return false;
  };
}
export default Permissions;