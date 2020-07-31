module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        }
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Users = mongoose.model("Users", schema);
    return Users;
  };