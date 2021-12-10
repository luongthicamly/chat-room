const jwtHelper = require("../Heplpers/jwt.helper");
const debug = console.log.bind(console);
var mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/';
// Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
// Trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
let tokenList = {};

// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-trungquandev.com-green-cat-a@";
// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example-trungquandev.com-green-cat-a@";
let login = async (req, res) => {
    try {
      debug(`Đang giả lập hành động đăng nhập thành công với Email: ${req.body.user.email} và Password: ${req.body.user.password}`);
      // Mình sẽ comment mô tả lại một số bước khi làm thực tế cho các bạn như sau nhé:
      // - Đầu tiên Kiểm tra xem email người dùng đã tồn tại trong hệ thống hay chưa?
      // - Nếu chưa tồn tại thì reject: User not found.
      // - Nếu tồn tại user thì sẽ lấy password mà user truyền lên, băm ra và so sánh với mật khẩu của user lưu trong Database
      // - Nếu password sai thì reject: Password is incorrect.
      // - Nếu password đúng thì chúng ta bắt đầu thực hiện tạo mã JWT và gửi về cho người dùng.
      // Trong ví dụ demo này mình sẽ coi như tất cả các bước xác thực ở trên đều ok, mình chỉ xử lý phần JWT trở về sau thôi nhé:
      debug(`Thực hiện fake thông tin user...`);
      console.log(req);
      let accessToken='';
      let refreshToken ='';
      mongoClient.connect(url, function(err, client){
        if(err){
            console.log(err);
        } else{
            const db = client.db('chatdb');
            db.collection('users').findOne({"email":req.body.user.email, "password": req.body.user.password}).then( async function (result) {
              if (result) {
                // return result;
                console.log(result);
                const userFakeData = {
                  _id: result._id,
                  name: result.name,
                  email: result.email,
                  password: result.password,
                  birthday: result.birthday,
                  gender: result.gender,
                };
                debug(`Thực hiện tạo mã Token, [thời gian sống 1 giờ.]${result._id}`);
                accessToken =await  jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
                
                debug(`Thực hiện tạo mã Refresh Token, [thời gian sống 10 năm] =))`);
                refreshToken =await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife);
                tokenList[refreshToken] = {accessToken, refreshToken};
                console.log('acc' +accessToken);
                debug(`Gửi Token và Refresh Token về cho client...`);
                return res.status(200).json({accessToken, refreshToken});
              } else{
                const error = 'tk hoặc mk không đúng';
                return res.status(200).json({error})
              }
            })
        }
      })
      // const userFakeData = {
      //   _id: req.body.id,
      //   name: req.body.name,
      //   email: req.body.email,
      //   password: req.body.password,
      // };
      // debug(`Thực hiện tạo mã Token, [thời gian sống 1 giờ.]${req.body.email}`);
      // accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
      
      // debug(`Thực hiện tạo mã Refresh Token, [thời gian sống 10 năm] =))`);
      // refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife);
      // // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.
      // // lưu ý trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
      // tokenList[refreshToken] = {accessToken, refreshToken};
      
      // debug(`Gửi Token và Refresh Token về cho client...`);
      // return res.status(200).json({accessToken, refreshToken});
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  let refreshToken = async (req, res) => {
    // User gửi mã refresh token kèm theo trong body
    const refreshTokenFromClient = req.body.refreshToken;
    // debug("tokenList: ", tokenList);
    
    // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
      try {
        // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
        const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
        // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
        // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
        // debug("decoded: ", decoded);
        const userFakeData = decoded.data;
        debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
        const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
        // gửi token mới về cho người dùng
        return res.status(200).json({accessToken});
      } catch (error) {
        // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
        debug(error);
        res.status(403).json({
          message: 'Invalid refresh token.',
        });
      }
    } else {
      // Không tìm thấy token trong request
      return res.status(403).send({
        message: 'No token provided.',
      });
    }
  };
  module.exports = {
    login: login,
    refreshToken: refreshToken,
  }