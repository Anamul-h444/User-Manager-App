# User Registration, Authentication & Authoriszation

# User Registration

- Create Model.
- Create Controller by model.
- Create api by controller.
- Create user instence from UserModel and receive data from req body.
- Install bcrypt -> npm i bcrypt
- পাসওয়ার্ডের সাথে ১০টি অতিরিক্ত শব্দ যোগ করব তাই genSalt(10) দেওয়া হল। 
- ইউজার কর্তৃক ইনপুটকৃত পাসওয়ার্ডকে সল্টিং করা হল।
- এখন user এর মধ্যে সমস্ত ডাটা সেভ করে দেওয়া হল। 

## With salting async
```js
const bcrypt = require("bcrypt");
exports.regestrationUser = async (req, res) => {
  let user = new UserModel({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    password: req.body.password,
    photo: "",
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  try {
    let data = await user.save();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
};
```
## Without salting sync
```js
exports.regestrationUser = (req, res) => {
  const reqBody = req.body;
  UserModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};
```
# Authentication
# User Login
- রিকোয়েস্ট বডি থেকে ইমেইল রিসিভ করে user কে ফাইন্ড করা হলো। এই user এর মধ্যে user এর সমস্ত ডাটা রয়েছে। 
- রিকোয়েস্ট বডি থেকে পাসওয়ার্ড রিসিভ করে bcrypt এর মাধ্যমে user পাসওয়ার্ডের সাথে ম্যাচিং করা হয়েছে। যদি পাসওয়ার্ড ম্যাচিং না হয় তাহল Invalid password দেখাবে। 
- যদি পাসওয়ার্ড ম্যাচিং হয়-তাহলে টোকেন ইস্যু করব যার মধ্যে paylod এবং secretKey পাঠাব। 
- paylod এর মধ্যে Expire date এবং ইউজারের data থাকবে। 
- সর্বশেষে রেসপন্স প্রদান করব। 
```js
exports.loginUser = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email ");

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send("Invalid password");

    let paylod = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
      user: user,
    };
    let token = jwt.sign(paylod, "secretKey123");
    res.status(200).json({ user: user, token: token });
  } catch (err) {
    res.status(401).send("Please insert correct userName or Password!");
  }
};
```
# Authorization
- Authorization এর অর্থ হল লগইন এর টোকেন থেকে ইউনিক ইমেইল কে নিয়ে ম্যাচিং করে করে তাহাকে সফটওয়্যারের বিভিন্ন অপশনে কাজ করার এ্যাকসেস দেওয়া। যেকোন প্রপার্টিকে ইউনিক করা যেতে পারে। 
- লগইন এর সময় ইস্যুকৃত টোকেন ফ্রন্ট  ইন্ডে হেডারে সেট করা হয়। তাই টোকেন ভেরিফাই করার জন্য হেডার থেকে টোকেন রিসিভ করা হলো।
-  jwt.verify এর মধ্যে token, secretKey123 (যাহা লগইন এর সময় টোকেন ইস্যুর মধ্যে দেওয়া হয়েছিল) পাস করতে হবে। যদি টোকেন এর secretKey123 এবং প্রদত্ত secretKey123 মিলে যায় তাহলে ইউজার অথরাইজ এবং decoded এর মধ্যে টোকোন এর পেলোড থেকে ইউজার এর ডাটা চলে আসবে।
- যদি ইরর আসে ইউজার আনঅথরাইজড।
- যদি ইরর না আসে তাহলে decoded থেকে email কে headers এর মধ্যে পাঠিয়ে দেওয়া হয় যাতে তার মাধ্যমে যেকোন অপশন ইউজার এ্যাকসেস করতে পারে।
-  decoded থেকে role কে headers এর মধ্যে পাঠিয়ে দেওয়া হয় যাতে শুধুমাত্র Admin কে কোন কোন অপশন এর এ্যাকসেস দেওয়া যায়।  
```js
VerifyMiddleware.js:
exports.TokenVerify = (req, res, next) => {
    var token = req.headers["token"];
    jwt.verify(token, "secretKey123", (err, decoded) => {
        console.log("From Verify Middleware", decoded)
        if (err) {
            res.status(401).send(err)
        } else {
            let email = decoded.user['email'];
            req.headers.email = email;
            let role = decoded.user['role']
            req.headers.role = role;
            next();

        }
    })

}
```
# Adimin Authorization
- Authorization এর সময় হেডারে যে role পাঠানো হয়েছে তাহাকে রিসিভ করা হয়েছে।
- যদি role admin না হয় তাহলে Forbidden দেখাবে আর যদি admin হয় তাহলে এ্যাকসেস দিবে।
```js
exports.AdminVerify = (req, res, next) => {
  var role = req.headers["role"];
  if(role !=="admin"){
    res.status(403).send("Forbidden")
  }
  next();
}
```
# Find All Profile (Only Access Admin)
- TokenVerify এর মাধ্যমে role পাবে AdminVerify.
- AdminVerify যদি টোকেনের রোল এবং ডাটাবেজের রোল ম্যাচিং পায় তথা admin পায় তাহলে সমস্ত ডাটা প্রদর্শিত হবে।

```js
APi: router.get('/selectProfile', [TokenVerify, AdminVerify], selectProfile)
exports.selectProfile = (req, res) => {
  UserModel.find({}, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};
```