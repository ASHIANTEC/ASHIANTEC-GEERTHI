/**
* Module dependencies.
*/
require('dotenv').config();
const multer = require('multer');
const exphbs=require('express-handlebars');
const express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
//const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const mysql      = require('mysql');
// Handlebars Middleware
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
let bodyParser=require("body-parser");
/*
//Server port
var db_config = {
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'training',

};

var connection;

function handleDisconnect() {
connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                // the old one cannot be reused.

connection.connect(function(err) {              // The server is either down
  if(err) {                                     // or restarting (takes a while sometimes).
    console.log('error when connecting to db:', err);
    setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
  }                                     // to avoid a hot loop, and to allow our node script to
});                                     // process asynchronous requests in the meantime.
                                        // If you're also serving http, display a 503 error.
connection.on('error', function(err) {
  console.log('db error', err);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
    handleDisconnect();                         // lost due to either server restart, or a
  } else {                                      // connnection idle timeout (the wait_timeout
    throw err;                                  // server variable configures this)
  }
});
}

handleDisconnect();*/
 //Server port
 
 const pool = mysql.createPool({
 
  connectionLimit : 100, 
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT
});


setInterval(function () {
  pool.query('SELECT 1', [], function () {})
}, 5000)

//const connection;
var getConnection = function(callback) {
  pool.getConnection(function(err, connection) {
      callback(err, connection);
  });
};
module.exports = getConnection;

//app.get("/",(req,res) => {
  
//});

//handleDisconnect();
//Server port

global.db = pool;


const socketio = require('socket.io');

const formatMessage = require('./public/assets/utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./public/assets/utils/users');
const server = http.createServer(app);
const io = socketio(server);

const botName = 'EMS';

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatRoom!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

// //UPLOAD CODE
// // Set The Storage Engine
// const storage1 = multer.diskStorage({
//   destination: function(req,file,cb)
//   {
//     cb(null,'./public/uploadphoto/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, 'Notes' + '-' + Date.now() + path.extname(file.originalname));
//   }
// });
// // //2 sample
// // const storage2 = multer.diskStorage({
// //   destination: function(req,file,cb)
// //   {
// //     cb(null,'./public/uploadsign/')
// //   } ,
// //   filename: function (req, file, cb) {
// //     cb(null, 'Sign' + '-' + Date.now() + path.extname(file.originalname));
// //   }
// // });
// // Init Upload - Upload notes
// // var upload2 = multer({
// //   storage: storage2,
// //   limits: { fileSize: 1000000000 }});
  
// // Check File Type
// function checkFileType2(file, cb) {
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif|mp4|3gp|wmv|webm|OGG|AVI|FLV /;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Invalid format!');
//   }
// }

// // Init Upload - Upload notes
// const upload1 = multer({
//   storage: storage1});

// // Check File Type
// function checkFileType(file, cb) {
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif|mp4|3gp|wmv|webm|OGG|AVI|FLV /;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Invalid format!');
//   }
// }

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static('public'))
// Public Folder
app.use(express.static('./public'));

// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000000000 }
}))
var storage=multer.diskStorage({
  destination:function(req,file,cb)
  {
    cb(null,'./public/uploads/')
  },
  filename: function(req,file,cb)
  {
    cb(null,Date.now()+file.originalname);
  }
});
var upload=multer({storage:storage});


app.post('/add_candidate', upload.any(), function(req, res, next){
   console.log(req.files);
   var myObj=req.files;
   for (i in myObj) {
     var x='';
    x += myObj[i].filename + "<br>";
   }
  // console.log('Filename 0:'+myObj[0].filename);
  // console.log('Filename 1:'+myObj[1].filename);
  // console.log('Filename 2:'+myObj[2].filename); 
  // console.log('Filename 3:'+myObj[3].filename);
  // console.log('Filename 4:'+myObj[4].filename);
  // console.log('Filename 5:'+myObj[5].filename);
  // console.log('Filename 6:'+myObj[6].filename); 
  // console.log('Filename 7:'+myObj[7].filename);
  // console.log('Filename 8:'+myObj[8].filename);
  // console.log('Filename 9:'+myObj[9].filename);

 
      var user = req.session.user,
      userId = req.session.userId;
      var x = Math.floor((Math.random() * 2) + 1);
      var post = req.body;
 
    //for profile tab
    var name = post.full_name;
    var userfirst = name.substring(0, 4);
    var cand_id=userfirst+x;    
    var initial = post.initial;
    var initial_expansion = post.initial_expansion;
    var father_name = post.father_name;
    var mother_name = post.mother_name;
    var date_of_birth = post.date_of_birth;
    var gender = post.gender;
    var blood_group = post.blood_group;
    var religion = post.religion;
    var community = post.community;
    var caste = post.caste;
    var nationality = post.nationality;
    var willing_to_donate_blood = post.willing_to_donate_blood;
    var registered_time = '';
    var last_modified_time = '';
    var academic_year = post.academic_year;
    var student_code = post.student_code;
    var dt = new Date();
    registered_time = `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`;
    last_modified_time= `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`;

     //for audit 
     var event_name='Adding_Student_MBBS';
     var current_user=cand_id;
     var user_agent=userId;
     var audited_time=registered_time;

     //for certificate
     var c1=post.c1;
     var c1_reg_no=post.c1_reg_no;
     var c1_date=post.c1_date;
     var c1_issue=post.c1_issue;
     var c1_place=post.c1_place; 

     var c2=post.c2;
     var c2_reg_no=post.c2_reg_no;
     var c2_date=post.c2_date;
     var c2_issue=post.c2_issue;
     var c2_place=post.c2_place; 

     var c3=post.c3;
     var c3_reg_no=post.c3_reg_no;
     var c3_date=post.c3_date;
     var c3_issue=post.c3_issue;
     var c3_place=post.c3_place; 

     var c4=post.c4;
     var c4_reg_no=post.c4_reg_no;
     var c4_date=post.c4_date;
     var c4_issue=post.c4_issue;
     var c4_place=post.c4_place; 

     var c5=post.c5;
     var c5_reg_no=post.c5_reg_no;
     var c5_date=post.c5_date;
     var c5_issue=post.c5_issue;
     var c5_place=post.c5_place; 

     var c6=post.c6;
     var c6_reg_no=post.c6_reg_no;
     var c6_date=post.c6_date;
     var c6_issue=post.c6_issue;
     var c6_place=post.c6_place; 

     
  
//for admission tab
    var rank=post.rank;
    var rank_no=post.rank_no;
    var ar_no=post.ar_no;
    var total_mark=post.total_mark;
    var neet_mark=post.neet_mark;
    var reg_no=post.reg_no;
    var neet_roll_no=post.neet_roll_no;
    var course=post.course;
    var admission_type=post.admission_type;
    var admission_quota=post.admission_quota;
    var course_commencement=post.course_commencement;
    var date_of_admission=post.date_of_admission;
    var date_of_allotment=post.date_of_allotment;
    var selected_category=post.selected_category;
    var willing_for_counciling=post.willing_for_counciling;

    //for address tab
    var ps_address=post.ps_address;
    var ps_pincode=post.ps_pincode;
    var ps_state=post.ps_state;
    var ps_district=post.ps_district;
    var pm_address=post.pm_address;
    var pm_pincode=post.pm_pincode;
    var pm_state=post.pm_state;
    var pm_district=post.pm_district;
    var address_type='';
    if(ps_address==pm_address)
    {
       address_type='1';
    }
    else
    {
       address_type='0';
    }
       //for contact tab
       var tel_phone=post.tel_phone;
       var mobile_phone=post.mobile_phone;
       var email_id=post.email_id;
       var aadhar_no=post.aadhar_no;
       var voter_id=post.voter_id;
       var remarks=post.remarks;

       // for institute tab
       var institute_name=post.institute_name;
       var place=post.place;
       var register_no=post.register_no;
       var exam_passed=post.exam_passed;
       var relieving_date=post.relieving_date;
       var district=post.district;
       var board=post.board;
       var month_of_passing=post.month_of_passing;
       var state=post.state;
       var year_of_passing=post.year_of_passing;
       var duration=post.duration;

       //for mark details
       var lang_theory=post.lang_theory;
       var lang_practical=post.lang_practical;
       var lang_internal=post.lang_internal;
       var lang_total=post.lang_total;
       var lang_max=post.lang_max;
       var eng_theory=post.eng_theory;
       var eng_practical=post.eng_practical;
       var eng_internal=post.eng_internal;
       var eng_total=post.eng_total;
       var eng_max=post.eng_max;
       var mat_theory=post.mat_theory;
       var mat_practical=post.mat_practical;
       var mat_internal=post.mat_internal;
       var mat_total=post.mat_total;
       var mat_max=post.mat_max;
       var phy_theory=post.phy_theory;
       var phy_practical=post.phy_practical;
       var phy_internal=post.phy_internal;
       var phy_total=post.phy_total;
       var phy_max=post.phy_max;
       
       var chem_theory=post.chem_theory;
       var chem_practical=post.chem_practical;
       var chem_internal=post.chem_internal;
       var chem_total=post.chem_total;
       var chem_max=post.chem_max;
       var bio_theory=post.bio_theory;
       var bio_practical=post.bio_practical;
       var bio_internal=post.bio_internal;
       var bio_total=post.bio_total;
       var bio_max=post.bio_max;
       var bot_theory=post.bot_theory;
       var bot_practical=post.bot_practical;
       var bot_internal=post.bot_internal;
       var bot_total=post.bot_total;
       var bot_max=post.bot_max;

       var zoo_theory=post.zoo_theory;
       var zoo_practical=post.zoo_practical;
       var zoo_internal=post.zoo_internal;
       var zoo_total=post.zoo_total;
       var zoo_max=post.zoo_max;
       var lang_paper=post.lang_paper;

       var subj_code=post.subj_code;
       var total_mark_m=post.total_mark_m;
       var max_mark=post.max_mark;
     
       // for neet details
       var phy_neet_mark=post.phy_neet_mark;
       var chem_neet_mark=post.chem_neet_mark;
       var bio_neet_mark=post.bio_neet_mark;
       var agg_neet_mark=post.agg_neet_mark;
       var phy_neet_max=post.phy_neet_max;
       var chem_neet_max=post.chem_neet_max;
       var bio_neet_max=post.bio_neet_max;
       var agg_neet_max=post.agg_neet_max;

       //for bank details
       var account_no=post.account_no;
       var ifsc=post.ifsc;
       var bank_name=post.bank_name;
       var pan_no=post.pan_no;
       var micr=post.micr;
       var branch_name=post.branch_name;

       //for photo details
       var cand_photo=myObj[0].filename;
       var cand_sign=myObj[1].filename;
       var cand_thumb=myObj[2].filename;
       var cand_finger=myObj[3].filename;

       //for certificate details
       var c1_file=myObj[4].filename;
       var c2_file=myObj[5].filename;
       var c3_file=myObj[6].filename;
       var c4_file=myObj[7].filename;
       var c5_file=myObj[8].filename;
       var c6_file=myObj[9].filename;

      //for relieving_details
      //added with Cand_id and last modified time

       var sql = "SELECT * FROM `ems`.`user_details`;"
       db.query(sql, function (err, data) {
        var sql = "INSERT INTO `ems`.`cand_certificate2_details`(`cand_id`,`certificate5`,`c5_reg_no`,`c5_date`,`c5_issue`,`c5_place`,`c5_file`,`certificate6`,`c6_reg_no`,`c6_date`,`c6_issue`,`c6_place`,`c6_file`,`last_modified_time`) VALUES ('" + cand_id + "','" + c5 + "','" + c5_reg_no + "','" + c5_date + "','" + c5_issue + "','" + c5_place + "','" + c5_file + "','" + c6 + "','" + c6_reg_no + "','" + c6_date + "','" + c6_issue + "','" + c6_place + "','" + c6_file + "','" + last_modified_time + "')";
        query = db.query(sql, function (err, data) {
        var sql = "INSERT INTO `ems`.`cand_certificate_details`(`cand_id`,`certificate1`,`c1_reg_no`,`c1_date`,`c1_issue`,`c1_place`,`c1_file`,`certificate2`,`c2_reg_no`,`c2_date`,`c2_issue`,`c2_place`,`c2_file`,`certificate3`,`c3_reg_no`,`c3_date`,`c3_issue`,`c3_place`,`c3_file`,`certificate4`,`c4_reg_no`,`c4_date`,`c4_issue`,`c4_place`,`c4_file`,`last_modified_time`) VALUES ('" + cand_id + "','" + c1 + "','" + c1_reg_no + "','" + c1_date + "','" + c1_issue + "','" + c1_place + "','" + c1_file + "','" + c2 + "','" + c2_reg_no + "','" + c2_date + "','" + c2_issue + "','" + c2_place + "','" + c2_file + "','" + c3 + "','" + c3_reg_no + "','" + c3_date + "','" + c3_issue + "','" + c3_place + "','" + c3_file + "','" + c4 + "','" + c4_reg_no + "','" + c4_date + "','" + c4_issue + "','" + c4_place + "','" + c4_file + "','" + last_modified_time + "')";
        query = db.query(sql, function (err, data) {
    var sql = "INSERT INTO `ems`.`cand_profile_details`(`cand_id`,`name`,`initial`,`initial_expansion`,`father_name`,`mother_name`,`date_of_birth`,`gender`,`blood_group`,`religion`,`community`,`caste`,`nationality`,`willing_to_donate_blood`,`registered_time`,`last_modified_time`,`academic_year`,`student_code`) VALUES ('" + cand_id + "','" + name + "','" + initial + "','" + initial_expansion + "','" + father_name + "','" + mother_name + "','" + date_of_birth + "','" + gender + "','" + blood_group + "','" + religion + "','" + community + "','" + caste + "','" + nationality + "','" + willing_to_donate_blood + "','" + registered_time + "','" + last_modified_time + "','" + academic_year + "','" + student_code + "')";
    query = db.query(sql, function (err, data) {
    var sql = "INSERT INTO `ems`.`cand_admission_details`(`cand_id`,`rank`,`rank_no`,`ar_no`,`total_mark`,`neet_mark`,`reg_no`,`neet_roll_no`,`course`,`admission_type`,`admission_quota`,`course_commencement`,`date_of_admission`,`date_of_allotment`,`selected_category`,`willing_for_counciling`,`last_modified_time`) VALUES ('" + cand_id + "','" + rank + "','" + rank_no + "','" + ar_no + "','" + total_mark + "','" + neet_mark + "','" + reg_no + "','" + neet_roll_no + "','" + course + "','" + admission_type + "','" + admission_quota + "','" + course_commencement + "','" + date_of_admission + "','" + date_of_allotment + "','" + selected_category + "','" + willing_for_counciling + "','" + last_modified_time + "')";
     query = db.query(sql, function (err, data) {
    var sql = "INSERT INTO `ems`.`cand_address_details`(`cand_id`,`address_type`,`ps_address`,`ps_pincode`,`ps_state`,`ps_district`,`pm_address`,`pm_pincode`,`pm_state`,`ps_district`,`last_modified_time`) VALUES ('" + cand_id + "','" + address_type + "','" + ps_address + "','" + ps_pincode + "','" + ps_state + "','" + ps_district + "','" + pm_address + "','" + pm_pincode + "','" + pm_state + "','" + pm_district + "','" + last_modified_time + "')";
    query = db.query(sql, function (err, data) {
    var sql = "INSERT INTO `ems`.`cand_contact_details`(`cand_id`,`tel_phone`,`mobile_phone`,`email_id`,`aadhar_no`,`voter_id`,`remarks`,`last_modified_time`) VALUES ('" + cand_id + "','" + tel_phone + "','" + mobile_phone + "','" + email_id + "','" + aadhar_no + "','" + voter_id + "','" + remarks + "','" + last_modified_time + "')";
    query = db.query(sql, function (err, data) {
       var sql = "INSERT INTO `ems`.`audit_trail`(`event_name`,`current_user`,`audited_time`,`user_agent`) VALUES ('" + event_name + "','" + current_user + "','" + audited_time + "','" + user_agent + "')";
       query = db.query(sql, function (err, data) {
        var sql = "INSERT INTO `ems`.`cand_photo_details`(`cand_id`,`cand_photo`,`cand_sign`,`cand_thumb`,`cand_finger`,`last_modified_time`) VALUES ('" + cand_id + "','" + cand_photo + "','" + cand_sign + "','" + cand_thumb + "','" + cand_finger + "','" + last_modified_time + "')";
        query = db.query(sql, function (err, data) {
          var sql = "INSERT INTO `ems`.`cand_institute_details`(`cand_id`,`institute_name`,`place`,`district`,`state`,`relieving_date`,`duration`,`exam_passed`,`register_no`,`month_of_passing`,`year_of_passing`,`board`,`last_modified_time`) VALUES ('" + cand_id + "','" + institute_name + "','" + place + "','" + district + "','" + state + "','" + relieving_date + "','" + duration + "','" + exam_passed + "','" + register_no + "','" + month_of_passing + "','" + year_of_passing + "','" + board + "','" + last_modified_time + "')";
          query = db.query(sql, function (err, data) {
            var sql = "INSERT INTO `ems`.`cand_marks_details`(`cand_id`,`lang_theory`,`lang_practical`,`lang_internal`,`lang_total`,`lang_max`,`eng_theory`,`eng_practical`,`eng_internal`,`eng_total`,`eng_max`,`mat_theory`,`mat_practical`,`mat_internal`,`mat_total`,`mat_max`,`phy_theory`,`phy_practical`,`phy_internal`,`phy_total`,`phy_max`,`chem_theory`,`chem_practical`,`chem_internal`,`chem_total`,`chem_max`,`bio_theory`,`bio_practical`,`bio_internal`,`bio_total`,`bio_max`,`bot_theory`,`bot_practical`,`bot_internal`,`bot_total`,`bot_max`,`zoo_theory`,`zoo_practical`,`zoo_internal`,`zoo_total`,`zoo_max`,`lang_paper`,`subj_code`,`total_mark`,`max_mark`) VALUES ('" + cand_id + "','" + lang_theory + "','" + lang_practical + "','" + lang_internal + "','" + lang_total + "','" + lang_max + "','" + eng_theory + "','" + eng_practical + "','" + eng_internal + "','" + eng_total + "','" + eng_max + "','" + mat_theory + "','" + mat_practical + "','" + mat_internal + "','" + mat_total + "','" + mat_max + "','" + phy_theory + "','" + phy_practical + "','" + phy_internal + "','" + phy_total + "','" + phy_max + "','" + chem_theory + "','" + chem_practical + "','" + chem_internal + "','" + chem_total + "','" + chem_max + "','" + bio_theory + "','" + bio_practical + "','" + bio_internal + "','" + bio_total + "','" + bio_max + "','" + bot_theory + "','" + bot_practical + "','" + bot_internal + "','" + bot_total + "','" + bot_max + "','" + zoo_theory + "','" + zoo_practical + "','" + zoo_internal + "','" + zoo_total + "','" + zoo_max + "','" + lang_paper + "','" + subj_code + "','" + total_mark_m + "','" + max_mark + "')";
            query = db.query(sql, function (err, data) {
              var sql = "INSERT INTO `ems`.`cand_neet_mark_details`(`cand_id`,`phy_mark`,`phy_max_mark`,`chem_mark`,`chem_max_mark`,`bio_mark`,`bio_max_mark`,`agg_mark`,`agg_max_mark`,`last_modified_time`) VALUES ('" + cand_id + "','" + phy_neet_mark + "','" + phy_neet_max + "','" + chem_neet_mark + "','" + chem_neet_max + "','" + bio_neet_mark + "','" + bio_neet_max + "','" + agg_neet_mark + "','" + agg_neet_max + "','" + last_modified_time + "')";
              query = db.query(sql, function (err, data) {
                var sql = "INSERT INTO `ems`.`cand_bank_details`(`cand_id`,`account_no`,`bank_name`,`branch_name`,`ifsc`,`micr`,`pan_no`,`last_modified_time`) VALUES ('" + cand_id + "','" + account_no + "','" + bank_name + "','" + branch_name + "','" + ifsc + "','" + micr + "','" + pan_no + "','" + last_modified_time + "')";
                query = db.query(sql, function (err, data) {
                  var sql = "INSERT INTO `ems`.`cand_relieving_details`(`cand_id`,`last_modified_time`) VALUES ('" + cand_id + "','" + last_modified_time + "')";
                  query = db.query(sql, function (err, data) {
                    message = "New Candidate created Successfully!";
                   
         res.render('mbbs_board.ejs', {userData: data,message:message });
});
});
});
});
});
});
});
});
});
});
});
});
});
});
  });
  



//download process
app.post('/biometric_dwd', function (req, res) {
  var post = req.body;
  var myfile = post.cand_download;
  const file = `${__dirname}/public/uploads/${myfile}`;
  res.download(file); // Set disposition and send it.
});
app.post('/notesdownload', function (req, res) {
  var post = req.body;
  var myfile = post.notename;
  const file = `${__dirname}/public/uploadnotes/${myfile}`;
  res.download(file); // Set disposition and send it.
});
 
// development only
 
app.get('/', routes.index);
app.get('/icboard', user.icboard);
app.get('/mbbs_viewcand', user.mbbs_viewcand);
app.post('/mbbs_viewcand', user.mbbs_viewcand);
app.get('/update_profile', user.update_profile);
app.post('/update_profile', user.update_profile);
app.get('/mbbs_editcand', user.mbbs_editcand);
app.post('/mbbs_editcand', user.mbbs_editcand);
app.get('/add_user', user.add_user);
app.post('/add_user', user.add_user);
app.get('/addcommissioner', user.addcommissioner);
app.post('/addcommissioner', user.addcommissioner);
app.get('/addsuperuser', user.addsuperuser);
app.post('/addsuperuser', user.addsuperuser);
app.get('/mbbs_viewstudent', user.mbbs_viewstudent);
app.get('/tutorupdate', user.tutorupdate);
app.post('/tutorupdate', user.tutorupdate);
app.get('/pwdrecovery', user.pwdrecovery);
app.post('/pwdrecovery', user.pwdrecovery);
app.get('/pwdupdate', user.pwdupdate);
app.post('/pwdupdate', user.pwdupdate);
app.get('/tusendmail', user.tusendmail);
app.post('/tusendmail', user.tusendmail);
app.get('/forgotpwd', user.forgotpwd);
app.get('/aprofileupdate', user.aprofileupdate);
app.post('/aprofileupdate', user.aprofileupdate);
app.get('/tprofileupdate', user.tprofileupdate);
app.post('/tprofileupdate', user.tprofileupdate);
app.get('/suprofileupdate', user.suprofileupdate);
app.post('/suprofileupdate', user.suprofileupdate);
app.get('/empprofileupdate', user.empprofileupdate);
app.post('/empprofileupdate', user.empprofileupdate);
app.get('/editcategory', user.editcategory);
app.post('/editcategory', user.editcategory);
app.get('/editcategory1', user.editcategory1);
app.post('/editcategory1', user.editcategory1);
app.get('/tuuploadnotes', user.tuuploadnotes);
app.post('/tuuploadnotes', user.tuuploadnotes);
app.get('/tuuploadsession', user.tuuploadsession);
app.post('/tuuploadsession', user.tuuploadsession);
app.get('/icprofileupdate', user.icprofileupdate);
app.post('/icprofileupdate', user.icprofileupdate);
app.get('/icsignup', user.icsignup);
app.post('/icsignup', user.icsignup);
app.get('/uploadnotes', user.uploadnotes);
app.post('/uploadnotes', user.uploadnotes);
app.get('/uploadsession', user.uploadsession);
app.post('/uploadsession', user.uploadsession);
app.get('/reportcontinue', user.reportcontinue);
app.post('/reportcontinue', user.reportcontinue);
app.get('/notescontinue', user.notescontinue);
app.post('/notescontinue', user.notescontinue);
app.get('/sessioncontinue', user.sessioncontinue);
app.post('/sessioncontinue', user.sessioncontinue);
app.get('/empsignup', user.empsignup);
app.post('/empsignup', user.empsignup);
app.get('/tutorsignuppro', user.tutorsignuppro);
app.post('/tutorsignuppro', user.tutorsignuppro);
app.get('/addclass', user.addclass);
app.get('/loginpage', user.loginpage);
app.get('/searchpage', user.searchpage);
app.get('/singlepage', user.singlepage);
app.get('/trainerpage', user.trainerpage);
app.post('/addclass', user.addclass);
app.get('/addtest', user.addtest);
app.post('/addtest', user.addtest);
app.get('/deleteemp', user.deleteemp);
app.post('/deleteemp', user.deleteemp);
app.get('/deletesup', user.deletesup);
app.post('/deletesup', user.deletesup);
app.get('/deletetu', user.deletetu);
app.post('/deletetu', user.deletetu);
app.get('/deletecom', user.deletecom);
app.post('/deletecom', user.deletecom);
app.get('/signuphome',user.signuphome);
app.get('/home/tuprofile',user.tuprofile);
app.get('/suprofile',user.suprofile);
app.get('/home/empprofile',user.empprofile);
app.get('/home/icprofile',user.icprofile);
app.get('/home/empchat',user.empchat);
app.get('/tutorcategory',user.tutorcategory);
app.get('/uploadfile',user.uploadfile);
app.post('/uploadfile',user.uploadfile);
app.get('/uploadfile2',user.uploadfile2);
app.post('/uploadfile2',user.uploadfile2);
app.get('/dstprofile',user.dstprofile);
app.post('/dstprofile',user.dstprofile);
app.get('/dstprofilesup',user.dstprofilesup);
app.post('/dstprofilesup',user.dstprofilesup);
app.get('/dstprofiletu',user.dstprofiletu);
app.post('/dstprofiletu',user.dstprofiletu);
app.get('/dstprofile3',user.dstprofile3);
app.post('/dstprofile3',user.dstprofile3);
app.get('/scourserequest',user.scourserequest);
app.post('/scourserequest',user.scourserequest);
app.get('/chooseemp',user.chooseemp);
app.post('/chooseemp',user.chooseemp);
app.get('/login', routes.index);
app.get('/logout', user.logout);
app.post('/login', user.login);
app.get('/home/icdashboard', user.icdashboard);
app.get('/mbbs_board', user.mbbs_board);
app.get('/home/empdashboard', user.empdashboard);
app.get('/home/empotherclass', user.empotherclass);
app.get('/otherclass', user.otherclass); 
app.post('/otherclass', user.otherclass); 
app.get('/otherclassrequest', user.otherclassrequest); 
app.post('/otherclassrequest', user.otherclassrequest); 
app.get('/createclass', user.createclass);   
app.post('/createclass', user.createclass); 
app.get('/add_candidate', user.add_candidate);   
app.post('/add_candidate', user.add_candidate); 
app.get('/createtest', user.createtest);   
app.post('/createtest', user.createtest); 
app.get('/tutestnotice', user.tutestnotice);   
app.post('/tutestnotice', user.tutestnotice);
app.get('/tucompletetest', user.tucompletetest);   
app.post('/tucompletetest', user.tucompletetest);
app.get('/empcompletetest', user.empcompletetest);   
app.post('/empcompletetest', user.empcompletetest);
app.get('/tuclassnotice', user.tuclassnotice);   
app.post('/tuclassnotice', user.tuclassnotice);
app.get('/empclassnotice', user.empclassnotice);   
app.post('/empclassnotice', user.empclassnotice);
app.get('/sclassreport', user.sclassreport);   
app.post('/sclassreport', user.sclassreport);
app.get('/stestreport', user.stestreport);   
app.post('/stestreport', user.stestreport);
app.get('/sclassnotice', user.sclassnotice);   
app.post('/sclassnotice', user.sclassnotice);
app.get('/scompleteclass', user.scompleteclass);   
app.post('/scompleteclass', user.scompleteclass);
app.get('/stestnotice', user.stestnotice);   
app.post('/stestnotice', user.stestnotice);
app.get('/scompletetest', user.scompletetest);   
app.post('/scompletetest', user.scompletetest);
app.get('/emptestnotice', user.emptestnotice);   
app.post('/emptestnotice', user.emptestnotice);
app.get('/setcategory', user.setcategory);   
app.post('/setcategory', user.setcategory);
app.get('/setcategory1', user.setcategory1);   
app.post('/setcategory1', user.setcategory1);
app.get('/tuliveclass', user.tuliveclass);   
app.post('/tuliveclass', user.tuliveclass);
app.get('/empliveclass', user.empliveclass);   
app.post('/empliveclass', user.empliveclass);
app.get('/sempreport', user.sempreport);   
app.post('/sempreport', user.sempreport);
app.get('/emplivetest', user.emplivetest);   
app.post('/emplivetest', user.emplivetest);
app.get('/tjoinclass', user.tjoinclass);   
app.post('/tjoinclass', user.tjoinclass);
app.get('/ejoinclass', user.ejoinclass);   
app.post('/ejoinclass', user.ejoinclass);
app.get('/ejointest', user.ejointest);   
app.post('/ejointest', user.ejointest);
app.get('/asuperuserreport', user.asuperuserreport);   
app.post('/asuperuserreport', user.asuperuserreport);
app.get('/acommissreport', user.acommissreport);   
app.post('/acommissreport', user.acommissreport);
app.get('/adeletecommiss', user.adeletecommiss);   
app.post('/adeletecommiss', user.adeletecommiss);
app.get('/contactform', user.contactform);   
app.post('/contactform', user.contactform);
app.get('/adeletesuper', user.adeletesuper);   
app.post('/adeletesuper', user.adeletesuper);
app.get('/adeletetutor', user.adeletetutor);   
app.post('/adeletetutor', user.adeletetutor);
app.get('/aclassreport', user.aclassreport);   
app.post('/aclassreport', user.aclassreport);
app.get('/atestreport', user.atestreport);   
app.post('/atestreport', user.atestreport);
app.get('/atutorreport', user.atutorreport);   
app.post('/atutorreport', user.atutorreport);
app.get('/tucompleteclass', user.tucompleteclass);   
app.post('/tucompleteclass', user.tucompleteclass);
app.get('/tuuploadreport', user.tuuploadreport);   
app.post('/tuuploadreport', user.tuuploadreport);
app.get('/empcompleteclass', user.empcompleteclass);   
app.post('/empcompleteclass', user.empcompleteclass);
app.get('/home/tudashboard', user.tudashboard);
app.get('/home/addashboard', user.addashboard);
app.get('/home/sudashboard', user.sudashboard);
app.get('/home/logout', user.logout);

app.get('/adprofile',user.adprofile);
app.get('/home/tucalendar',user.tucalendar);
app.get('/home/empcalendar',user.empcalendar);
app.get('/sucalendar',user.sucalendar);
app.get('/home/icschedule',user.icschedule);
app.get('/home/tumail',user.tumail);
app.get('/home/tuchat',user.tuchat);
app.get('/home/icchat',user.icchat);
app.get('/suchat',user.suchat);
app.get('/home/tuclass',user.tuclass);
app.get('/home/empclass',user.empclass);
app.get('/home/emptest',user.emptest);
app.get('/home/tutest',user.tutest);
app.get('/home/turequest',user.turequest);
app.get('/home/tunotice',user.tunotice);
app.get('/adcalendar',user.adcalendar);
app.get('/addcommiss',user.addcommiss);
app.post('/addcommiss',user.addcommiss);
app.get('/addcertificate',user.addcertificate);
app.post('/addcertificate',user.addcertificate);
app.get('/acertireport',user.acertireport);
app.post('/acertireport',user.acertireport);
app.get('/addemp',user.addemp);
app.post('/addemp',user.addemp);
app.get('/empchatexit',user.empchatexit);
app.post('/empchatexit',user.empchatexit);
app.get('/icchatexit',user.icchatexit);
app.post('/icchatexit',user.icchatexit);
app.get('/tuchatexit',user.tuchatexit);
app.post('/tuchatexit',user.tuchatexit);
app.get('/suchatexit',user.suchatexit);
app.post('/suchatexit',user.suchatexit);
app.get('/addsuper',user.addsuper);
app.post('/addsuper',user.addsuper);
app.get('/addtutor',user.addtutor);
app.post('/addtutor',user.addtutor);
app.get('/addemployee',user.addemployee);
app.post('/addemployee',user.addemployee);
app.get('/addtutor1',user.addtutor1);
app.post('/addtutor1',user.addtutor1);
app.get('/adminelement',user.adminelement);
app.get('/superelement',user.superelement);
app.get('/admindelete',user.admindelete);
app.get('/superdelete',user.superdelete);
app.get('/adminreport',user.adminreport);
app.get('/icemployee',user.icemployee);
app.post('/icemployee',user.icemployee);
app.get('/icsuperuser',user.icsuperuser);
app.post('/icsuperuser',user.icsuperuser);
app.get('/home/iccourse',user.iccourse);
app.get('/home/ictraining',user.ictraining);
app.get('/home/icmyteam',user.icmyteam);
app.get('/superreport',user.superreport);
app.get('/adminmail',user.adminmail);
//Middleware
server.listen(80)
