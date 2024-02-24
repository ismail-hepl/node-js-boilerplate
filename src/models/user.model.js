import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        hasAccess: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

// static method to find user by username
UserSchema.statics.findByUsername = async function(username) {
    return await this.findOne({ username });
}

UserSchema.statics.findByEmail = async function(email) {
    return await this.findOne({ email });
}

export default mongoose.model('User', UserSchema);