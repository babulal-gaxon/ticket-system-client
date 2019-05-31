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
  static canStatusAdd= () => {
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
}




export default Permissions;