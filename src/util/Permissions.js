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

// Departments
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
      return this.permissions.departments.filter((key) => key.name === "departments.index").length > 0
    }
    return false;
  };

  static canDepartmentDelete = () => {
    if (this.permissions.departments) {
      return this.permissions.departments.filter((key) => key.name === "departments.destroy").length > 0
    }
    return false;
  };


  // CannedResponse
  static canResponseAdd = () => {
    if (this.permissions.responses) {
      return this.permissions.responses.filter((key) => key.name === "responses.store").length > 0
    }
    return false;
  };

  static canResponseEdit = () => {
    if (this.permissions.responses) {
      return this.permissions.responses.filter((key) => key.name === "responses.update").length > 0
    }
    return false;
  };

  static canResponseView = () => {
    if (this.permissions.responses) {
      return this.permissions.responses.filter((key) => key.name === "responses.index").length > 0
    }
    return false;
  };

  static canResponseDelete = () => {
    if (this.permissions.responses) {
      return this.permissions.responses.filter((key) => key.name === "responses.destroy").length > 0
    }
    return false;
  };


  // TicketPriorities
  static canPriorityAdd = () => {
    if (this.permissions.priorities) {
      return this.permissions.priorities.filter((key) => key.name === "priorities.store").length > 0
    }
    return false;
  };

  static canPriorityEdit = () => {
    if (this.permissions.priorities) {
      return this.permissions.priorities.filter((key) => key.name === "priorities.update").length > 0
    }
    return false;
  };

  static canPriorityView = () => {
    if (this.permissions.priorities) {
      return this.permissions.priorities.filter((key) => key.name === "priorities.index").length > 0
    }
    return false;
  };

  static canPriorityDelete = () => {
    if (this.permissions.priorities) {
      return this.permissions.priorities.filter((key) => key.name === "priorities.destroy").length > 0
    }
    return false;
  };

  // TicketStatuses
  static canStatusAdd = () => {
    if (this.permissions.status) {
      return this.permissions.status.filter((key) => key.name === "status.store").length > 0
    }
    return false;
  };

  static canStatusEdit = () => {
    if (this.permissions.status) {
      return this.permissions.status.filter((key) => key.name === "status.update").length > 0
    }
    return false;
  };

  static canStatusView = () => {
    if (this.permissions.status) {
      return this.permissions.status.filter((key) => key.name === "status.index").length > 0
    }
    return false;
  };

  static canStatusDelete = () => {
    if (this.permissions.status) {
      return this.permissions.status.filter((key) => key.name === "status.destroy").length > 0
    }
    return false;
  };

  // RolesAndPermissions
  static canRoleAdd = () => {
    if (this.permissions.roles) {
      return this.permissions.roles.filter((key) => key.name === "roles.store").length > 0
    }
    return false;
  };

  static canRoleEdit = () => {
    if (this.permissions.roles) {
      return this.permissions.roles.filter((key) => key.name === "roles.update").length > 0
    }
    return false;
  };

  static canRoleView = () => {
    if (this.permissions.roles) {
      return this.permissions.roles.filter((key) => key.name === "roles.index").length > 0
    }
    return false;
  };

  static canRoleDelete = () => {
    if (this.permissions.roles) {
      return this.permissions.roles.filter((key) => key.name === "roles.destroy").length > 0
    }
    return false;
  };

  // Staff Permissions
  static canStaffAdd = () => {
    if (this.permissions.staffs) {
      return this.permissions.staffs.filter((key) => key.name === "staffs.store").length > 0
    }
    return false;
  };

  static canStaffEdit = () => {
    if (this.permissions.staffs) {
      return this.permissions.staffs.filter((key) => key.name === "staffs.update").length > 0
    }
    return false;
  };

  static canStaffView = () => {
    if (this.permissions.staffs) {
      return this.permissions.staffs.filter((key) => key.name === "staffs.index").length > 0
    }
    return false;
  };

  static canStaffDelete = () => {
    if (this.permissions.staffs) {
      return this.permissions.staffs.filter((key) => key.name === "staffs.destroy").length > 0
    }
    return false;
  };

  static canViewStaffDetail = () => {
    if (this.permissions.staffs) {
      return this.permissions.staffs.filter((key) => key.name === "staffs.show").length > 0
    }
    return false;
  };

  //Product Permissions
  static canProductAdd = () => {
    if (this.permissions.products) {
      return this.permissions.products.filter((key) => key.name === "products.store").length > 0
    }
    return false;
  };

  static canProductEdit = () => {
    if (this.permissions.products) {
      return this.permissions.products.filter((key) => key.name === "products.update").length > 0
    }
    return false;
  };

  static canProductView = () => {
    if (this.permissions.products) {
      return this.permissions.products.filter((key) => key.name === "products.index").length > 0
    }
    return false;
  };

  static canProductDelete = () => {
    if (this.permissions.products) {
      return this.permissions.products.filter((key) => key.name === "products.destroy").length > 0
    }
    return false;
  };

  //Service Permissions
  static canServiceAdd = () => {
    if (this.permissions.services) {
      return this.permissions.services.filter((key) => key.name === "services.store").length > 0
    }
    return false;
  };

  static canServiceEdit = () => {
    if (this.permissions.services) {
      return this.permissions.services.filter((key) => key.name === "services.update").length > 0
    }
    return false;
  };

  static canServiceView = () => {
    if (this.permissions.services) {
      return this.permissions.services.filter((key) => key.name === "services.index").length > 0
    }
    return false;
  };

  static canServiceDelete = () => {
    if (this.permissions.services) {
      return this.permissions.services.filter((key) => key.name === "services.destroy").length > 0
    }
    return false;
  };

  //Label Permissions
  static canLabelAdd = () => {
    if (this.permissions.labels) {
      return this.permissions.labels.filter((key) => key.name === "labels.store").length > 0
    }
    return false;
  };

  static canLabelEdit = () => {
    if (this.permissions.labels) {
      return this.permissions.labels.filter((key) => key.name === "labels.update").length > 0
    }
    return false;
  };

  static canLabelView = () => {
    if (this.permissions.labels) {
      return this.permissions.labels.filter((key) => key.name === "labels.index").length > 0
    }
    return false;
  };

  static canLabelDelete = () => {
    if (this.permissions.labels) {
      return this.permissions.labels.filter((key) => key.name === "labels.destroy").length > 0
    }
    return false;
  };

  // Customer Permissions
  static canCustomerAdd = () => {
    if (this.permissions.customers) {
      return this.permissions.customers.filter((key) => key.name === "customers.store").length > 0
    }
    return false;
  };

  static canCustomerEdit = () => {
    if (this.permissions.customers) {
      return this.permissions.customers.filter((key) => key.name === "customers.update").length > 0
    }
    return false;
  };

  static canCustomerView = () => {
    if (this.permissions.customers) {
      return this.permissions.customers.filter((key) => key.name === "customers.index").length > 0
    }
    return false;
  };

  static canCustomerDelete = () => {
    if (this.permissions.customers) {
      return this.permissions.customers.filter((key) => key.name === "customers.destroy").length > 0
    }
    return false;
  };

  static canViewCustomerDetail = () => {
    if (this.permissions.customers) {
      return this.permissions.customers.filter((key) => key.name === "customers.show").length > 0
    }
    return false;
  };

  //Company Permissions
  static canCompanyAdd = () => {
    if (this.permissions.customers) {
      return this.permissions.customers.filter((key) => key.name === "customers.companies.store").length > 0
    }
    return false;
  };

  static canCompanyEdit = () => {
    if (this.permissions.customers) {
      return this.permissions.customers.filter((key) => key.name === "customers.companies.update").length > 0
    }
    return false;
  };

  static canCompanyView = () => {
    if (this.permissions.customers) {
      return this.permissions.customers.filter((key) => key.name === "customers.companies.index").length > 0
    }
    return false;
  };

  static canCompanyDelete = () => {
    if (this.permissions.customers) {
      return this.permissions.customers.filter((key) => key.name === "customers.companies.destroy").length > 0
    }
    return false;
  };

  //Addresses Permissions
  static canAddressAdd = () => {
    if (this.permissions.addresses) {
      return this.permissions.addresses.filter((key) => key.name === "addresses.store").length > 0
    }
    return false;
  };

  static canAddressEdit = () => {
    if (this.permissions.addresses) {
      return this.permissions.addresses.filter((key) => key.name === "addresses.update").length > 0
    }
    return false;
  };

  static canAddressView = () => {
    if (this.permissions.addresses) {
      return this.permissions.addresses.filter((key) => key.name === "addresses.index").length > 0
    }
    return false;
  };

  static canAddressDelete = () => {
    if (this.permissions.addresses) {
      return this.permissions.addresses.filter((key) => key.name === "addresses.destroy").length > 0
    }
    return false;
  };
}


export default Permissions;