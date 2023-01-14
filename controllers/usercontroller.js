const user = require("../model/userModel")
const bcrypt = require("bcrypt")
module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const emailCheck = await user.findOne({ email })
        if (emailCheck) return res.send({ status: false, message: "This email is already register." })
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = await user.create({ username, email, password: hashedPassword });
        delete userData.password
        return res.send({ status: true, userData })
    }
    catch (error) {
        next(error)
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userCheck = await user.findOne({ email });
        if (!userCheck) return res.send({ status: false, message: "Incorrect Email or Password." });
        const isPasswordValid = await bcrypt.compare(password, userCheck.password);
        if (!isPasswordValid) return res.send({ status: false, message: "Incorrect Email or Password." });
        return res.send({ status: true, userCheck })
    }
    catch (error) {
        next(error)
    }
};

module.exports.setavatar = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const avatarImage = req.body.image;
        await user.findByIdAndUpdate(userID, {
            isAvatarImageSet: true,
            avatarImage
        })
        const userData = await user.findById(userID);
        return res.send({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });
    }
    catch (error) {
        next(error)
    }
};

module.exports.getallusers = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const users=await user.find({_id:{$ne:userID}}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ]);
        return res.send(users);
    }
    catch (error) {
        next(error)
    }
};