end point and input format

post add user
localhost:3000/users/add
input format
{
  "Id" : "user004"
  "first_name": "samuel",
  "last_name": "samuel",
  "email": "samuel@gmail.com",
  "phone": "08033333333"
}

delete user 
localhost:3000/users/:userId

get single user
localhost:3000/users/:userId

put (Update)
localhost:3000/users/:userId
input format
{
  "first_name": "samuel",
  "last_name": "samuel",
  "email": "samuel@gmail.com",
  "phone": "08033333333"
}