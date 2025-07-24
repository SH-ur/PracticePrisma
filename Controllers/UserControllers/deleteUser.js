const {PrismaClient} = require("@prisma/client")

const deleteUser = async(idToDelete)=>{
    try {
    if(idToDelete == null || idToDelete == undefined) return {message: "I'm sorry, there's some kind of mistake. There's no Id, so we cannot proceed to delete anyone."};

    const prisma = new PrismaClient();
    const exists = await prisma.user.findUnique({
        where: {id: idToDelete}
    });
    console.log(exists)
    if(exists != null){
        const obliterate = await prisma.user.delete({
            where: {
                id: idToDelete
            }
        });

        return {message: "Succesfully deleted", deletedUser: obliterate};
    }
    } catch (error) {
        throw new Error(error?.message);
    }
}

module.exports= deleteUser;