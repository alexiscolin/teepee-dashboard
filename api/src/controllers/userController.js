const UserModel = require('../models/user');

// Get current user
exports.getCurrentuser = async (_, {id}) => {
    try {
        const result = await UserModel.findById(id);
        return result;

    } catch (error) {
        throw console.log(error);
    }
};