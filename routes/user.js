const { emitKeypressEvents } = require('readline');

const stripe = require('stripe')('sk_test_51HRdnbJuuyDhoKjMEHMO52H4Ddig3EKm26ll74M43kpBanSpnbEynf0AFR3ljgVwX5unc4GpgFpyg41mhFluRGWo00R2oNnQzq');
global.crypto = require('crypto')
function convertCryptKey(strKey) {
   var newKey = new Buffer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
   strKey = new Buffer(strKey);
   for (var i = 0; i < strKey.length; i++) newKey[i % 16] ^= strKey[i];
   return newKey;
}


//---------------------------------------------signup page call------------------------------------------------------
exports.icsignup = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var x = Math.floor((Math.random() * 100) + 11);
      var post = req.body;
      var fname = post.fname;
      var mname = post.mname;
      var lname = post.lname;
      var emailid = post.emailid;
      var phone = post.mobile;
      var department = post.department;
      var division = post.department;
      var password = post.password;
      var usershort = fname.substring(0, 4);
      var user_name = usershort;
      var userid = "ic" + user_name + x;

      var sql = "INSERT INTO `training`.`commissioner`(`userid`,`firstname`,`middlename`,`lastname`,`emailid`,`phone`, `department`,`division`,`password`) VALUES ('" + userid + "','" + fname + "','" + mname + "','" + lname + "','" + emailid + "','" + phone + "','" + department + "','" + division + "','" + password + "')";

      var query = db.query(sql, function (err, result) {

         message = "Successfully! Your account has been created.";
         res.render('loginpage.ejs', { message: message });
      });

   } else {
      res.render('signup');
   }
};
//---------------------------------------------signup page call------------------------------------------------------
exports.empsignup = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var x = Math.floor((Math.random() * 100) + 11);
      var post = req.body;
      var fname = post.fname;
      var mname = post.mname;
      var lname = post.lname;
      var emailid = post.emailid;
      var phone = post.mobile;
      var department = post.department;
      var division = post.department;
      var password = post.password;
      var usershort = fname.substring(0, 4);
      var user_name = usershort;
      var userid = "emp" + user_name + x;

      var sql = "INSERT INTO `training`.`employee`(`userid`,`firstname`,`middlename`,`lastname`,`emailid`,`phone`, `department`,`division`,`password`) VALUES ('" + userid + "','" + fname + "','" + mname + "','" + lname + "','" + emailid + "','" + phone + "','" + department + "','" + division + "','" + password + "')";

      var query = db.query(sql, function (err, result) {

         message = "Successfully! Your account has been created.";
         res.render('loginpage.ejs', { message: message });
      });

   } else {
      res.render('signup');
   }
};
//---------------------------------------------signup page call------------------------------------------------------
exports.tutorsignup = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var x = Math.floor((Math.random() * 100) + 11);
      var post = req.body;
      var fname = post.fname;
      var mname = post.mname;
      var lname = post.lname;
      var emailid = post.emailid;
      var address = post.address;
      var phone = post.mobile;
      var password = post.password;
      var userfirst = fname.substring(0, 4);
      var userlast = lname.substring(0, 4);
      var subuserid = "tu" + userfirst + x + userlast;
      var userid = subuserid.toUpperCase();
      var mailhead = 'EMS-Account details';
      var mailbody = "Account Creation details";
      //hashing 
      var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var crypted = c.update(password, 'utf8', 'hex') + c.final('hex');
      var epass = crypted.toUpperCase();
      // console.log('Signup encrytion : ' + crypted.toUpperCase());
      var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
      //  console.log('Signup decrytion : ' + decrypted);
      var loginlink = '#';
      //Mail 
      var fromaddress = 'sample@email.com';
      var toaddress = emailid;
      var mailsubject = mailhead;
      var mailmessage = mailbody;

      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
         host: "smtp.zoho.com",
         port: 465,

         auth: {
            user: 'sample@email.com',
            pass: 'Radservice123!'
         }
      });

      var mailOptions = {
         from: fromaddress,
         to: toaddress,
         subject: mailsubject,
         text: mailmessage,
         html: '<h3>Dear ' + fname + ',</h3><p>Your new<b> EMS</b> Account has been created. Welcome to the <b>EMS </b>community!</p><p><b>User ID: </b>' + userid + '<h3> </h3><b>Password: </b>' + password + '<br/></p><h4>From now on, please log in to your account using <a href="' + loginlink + '">login link</a> </h4><p>If you have any questions, please visit http://34.245.185.190/</p><br/><p>Kind regards,</p><p><b>EMS</b></p><p>http://34.245.185.190/</p>'
      };


      var sql = "Select * from `training`.`tutor` where `emailid`='" + emailid + "' or password='" + password + "'";
      query = db.query(sql, function (err, result) {
         if (result.length) {
            message = "Email Id/Password already exists.Please Check!";
            res.render('signup.ejs', { message: message });
         }
         else {
            sql = "INSERT INTO `training`.`tutor`(`userid`,`firstname`,`middlename`,`lastname`,`emailid`,`address`,`phone`,`password`) VALUES ('" + userid + "','" + fname + "','" + mname + "','" + lname + "','" + emailid + "','" + address + "','" + phone + "','" + epass + "')";
            query = db.query(sql, function (err, data, message1) {
               message = userid;
               sql = "select distinct category  from `training`.`courses`";
               transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                     console.log(error);
                  } else {
                     console.log('Email sent: ' + info.response);
                  }
               });

               db.query(sql, function (err, data, message1) {

                  res.render('tutorcategory.ejs', { message1: message, userData: data });
               });

            });
         }
      });


   } else {
      res.render('signup');
   }
};
//---------------------------------------------signup page call------------------------------------------------------
exports.add_candidate = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var user = req.session.user,
         userId = req.session.userId;
      console.log('ddd=' + userId);
      if (userId == null) {
         res.redirect("/login");
         return;
      }
      var x = Math.floor((Math.random() * 2) + 1);
      var post = req.body;

      //for profile tab
      var name = post.full_name;
      var userfirst = name.substring(0, 4);
      var cand_id = userfirst + x;
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
      last_modified_time = `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`;

      //for audit 
      var event_name = 'Adding_Student_MBBS';
      var current_user = cand_id;
      var user_agent = userId;
      var audited_time = registered_time;

      //for admission tab
      var rank = post.rank;
      var rank_no = post.rank_no;
      var ar_no = post.ar_no;
      var total_mark = post.total_mark;
      var neet_mark = post.neet_mark;
      var reg_no = post.reg_no;
      var neet_roll_no = post.neet_roll_no;
      var course = post.course;
      var admission_type = post.admission_type;
      var admission_quota = post.admission_quota;
      var course_commencement = post.course_commencement;
      var date_of_admission = post.date_of_admission;
      var date_of_allotment = post.date_of_allotment;
      var selected_category = post.selected_category;
      var willing_for_counciling = post.willing_for_counciling;

      //for address tab
      var ps_address = post.ps_address;
      var ps_pincode = post.ps_pincode;
      var ps_state = post.ps_state;
      var ps_district = post.ps_district;
      var pm_address = post.pm_address;
      var pm_pincode = post.pm_pincode;
      var pm_state = post.pm_state;
      var pm_district = post.pm_district;
      var address_type = '';
      if (ps_address == pm_address) {
         address_type = '1';
      }
      else {
         address_type = '0';
      }
      //for contact tab
      var tel_phone = post.tel_phone;
      var mobile_phone = post.mobile_phone;
      var email_id = post.email_id;
      var aadhar_no = post.aadhar_no;
      var voter_id = post.voter_id;
      var remarks = post.remarks;

      // for institute tab
      var institute_name = post.institute_name;
      var place = post.place;
      var register_no = post.register_no;
      var exam_passed = post.exam_passed;
      var relieving_date = post.relieving_date;
      var district = post.district;
      var board = post.board;
      var month_of_passing = post.month_of_passing;
      var state = post.state;
      var year_of_passing = post.year_of_passing;
      var duration = post.duration;

      //for mark details
      var lang_theory = post.lang_theory;
      var lang_practical = post.lang_practical;
      var lang_internal = post.lang_internal;
      var lang_total = post.lang_total;
      var lang_max = post.lang_max;
      var eng_theory = post.eng_theory;
      var eng_practical = post.eng_practical;
      var eng_internal = post.eng_internal;
      var eng_total = post.eng_total;
      var eng_max = post.eng_max;
      var mat_theory = post.mat_theory;
      var mat_practical = post.mat_practical;
      var mat_internal = post.mat_internal;
      var mat_total = post.mat_total;
      var mat_max = post.mat_max;
      var phy_theory = post.phy_theory;
      var phy_practical = post.phy_practical;
      var phy_internal = post.phy_internal;
      var phy_total = post.phy_total;
      var phy_max = post.phy_max;

      var chem_theory = post.chem_theory;
      var chem_practical = post.chem_practical;
      var chem_internal = post.chem_internal;
      var chem_total = post.chem_total;
      var chem_max = post.chem_max;
      var bio_theory = post.bio_theory;
      var bio_practical = post.bio_practical;
      var bio_internal = post.bio_internal;
      var bio_total = post.bio_total;
      var bio_max = post.bio_max;
      var bot_theory = post.bot_theory;
      var bot_practical = post.bot_practical;
      var bot_internal = post.bot_internal;
      var bot_total = post.bot_total;
      var bot_max = post.bot_max;

      var zoo_theory = post.zoo_theory;
      var zoo_practical = post.zoo_practical;
      var zoo_internal = post.zoo_internal;
      var zoo_total = post.zoo_total;
      var zoo_max = post.zoo_max;
      var lang_paper = post.lang_paper;

      var subj_code = post.subj_code;
      var total_mark_m = post.total_mark_m;
      var max_mark = post.max_mark;

      // for neet details
      var phy_neet_mark = post.phy_neet_mark;
      var chem_neet_mark = post.chem_neet_mark;
      var bio_neet_mark = post.bio_neet_mark;
      var agg_neet_mark = post.agg_neet_mark;
      var phy_neet_max = post.phy_neet_max;
      var chem_neet_max = post.chem_neet_max;
      var bio_neet_max = post.bio_neet_max;
      var agg_neet_max = post.agg_neet_max;

      //for bank details
      var account_no = post.account_no;
      var ifsc = post.ifsc;
      var bank_name = post.bank_name;
      var pan_no = post.pan_no;
      var micr = post.micr;
      var branch_name = post.branch_name;

      var sql = "SELECT * FROM `ems`.`user_details`;"
      db.query(sql, function (err, data) {
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

                        message = "New Candidate created!";
                        res.render('mbbs_board.ejs', { message: message, userData: data });
                     });
                  });
               });
            });
         });
      });

   } else {
      message = 'Try Again! Error Occured';
      res.render('mbbs_board.ejs', { message: message, userData: data });
   }
};
//---------------------------------------------signup page call------------------------------------------------------
exports.addemployee = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var user = req.session.user,
         userId = req.session.userId;
      console.log('ddd=' + userId);
      if (userId == null) {
         res.redirect("/login");
         return;
      }
      sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
      db.query(sql, function (err, results) {
         if (results.length) {
            req.session.firstname = results[0].firstname;
            req.session.lastname = results[0].lastname;
            var firstname = results[0].firstname;
            var lastname = results[0].lastname;
            fullname = firstname + ' ' + lastname;

            var x = Math.floor((Math.random() * 100) + 11);
            var post = req.body;
            var firstname = post.firstname;
            var middlename = post.middlename;
            var lastname = post.lastname;
            var ministry = post.ministry;
            var emailid = post.emailid;
            var address = post.address;
            var phone = post.mobile;
            var password = post.password;
            var userfirst = firstname.substring(0, 4);
            var userlast = lastname.substring(0, 4);
            var subuserid = "emp" + userfirst + x + userlast;
            var userid = subuserid.toUpperCase();
            var mailhead = 'EMS-Account details';
            var mailbody = "Account Creation details";

            //hashing 
            var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
            var crypted = c.update(password, 'utf8', 'hex') + c.final('hex');
            var epass = crypted.toUpperCase();
            console.log(crypted.toUpperCase());
            var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
            var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
            var dpass = decrypted;
            var loginlink = '#';

            //Mail 
            var fromaddress = 'sample@email.com';
            var toaddress = emailid;
            var mailsubject = mailhead;
            var mailmessage = mailbody;

            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
               host: "smtp.zoho.com",
               port: 465,

               auth: {
                  user: 'sample@email.com',
                  pass: 'Radservice123!'
               }
            });

            var mailOptions = {
               from: fromaddress,
               to: toaddress,
               subject: mailsubject,
               text: mailmessage,
               html: '<h3>Dear ' + firstname + ',</h3><p>Your new<b> EMS</b> Account has been created. Welcome to the <b>EMS </b>community!</p><p><b>User ID: </b>' + userid + '<h3> </h3><b>Password: </b>' + password + '<br/></p><h4>From now on, please log in to your account using <a href="' + loginlink + '">login link</a> </h4><p>If you have any questions, please visit http://34.245.185.190/</p><br/><p>Kind regards,</p><p><b>EMS</b></p><p>http://34.245.185.190/</p>'
            };



            var sql = "Select * from `training`.`employee` where `emailid`='" + emailid + "' or password='" + password + "'";
            var query = db.query(sql, function (err, data, message1) {
               if (data.length) {
                  message = "Emailid/Password already exists.Please Check!";
                  res.render('super_board.ejs', { message1: message, userData: data, message5: fullname });


               }
               sql = "INSERT INTO `training`.`employee`(`userid`,`firstname`,`middlename`,`lastname`,`emailid`,`address`,`phone`,`password`,`ministry`) VALUES ('" + userid + "','" + firstname + "','" + middlename + "','" + lastname + "','" + emailid + "','" + address + "','" + phone + "','" + epass + "','" + ministry + "')";
               query = db.query(sql, function (err, data, message1) {
                  transporter.sendMail(mailOptions, function (error, info) {
                     if (error) {
                        console.log(error);
                     } else {
                        console.log('Email sent: ' + info.response);
                     }
                  });

                  message = "New Employee created!";
                  res.render('super_board.ejs', { message1: message, userData: data, message5: fullname });

               });

            });
         }
      });
   } else {
      res.render('super_board.ejs');
   }
};
//---------------------------------------------signup page call------------------------------------------------------
exports.addcommissioner = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var x = Math.floor((Math.random() * 100) + 11);
      var post = req.body;
      var firstname = post.firstname;
      var middlename = post.middlename;
      var lastname = post.lastname;
      var ministry = post.ministry;
      var emailid = post.emailid;
      var address = post.address;
      var phone = post.mobile;
      var password = post.password;
      var userfirst = firstname.substring(0, 4);
      var userlast = lastname.substring(0, 4);
      var subuserid = "ic" + userfirst + x + userlast;
      var userid = subuserid.toUpperCase();
      var mailhead = 'EMS-Account details';
      var mailbody = "Account Creation details";

      //hashing 
      var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var crypted = c.update(password, 'utf8', 'hex') + c.final('hex');
      var epass = crypted.toUpperCase();
      console.log(crypted.toUpperCase());
      var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
      var dpass = decrypted;
      var loginlink = '#';

      //Mail 
      var fromaddress = 'sample@email.com';
      var toaddress = emailid;
      var mailsubject = mailhead;
      var mailmessage = mailbody;

      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
         host: "smtp.zoho.com",
         port: 465,

         auth: {
            user: 'sample@email.com',
            pass: 'Radservice123!'
         }
      });

      var mailOptions = {
         from: fromaddress,
         to: toaddress,
         subject: mailsubject,
         text: mailmessage,
         html: '<h3>Dear ' + firstname + ',</h3><p>Your new<b> EMS</b> Account has been created. Welcome to the <b>EMS </b>community!</p><p><b>User ID: </b>' + userid + '<h3> </h3><b>Password: </b>' + password + '<br/></p><h4>From now on, please log in to your account using <a href="' + loginlink + '">login link</a> </h4><p>If you have any questions, please visit http://34.245.185.190/</p><br/><p>Kind regards,</p><p><b>EMS</b></p><p>http://34.245.185.190/</p>'
      };


      var sql = "Select * from `training`.`commissioner` where `emailid`='" + emailid + "' or password='" + epass + "'";
      var query = db.query(sql, function (err, data, message1) {
         if (data.length) {
            message = "Emailid/Password already exists.Please Check!";
            res.render('admin_board.ejs', { message1: message, userData: data });


         }

         else {
            sql = "INSERT INTO `training`.`commissioner`(`userid`,`firstname`,`middlename`,`lastname`,`emailid`,`address`,`phone`,`password`,`ministry`) VALUES ('" + userid + "','" + firstname + "','" + middlename + "','" + lastname + "','" + emailid + "','" + address + "','" + phone + "','" + epass + "','" + ministry + "')";
            query = db.query(sql, function (err, data, message1) {
               transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                     console.log(error);
                  } else {
                     console.log('Email sent: ' + info.response);
                  }
               });
               message = "New Commissioner created!";
               res.render('admin_board.ejs', { message1: message, userData: data });

            });
         }
      });

   } else {
      res.render('admin_board.ejs');
   }
};
//---------------------------------------------signup page call------------------------------------------------------
exports.addsuperuser = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var x = Math.floor((Math.random() * 100) + 11);
      var post = req.body;
      var firstname = post.firstname;
      var middlename = post.middlename;
      var lastname = post.lastname;
      var ministry = post.ministry;
      var emailid = post.emailid;
      var address = post.address;
      var phone = post.mobile;
      var password = post.password;
      var userfirst = firstname.substring(0, 4);
      var userlast = lastname.substring(0, 4);
      var subuserid = "su" + userfirst + x + userlast;
      var userid = subuserid.toUpperCase();
      var mailhead = 'EMS-Account details';
      var mailbody = "Account Creation details";

      //hashing 
      var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var crypted = c.update(password, 'utf8', 'hex') + c.final('hex');
      var epass = crypted.toUpperCase();
      console.log(crypted.toUpperCase());
      var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
      var dpass = decrypted;
      var loginlink = '#';

      //Mail 
      var fromaddress = 'sample@email.com';
      var toaddress = emailid;
      var mailsubject = mailhead;
      var mailmessage = mailbody;

      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
         host: "smtp.zoho.com",
         port: 465,

         auth: {
            user: 'sample@email.com',
            pass: 'Radservice123!'
         }
      });

      var mailOptions = {
         from: fromaddress,
         to: toaddress,
         subject: mailsubject,
         text: mailmessage,
         html: '<h3>Dear ' + firstname + ',</h3><p>Your new<b> EMS</b> Account has been created. Welcome to the <b>EMS </b>community!</p><p><b>User ID: </b>' + userid + '<h3> </h3><b>Password: </b>' + password + '<br/></p><h4>From now on, please log in to your account using <a href="' + loginlink + '">login link</a> </h4><p>If you have any questions, please visit http://34.245.185.190/</p><br/><p>Kind regards,</p><p><b>EMS</b></p><p>http://34.245.185.190/</p>'
      };
      var sql = "Select * from `training`.`superuser` where `emailid`='" + emailid + "' or password='" + epass + "'";
      var query = db.query(sql, function (err, data, message1) {
         if (data.length) {
            message = "Emailid/Password already exists.Please Check!";
            res.render('admin_board.ejs', { message1: message, userData: data });

         }
         else {
            sql = "INSERT INTO `training`.`superuser`(`userid`,`firstname`,`middlename`,`lastname`,`emailid`,`address`,`phone`,`password`,`ministry`) VALUES ('" + userid + "','" + firstname + "','" + middlename + "','" + lastname + "','" + emailid + "','" + address + "','" + phone + "','" + epass + "','" + ministry + "')";
            query = db.query(sql, function (err, data, message1) {
               transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                     console.log(error);
                  } else {
                     console.log('Email sent: ' + info.response);
                  }
               });
               message = "New Superuser created!";
               res.render('admin_board.ejs', { message1: message, userData: data });

            });
         }

      });

   } else {
      res.render('admin_board.ejs');
   }
};
//---------------------------------------------signup page call------------------------------------------------------
exports.add_user = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var x = Math.floor((Math.random() * 100) + 11);
      var post = req.body;
      var name = post.name;
      var emailid = post.emailid;
      var password = post.password;
      var userfirst = name.substring(0, 4);
      var subuserid = "CA" + userfirst + x;
      var userid = subuserid.toUpperCase();
      var user_type = 'Assistant';
      var is_active = 'yes';
      var salt = 'yes';
      var dt = new Date();
      created_time = `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`;
      last_modified_time = `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`;


      //hashing 
      var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var crypted = c.update(password, 'utf8', 'hex') + c.final('hex');
      var epass = crypted.toUpperCase();
      console.log(crypted.toUpperCase());
      var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
      var dpass = decrypted;

      //Mail 

      var sql = "Select * from `ems`.`user_details` where `emailid`='" + emailid + "' or password='" + epass + "'";
      var query = db.query(sql, function (err, data, message1) {
         if (data.length) {
            message = "Emailid/Password already exists.Please Check!";
            res.render('signup.ejs', { message: message, userData: data });

         }
         else {
            sql = "INSERT INTO `ems`.`user_details`(`user_id`,`name`,`emailid`,`user_type`,`is_active`,`created_time`,`user_name`,`password`,`salt`,`last_modified_time`) VALUES ('" + userid + "','" + name + "','" + emailid + "','" + user_type + "','" + is_active + "','" + created_time + "','" + userid + "','" + epass + "','" + salt + "','" + last_modified_time + "')";
            query = db.query(sql, function (err, data) {

               message = "New Assistant created!";
               res.render('signup.ejs', { message: message, userData: data });

            });
         }

      });

   } else {
      res.render('signup.ejs');
   }
};
//---------------------------------------------signup page call------------------------------------------------------
exports.addtutor1 = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var x = Math.floor((Math.random() * 100) + 11);
      var post = req.body;
      var firstname = post.firstname;
      var middlename = post.middlename;
      var lastname = post.lastname;
      var category = post.category;
      var emailid = post.emailid;
      var address = post.address;
      var phone = post.mobile;
      var password = post.password;
      var userfirst = firstname.substring(0, 4);
      var userlast = lastname.substring(0, 4);
      var subuserid = "tu" + userfirst + x + userlast;
      var userid = subuserid.toUpperCase();
      var mailhead = 'EMS-Account details';
      var mailbody = "Account Creation details";
      console.log(category);

      //hashing 
      var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var crypted = c.update(password, 'utf8', 'hex') + c.final('hex');
      var epass = crypted.toUpperCase();
      console.log(crypted.toUpperCase());
      var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
      var dpass = decrypted;
      var loginlink = '#';

      //Mail 
      var fromaddress = 'sample@email.com';
      var toaddress = emailid;
      var mailsubject = mailhead;
      var mailmessage = mailbody;

      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
         host: "smtp.zoho.com",
         port: 465,

         auth: {
            user: 'sample@email.com',
            pass: 'Radservice123!'
         }
      });

      var mailOptions = {
         from: fromaddress,
         to: toaddress,
         subject: mailsubject,
         text: mailmessage,
         html: '<h3>Dear ' + firstname + ',</h3><p>Your new<b> EMS</b> Account has been created. Welcome to the <b>EMS </b>community!</p><p><b>User ID: </b>' + userid + '<h3> </h3><b>Password: </b>' + password + '<br/></p><h4>From now on, please log in to your account using <a href="' + loginlink + '">login link</a> </h4><p>If you have any questions, please visit http://34.245.185.190/</p><br/><p>Kind regards,</p><p><b>EMS</b></p><p>http://34.245.185.190/</p>'
      };

      var sql = "Select * from `training`.`tutor` where `emailid`='" + emailid + "' or password='" + epass + "'";
      var query = db.query(sql, function (err, data, message1) {
         if (data.length) {
            message = "Emailid/Password already exists.Please Check!";
            res.render('admin_board.ejs', { message1: message, userData: data });


         }

         else {
            sql = "INSERT INTO `training`.`tutor`(`userid`,`firstname`,`middlename`,`lastname`,`emailid`,`address`,`phone`,`category`,`password`) VALUES ('" + userid + "','" + firstname + "','" + middlename + "','" + lastname + "','" + emailid + "','" + address + "','" + phone + "','" + category + "','" + epass + "')";

            query = db.query(sql, function (err, data, message1) {
               transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                     console.log(error);
                  } else {
                     console.log('Email sent: ' + info.response);
                  }
               });

               message = "New Tutor created!";
               res.render('admin_board.ejs', { message1: message, userData: data });

            });
         }



      });

   } else {
      res.render('admin_board.ejs');
   }
};
//-----------------------------------------------login page call------------------------------------------------------
exports.login = function (req, res) {
   var message = '';
   var sess = req.session;

   if (req.method == "POST") {
      var post = req.body;
      var username = post.user_name;
      var usertype = username.substring(0, 2);
      var pass = post.password;
      console.log(pass);
      //hashing 
      var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var crypted = c.update(pass, 'utf8', 'hex') + c.final('hex');
      var epass = crypted.toUpperCase();
      console.log('epass:' + crypted.toUpperCase());
      var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
      var dpass = decrypted;
      console.log(decrypted);
      var sql;
      if (usertype == "ad") {
         sql = "SELECT * FROM `ems`.`user_details` WHERE `user_name`='" + username + "' and password = '" + epass + "'";
         db.query(sql, function (err, results) {
            if (results.length) {
               req.session.userId = results[0].user_id;
               req.session.user = results[0];
               message = "Welcome!";
               res.render('admin_board.ejs', { message: message });
            }
            else {
               message = 'Incorrect! Username or Password';
               res.render('index.ejs', { message: message });
            }

         });
      }
      else if (usertype == "CA") {
         sql = "SELECT * FROM `ems`.`user_details` WHERE `user_name`='" + username + "' and password = '" + epass + "'";
         db.query(sql, function (err, results) {
            if (results.length) {
               req.session.userId = results[0].user_id;
               req.session.user = results[0];
               console.log('userid: ' + results[0].user_id);
               message = "Welcome! Assistant";
               res.render('ic_board.ejs', { message: message });
            }
            else {
               message = 'Incorrect! Username or Password';
               res.render('index.ejs', { message: message });
            }

         });
      }
      else {
         message = 'Incorrect! Username or Password';
         res.render('index.ejs', { message: message });
      }

   } else {
      res.render('index.ejs', { message: message });
   }

};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.icdashboard = function (req, res, next) {
   var message = "";
   var user = req.session.user,
      userId = req.session.userId;
   console.log('ddd=' + userId);
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";

         db.query(sql, function (err, result) {
            res.render('ic_board.ejs', { message: message, message5: fullname });
         });
      }
   });
};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.loginpage = function (req, res, next) {
   var message = "";
   res.render('login.ejs', { message: message });

};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.mbbs_board = function (req, res, next) {
   var message = "";
   res.render('mbbs_board.ejs', { message: message });

};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.icboard = function (req, res, next) {
   var message = "";
   res.render('ic_board.ejs', { message: message });

};

//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.searchpage = function (req, res, next) {
   var message = "";
   res.render('search.ejs', { message: message });

};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.singlepage = function (req, res, next) {
   var message = "";
   res.render('singlepage.ejs', { message: message });

};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.trainerpage = function (req, res, next) {
   var message = "";
   res.render('trainerpage.ejs', { message: message });

};
//--------------------------------render user details after login--------------------------------
exports.suprofileupdate = function (req, res) {
   var message = "";

   var post = req.body;
   var userid = post.userid;
   var firstname = post.firstname;
   var middlename = post.middlename;
   var lastname = post.lastname;
   var emailid = post.emailid;
   var phone = post.phone;
   var address = post.address;
   var password = post.password;
   var npassword = post.npassword;
   console.log('password: ' + password);
   var epass = '';
   var newpassword = '';
   var mailhead = 'EMS-Profile Updated';
   var mailbody = "Account Updation details";

   //hashing 
   var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
   var crypted = c.update(password, 'utf8', 'hex') + c.final('hex');
   var epass = crypted.toUpperCase();
   console.log(crypted.toUpperCase());
   var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
   var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
   var dpass = decrypted;
   var loginlink = '#';

   //Mail 
   var fromaddress = 'sample@email.com';
   var toaddress = emailid;
   var mailsubject = mailhead;
   var mailmessage = mailbody;

   var nodemailer = require('nodemailer');
   var transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,

      auth: {
         user: 'sample@email.com',
         pass: 'Radservice123!'
      }
   });


   if (npassword.length == 0) {
      epass = password;
   }
   else {
      newpassword = npassword;
      console.log('New before En: ' + npassword);
      //hashing 
      var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var crypted = c.update(newpassword, 'utf8', 'hex') + c.final('hex');
      epass = crypted.toUpperCase();
      // console.log('Signup encrytion : ' + crypted.toUpperCase());
      var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
      //  console.log('Signup decrytion : ' + decrypted);

      var mailOptions = {
         from: fromaddress,
         to: toaddress,
         subject: mailsubject,
         text: mailmessage,
         html: '<h3>Dear ' + firstname + ',</h3><p>Your<b> EMS</b> Account has been updated. </p><p><b>User ID: </b>' + userid + '<h3> </h3><b>New Password: </b>' + decrypted + '<br/></p><h4>From now on, please log in to your account using <a href="' + loginlink + '">login link</a> </h4><p>If you have any questions, please visit http://34.245.185.190/</p><br/><p>Kind regards,</p><p><b>EMS</b></p><p>http://34.245.185.190/</p>'
      };
      transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
            console.log(error);
         } else {
            console.log('Email sent: ' + info.response);
         }
      });
   }
   var sql = "UPDATE `training`.`superuser` SET `middlename` = '" + middlename + "',`lastname` = '" + lastname + "',`emailid` = '" + emailid + "',`phone` = '" + phone + "',`address` = '" + address + "',`password` = '" + epass + "' WHERE (`userid` = '" + userid + "');"

   db.query(sql, function (err, result) {
      message = "Profile Updated Successfully!";
      res.render('super_board.ejs', { message: message });
   });
};
//--------------------------------render user details after login--------------------------------
exports.empprofileupdate = function (req, res) {
   var message = "";

   var post = req.body;
   var userid = post.userid;
   var firstname = post.firstname;
   var middlename = post.middlename;
   var lastname = post.lastname;
   var emailid = post.emailid;
   var phone = post.phone;
   var address = post.address;
   var password = post.password;
   var npassword = post.npassword;
   console.log('password: ' + password);
   var epass = '';
   var newpassword = '';
   var mailhead = 'EMS-Profile Updated';
   var mailbody = "Account Updation details";

   //hashing 
   var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
   var crypted = c.update(password, 'utf8', 'hex') + c.final('hex');
   var epass = crypted.toUpperCase();
   console.log(crypted.toUpperCase());
   var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
   var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
   var dpass = decrypted;
   var loginlink = '#';

   //Mail 
   var fromaddress = 'sample@email.com';
   var toaddress = emailid;
   var mailsubject = mailhead;
   var mailmessage = mailbody;

   var nodemailer = require('nodemailer');
   var transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,

      auth: {
         user: 'sample@email.com',
         pass: 'Radservice123!'
      }
   });


   if (npassword.length == 0) {
      epass = password;
   }
   else {
      newpassword = npassword;
      console.log('New before En: ' + npassword);
      //hashing 
      var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var crypted = c.update(newpassword, 'utf8', 'hex') + c.final('hex');
      epass = crypted.toUpperCase();
      // console.log('Signup encrytion : ' + crypted.toUpperCase());
      var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
      //  console.log('Signup decrytion : ' + decrypted);

      var mailOptions = {
         from: fromaddress,
         to: toaddress,
         subject: mailsubject,
         text: mailmessage,
         html: '<h3>Dear ' + firstname + ',</h3><p>Your<b> EMS</b> Account has been updated. </p><p><b>User ID: </b>' + userid + '<h3> </h3><b>New Password: </b>' + decrypted + '<br/></p><h4>From now on, please log in to your account using <a href="' + loginlink + '">login link</a> </h4><p>If you have any questions, please visit http://34.245.185.190/</p><br/><p>Kind regards,</p><p><b>EMS</b></p><p>http://34.245.185.190/</p>'
      };
      transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
            console.log(error);
         } else {
            console.log('Email sent: ' + info.response);
         }
      });
   }
   var sql = "UPDATE `training`.`employee` SET `middlename` = '" + middlename + "',`lastname` = '" + lastname + "',`emailid` = '" + emailid + "',`phone` = '" + phone + "',`address` = '" + address + "',`password` = '" + epass + "' WHERE (`userid` = '" + userid + "');"

   db.query(sql, function (err, result) {
      message = "Profile Updated Successfully!";
      res.render('emp_board.ejs', { message: message });
   });
};
//--------------------------------render user details after login--------------------------------
exports.icprofileupdate = function (req, res) {
   var message = "";

   var post = req.body;
   var userid = post.userid;
   var firstname = post.firstname;
   var middlename = post.middlename;
   var lastname = post.lastname;
   var emailid = post.emailid;
   var phone = post.phone;
   var address = post.address;
   var password = post.password;
   var npassword = post.npassword;
   console.log('password: ' + password);
   var epass = '';
   var newpassword = '';
   var mailhead = 'EMS-Profile Updated';
   var mailbody = "Account Updation details";

   //hashing 
   var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
   var crypted = c.update(password, 'utf8', 'hex') + c.final('hex');
   var epass = crypted.toUpperCase();
   console.log(crypted.toUpperCase());
   var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
   var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
   var dpass = decrypted;
   var loginlink = '#';

   //Mail 
   var fromaddress = 'sample@email.com';
   var toaddress = emailid;
   var mailsubject = mailhead;
   var mailmessage = mailbody;

   var nodemailer = require('nodemailer');
   var transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,

      auth: {
         user: 'sample@email.com',
         pass: 'Radservice123!'
      }
   });


   if (npassword.length == 0) {
      epass = password;
   }
   else {
      newpassword = npassword;
      console.log('New before En: ' + npassword);
      //hashing 
      var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var crypted = c.update(newpassword, 'utf8', 'hex') + c.final('hex');
      epass = crypted.toUpperCase();
      // console.log('Signup encrytion : ' + crypted.toUpperCase());
      var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
      //  console.log('Signup decrytion : ' + decrypted);

      var mailOptions = {
         from: fromaddress,
         to: toaddress,
         subject: mailsubject,
         text: mailmessage,
         html: '<h3>Dear ' + firstname + ',</h3><p>Your<b> EMS</b> Account has been updated. </p><p><b>User ID: </b>' + userid + '<h3> </h3><b>New Password: </b>' + decrypted + '<br/></p><h4>From now on, please log in to your account using <a href="' + loginlink + '">login link</a> </h4><p>If you have any questions, please visit http://34.245.185.190/</p><br/><p>Kind regards,</p><p><b>EMS</b></p><p>http://34.245.185.190/</p>'
      };
      transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
            console.log(error);
         } else {
            console.log('Email sent: ' + info.response);
         }
      });
   }
   var sql = "UPDATE `training`.`commissioner` SET `middlename` = '" + middlename + "',`lastname` = '" + lastname + "',`emailid` = '" + emailid + "',`phone` = '" + phone + "',`address` = '" + address + "',`password` = '" + epass + "' WHERE (`userid` = '" + userid + "');"

   db.query(sql, function (err, result) {
      message = "Profile Updated Successfully!";
      res.render('ic_board.ejs', { message: message });
   });
};
//--------------------------------render user details after login--------------------------------
exports.categoryupdate = function (req, res) {
   var message = "";

   var post = req.body;
   var userid = post.userid;
   var firstname = post.firstname;
   var middlename = post.middlename;
   var lastname = post.lastname;
   var emailid = post.emailid;
   var phone = post.phone;
   var address = post.address;
   var password = post.password;
   var npassword = post.npassword;
   console.log('password: ' + password);
   var epass = '';
   var newpassword = '';
   var mailhead = 'EMS-Profile Updated';
   var mailbody = "Account Updation details";

   //hashing 
   var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
   var crypted = c.update(password, 'utf8', 'hex') + c.final('hex');
   var epass = crypted.toUpperCase();
   console.log(crypted.toUpperCase());
   var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
   var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
   var dpass = decrypted;
   var loginlink = '#';

   //Mail 
   var fromaddress = 'sample@email.com';
   var toaddress = emailid;
   var mailsubject = mailhead;
   var mailmessage = mailbody;

   var nodemailer = require('nodemailer');
   var transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,

      auth: {
         user: 'sample@email.com',
         pass: 'Radservice123!'
      }
   });


   if (npassword.length == 0) {
      epass = password;
   }
   else {
      newpassword = npassword;
      console.log('New before En: ' + npassword);
      //hashing 
      var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var crypted = c.update(newpassword, 'utf8', 'hex') + c.final('hex');
      epass = crypted.toUpperCase();
      // console.log('Signup encrytion : ' + crypted.toUpperCase());
      var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
      //  console.log('Signup decrytion : ' + decrypted);

      var mailOptions = {
         from: fromaddress,
         to: toaddress,
         subject: mailsubject,
         text: mailmessage,
         html: '<h3>Dear ' + firstname + ',</h3><p>Your<b> EMS</b> Account has been updated. </p><p><b>User ID: </b>' + userid + '<h3> </h3><b>New Password: </b>' + decrypted + '<br/></p><h4>From now on, please log in to your account using <a href="' + loginlink + '">login link</a> </h4><p>If you have any questions, please visit http://34.245.185.190/</p><br/><p>Kind regards,</p><p><b>EMS</b></p><p>http://34.245.185.190/</p>'
      };
      transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
            console.log(error);
         } else {
            console.log('Email sent: ' + info.response);
         }
      });
   }
   var sql = "UPDATE `training`.`commissioner` SET `middlename` = '" + middlename + "',`lastname` = '" + lastname + "',`emailid` = '" + emailid + "',`phone` = '" + phone + "',`address` = '" + address + "',`password` = '" + epass + "' WHERE (`userid` = '" + userid + "');"

   db.query(sql, function (err, result) {
      message = "Profile Updated Successfully!";
      res.render('ic_board.ejs', { message: message });
   });
};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.tudashboard = function (req, res, next) {
   var message = "";
   var fullname = '';

   var user = req.session.user,
      userId = req.session.userId;
   console.log('ddd=' + userId);
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;

         var sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";

         db.query(sql, function (err, result) {
            message = "Welcome! " + fullname;
            res.render('tutor_board.ejs', { message: message, data: result, message5: fullname });
         });
      }
   });

};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.tutorsignuppro = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var post = req.body;
      var userid = post.userid;
      var category = post.category;

      var sql = "UPDATE `training`.`tutor` SET `category` = '" + category + "' WHERE (`userid` = '" + userid + "');"
      var query = db.query(sql, function (err, result) {

         sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userid + "'";
         db.query(sql, function (err, result) {
            res.render('tutorpro.ejs', { message: message, data: result });
         });

      });

   } else {
      res.render('index.ejs');
   }
};
//--------------------------------render user details after login--------------------------------
exports.addclass = function (req, res) {
   if (req.method == "POST") {
      var userId = req.session.userId;
      if (userId == null) {
         res.redirect("/login");
         return;
      }
      sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
      db.query(sql, function (err, results) {
         if (results.length) {
            req.session.firstname = results[0].firstname;
            req.session.lastname = results[0].lastname;
            var firstname = results[0].firstname;
            var lastname = results[0].lastname;
            fullname = firstname + ' ' + lastname;
            //var sql = "SELECT * FROM `training`.`courses` INNER JOIN `training`.`tutor` on `courses`.`category` LIKE CONCAT('%', `tutor`.`category`, '%')  where `training`.`tutor`='" + userId + "'";

            var sql = "SELECT  distinct courses.category FROM `training`.`courses` INNER JOIN `training`.`tutor` on `tutor`.`category` LIKE CONCAT('%', `courses`.`category`, '%')  where `tutor`.`userid` = '" + userId + "'";
            db.query(sql, function (err, data) {
               res.render('addclass.ejs', { userData: data, message5: fullname });
            });
         }
      });
   }

};
//--------------------------------render user details after login--------------------------------
exports.addtest = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT  distinct courses.category FROM `training`.`courses` INNER JOIN `training`.`tutor` on `tutor`.`category` LIKE CONCAT('%', `courses`.`category`, '%')  where `tutor`.`userid` = '" + userId + "'";
         db.query(sql, function (err, data) {
            res.render('addtest.ejs', { userData: data, message5: fullname });
         });
      }
   });

};
//--------------------------------render user details after login--------------------------------
exports.empchatexit = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   var sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT DISTINCT category from `training`.`courses`";
         db.query(sql, function (err, data) {
            message = 'You have leave the chatroom!';
            res.render('emp_board.ejs', { message: message, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.suchatexit = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   var sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT DISTINCT category from `training`.`courses`";
         db.query(sql, function (err, data) {
            message = 'You have leave the chatroom!';
            res.render('super_board.ejs', { message: message, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.icchatexit = function (req, res) {
   var message = '';
   var userId = req.session.userId;

   sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT DISTINCT category from `training`.`courses`";
         db.query(sql, function (err, data) {
            message = 'You have leave the chatroom!';
            res.render('ic_board.ejs', { message: message, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.tuchatexit = function (req, res) {
   var message = '';
   var message5 = '';
   var userId = req.session.userId;
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT DISTINCT category from `training`.`courses`";
         db.query(sql, function (err, data) {
            message = 'You have leave the chatroom!';
            res.render('tutor_board.ejs', { message: message, message5: fullname });
         });
      }
   });
};
//---------------------------------------------Create Class page call------------------------------------------------------
exports.createclass = function (req, res) {
   if (req.method == "POST") {
      var userId = req.session.userId;
      if (userId == null) {
         res.redirect("/login");
         return;
      }
      sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
      db.query(sql, function (err, results) {
         if (results.length) {
            req.session.firstname = results[0].firstname;
            req.session.lastname = results[0].lastname;
            var firstname = results[0].firstname;
            var lastname = results[0].lastname;
            fullname = firstname + ' ' + lastname;
            message = '';
            var x = Math.floor((Math.random() * 19) + 11);
            var post = req.body;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            var tutorid = userId;
            var category = post.category;
            var description = post.description;
            var startdate = post.startdate;
            var enddate = post.enddate;
            var starttime = post.starttime;
            var endtime = post.endtime;
            var classid = "class" + x;
            var classlink = post.classlink;
            var setdate = today;

            var sql = "insert INTO `training`.`newclass` (`classid`,`tutorid`,`category`,`description`, `startdate`,`enddate`,`starttime`,`endtime`,`setdate`,`classlink`) VALUES ('" + classid + "','" + tutorid + "','" + category + "','" + description + "','" + startdate + "','" + enddate + "','" + starttime + "','" + endtime + "','" + setdate + "','" + classlink + "')";

            var query = db.query(sql, function (err, result) {

               message = "Success! New class created.";
               res.render('tutor_board.ejs', { message: message, message5: fullname });
            });
         }
      });
   } else {
      res.render('tutor_board.ejs');
   }
};
//---------------------------------------------Create Class page call------------------------------------------------------
exports.createtest = function (req, res) {
   if (req.method == "POST") {
      var userId = req.session.userId;
      if (userId == null) {
         res.redirect("/login");
         return;
      }
      sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
      db.query(sql, function (err, results) {
         if (results.length) {
            req.session.firstname = results[0].firstname;
            req.session.lastname = results[0].lastname;
            var firstname = results[0].firstname;
            var lastname = results[0].lastname;
            fullname = firstname + ' ' + lastname;
            message = '';
            var x = Math.floor((Math.random() * 19) + 11);
            var post = req.body;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            var tutorid = userId;
            var topic = post.topic;
            var category = post.category;
            var description = post.description;
            var duedate = post.duedate;
            var duetime = post.duetime;
            var testid = "Test" + x;
            var testlink = post.testlink;
            console.log(testlink);
            var setdate = today;

            var sql = "insert INTO `training`.`newtest` (`testid`,`tutorid`,`topic`,`category`,`description`,`testdate`,`testtime`,`setdate`,`testlink`) VALUES ('" + testid + "','" + tutorid + "','" + topic + "','" + category + "','" + description + "','" + duedate + "','" + duetime + "','" + setdate + "','" + testlink + "')";

            var query = db.query(sql, function (err, result) {

               message = "Success! New Test created.";
               res.render('tutor_board.ejs', { message: message, message5: fullname });
            });
         }
      });
   } else {
      res.render('tutor_board.ejs');
   }
};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.addashboard = function (req, res, next) {
   var message = "";
   var user = req.session.user,
      userId = req.session.userId;
   console.log('ddd=' + userId);
   if (userId == null) {
      res.redirect("/login");
      return;
   }

   var sql = "SELECT * FROM `training`.`admin` WHERE `userid`='" + userId + "'";

   db.query(sql, function (err, result) {
      message = "Welcome! Administrator.";
      res.render('admin_board.ejs', { message: message });
   });
};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.sudashboard = function (req, res, next) {
   var message = "";
   var user = req.session.user,
      userId = req.session.userId;
   console.log('ddd=' + userId);
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";

         db.query(sql, function (err, result) {
            message = "Welcome! " + fullname;
            res.render('super_board.ejs', { message: message, message5: fullname });
         });
      }
   });
};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.empdashboard = function (req, res, next) {
   var message = '';
   var user = req.session.user,
      userId = req.session.userId;
   console.log('ddd=' + userId);
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         console.log('full' + fullname);

         var sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
         message = "Welcome! " + fullname;
         db.query(sql, function (err, result) {
            res.render('emp_board.ejs', { message: message, message5: fullname });
         });
      }
   });
};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.achatroom = function (req, res, next) {

   var user = req.session.user,
      message = "",
      userId = req.session.userId;
   message = userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }

   var sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";

   db.query(sql, function (err, result) {
      res.render('emp_board.ejs', { data: result });
   });
};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.tutorupdate = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var post = req.body;
      var userId = post.userid;
      var category = post.category;


      var sql = "UPDATE `training`.`tutor` SET `category` = '" + category + "' WHERE (`userid` = '" + userId + "');"

      var query = db.query(sql, function (err, results) {
         res.render('index.ejs', { message: message });
      });

   } else {
      res.render('index.ejs');
   }
};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.pwdrecovery = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var post = req.body;
      var userId = post.userid;
      var emailid = post.emailid;
      var name = userId.substring(1, 5);
      var pass = post.password;

      var usertype = userId.substring(0, 2);
      var sql;

      console.log(name);
      console.log(usertype);
      console.log(pass);

      if (1) {

         //Parent Login
         if (usertype == "EM") {


            sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "' AND `emailid`='" + emailid + "'";
            db.query(sql, function (err, results) {
               if (results.length) {
                  req.session.userId = results[0].id;
                  req.session.user = results[0];
                  console.log(results[0].id);
                  res.render('gennotice.ejs', { data: results });
               }
               else {
                  message = 'Incorrrect! Either UserID or Email ID ';
                  res.render('index.ejs', { message: message });
               }

            });

         }
         //Student Login
         else if (usertype == "TU") {
            sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "' AND `emailid`='" + emailid + "'";
            db.query(sql, function (err, results) {
               if (results.length) {
                  req.session.userId = results[0].id;
                  req.session.user = results[0];
                  console.log(results[0].id);
                  res.render('gennotice.ejs', { data: results });
               }
               else {
                  message = 'Incorrrect! Either UserID or Email ID ';
                  res.render('index.ejs', { message: message });
               }

            });

         }
         //Teacher Login
         else if (usertype == "IC") {

            sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "' AND `emailid`='" + emailid + "'";
            db.query(sql, function (err, results) {
               if (results.length) {
                  req.session.userId = results[0].id;
                  req.session.user = results[0];
                  console.log(results[0].id);

                  res.render('gennotice.ejs', { data: results });
               }
               else {
                  message = 'Incorrrect! Either UserID or Email ID';
                  res.render('forgotpwd.ejs', { message: message });
               }

            });

         }
         else if (usertype == "AD") {
            sql = "SELECT * FROM `training`.`admin` WHERE `userid`='" + userId + "' AND `emailid`='" + emailid + "'";
            db.query(sql, function (err, results) {
               if (results.length) {
                  req.session.userId = results[0].id;
                  req.session.user = results[0];
                  console.log(results[0].id);
                  res.render('gennotice.ejs', { data: results });
               }
               else {
                  message = 'Incorrrect! Either UserID or Email ID ';
                  res.render('index.ejs', { message: message });
               }

            });

         }

      }

   } else {
      res.render('index.ejs');
   }
};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.pwdupdate = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var post = req.body;
      var first_name = post.first_name;
      var user_id = post.userid;
      var emailid = post.emailid;
      var password = post.password;
      var loginlink = '#';
      //hashing 
      var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var decrypted = dc.update(password, 'hex', 'utf8') + dc.final('utf8');
      var dpass = decrypted;

      var mailhead = 'EMS-Account recovery details';
      var mailbody = 'UserID: ' + user_id + ' | Password: ' + dpass;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mmmm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mmmm + '-' + dd;
      var requestdate = today;
      //Mail 
      var fromaddress = 'sample@email.com';
      var toaddress = emailid;
      var mailsubject = mailhead;
      var mailmessage = mailbody;

      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
         host: "smtp.zoho.com",
         port: 465,
         auth: {
            user: 'sample@email.com',
            pass: 'Radservice123!'
         }
      });

      var mailOptions = {
         from: fromaddress,
         to: toaddress,
         subject: mailsubject,
         text: mailmessage,

         html: '<h3>Dear ' + first_name + ',</h3><p>Your <b>EMS</b> Account recovery has been done.</p><p>At ' + emailid + ', we help you to recover your password.</p><p><b>Your secure password:</b> ' + dpass + '<br/><h4>Please log in to your account using <a href="' + loginlink + '">login link</a> </h4><br/>If you have any questions, please visit http://34.245.185.190/</p><br/><p>Kind regards,</p><p><b>EMS</b></p><p>http://34.245.185.190/</p>'
      };
      var sql = "insert INTO `tuition`.`account` (`userid`,`emailid`,`password`, `requestdate`) VALUES ('" + user_id + "','" + emailid + "','" + password + "','" + requestdate + "')";

      var query = db.query(sql, function (err, result) {

         message = "Password recovered! Sent to your mail.";
         transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
               console.log(error);
            } else {
               console.log('Email sent: ' + info.response);
            }
         });
         res.render('gennotice1.ejs', { message: message });
      });


   } else {
      res.render('index.ejs');
   }
};
//--------------------------------render user details after login--------------------------------
exports.tutestnotice = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT newtest.* FROM `training`.`newtest` INNER JOIN `training`.`tutor` on `tutor`.`category` like concat ('%',`newtest`.`category`,'%')where `tutor`.`userid`='" + userId + "'";
         db.query(sql, function (err, data) {
            res.render('tutestnotice.ejs', { userData: data, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.tuclassnotice = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT newclass.* FROM `training`.`newclass` INNER JOIN `training`.`tutor` on `tutor`.`category` like concat ('%',`newclass`.`category`,'%')where `tutor`.`userid`='" + userId + "'";

         db.query(sql, function (err, data) {
            res.render('tuclassnotice.ejs', { userData: data, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.empclassnotice = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log(results[0].ministry);

            var sample = results[0].ministry;

            sql = "SELECT newclass.* FROM `training`.`newclass` INNER JOIN `training`.`setcategory` on `setcategory`.`category` like concat ('%',`newclass`.`category`,'%')where `setcategory`.`ministry`='" + sample + "'";

            db.query(sql, function (err, data) {
               res.render('empclassnotice.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });

};
//--------------------------------render user details after login--------------------------------
exports.emptestnotice = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log(results[0].ministry);

            var sample = results[0].ministry;

            sql = "SELECT newtest.* FROM `training`.`newtest` INNER JOIN `training`.`setcategory` on `setcategory`.`category` like concat ('%',`newtest`.`category`,'%')where `setcategory`.`ministry`='" + sample + "'";

            db.query(sql, function (err, data) {
               res.render('emptestnotice.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });

};
//--------------------------------render user details after login--------------------------------
exports.sclassnotice = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log(results[0].ministry);

            var sample = results[0].ministry;

            sql = "SELECT * FROM `training`.`newclass` INNER JOIN `training`.`setcategory` on `setcategory`.`category` like concat ('%',`newclass`.`category`,'%')where `setcategory`.`ministry`='" + sample + "'";

            db.query(sql, function (err, data) {
               res.render('sclassnotice.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.stestnotice = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log(results[0].ministry);

            var sample = results[0].ministry;

            sql = "SELECT * FROM `training`.`newtest` INNER JOIN `training`.`setcategory` on `setcategory`.`category` like concat ('%',`newtest`.`category`,'%')where `setcategory`.`ministry`='" + sample + "'";

            db.query(sql, function (err, data) {
               res.render('stestnotice.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });

};

//--------------------------------render user details after login--------------------------------
exports.scompleteclass = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log(results[0].ministry);

            var sample = results[0].ministry;

            sql = "SELECT completedclass.* FROM `training`.`completedclass` INNER JOIN `training`.`setcategory` on `setcategory`.`category` like concat ('%',`completedclass`.`category`,'%')where `setcategory`.`ministry`='" + sample + "'";

            db.query(sql, function (err, data) {
               res.render('scompleteclass.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.scompletetest = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log(results[0].ministry);

            var sample = results[0].ministry;

            sql = "SELECT completedtest.* FROM `training`.`completedtest` INNER JOIN `training`.`setcategory` on `setcategory`.`category` like concat ('%',`completedtest`.`category`,'%')where `setcategory`.`ministry`='" + sample + "'";

            db.query(sql, function (err, data) {
               res.render('scompletetest.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.empcompleteclass = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`completedclass`  WHERE (`employeeid` = '" + userId + "');"
         db.query(sql, function (err, data) {
            res.render('empcompleteclass.ejs', { userData: data, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.mbbs_viewstudent = function (req, res) {
   var userId = req.session.userId;
   var sql = "SELECT * FROM `ems`.`cand_profile_details`;"
   db.query(sql, function (err, data1) {
      var sql = "SELECT * FROM `ems`.`cand_admission_details`;"
      db.query(sql, function (err, data) {
         res.render('mbbs_viewstudent.ejs', { userData: data, userData1: data1 });
      });
   });
};
//--------------------------------render user details after login--------------------------------
exports.update_profile = function (req, res) {
   var message = '';
   var post = req.body;
   var cand_id = post.cand_id;
   var gender = post.gender;

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


   // for neet details
   var phy_mark=post.phy_mark;
   var phy_max_mark=post.phy_max_mark;
   var chem_mark=post.chem_mark;
   var chem_max_mark=post.chem_max_mark;
   var bio_mark=post.bio_mark;
   var bio_max_mark=post.bio_max_mark;
   var agg_mark=post.agg_mark;
   var agg_max_mark=post.agg_max_mark;

    //for bank details
    var account_no=post.account_no;
    var ifsc=post.ifsc;
    var bank_name=post.bank_name;
    var pan_no=post.pan_no;
    var micr=post.micr;
    var branch_name=post.branch_name;

      //for address tab
      var ps_address=post.ps_address;
      var ps_pincode=post.ps_pincode;
      var ps_state=post.ps_state;
      var ps_district=post.ps_district;
      var pm_address=post.pm_address;
      var pm_pincode=post.pm_pincode;
      var pm_state=post.pm_state;
      var pm_district=post.pm_district;
      var address_type=post.address_type;
    
         //for contact tab
         var tel_phone=post.tel_phone;
         var mobile_phone=post.mobile_phone;
         var email_id=post.email_id;
         var aadhar_no=post.aadhar_no;
         var voter_id=post.voter_id;
         var remarks=post.remarks;
     
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

     //for profile tab
     var name = post.cand_name;
     console.log('Testing:'+name);
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
     var academic_year = post.academic_year;
     var student_code = post.student_code;


     var sql = "UPDATE `ems`.`cand_profile_details` SET `name` = '" + name + "',`initial` = '" + initial + "',`initial_expansion` = '" + initial_expansion + "',`father_name` = '" + father_name + "',`mother_name` = '" + mother_name + "',`date_of_birth` = '" + date_of_birth + "',`gender` = '" + gender + "',`blood_group` = '" + blood_group + "',`religion` = '" + religion + "',`community` = '" + community + "',`caste` = '" + caste + "',`nationality` = '" + nationality + "',`willing_to_donate_blood` = '" + willing_to_donate_blood + "',`academic_year` = '" + academic_year + "',`student_code` = '" + student_code + "'  WHERE (`cand_id` = '" + cand_id + "');"
   // var sql = "UPDATE `ems`.`cand_profile_details` SET `name` = '" + name + "',`initial` = '" + initial + "',`initial_expansion` = '" + initial_expansion + "',`father_name` = '" + father_name + "',`mother_name` = '" + mother_name + "',`date_of_birth` = '" + date_of_birth + "',`neet_roll_no` = '" + neet_roll_no + "',`gender` = '" + gender + "',`blood_group` = '" + blood_group + "',`religion` = '" + religion + "',`community` = '" + community + "',`caste` = '" + caste + "',`nationality` = '" + nationality + "',`willing_to_donate_blood` = '" + willing_to_donate_blood + "',`academic_year` = '" + academic_year + "',`student_code` = '" + student_code + "' WHERE (`cand_id` = '" + cand_id + "');"
    db.query(sql, function (err, data) {
         var sql = "UPDATE `ems`.`cand_admission_details` SET `rank` = '" + rank + "',`rank_no` = '" + rank_no + "',`ar_no` = '" + ar_no + "',`total_mark` = '" + total_mark + "',`neet_mark` = '" + neet_mark + "',`reg_no` = '" + reg_no + "',`neet_roll_no` = '" + neet_roll_no + "',`course` = '" + course + "',`admission_type` = '" + admission_type + "',`admission_quota` = '" + admission_quota + "',`course_commencement` = '" + course_commencement + "',`date_of_admission` = '" + date_of_admission + "',`date_of_allotment` = '" + date_of_allotment + "',`selected_category` = '" + selected_category + "',`willing_for_counciling` = '" + willing_for_counciling + "' WHERE (`cand_id` = '" + cand_id + "');"
         db.query(sql, function (err, data) {
         var sql = "UPDATE `ems`.`cand_address_details` SET `ps_address` = '" + ps_address + "',`ps_pincode` = '" + ps_pincode + "',`ps_state` = '" + ps_state + "',`ps_district` = '" + ps_district + "',`pm_address` = '" + pm_address + "',`pm_pincode` = '" + pm_pincode + "',`pm_state` = '" + pm_state + "',`pm_district` = '" + pm_district + "',`address_type` = '" + address_type + "' WHERE (`cand_id` = '" + cand_id + "');"
         db.query(sql, function (err, data) {
         var sql = "UPDATE `ems`.`cand_contact_details` SET `tel_phone` = '" + tel_phone + "',`mobile_phone` = '" + mobile_phone + "',`email_id` = '" + email_id + "',`voter_id` = '" + voter_id + "',`remarks` = '" + remarks + "',`aadhar_no` = '" + aadhar_no + "' WHERE (`cand_id` = '" + cand_id + "');"
         db.query(sql, function (err, data) {
    var sql = "UPDATE `ems`.`cand_institute_details` SET `institute_name` = '" + institute_name + "',`place` = '" + place + "',`register_no` = '" + register_no + "',`exam_passed` = '" + exam_passed + "',`relieving_date` = '" + relieving_date + "',`district` = '" + district + "',`board` = '" + board + "',`month_of_passing` = '" + month_of_passing + "',`state` = '" + state + "',`year_of_passing` = '" + year_of_passing + "',`duration` = '" + duration + "' WHERE (`cand_id` = '" + cand_id + "');"
    db.query(sql, function (err, data) {
    var sql = "UPDATE `ems`.`cand_neet_mark_details` SET `phy_mark` = '" + phy_mark + "',`phy_max_mark` = '" + phy_max_mark + "',`chem_mark` = '" + chem_mark + "',`chem_max_mark` = '" + chem_max_mark + "',`bio_mark` = '" + bio_mark + "',`bio_max_mark` = '" + bio_max_mark + "',`agg_mark` = '" + agg_mark + "',`agg_max_mark` = '" + agg_max_mark + "' WHERE (`cand_id` = '" + cand_id + "');"
    db.query(sql, function (err, data) {
    var sql = "UPDATE `ems`.`cand_bank_details` SET `account_no` = '" + account_no + "',`ifsc` = '" + ifsc + "',`bank_name` = '" + bank_name + "',`pan_no` = '" + pan_no + "',`micr` = '" + micr + "',`branch_name` = '" + branch_name + "' WHERE (`cand_id` = '" + cand_id + "');"
    db.query(sql, function (err, data) {
         var sql10 = "SELECT * FROM `ems`.`cand_certificate2_details` WHERE `cand_id`='" + cand_id + "'";
      db.query(sql10, function (err, data10) {
         var sql9 = "SELECT * FROM `ems`.`cand_certificate_details` WHERE `cand_id`='" + cand_id + "'";
         db.query(sql9, function (err, data9) {
            var sql8 = "SELECT * FROM `ems`.`cand_contact_details` WHERE `cand_id`='" + cand_id + "'";
            db.query(sql8, function (err, data8) {
               var sql7 = "SELECT * FROM `ems`.`cand_bank_details` WHERE `cand_id`='" + cand_id + "'";
               db.query(sql7, function (err, data7) {
                  var sql6 = "SELECT * FROM `ems`.`cand_neet_mark_details` WHERE `cand_id`='" + cand_id + "'";
                  db.query(sql6, function (err, data6) {
                     var sql5 = "SELECT * FROM `ems`.`cand_marks_details` WHERE `cand_id`='" + cand_id + "'";
                     db.query(sql5, function (err, data5) {
                        var sql4 = "SELECT * FROM `ems`.`cand_institute_details` WHERE `cand_id`='" + cand_id + "'";
                        db.query(sql4, function (err, data4) {
                           var sql3 = "SELECT * FROM `ems`.`cand_photo_details` WHERE `cand_id`='" + cand_id + "'";
                           db.query(sql3, function (err, data3) {
                              var sql2 = "SELECT * FROM `ems`.`cand_address_details` WHERE `cand_id`='" + cand_id + "'";
                              db.query(sql2, function (err, data2) {
                                 var sql1 = "SELECT * FROM `ems`.`cand_admission_details` WHERE `cand_id`='" + cand_id + "'";
                                 db.query(sql1, function (err, data1) {
                                    var sql = "SELECT * FROM `ems`.`cand_profile_details` WHERE `cand_id`='" + cand_id + "'";
                                    db.query(sql, function (err, data) {
                                       message = 'Student Profile Updated Successfully!';
                                       res.render('mbbs_editcand.ejs', { userData: data, userData1: data1, userData2: data2, userData3: data3, userData4: data4, userData5: data5, userData6: data6, userData7: data7, userData8: data8, userData9: data9, userData10: data10, message: message });
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
         });
      });
   });
};


//--------------------------------render user details after login--------------------------------
exports.mbbs_viewcand = function (req, res) {
   var userId = req.session.userId;
   var post = req.body;
   var cand_id = post.cand_id;

   var sql10 = "SELECT * FROM `ems`.`cand_certificate2_details` WHERE `cand_id`='" + cand_id + "'";
   db.query(sql10, function (err, data10) {
      var sql9 = "SELECT * FROM `ems`.`cand_certificate_details` WHERE `cand_id`='" + cand_id + "'";
      db.query(sql9, function (err, data9) {
         var sql8 = "SELECT * FROM `ems`.`cand_contact_details` WHERE `cand_id`='" + cand_id + "'";
         db.query(sql8, function (err, data8) {
            var sql7 = "SELECT * FROM `ems`.`cand_bank_details` WHERE `cand_id`='" + cand_id + "'";
            db.query(sql7, function (err, data7) {
               var sql6 = "SELECT * FROM `ems`.`cand_neet_mark_details` WHERE `cand_id`='" + cand_id + "'";
               db.query(sql6, function (err, data6) {
                  var sql5 = "SELECT * FROM `ems`.`cand_marks_details` WHERE `cand_id`='" + cand_id + "'";
                  db.query(sql5, function (err, data5) {
                     var sql4 = "SELECT * FROM `ems`.`cand_institute_details` WHERE `cand_id`='" + cand_id + "'";
                     db.query(sql4, function (err, data4) {
                        var sql3 = "SELECT * FROM `ems`.`cand_photo_details` WHERE `cand_id`='" + cand_id + "'";
                        db.query(sql3, function (err, data3) {
                           var sql2 = "SELECT * FROM `ems`.`cand_address_details` WHERE `cand_id`='" + cand_id + "'";
                           db.query(sql2, function (err, data2) {
                              var sql1 = "SELECT * FROM `ems`.`cand_admission_details` WHERE `cand_id`='" + cand_id + "'";
                              db.query(sql1, function (err, data1) {
                                 var sql = "SELECT * FROM `ems`.`cand_profile_details` WHERE `cand_id`='" + cand_id + "'";
                                 db.query(sql, function (err, data) {
                                    res.render('mbbs_viewcand.ejs', { userData: data, userData1: data1, userData2: data2, userData3: data3, userData4: data4, userData5: data5, userData6: data6, userData7: data7, userData8: data8, userData9: data9, userData10: data10 });
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
};
//--------------------------------render user details after login--------------------------------
exports.mbbs_editcand = function (req, res) {
   var userId = req.session.userId;
   var post = req.body;
   var cand_id = post.cand_id;
   var message = '';
   var sql10 = "SELECT * FROM `ems`.`cand_certificate2_details` WHERE `cand_id`='" + cand_id + "'";
   db.query(sql10, function (err, data10) {
      var sql9 = "SELECT * FROM `ems`.`cand_certificate_details` WHERE `cand_id`='" + cand_id + "'";
      db.query(sql9, function (err, data9) {
         var sql8 = "SELECT * FROM `ems`.`cand_contact_details` WHERE `cand_id`='" + cand_id + "'";
         db.query(sql8, function (err, data8) {
            var sql7 = "SELECT * FROM `ems`.`cand_bank_details` WHERE `cand_id`='" + cand_id + "'";
            db.query(sql7, function (err, data7) {
               var sql6 = "SELECT * FROM `ems`.`cand_neet_mark_details` WHERE `cand_id`='" + cand_id + "'";
               db.query(sql6, function (err, data6) {
                  var sql5 = "SELECT * FROM `ems`.`cand_marks_details` WHERE `cand_id`='" + cand_id + "'";
                  db.query(sql5, function (err, data5) {
                     var sql4 = "SELECT * FROM `ems`.`cand_institute_details` WHERE `cand_id`='" + cand_id + "'";
                     db.query(sql4, function (err, data4) {
                        var sql3 = "SELECT * FROM `ems`.`cand_photo_details` WHERE `cand_id`='" + cand_id + "'";
                        db.query(sql3, function (err, data3) {
                           var sql2 = "SELECT * FROM `ems`.`cand_address_details` WHERE `cand_id`='" + cand_id + "'";
                           db.query(sql2, function (err, data2) {
                              var sql1 = "SELECT * FROM `ems`.`cand_admission_details` WHERE `cand_id`='" + cand_id + "'";
                              db.query(sql1, function (err, data1) {
                                 var sql = "SELECT * FROM `ems`.`cand_profile_details` WHERE `cand_id`='" + cand_id + "'";
                                 db.query(sql, function (err, data) {
                                    res.render('mbbs_editcand.ejs', { userData: data, userData1: data1, userData2: data2, userData3: data3, userData4: data4, userData5: data5, userData6: data6, userData7: data7, userData8: data8, userData9: data9, userData10: data10, message: message });
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
};
//--------------------------------render user details after login--------------------------------
exports.scourserequest = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log(results[0].ministry);
            var ministry = results[0].ministry;

            var sql = "SELECT *,DATE_FORMAT(donedate, '%a %D %b %Y') donedate FROM `training`.`courserequest`  WHERE (`ministry` = '" + ministry + "');"
            db.query(sql, function (err, data) {
               res.render('scourserequest.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.empcompletetest = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`completedtest`  WHERE (`employeeid` = '" + userId + "');"
         db.query(sql, function (err, data) {
            res.render('empcompletetest.ejs', { userData: data, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.tucompleteclass = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`completedclass`  WHERE (`tutorid` = '" + userId + "');"
         db.query(sql, function (err, data) {
            res.render('tucompleteclass.ejs', { userData: data, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.tuuploadreport = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT *,DATE_FORMAT(donedate, '%a %D %b %Y') donedate FROM `training`.`notes`  WHERE (`tutorid` = '" + userId + "');"
         db.query(sql, function (err, data) {
            res.render('tuuploadreport.ejs', { userData: data, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.tuuploadnotes = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT *,DATE_FORMAT(donedate, '%a %D %b %Y') donedate FROM `training`.`notes`  WHERE (`tutorid` = '" + userId + "');"
         db.query(sql, function (err, data) {
            res.render('tuuploadnotes.ejs', { userData: data, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.tuuploadsession = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT *,DATE_FORMAT(donedate, '%a %D %b %Y') donedate FROM `training`.`sessions`  WHERE (`tutorid` = '" + userId + "');"
         db.query(sql, function (err, data) {
            res.render('tuuploadsession.ejs', { userData: data, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.reportcontinue = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         //getting ministry
         var sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log('report :' + results[0].ministry);
            var ministry = results[0].ministry;

            var sql = "SELECT notes.*  FROM `training`.`notes` INNER JOIN `training`.`setcategory` on `setcategory`.`category` like concat ('%',`notes`.`category`,'%')where `setcategory`.`ministry`='" + ministry + "'";

            db.query(sql, function (err, data) {
               res.render('reportcontinue.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.notescontinue = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         //getting ministry
         var sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log('report :' + results[0].ministry);
            var ministry = results[0].ministry;

            var sql = "SELECT notes.*  FROM `training`.`notes` INNER JOIN `training`.`setcategory` on `setcategory`.`category` like concat ('%',`notes`.`category`,'%')where `setcategory`.`ministry`='" + ministry + "'";

            db.query(sql, function (err, data) {
               res.render('notescontinue.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.sessioncontinue = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         //getting ministry
         var sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log('report :' + results[0].ministry);
            var ministry = results[0].ministry;

            var sql = "SELECT sessions.*  FROM `training`.`sessions` INNER JOIN `training`.`setcategory` on `setcategory`.`category` like concat ('%',`sessions`.`category`,'%')where `setcategory`.`ministry`='" + ministry + "'";

            db.query(sql, function (err, data) {
               res.render('sessioncontinue.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.empclass = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`newclass`";
         db.query(sql, function (err, data) {
            res.render('empclass.ejs', { userData: data, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.emptest = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`newtest`";
         db.query(sql, function (err, data) {
            res.render('emptest.ejs', { userData: data, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.empotherclass = function (req, res) {
   var message = "";
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         //getting ministry
         var sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log('other :' + results[0].ministry);
            var ministry = results[0].ministry;
            //getting category
            sql = "SELECT * FROM `training`.`setcategory` WHERE `ministry`='" + ministry + "'";
            db.query(sql, function (err, results) {
               req.session.category = results[0].category;
               console.log('other :' + results[0].category);
               var category = results[0].category;
               message = results[0].category;
               //getting category list out of current
               sql = "SELECT  distinct courses.category FROM `training`.`courses` INNER JOIN `training`.`setcategory` on `setcategory`.`category` NOT LIKE concat ('%',`courses`.`category`,'%')where `setcategory`.`ministry`='" + ministry + "'";

               db.query(sql, function (err, data) {
                  res.render('empotherclass.ejs', { userData: data, message: message, message5: fullname });
               });
            });

         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.tuliveclass = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT newclass.* FROM `training`.`newclass` INNER JOIN `training`.`tutor` on `tutor`.`category` like concat ('%',`newclass`.`category`,'%')where `tutor`.`userid`='" + userId + "'";

         db.query(sql, function (err, data) {
            res.render('tuliveclass.ejs', { userData: data, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.empliveclass = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log(results[0].ministry);

            var sample = results[0].ministry;

            sql = "SELECT newclass.* FROM `training`.`newclass` INNER JOIN `training`.`setcategory` on `setcategory`.`category` like concat ('%',`newclass`.`category`,'%')where `setcategory`.`ministry`='" + sample + "'";

            db.query(sql, function (err, data) {
               res.render('empliveclass.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.sempreport = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log(results[0].ministry);

            var sample = results[0].ministry;

            sql = "SELECT * FROM `training`.`employee`  WHERE (`ministry` = '" + sample + "');"
            db.query(sql, function (err, data) {
               res.render('sempreport.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });

};
//--------------------------------render user details after login--------------------------------
exports.emplivetest = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log(results[0].ministry);

            var sample = results[0].ministry;

            sql = "SELECT newtest.* FROM `training`.`newtest` INNER JOIN `training`.`setcategory` on `setcategory`.`category` like concat ('%',`newtest`.`category`,'%')where `setcategory`.`ministry`='" + sample + "'";

            db.query(sql, function (err, data) {
               res.render('emplivetest.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });

};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.tjoinclass = function (req, res) {
   message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   if (req.method == "POST") {
      var post = req.body;
      var tutorid = post.tutorid;
      var classid = post.classid;
      var category = post.category;
      var description = post.description;
      var startdate = post.startdate;
      var enddate = post.enddate;
      var starttime = post.starttime;
      var endtime = post.endtime;
      var classlink = post.classlink;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;
      var attenddate = today;
      var sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
      db.query(sql, function (err, results) {
         if (results.length) {
            req.session.firstname = results[0].firstname;
            req.session.lastname = results[0].lastname;
            var firstname = results[0].firstname;
            var lastname = results[0].lastname;
            fullname = firstname + ' ' + lastname;

            var sql = "insert INTO `training`.`completedclass` (`classid`,`category`,`description`,`startdate`,`enddate`,`starttime`,`endtime`,`tutorid`,`attenddate`) VALUES ('" + classid + "','" + category + "','" + description + "','" + startdate + "','" + enddate + "','" + starttime + "','" + endtime + "','" + tutorid + "','" + attenddate + "')";

            var query = db.query(sql, function (err, results) {
               message = classlink;
               res.render('tjoinclass.ejs', { message: message, message5: fullname });
            });
         }
      });
   } else {
      res.render('tjoinclass.ejs');
   }
};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.ejoinclass = function (req, res) {
   message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   if (req.method == "POST") {
      var post = req.body;
      var employeeid = userId;
      var tutorid = post.tutorid;
      var classid = post.classid;
      var category = post.category;
      var description = post.description;
      var startdate = post.startdate;
      var enddate = post.enddate;
      var starttime = post.starttime;
      var endtime = post.endtime;
      var classlink = post.classlink;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;
      var attenddate = today;
      //time

      dt = new Date();
      var timehr = dt.getHours();
      var timemin = dt.getMinutes();
      var todaytime = timehr + ':' + timemin;
      // if( windowSize > 500 && windowSize < 600 )
      console.log('Todaytime: ' + todaytime);
      sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
      db.query(sql, function (err, results) {
         if (results.length) {
            req.session.firstname = results[0].firstname;
            req.session.lastname = results[0].lastname;
            var firstname = results[0].firstname;
            var lastname = results[0].lastname;
            fullname = firstname + ' ' + lastname;
            //checking of Completed test
            sql = "SELECT * FROM `training`.`completedclass` WHERE `employeeid`='" + userId + "' and `attenddate`='" + attenddate + "'";
            db.query(sql, function (err, results) {
               if (results.length) {
                  req.session.employeeid = results[0].employeeid;
                  message = classlink;
                  res.render('ejoinclass.ejs', { message: message, message5: fullname });
                  console.log('More than one time attending the Class!');
               }
               else {
                  if (today >= startdate && today <= enddate) {
                     if (todaytime >= starttime && todaytime <= endtime) {
                        var sql = "insert INTO `training`.`completedclass` (`classid`,`category`,`description`,`startdate`,`enddate`,`starttime`,`endtime`,`tutorid`,`employeeid`,`attenddate`) VALUES ('" + classid + "','" + category + "','" + description + "','" + startdate + "','" + enddate + "','" + starttime + "','" + endtime + "','" + tutorid + "','" + employeeid + "','" + attenddate + "')";

                        var query = db.query(sql, function (err, results) {
                           message = classlink;
                           res.render('ejoinclass.ejs', { message: message, message5: fullname });
                        });
                     }
                     else {
                        message = 'On Date! Wait for the correct time.';
                        res.render('emp_board.ejs', { message: message, message5: fullname });
                     }
                  }
                  else {
                     message = 'Out of date! Please check the Session date.';
                     res.render('emp_board.ejs', { message: message, message5: fullname });
                  }
               }
            });
         }
      });
   } else {
      res.render('ejoinclass.ejs', { message: message, message5: fullname });
   }
};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.ejointest = function (req, res) {
   message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   if (req.method == "POST") {
      var post = req.body;
      var employeeid = userId;
      var tutorid = post.tutorid;
      var topic = post.topic;
      var testid = post.testid;
      var category = post.category;
      var description = post.description;
      var duedate = post.duedate;
      var duetime = post.duetime;
      var testlink = post.testlink;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;
      var attenddate = today;
      sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
      db.query(sql, function (err, results) {
         if (results.length) {
            req.session.firstname = results[0].firstname;
            req.session.lastname = results[0].lastname;
            var firstname = results[0].firstname;
            var lastname = results[0].lastname;
            fullname = firstname + ' ' + lastname;

            //expdate for test
            var c1someDate = new Date(duedate);
            c1someDate.setDate(c1someDate.getDate() + 10); //number  of days to add, e.x. 15 days
            var c1dateFormated = c1someDate.toISOString().substr(0, 10);
            var dueenddate = c1dateFormated;

            console.log('dueenddate: ' + dueenddate);


            //time

            dt = new Date();
            var timehr = dt.getHours();
            var timemin = dt.getMinutes();
            var todaytime = timehr + ':' + timemin;
            // if( windowSize > 500 && windowSize < 600 )
            console.log('Todaytime: ' + todaytime);
            //checking of Completed test
            sql = "SELECT * FROM `training`.`completedtest` WHERE `employeeid`='" + userId + "' and `attenddate`='" + attenddate + "'";
            db.query(sql, function (err, results) {
               if (results.length) {
                  req.session.employeeid = results[0].employeeid;
                  message = testlink;
                  res.render('ejointest.ejs', { message: message, message5: fullname });
                  console.log('More than one time attending the test!');
               }
               else {
                  if (today >= duedate && today <= dueenddate) {
                     if (todaytime >= duetime) {
                        //allow to attend
                        var sql = "insert INTO `training`.`completedtest` (`testid`,`topic`,`category`,`description`,`testdate`,`testtime`,`tutorid`,`employeeid`,`attenddate`) VALUES ('" + testid + "','" + topic + "','" + category + "','" + description + "','" + duedate + "','" + duetime + "','" + tutorid + "','" + employeeid + "','" + attenddate + "')";

                        var query = db.query(sql, function (err, results) {
                           message = testlink;
                           res.render('ejointest.ejs', { message: message, message5: fullname });
                        });

                     }
                     else {
                        message = "On date! Wait for the correct time.";
                        res.render('emp_board.ejs', { message: message, message5: fullname });

                     }
                  }
                  else {
                     message = "Out of date! Please check the session.";
                     res.render('emp_board.ejs', { message: message, message5: fullname });

                  }
               }
            });



         }
      });

   } else {
      res.render('ejointest.ejs', { message: message, message5: fullname });
   }
};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.setcategory1 = function (req, res) {
   message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   if (req.method == "POST") {
      var post = req.body;
      var ministry = post.ministry;
      var oldcategory = post.oldcategory;
      var newcategory = post.newcategory;
      var category = '';
      if (oldcategory.length == 0) {
         category = newcategory;
      }
      else {
         category = oldcategory + ',' + newcategory;
      }

      var doneby = userId;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;
      var donedate = today;
      sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
      db.query(sql, function (err, results) {
         if (results.length) {
            req.session.firstname = results[0].firstname;
            req.session.lastname = results[0].lastname;
            var firstname = results[0].firstname;
            var lastname = results[0].lastname;
            fullname = firstname + ' ' + lastname;
            sql = "SELECT * FROM `training`.`setcategory` WHERE `ministry`='" + ministry + "'";
            db.query(sql, function (err, results) {
               if (results.length) {
                  req.session.ministry = results[0].ministry;
                  var sql = "UPDATE `training`.`setcategory` SET `category` = '" + category + "' WHERE (`ministry` = '" + ministry + "');"
                  var query = db.query(sql, function (err, results) {
                     message = "You have updated category successfully!";
                     res.render('super_board.ejs', { message: message, message5: fullname });
                  });
               }
               else {
                  var sql = "insert INTO `training`.`setcategory` (`ministry`,`category`,`doneby`,`donedate`) VALUES ('" + ministry + "','" + category + "','" + doneby + "','" + donedate + "')";

                  var query = db.query(sql, function (err, results) {
                     message = "You have set category successfully!";
                     res.render('super_board.ejs', { message: message, message5: fullname });
                  });
               }


            });
         }
      });
   }
   else {
      res.render('super_board.ejs', { message: message, message5: fullname });
   }

};
//--------------------------------render user details after login--------------------------------
exports.tucompletetest = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`completedtest` WHERE `tutorid`='" + userId + "'";
         db.query(sql, function (err, data) {
            res.render('tucompletetest.ejs', { userData: data, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.atutorreport = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var sql = "SELECT * FROM `training`.`tutor`";
   db.query(sql, function (err, data) {
      res.render('atutorreport.ejs', { userData: data });
   });
};
//--------------------------------render user details after login--------------------------------
exports.asuperuserreport = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var sql = "SELECT * FROM `training`.`superuser`";
   db.query(sql, function (err, data) {
      res.render('asuperuserreport.ejs', { userData: data });
   });
};
//--------------------------------render user details after login--------------------------------
exports.acommissreport = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var sql = "SELECT * FROM `training`.`commissioner`";
   db.query(sql, function (err, data) {
      res.render('acommissreport.ejs', { userData: data });
   });
};
//--------------------------------render user details after login--------------------------------
exports.adeletecommiss = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var sql = "SELECT * FROM `training`.`commissioner`";
   db.query(sql, function (err, data) {
      res.render('adeletecommiss.ejs', { userData: data });
   });
};
//--------------------------------render user details after login--------------------------------
exports.adeletesuper = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var sql = "SELECT * FROM `training`.`superuser`";
   db.query(sql, function (err, data) {
      res.render('adeletesuper.ejs', { userData: data });
   });
};
//--------------------------------render user details after login--------------------------------
exports.adeletetutor = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var sql = "SELECT * FROM `training`.`tutor`";
   db.query(sql, function (err, data) {
      res.render('adeletetutor.ejs', { userData: data });
   });
};
//--------------------------------render user details after login--------------------------------
exports.aclassreport = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var sql = "SELECT * FROM `training`.`completedclass`";
   db.query(sql, function (err, data) {
      res.render('aclassreport.ejs', { userData: data });
   });
};
//--------------------------------render user details after login--------------------------------
exports.atestreport = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var sql = "SELECT * FROM `training`.`completedtest`";
   db.query(sql, function (err, data) {
      res.render('atestreport.ejs', { userData: data });
   });
};
//--------------------------------render user details after login--------------------------------
exports.icemployee = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            //  console.log('from commissioner:'+results[0].ministry);

            var sample = results[0].ministry;

            sql = "SELECT * FROM `training`.`employee`  WHERE (`ministry` = '" + sample + "');"
            db.query(sql, function (err, data) {
               res.render('icemployee.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.icsuperuser = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            // console.log('from commissioner:'+results[0].ministry);

            var sample = results[0].ministry;

            sql = "SELECT * FROM `training`.`employee`  WHERE (`ministry` = '" + sample + "');"
            db.query(sql, function (err, data) {
               res.render('icsuperuser.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.iccourse = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log(results[0].ministry);

            var sample = results[0].ministry;

            sql = "SELECT completedclass.* FROM `training`.`completedclass` INNER JOIN `training`.`setcategory` on `setcategory`.`category` like concat ('%',`completedclass`.`category`,'%')where `setcategory`.`ministry`='" + sample + "'";

            db.query(sql, function (err, data) {
               res.render('iccourse.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });

};
//--------------------------------render user details after login--------------------------------
exports.ictraining = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.ministry = results[0].ministry;
            console.log(results[0].ministry);

            var sample = results[0].ministry;

            sql = "SELECT completedtest.* FROM `training`.`completedtest` INNER JOIN `training`.`setcategory` on `setcategory`.`category` like concat ('%',`completedtest`.`category`,'%')where `setcategory`.`ministry`='" + sample + "'";

            db.query(sql, function (err, data) {
               res.render('ictraining.ejs', { userData: data, message5: fullname });
            });

         });
      }
   });

};


//--------------------------------render user details after login--------------------------------
exports.acertireport = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var sql = "SELECT * FROM `training`.`tutor`";
   db.query(sql, function (err, data) {
      res.render('acertireport.ejs', { userData: data });
   });
};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.tprofileupdate = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var post = req.body;
      var userid = post.userid;
      var firstname = post.firstname;
      var lastname = post.lastname;
      var middlename = post.middlename;
      var emailid = post.emailid;
      var phone = post.phone;
      var address = post.address;
      var category = post.category;
      var password = post.password;
      var npassword = post.npassword;
      console.log('password: ' + password);
      var epass = '';
      var newpassword = '';
      var mailhead = 'EMS-Profile Updated';
      var mailbody = "Account Updation details";

      //hashing 
      var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var crypted = c.update(password, 'utf8', 'hex') + c.final('hex');
      var epass = crypted.toUpperCase();
      console.log(crypted.toUpperCase());
      var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
      var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
      var dpass = decrypted;
      var loginlink = '#';

      //Mail 
      var fromaddress = 'sample@email.com';
      var toaddress = emailid;
      var mailsubject = mailhead;
      var mailmessage = mailbody;

      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
         host: "smtp.zoho.com",
         port: 465,

         auth: {
            user: 'sample@email.com',
            pass: 'Radservice123!'
         }
      });


      if (npassword.length == 0) {
         epass = password;
      }
      else {
         newpassword = npassword;
         console.log('New before En: ' + npassword);
         //hashing 
         var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
         var crypted = c.update(newpassword, 'utf8', 'hex') + c.final('hex');
         epass = crypted.toUpperCase();
         // console.log('Signup encrytion : ' + crypted.toUpperCase());
         var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
         var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
         //  console.log('Signup decrytion : ' + decrypted);

         var mailOptions = {
            from: fromaddress,
            to: toaddress,
            subject: mailsubject,
            text: mailmessage,
            html: '<h3>Dear ' + firstname + ',</h3><p>Your<b> EMS</b> Account has been updated. </p><p><b>User ID: </b>' + userid + '<h3> </h3><b>New Password: </b>' + decrypted + '<br/></p><h4>From now on, please log in to your account using <a href="' + loginlink + '">login link</a> </h4><p>If you have any questions, please visit http://34.245.185.190/</p><br/><p>Kind regards,</p><p><b>EMS</b></p><p>http://34.245.185.190/</p>'
         };
         transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
               console.log(error);
            } else {
               console.log('Email sent: ' + info.response);
            }
         });
      }

      var sql = "UPDATE `training`.`tutor` SET `middlename` = '" + middlename + "', `lastname` = '" + lastname + "', `emailid` = '" + emailid + "', `phone` = '" + phone + "', `password` = '" + epass + "', `address` = '" + address + "', `category` = '" + category + "' WHERE (`userid` = '" + userid + "');"


      var query = db.query(sql, function (err, results) {
         message = "Profile Updated Successfully!";
         res.render('tutor_board.ejs', { message: message });
      });

   } else {
      res.render('index.ejs');
   }
};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.aprofileupdate = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var post = req.body;
      var userId = post.userid;
      var emailid = post.emailid;
      var phone = post.phone;
      var password = post.password;
      var npassword = post.npassword;
      var newpassword = '';
      var epass = '';

      if (npassword.length == 0) {
         epass = password;
      }
      else {
         newpassword = npassword;
         console.log('New before En: ' + npassword);
         //hashing 
         var c = crypto.createCipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
         var crypted = c.update(newpassword, 'utf8', 'hex') + c.final('hex');
         epass = crypted.toUpperCase();
         // console.log('Signup encrytion : ' + crypted.toUpperCase());
         var dc = crypto.createDecipheriv("aes-128-ecb", convertCryptKey("myPassword"), "");
         var decrypted = dc.update(epass, 'hex', 'utf8') + dc.final('utf8');
         //  console.log('Signup decrytion : ' + decrypted);
      }


      var sql = "UPDATE `training`.`admin` SET `emailid` = '" + emailid + "', `phone` = '" + phone + "', `password` = '" + epass + "' WHERE (`userid` = '" + userId + "');"


      var query = db.query(sql, function (err, results) {
         message = "Profile Updated Successfully!";
         res.render('admin_board.ejs', { message: message });
      });

   } else {
      res.render('index.ejs');
   }
};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.editcategory1 = function (req, res) {
   message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }

   if (req.method == "POST") {
      var post = req.body;
      var currentcategory = post.currentcategory;
      var newcategory = post.newcategory;
      var setcategory = '';
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;

      if (newcategory.length == 0) {
         setcategory = currentcategory;
      }
      else {
         setcategory = currentcategory + ',' + newcategory;
         console.log('set' + setcategory);

      }
      var sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
      db.query(sql, function (err, results) {
         if (err) {
            message = 'No new Selections! Category remains same.';
            res.render('super_board.ejs', { message: message });
         }
         else {
            req.session.ministry = results[0].ministry;
            ministry = results[0].ministry;

            var sql = "UPDATE `training`.`setcategory` SET `category` = '" + setcategory + "', `doneby` = '" + userId + "', `donedate` = '" + today + "' WHERE (`ministry` = '" + ministry + "');"


            var query = db.query(sql, function (err, results) {
               message = "Category Updated Successfully!";
               res.render('super_board.ejs', { message: message });
            });
         }

      });

   } else {
      res.render('index.ejs');
   }

};
//--------------------------------render user details after login--------------------------------
exports.tusendmail = function (req, res) {
   if (req.method == "POST") {
      var post = req.body;
      var message = "";
      var mailhead = 'EMS-' + post.mailsubject;
      var mailbody = post.mailmessage;

      //Mail 
      var fromaddress = 'sample@email.com';
      var toaddress = post.toaddress;
      var mailsubject = mailhead;
      var mailmessage = mailbody;

      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
         host: "smtp.zoho.com",
         port: 465,
         auth: {
            user: 'sample@email.com',
            pass: 'Radservice123!'
         }
      });

      var mailOptions = {
         from: fromaddress,
         to: toaddress,
         subject: mailsubject,
         text: mailmessage,

         html: '<h3>Hello, </h3><p>Greetings from <b> EMS.</b> </p><p><b> ' + mailmessage + '</b><p>If you have any questions, please visit http://34.245.185.190/</p><br/><p>Kind regards,</p><p><b>EMS</b></p><p>http://34.245.185.190/</p>'
      };
      message = 'Your mail sent successfully!';
      transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
            console.log(error);
         } else {
            console.log('Email sent: ' + info.response);

         }
      });
      res.render('admin_board.ejs', { message: message });

   }
   else {
      res.render('admin_board.ejs', { message: message });
   }


};
//------------------------------------logout functionality----------------------------------------------
exports.logout = function (req, res) {
   req.session.destroy(function (err) {
      res.redirect("/");
   })
};
//--------------------------------Tutor Profile--------------------------------
exports.tuprofile = function (req, res) {
   var message = "";
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, result) {
            if (err) {
               message = "Please Login.";
               res.render('index.ejs', { message: message });
            }
            else {
               res.render('tuprofile.ejs', { data: result, message5: fullname });
            }

         });
      }
   });
};
//--------------------------------Tutor Profile--------------------------------
exports.empprofile = function (req, res) {
   var message = "";
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         console.log('full' + fullname);
         var sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, result) {
            if (err) {
               message = "Please Login.";
               res.render('index.ejs', { message: message });
            }
            else {
               res.render('empprofile.ejs', { data: result, message5: fullname });
            }

         });
      }
   });
};
//--------------------------------Tutor Profile--------------------------------
exports.suprofile = function (req, res) {
   var message = "";
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, result) {
            if (err) {
               message = "Please Login.";
               res.render('index.ejs', { message: message });
            }
            else {
               res.render('suprofile.ejs', { data: result, message5: fullname });
            }

         });
      }
   });
};
//--------------------------------Tutor Profile--------------------------------
exports.adprofile = function (req, res) {

   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }

   var sql = "SELECT * FROM `training`.`admin` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, result) {
      res.render('adminprofile.ejs', { data: result });
   });
};
//--------------------------------render user details after login--------------------------------
exports.icprofile = function (req, res) {

   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, result) {
            res.render('icprofile.ejs', { data: result, message5: fullname });
         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.editcategory = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var ministry = '';
   var sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      req.session.ministry = results[0].ministry;
      ministry = results[0].ministry;
      //checking ministry available
      if (ministry.length == 0) {
         message = "Invalid! Category is not set yet.";
         res.render('super_board.ejs', { message: message });

      }
      else {
         //getting ministry category
         sql = "SELECT * FROM `training`.`setcategory` WHERE `ministry`='" + ministry + "'";
         db.query(sql, function (err, results) {
            req.session.category = results[0].category;
            category = results[0].category;

            sql = "select distinct category from `training`.`courses` where `category` NOT LIKE '" + category + "'";
            db.query(sql, function (err, data, message1) {
               message = category;
               res.render('editcategory.ejs', { userData: data, message: message });
            });
         });
      }

   });
};

//--------------------------------Main signup page--------------------------------
exports.signuphome = function (req, res) {
   var message = "";
   var sql = "select distinct category  from `training`.`courses`";
   db.query(sql, function (err, data, message1) {
      res.render('signup.ejs', { message1: message, userData: data, message: message });
   });
};
//--------------------------------Main signup page--------------------------------
exports.forgotpwd = function (req, res) {
   var message = '';
   res.render('forgotpwd.ejs', { message: message });
};
//--------------------------------Main signup page--------------------------------
exports.empchat = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var firstname = '';
         var sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            req.session.firstname = results[0].firstname;
            firstname = results[0].firstname;
            req.session.lastname = results[0].lastname;
            lastname = results[0].lastname;
            console.log('name:' + firstname);
            console.log('name:' + lastname);
            message = firstname + ' ' + lastname;
            var sql = "SELECT distinct category FROM `training`.`courses`";
            db.query(sql, function (err, data) {

               res.render('empchat.ejs', { message: message, userData: data, message5: fullname });
            });
         });
      }
   });
};
//--------------------------------Main signup page-------------------------------- 
exports.icchat = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var firstname = '';

   var sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      req.session.firstname = results[0].firstname;
      firstname = results[0].firstname;
      req.session.lastname = results[0].lastname;
      lastname = results[0].lastname;
      console.log('name:' + firstname);
      console.log('name:' + lastname);
      message = firstname + ' ' + lastname;
      var sql = "SELECT distinct category FROM `training`.`courses`";
      db.query(sql, function (err, data) {

         res.render('icchat.ejs', { message: message, userData: data });
      });
   });
};
//--------------------------------Main signup page-------------------------------- 
exports.suchat = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var firstname = '';
   var sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      req.session.firstname = results[0].firstname;
      firstname = results[0].firstname;
      req.session.lastname = results[0].lastname;
      lastname = results[0].lastname;
      console.log('name:' + firstname);
      console.log('name:' + lastname);
      message = firstname + ' ' + lastname;
      var sql = "SELECT distinct category FROM `training`.`courses`";
      db.query(sql, function (err, data) {

         res.render('suchat.ejs', { message: message, userData: data });
      });
   });
};
//--------------------------------tutor calendar--------------------------------
exports.tucalendar = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         res.render('tucalendar.ejs', { message: message, message5: fullname });
      }
   });
};
//--------------------------------tutor calendar--------------------------------
exports.empcalendar = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         console.log('full' + fullname);
         res.render('empcalendar.ejs', { message: message, message5: fullname });
      }
   });
};
//--------------------------------tutor calendar--------------------------------
exports.sucalendar = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         res.render('sucalendar.ejs', { message: message, message5: fullname });
      }
   });
};
//--------------------------------tutor calendar--------------------------------
exports.icschedule = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         res.render('iccalendar.ejs', { message: message, message5: fullname });
      }
   });
};
//--------------------------------tutor calendar--------------------------------
exports.adcalendar = function (req, res) {
   var message = '';
   res.render('adcalendar.ejs', { message: message });
};
//--------------------------------tutor calendar--------------------------------
exports.acertireport = function (req, res) {
   var message = '';
   res.render('acertireport.ejs', { message: message });
};
//--------------------------------tutor calendar--------------------------------
exports.adminelement = function (req, res) {
   var message = '';
   res.render('adminadd.ejs', { message: message });
};
//--------------------------------tutor calendar--------------------------------
exports.superelement = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         res.render('superadd.ejs', { message: message, message5: fullname });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.dstprofile = function (req, res) {
   var message = "";
   var post = req.body;
   var userid = post.userid;

   var sql = "SELECT * FROM `training`.`commissioner` WHERE (`userid` ='" + userid + "')";
   db.query(sql, function (err, result) {
      if (err) {
         message = "Invalid UserId!";
         res.render('admin_board.ejs', { message: message });
      }
      else {
         res.render('dstprofile.ejs', { data: result });
      }

   });
};
//--------------------------------render user details after login--------------------------------
exports.dstprofilesup = function (req, res) {
   var message = "";
   var post = req.body;
   var userid = post.userid;

   var sql = "SELECT * FROM `training`.`superuser` WHERE (`userid` ='" + userid + "')";
   db.query(sql, function (err, result) {
      if (err) {
         message = "Invalid UserId!";
         res.render('admin_board.ejs', { message: message });
      }
      else {
         res.render('dstprofilesup.ejs', { data: result });
      }

   });
};
//--------------------------------render user details after login--------------------------------
exports.dstprofiletu = function (req, res) {
   var message = "";
   var post = req.body;
   var userid = post.userid;

   var sql = "SELECT * FROM `training`.`tutor` WHERE (`userid` ='" + userid + "')";
   db.query(sql, function (err, result) {
      if (err) {
         message = "Invalid UserId!";
         res.render('admin_board.ejs', { message: message });
      }
      else {
         res.render('dstprofiletu.ejs', { data: result });
      }

   });
};
//--------------------------------tutor calendar--------------------------------
exports.admindelete = function (req, res) {
   var message = '';
   res.render('admindelete.ejs', { message: message });
};
//--------------------------------tutor calendar--------------------------------
exports.superdelete = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            if (results.length) {
               req.session.ministry = results[0].ministry;
               console.log(results[0].ministry);
               var ministry = results[0].ministry;

               var sql = "SELECT * FROM `training`.`employee` WHERE `ministry`='" + ministry + "'";
               db.query(sql, function (err, data) {

                  res.render('chooseemp.ejs', { message: message, message5: fullname, userData: data });
               });
            }

         });
      }
   });
};
//--------------------------------render user details after login--------------------------------
exports.chooseemp = function (req, res) {
   var message = "";
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.ministry = results[0].ministry;
         console.log(results[0].ministry);
         var ministry = results[0].ministry;

         var sql = "SELECT * FROM `training`.`employee` WHERE `ministry`='" + ministry + "'";
         db.query(sql, function (err, data) {
            if (err) {
               message = "Oops! Accidentally out of data";
               res.render('admin_board.ejs', { message: message });
            }
            else {
               res.render('chooseemp.ejs', { userData: data });
            }

         });
      }

   });
};
//--------------------------------render user details after login--------------------------------
exports.dstprofile3 = function (req, res) {
   var message = "";
   var post = req.body;
   var empid = post.empid;
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;

         var sql = "SELECT * FROM `training`.`employee` WHERE (`userid` ='" + empid + "')";
         db.query(sql, function (err, result) {
            if (err) {
               message = "Invalid UserId!";
               res.render('super_board.ejs', { message: message });
            }
            else {
               res.render('dstprofile3.ejs', { data: result, message5: fullname });
            }

         });
      }
   });
};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.deleteemp = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var post = req.body;
      var empid = post.empid;
      var sql = "DELETE FROM `training`.`employee` WHERE (`userid`='" + empid + "')";
      var query = db.query(sql, function (err, result) {
         if (err) {
            message = "Error! ";
            res.render('super_board.ejs', { message: message });
         }
         else {
            message = "Success! Team member deleted.";
            res.render('super_board.ejs', { message: message });
         }

      });

   } else {
      res.render('super_board.ejs');
   }
};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.deletecom = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var post = req.body;
      var empid = post.empid;
      var sql = "DELETE FROM `training`.`commissioner` WHERE (`userid`='" + empid + "')";
      var query = db.query(sql, function (err, result) {
         if (err) {
            message = "Error! ";
            res.render('admin_board.ejs', { message: message });
         }
         else {
            message = "Success! Team member deleted.";
            res.render('admin_board.ejs', { message: message });
         }

      });

   } else {
      res.render('admin_board.ejs');
   }
};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.deletesup = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var post = req.body;
      var empid = post.empid;
      var sql = "DELETE FROM `training`.`superuser` WHERE (`userid`='" + empid + "')";
      var query = db.query(sql, function (err, result) {
         if (err) {
            message = "Error! ";
            res.render('admin_board.ejs', { message: message });
         }
         else {
            message = "Success! Team member deleted.";
            res.render('admin_board.ejs', { message: message });
         }

      });

   } else {
      res.render('admin_board.ejs');
   }
};
//---------------------------------------------Create Student page call------------------------------------------------------
exports.deletetu = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var post = req.body;
      var empid = post.empid;
      var sql = "DELETE FROM `training`.`tutor` WHERE (`userid`='" + empid + "')";
      var query = db.query(sql, function (err, result) {
         if (err) {
            message = "Error! ";
            res.render('admin_board.ejs', { message: message });
         }
         else {
            message = "Success! Team member deleted.";
            res.render('admin_board.ejs', { message: message });
         }

      });

   } else {
      res.render('admin_board.ejs');
   }
};
//--------------------------------tutor calendar--------------------------------
exports.addcommiss = function (req, res) {
   var message = '';
   var sql = "select distinct ministry  from `training`.`ministry`";
   db.query(sql, function (err, data, message1) {
      res.render('addcommiss.ejs', { message1: message, userData: data });
   });
};
//--------------------------------tutor calendar--------------------------------
exports.addemp = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "select ministry  from `training`.`superuser` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            if (results.length) {
               req.session.ministry = results[0].ministry;
               console.log('Department: ' + results[0].ministry);
               var sql = "select distinct ministry  from `training`.`ministry`";
               db.query(sql, function (err, data, message1) {
                  message = results[0].ministry;
                  res.render('addemp.ejs', { userData: data, message: message, message5: fullname });
               });
            }
         });
      }
   });
};
//--------------------------------tutor calendar--------------------------------
exports.addtutor = function (req, res) {
   var message = '';
   var sql = "select distinct category  from `training`.`courses`";
   db.query(sql, function (err, data, message1) {
      res.render('addtutor.ejs', { message1: message, userData: data });
   });
};
//--------------------------------tutor calendar--------------------------------
exports.addcertificate = function (req, res) {
   var message = '';
   var sql = "select distinct category  from `training`.`courses`";
   db.query(sql, function (err, data, message1) {
      res.render('addcertificate.ejs', { message1: message, userData: data });
   });
};
//--------------------------------tutor calendar--------------------------------
exports.setcategory = function (req, res) {
   var message = '';
   var cmessage = '';
   var ministry = '';
   var category = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "select ministry  from `training`.`superuser` WHERE `userid`='" + userId + "'";
         db.query(sql, function (err, results) {
            if (results.length) {
               req.session.ministry = results[0].ministry;
               ministry = results[0].ministry;
               //  console.log('ministry:'+ministry);

               sql = "select *  from `training`.`setcategory` WHERE `ministry`='" + ministry + "'";
               db.query(sql, function (err, results) {
                  if (results.length) {
                     req.session.category = results[0].category;
                     category = results[0].category;
                     //  console.log('catgory:'+category);

                     sql = "SELECT  distinct courses.category FROM `training`.`courses` INNER JOIN `training`.`setcategory` on `setcategory`.`category` NOT LIKE concat ('%',`courses`.`category`,'%')where `setcategory`.`ministry`='" + ministry + "'";

                     db.query(sql, function (err, data, message1) {
                        cmessage = category;
                        message = ministry;
                        res.render('setcategory.ejs', { userData: data, message: message, message5: fullname, message1: cmessage });
                     });
                  }
                  //for category
                  else {
                     // var sql = "SELECT  distinct courses.category FROM `training`.`courses` INNER JOIN `training`.`setcategory` on `tutor`.`category` LIKE CONCAT('%', `courses`.`category`, '%')  where `tutor`.`userid` = '" + userId + "'";

                     sql = "SELECT  distinct courses.category FROM `training`.`courses` INNER JOIN `training`.`setcategory` on `setcategory`.`category` NOT LIKE concat ('%',`courses`.`category`,'%')where `setcategory`.`ministry`='" + ministry + "'";

                     db.query(sql, function (err, data, message1) {

                        message = ministry;
                        res.render('setcategory.ejs', { userData: data, message: message, message5: fullname, message1: cmessage });
                     });
                  }
               });
            }
            //for ministry
            else {
               res.render('super_board.ejs', { message5: fullname, message: message });
            }
         });
      }
      //for firstname
      else {
         res.render('super_board.ejs', { message5: fullname, message: message });
      }
   });
};
//--------------------------------tutor calendar--------------------------------
exports.addsuper = function (req, res) {
   var message = '';
   var sql = "select distinct ministry  from `training`.`ministry`";
   db.query(sql, function (err, data, message1) {
      res.render('addsuper.ejs', { message1: message, userData: data });
   });
};
//--------------------------------tutor calendar--------------------------------
exports.adminreport = function (req, res) {
   var message = '';
   res.render('adminreport.ejs', { message: message });
};
//--------------------------------tutor calendar--------------------------------
exports.icmyteam = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`commissioner` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         res.render('icmyteam.ejs', { message: message, message5: fullname });
      }
   });
};
//--------------------------------tutor calendar--------------------------------
exports.otherclass = function (req, res) {
   if (req.method == "POST") {
      var post = req.body;
      var userId = req.session.userId;
      if (userId == null) {
         res.redirect("/login");
         return;
      }
      sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
      db.query(sql, function (err, results) {
         if (results.length) {
            req.session.firstname = results[0].firstname;
            req.session.lastname = results[0].lastname;
            var firstname = results[0].firstname;
            var lastname = results[0].lastname;
            fullname = firstname + ' ' + lastname;
            var course = post.course;

            var message = course;
            res.render('otherclass.ejs', { message: message, message5: fullname });
         }
      });
   }

};
//--------------------------------tutor calendar--------------------------------
exports.otherclassrequest = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var post = req.body;
      var course = post.course;
      var ministry = '';
      var userId = req.session.userId;
      if (userId == null) {
         res.redirect("/login");
         return;
      }
      sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
      db.query(sql, function (err, results) {
         if (results.length) {
            req.session.firstname = results[0].firstname;
            req.session.lastname = results[0].lastname;
            var firstname = results[0].firstname;
            var lastname = results[0].lastname;
            fullname = firstname + ' ' + lastname;
            var empid = userId;
            sql = "SELECT * FROM `training`.`employee` WHERE `userid`='" + userId + "'";
            db.query(sql, function (err, results) {
               if (results.length) {
                  req.session.ministry = results[0].ministry;
                  console.log(results[0].ministry);
                  ministry = results[0].ministry;

                  var today = new Date();
                  var dd = String(today.getDate()).padStart(2, '0');
                  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                  var yyyy = today.getFullYear();
                  today = yyyy + '-' + mm + '-' + dd;

                  var sql = "INSERT INTO `training`.`courserequest`(`empid`,`course`,`ministry`,`donedate`) VALUES ('" + empid + "','" + course + "','" + ministry + "','" + today + "')";

                  var query = db.query(sql, function (err, result) {

                     message = "Your request sent successfully!";
                     res.render('emp_board.ejs', { message: message, message5: fullname });
                  });
               }
            });
         }
      });
   } else {
      res.render('emp_board.ejs');
   }
};
//--------------------------------tutor calendar--------------------------------
exports.superreport = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         res.render('superreport.ejs', { message: message, message5: fullname });
      }
   });
};
//--------------------------------tutor calendar--------------------------------
exports.sclassreport = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         res.render('sclassreport.ejs', { message: message, message5: fullname });
      }
   });
};
//--------------------------------tutor calendar--------------------------------
exports.stestreport = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`superuser` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         res.render('stestreport.ejs', { message: message, message5: fullname });
      }
   });
};
//--------------------------------tutor calendar--------------------------------
exports.adminmail = function (req, res) {
   var message = '';
   res.render('adminmail.ejs', { message: message });
};
//--------------------------------tutor chat room rendering--------------------------------
exports.tuchat = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   var firstname = '';
   var sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      req.session.firstname = results[0].firstname;
      firstname = results[0].firstname;
      req.session.lastname = results[0].lastname;
      lastname = results[0].lastname;
      console.log('name:' + firstname);
      console.log('name:' + lastname);
      message = firstname + ' ' + lastname;
      var sql = "SELECT  distinct courses.category FROM `training`.`courses` INNER JOIN `training`.`tutor` on `tutor`.`category` LIKE CONCAT('%', `courses`.`category`, '%')  where `tutor`.`userid` = '" + userId + "'";
      db.query(sql, function (err, data) {

         res.render('tuchat.ejs', { message: message, userData: data });
      });
   });
};
//--------------------------------tutor class page--------------------------------
exports.tuclass = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         res.render('tuclass.ejs', { message: message, message5: fullname });
      }
   });
};
//--------------------------------Upload Render--------------------------------
exports.uploadnotes = function (req, res) {
   var message = "";
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         message = 'Your Notes uploaded successfully!';
         res.render('noteupload1.ejs', { message5: fullname });
      }
   });
};
//--------------------------------Upload Render--------------------------------
exports.uploadsession = function (req, res) {
   var message = "";
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT * FROM `training`.`newtest`";
         db.query(sql, function (err, result) {
            if (err) {
               res.render('teacher_board.ejs', { message: message });
            }
            else {
               res.render('fileupload.ejs', { data: result, message5: fullname });
            }

         });

      }

   });


};
//--------------------------------tutor class page--------------------------------
exports.uploadfile = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT  distinct courses.category FROM `training`.`courses` INNER JOIN `training`.`tutor` on `tutor`.`category` LIKE CONCAT('%', `courses`.`category`, '%')  where `tutor`.`userid` = '" + userId + "'";

         db.query(sql, function (err, data) {
            res.render('uploadfile.ejs', { userData: data, message5: fullname });
         });
      }
   });
};
//--------------------------------tutor class page--------------------------------
exports.uploadfile2 = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         var sql = "SELECT  distinct courses.category FROM `training`.`courses` INNER JOIN `training`.`tutor` on `tutor`.`category` LIKE CONCAT('%', `courses`.`category`, '%')  where `tutor`.`userid` = '" + userId + "'";

         db.query(sql, function (err, data) {
            res.render('uploadfile2.ejs', { userData: data, message5: fullname });
         });
      }
   });
};
//--------------------------------tutor test page--------------------------------
exports.tutest = function (req, res) {
   var message = '';
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }
   sql = "SELECT * FROM `training`.`tutor` WHERE `userid`='" + userId + "'";
   db.query(sql, function (err, results) {
      if (results.length) {
         req.session.firstname = results[0].firstname;
         req.session.lastname = results[0].lastname;
         var firstname = results[0].firstname;
         var lastname = results[0].lastname;
         fullname = firstname + ' ' + lastname;
         res.render('tutest.ejs', { message: message, message5: fullname });
      }
   });
};
//--------------------------------tutor mail--------------------------------
exports.tumail = function (req, res) {
   var message = '';
   res.render('tumail.ejs', { message: message });
};

//--------------------------------tutor request--------------------------------
exports.turequest = function (req, res) {
   var message = '';
   res.render('turequest.ejs', { message: message });
};
//--------------------------------tutor notice--------------------------------
exports.tunotice = function (req, res) {
   var message = '';
   res.render('tunotice.ejs', { message: message });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile = function (req, res) {
   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }

   var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
   db.query(sql, function (err, results) {
      res.render('edit_profile.ejs', { data: results });
   });
};
//--------------------------------Tutor choosing category--------------------------------
exports.tutorcategory = function (req, res) {
   var message = "Success!New Account created and sent to mail";
   var sql = "select * from `training`.`courses`";
   db.query(sql, function (err, data) {
      res.render('tutorcategory.ejs', { message: message });
   });

};
//---------------------------------------------signup page call------------------------------------------------------
exports.contactform = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var post = req.body;
      var user_name = post.user_name;
      var emailid = post.emailid;
      var subject = post.subject;
      var message = post.message;
      var mailhead = 'EMS-Contact details';
      var mailbody = 'Enquiry - ' + subject;

      //Mail 
      var fromaddress = 'sample@email.com';
      var toaddress = 'sample@email.com';
      var mailsubject = mailhead;
      var mailmessage = mailbody;

      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
         host: "smtp.zoho.com",
         port: 465,

         auth: {
            user: 'sample@email.com',
            pass: 'Radservice123!'
         }
      });

      var mailOptions = {
         from: fromaddress,
         to: toaddress,
         subject: mailsubject,
         text: mailmessage,
         html: '<h4>Dear Administrator, </h4><h4>Subject:' + subject + '</h4><p>Message: <br/>' + message + '</p><br/><p>Kind regards,</p><p><b>' + user_name + ',</b></p><p>' + emailid + ''
      };

      var sql = "select * from `training`.`courses`";
      query = db.query(sql, function (err, data) {
         transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
               console.log(error);
            } else {
               console.log('Email sent: ' + info.response);
            }
         });

         message = "Thank you for contacting us! Our representatives will get back to you shortly as soon as possible.";
         res.render('index.ejs', { message: message });

      });


   } else {
      res.render('index.ejs');
   }
};