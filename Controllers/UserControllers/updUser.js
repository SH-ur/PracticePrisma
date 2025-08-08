const { PrismaClient, Prisma } = require("@prisma/client");

const updUser = async (dataToUpd, idUser) => {
  try {
    const { username, email, role } = dataToUpd;

    if (!(username || email || role))
      return {
        message: "We need some information if you need to update an User",
      };
    else if (!idUser)
      return {
        message: "Id of User is missing, we need that to make the changes.",
      };

    const prisma = new PrismaClient();
    const exists = await prisma.user.findUnique({
      where: {
        id: idUser,
      },
    });

    if (exists != null || exists != undefined) {
      const upd = await prisma.user.update({
        where: {
          id: idUser,
        },
        data: dataToUpd,
      });
      return !upd?.name
        ? { message: "¡Successfully Updated!", updatedData: upd }
        : {
            message:
              "It seems like the DB doesn't found that register, please check and try again.",
            errorData: upd,
          };
    } else
      return {
        message:
          "The DB doesn't have any User with that Id. Please, check and try again.",
      };
  } catch (error) {
    throw new Error(error?.message);
  }
};

module.exports = updUser;
