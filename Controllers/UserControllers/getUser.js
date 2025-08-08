const {PrismaClient} = require("@prisma/client")

const getUser = async(username)=>{
    try {
        const prisma = new PrismaClient();

        const user = await prisma.user.findUnique({where:{username: username}});
        console.log(user == undefined);
       return user !=undefined ?  {message: "Completed", data: user} : {message: "There's no user with those credentials"};

    } catch (error) {
        throw new Error(error?.message)
    }
}

module.exports = getUser;