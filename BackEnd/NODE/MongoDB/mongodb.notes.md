# Show list of databases

`show databases` OR `show dbs`

# Show Current Database

`db`

# Show list of collections

`show collections`

## Create or switch between databases

`use database_name`

## Create collection

`db.createCollection('collection_name')`

## Show Collections

`show collections`

## insert document

you can define variable (js syntax) and pass it as excepted parameter.

```javascript
var user = {
  name: "Mohammad MohammadAlian",
  ip: "127.0.0.1",
  lastLoginTime: 1575704736
};

db.insertOne(user);
```

OR

`db.collection.insertOne({name: 'Mohammad MohammadAlian', ip: '127.0.0.1', lastLoginTime: 1575704736})`;

 to insert many object in one query you can use insertMany function

```javascript
var users = [
  {
    name: "Mohammad MohammadAlian",
    ip: "127.0.0.1",
    lastLoginTime: 1575704736
  },
  { name: "John Doe", ip: "10.10.10.10", lastLoginTime: 1575704965 }
];

db.insertMany(users);
```

OR

`db.collection.insertMany([{name: 'Mohammad MohammadAlian', ip: '127.0.0.1', lastLoginTime: 1575704736}, {name: 'John Doe', ip: '10.10.10.10', lastLoginTime: 1575704965}])`;

# Querying

## find

retrieve all of documents

find method - db.collection.find(filterObj,projectionObj)

`db.collection.find()` OR `db.collection.find({})`

query by value of specific field

`db.collection.find({name: 'Mohammad MohammadAlian'})`

querying throw nested field

```javascript
var user = { name: "John", job: { title: "programmer", salary: 125000 } };
```

if we want to find above user by job title we could use following command

`db.collection.find({'job.title': 'programmer'})`

while

`db.collection.find({'job': '{ title: "programmer"}'})`

will look for job object which match with query obj as it is and doesn't have any extra keys this query will not return above user doc. even order of the keys matters `{ title: "programmer", salary: 125000 }` is not same as `{ salary: 125000,title: "programmer" }` when querying database.

querying throw Array

```javascript
var user = { name: "John", degrees:["10th","12th","ba"] };
```
this will match the array as it is. the doc with array of same length,same values same order will be returned

`db.collection.find({degrees:["10th","12th","ba"]})`

this will only return doc with degrees array having one value same as query array

`db.collection.find({degrees:["10th"]})`

this will will return all doc. where degrees array contain given query value as one of its value

`db.collection.find({degrees:"10th"})`

this will return the docs which contains all query values as element of degree array without considering order

`db.collection.find({degrees:{$all:["ba","10th"]}})`

this will return the docs which contains any query values as element of degree array without considering order

`db.collection.find({degrees:{$in:["ma","10th"]}})`

query array of object

```javascript
var user = { users:[{name:"sheelu",degree:"ba"},{name:"anmol",degree:"poly"}] };
```
 matching as it is

 `db.collection.find({users:[{name:"sheelu",degree:"ba"}]})`

 comparing the query object if it has query object as one of its element in users

  `db.collection.find({users:{name:"sheelu",degree:"ba"}})`

checking nested key in array of object

 `db.collection.find({"users.name":"sheelu"})`

using regex

`db.collection.find({name: /M.*/})`

## $elemMatch
The 
$elemMatch
 operator matches documents that contain an array field with at least one element that matches all the specified query criteria.

{ <field>: { $elemMatch: { <query1>, <query2>, ... } } }

 ```Data
 { _id: 1, results: [ 82, 85, 88 ] }
 { _id: 2, results: [ 75, 88, 89 ] }```

 `db.scores.find(
   { results: { $elemMatch: { $gte: 80, $lt: 85 } } }
  )`

  ```result
  { "_id" : 1, "results" : [ 82, 85, 88 ] }
  ```

  `db.survey.insertMany( [
    { "_id": 1, "results": [ { "product": "abc", "score": 10 },
                              { "product": "xyz", "score": 5 } ] },
    { "_id": 2, "results": [ { "product": "abc", "score": 8 },
                              { "product": "xyz", "score": 7 } ] },
    { "_id": 3, "results": [ { "product": "abc", "score": 7 },
                              { "product": "xyz", "score": 8 } ] },
    { "_id": 4, "results": [ { "product": "abc", "score": 7 },
                              { "product": "def", "score": 8 } ] }
  ] )`

  `db.survey.find(
    { results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }
  )`

  `{ "_id" : 3, "results" : [ { "product" : "abc", "score" : 7 },
                            { "product" : "xyz", "score" : 8 } ] }`

## pretty

make results pretty 😁

`db.collection.find().pretty()`

## limit

`db.collection.find().limit(10)`

NOTE: 10 is count of documents which will be retrieved

## skip

skip result

`db.collection.find().skip(2)`

NOTE: 2 is count of documents which will be skipped

## sort

show sorted result

`db.collection.find().sort({fieldName: 1})`

NOTE: 1 is ascending and -1 is descending

## count

retrieve count of results

`db.collection.find().count()`

## distinct

retrieve distinct value

`db.collection.distinct('name')`

NOTE: name is a field

for nested field we can use following command

`db.collection.distinct('comments.message')`

## Operators

### less than

`db.collection.find({field: {$lt: 200}})`

### less than or equal

`db.collection.find({field: {$lte: 200}})`

### greater than

`db.collection.find({field: {$gt: 200}})`

### greater than or equal

`db.collection.find({field: {$gte: 200}})`

### not equal

`db.collection.find({field: {$ne: 'string is also accepted in some operators'}})`

### in

`db.collection.find({field: {$in: [1999,2010,2019,2022]}})`

### all

`db.collection.find({field: {$all: [1999,2010]}})`

### slice

`db.collection.find({arrayField: {$slice: 3}})`

### or

`db.collection.find({$or: [{filed: 'value'}, {field: 'value'}]})`

### mod

modulo operator
`db.collection.find({field: {$mod: [100,0]}})`

### size

`db.collection.find({arrayFiled: {$size: 2}})`

### exists

`db.collection.find({field: {$exists: true}})`

### type

[type numbers](https://docs.mongodb.com/manual/reference/bson-types/)
`db.collection.find({field: {$type: 2}})`

## Update document

general form

`db.collection.update({query}, {update}, {flags})`

example

`db.collection.update({field: 'value'}, {$set: {otherField: 'new Value'}}, {upsert: true})`

### inc

increment value

`db.collection.updateOne({field: 'value'}, {$inc: {number: 6}})`

Increases six units of number

### unset

`db.collection.updateOne({field: 'value'}, {$unset: {anotherField: 1}})`

this will be remove anotherField where field equal value

### push

push value to array

`db.collection.updateOne({_id: 1}, {$push: {numbers: 6}})`

push six into numbers where id is 1

### each

`db.collection.updateOne({_id: 1}, {$push:{numbersArray: {$each: ['R','T', 'H']}}})`

add each value to numbersArray where id is 1

### addToSet

push to array if not exists

`db.collection.updateOne({_id:1}, {$addToSet: {numbers: 565}})`

### pop

`db.collection.updateOne({_id: 1}, {$pop: {numbers: -1}})`
1: from end
-1: from beginning

### pull

`db.collection.updateOne({_id: 1}, {$pull: {numbers: 5}})`

remove all 5 in numbers Array where id is 1

### pullAll

`db.collection.updateOne({_id: 1}, {$pullAll: {numbers: [4,5,6]}})`

## rename collection

`db.collection.renameCollection('newCollectionName')`

## delete document

`db.collection.deleteOne({_id: 1})`

## delete collection

`db.collection.drop()`

## delete database

`db.dropDatabase()`

## Create Index

`db.collection.createIndex({field: 1})`
NOTE: 1 is ascending and -1 is descending

create text index
`db.collection.createIndex({field: 'text'})`

## Drop Index

`db.collection.dropIndex({field: 1})`

## Aggregate

### $elemMatch for projection 

`db.players.find( {}, { games: { $elemMatch: { score: { $gt: 5 } } }, joined: 1, lastLogin: 1 } )`
 project only array index element whose value qualifies all elemMath conditions

`db.collection.aggregate({ $group: {_id: '$color'} })`

`db.collection.aggregate({ $group: {_id: '$color', count: {$sum: 1}} })`

`db.aggregation.aggregate({ $group: {_id: "$color"} });`

`db.aggregation.aggregate([ {$match: {num: {$gt: 500}}}, {$group: {_id: '$color', count: {$sum: 1}}}, {$limit: 5} ]);`

`db.aggregation.aggregate([ {$match: {num: {$gt: 500}}}, {$sort: {color: 1}} ]);`

`db.aggregation.aggregate({ $unwind: "$vegetables" });`

`db.aggregation.aggregate([ {$match: {num: {$gt: 500}}}, {$project: {_id:0, fruits: 0}}, {$skip: 200}, {$out: "newCollectionGeneratedByAggregationFramework"} ]);`

`db.prima.aggregate({ \$lookup: { from: 'secunda', localField: 'number', foreignField: 'number', as: 'doc' } });`
