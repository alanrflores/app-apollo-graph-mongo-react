class AuthDirective {
  visitFieldDefinition(field) {
    const { resolve } = field;
    const { requires } = this.args;

    field.resolve = function (...args) {
      const [, , context] = args;

      // Check for valid user with required role
      if (!context.user || !context.user.roles.includes(requires)) {
        throw new ForbiddenError("Unauthorized");
      }

      // Execute the field
      return resolve.apply(this, args);
    };
  }
}
