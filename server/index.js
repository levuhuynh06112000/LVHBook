
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server);

var url = 'mongodb+srv://levuhuynh:levuhuynh1@cluster0.sdlqc.mongodb.net/QLSV?retryWrites=true&w=majority';

const db = require("./app/models");
db.mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

const User = db.users;
server.listen(3000, function () {
    console.log('listening on *:3000');
});
app.get('/', function (req, res) {
    // res.sendfile('qlsv.html');
    console.log("ahihi");
});

// io.on("connection", socket => {
//     console.log("Co nguoi vua connect");
//     socket.on("chat message", msg => {
//       console.log(msg);
//       io.emit("chat message", msg);
//     });
//   });
io.on("connection", function (socket) {
    console.log("co nguoi vua connect")
    socket.on('login', function (email, password) {
      
        User.findOne({
            email: email
        })
            .populate("roles", "-__v")
            .exec((err, user) => {
                if (err) {
                    socket.emit('login',{
                        status: 500,
                        message: 'Server Error'
                    });
                    return;
                }
    
                if (!user) {
                    socket.emit('login',{
                        status: 400,
                        message: 'Người dùng không tồn tại!'
                    });
                    return;
                }
                if (user.password !== password) {
                    socket.emit('login',{
                        status: 400,
                        message: 'Mật khẩu không chính xác!'
                    });
                    return;
                }

                socket.emit('login',{
                    status: 200,
                    message: 'Đăng nhập thành công!',
                    data: {
                        email: user.email,
                        name: user.name, 
                        avatar: user.avatar
                    }
                })
                
            });
    });

    socket.on('register', function (name, password, email) {
        var condition = email ? { email: email } : {};
        var user = new User({
            name: name,
            password: password,
            email: email,
            avatar: 'https://cdnsefvi.sefvi.com//upload/photos/d-avatar.jpg'
        });
        User.find(condition).then(data => {
            if (data.length !== 0) {
                //email ton tai
                socket.emit('register', {
                    status: 400,
                    message: 'Email đã tồn tại!'
                });
                return;
            } else {
                user.save(user)
                    .then(data => {
                        if (!data) {
                            //that bai
                            socket.emit('register', {
                                status: 400,
                                message: 'Tạo tài khoản lỗi!'
                            });
                            return;
                        }
                        //thanh cong
                        socket.emit('register', {
                            status: 200,
                            message: 'Tạo tài khoản thành công!'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }).catch(err => {
            console.log(err);

            return;
        })
    });
    
    socket.on('getStudent', function (msg) {
        console.log("Nhan lenh getStudent: " + msg);

        // var cursor = collection_student.find(); // lay tat ca

        // cursor.each(function(err, doc) {
        //     if (doc != null) {
        //         var student = JSON.parse(JSON.stringify(doc));
        //         socket.emit('getStudent', student);
        //         console.log(student);

        //     } else {

        //         console.log("Ket thuc getStudent");

        //     }

        // });

    });

    socket.on('insertStudent', function (id, name, email) {
        console.log(name + "insertStudent");

        // var student = { id: id, name: name, email: email };

        // collection_student.insert(student, function(err, result) {
        //     if (err) {
        //         console.log(err);
        //         socket.emit('insertStudent', false);
        //     } else {
        //         console.log('Inserted new user ok');
        //         socket.emit('insertStudent', true);
        //     }
        // });
    });

    socket.on('deleteStudent', function (_id) {
        console.log(_id + " deleteStudent");
        // var student = { _id: new mongodb.ObjectID(_id) };
        // collection_student.remove(student, function(err, result) {
        //     if (err) {
        //         console.log(err);
        //         socket.emit('deleteStudent', false);
        //     } else {
        //         console.log('Delete product ok');
        //         socket.emit('deleteStudent', true);
        //     }
        // });
    });

    socket.on('updateStudent', function (_id, id, name, email) {
        console.log(name + " updateStudent");
        // collection_student.update({ _id: new mongodb.ObjectID(_id) }, { $set: { id: id, name: name, email: email } }, function(err, result) {
        //     if (err) {
        //         console.log(err);
        //         socket.emit('updateStudent', false);
        //     } else {
        //         socket.emit('updateStudent', true);

        //     }
        // });
    });
});

