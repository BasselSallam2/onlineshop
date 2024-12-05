const User = require('../models/user');
const bcryptjs = require('bcryptjs') ;

const nodemailer = require('nodemailer') ;
const sendgrid = require('nodemailer-sendgrid-transport') ;

const transporter = nodemailer.createTransport(sendgrid({
  auth : {
    api_key: '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'
  }
}));

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    loginError : req.flash('LoginErorr')
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false ,
    SignUpErorr : req.flash('SignupError')
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email ;
  const password = req.body.password ;
  User.findOne({email : email})
  .then((user) => {
    if(!user) {
      req.flash('LoginErorr' , 'invalid Email or Password') ;
      return res.redirect('/login') ;
    }
    bcryptjs.compare(password , user.password)
    .then((isMatch) => {
      if(!isMatch) {
        req.flash('LoginErorr' , 'invalid Email or Password') ;
        return  res.redirect('/login') ;
      }
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
        console.log(err);
        return res.redirect('/');
      });


    })
    .catch(() => res.redirect('/login'))
  })
  .catch(() => res.redirect('/login'))
    .then(user => {})
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        req.flash('SignupError' , 'This email is already used') ;
        return res.redirect('/signup');
      }
        return bcryptjs.hash(password , 12)
        .then((hashedpass) => {
          const newuser = new User({
          email: email,
          password: hashedpass,
          cart: { items: [] }
        });
        return newuser.save();
      })
        .then(() => {
          res.redirect('/login');
          return transporter.sendMail({
            to : email ,
            from : 'bassela.sallam@gmail.com' ,
            subject : 'Hi yasser' , 
            html : '<h1>Its from nodejs</h1>'
          }) 
      }) 
    })
    
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
