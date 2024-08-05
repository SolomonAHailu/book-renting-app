const { AbilityBuilder, Ability } = require("@casl/ability");

// Define roles and permissions based on userType
const defineAbilitiesFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  // Admin role
  if (user.userType === "0") {
    // Admins can manage all resources
    can("manage", "all");
  }
  // Bookowner role
  else if (user.userType === "1") {
    // Bookowners can create books
    can("create", "book");
    // Bookowners can update and delete only their own books
    can("update", "book", { createdBy: user.id });
    can("delete", "book", { createdBy: user.id });
    // Bookowners can rent books, but not their own
    can("rent", "book", { createdBy: { $ne: user.id } });
  }
  // Lesse role
  else if (user.userType === "2") {
    // Lesse can rent books
    can("rent", "book");
    // Lesse cannot create, update, or delete books
    cannot("create", "book");
    cannot("update", "book");
    cannot("delete", "book");
  }

  // Return the built ability instance
  return build();
};

module.exports = { defineAbilitiesFor };
