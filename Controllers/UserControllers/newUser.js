const { PrismaClient } = require("@prisma/client");

const newUser = async ({ username, email, role }) => {
  try {
    if (!(username && email && role))
      return {
        message:
          "Sorry, we need this information to continue and create the new user.",
      };
    const name = username;
    const attempt="user"; //Bracket Notation funciona como se espera.
    const prisma = new PrismaClient();

    const doesExist = await prisma[attempt].findUnique({
      where: {
        username: name,
      },
    });
    console.log(doesExist);
    if (doesExist == null) {
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          role,
        },
      });

      if (newUser != null) {
        return { message: "Success", data: newUser };
      } else
        return { message: "Sorry, something went wrong creating the user." };
    } else return { message: "Sorry, that user already exists" };
  } catch (error) {
    throw new Error(error?.message);
  }
};

module.exports = newUser;
