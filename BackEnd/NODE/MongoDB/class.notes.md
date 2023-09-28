relationships
using populate
using aggregations
using normal query

relation using lookup
{
   $lookup:
     {
       from: <collection to join>,
       localField: <field from the input documents>,
       foreignField: <field from the documents of the "from" collection>,
       as: <output array field>
     }
}

independent collection - dependent collection

*user collection* - independent
_id : ObjectID("64asdfasdf")
name,
email,
age,
password,
address etc


*blog collection* - dependent
title,
content,
date,
category,
userID : "64asdfadf"





users blogs


blogs collection is having *email* as *authoremail* from users collection

/user be should be able to read/see only his/her blogs;

localhost:8080/blogs
1. authentication - jwt -> logged in
2.  

    //JWT -> userID -> _id

 app.get("/blogs", async (req, res) => {
    const userID = 'we got from token somewhere'
    const useremail = await UserModel.find({_id : userID})
    const blogs = BlogModel.find({authoremail : useremail})
    res.send(blogs)
 })

//10 differnt -> 10 queries to get all the relevant data

aggregate - $lookup

db.users.aggregate([{$lookup : {from : "blogs",localField:"email",foreignField:"authoremail", as : "mereblogs"}}]).pretty()

blogs collection and comments collection
db.blogs.aggregate()


$project - include, exclude, change the key names

$count - counts the number of documents so far, $count : "total_blogs"

$set - sets new field, based on whatever you want;

$out - creates a new collection;
        overwrites if it's a existing collection;

$out : "newcollectionname" -> same db;


//common sense while designing the aggregation pipeline

$match,
$group
$limit,
$sort,
$lookup
$set
$out
$counts

*users*
name,
age,
city,
state,
phone_number


all users, increasing order of age, city : Mumbai
db.users.aggregate([{$sort : {age : 1}},{$match : {city : "Mumbai"}}])

1. will this above query work? - Yes
2. Is it the best way to write it? - No

db.users.aggregate([{$match : {city : "Mumbai"}}, {$sort : {age : 1}}, {$out : "mumbaiusers"}])


