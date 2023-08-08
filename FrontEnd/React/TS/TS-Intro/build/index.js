"use strict";
// 1. Boolean
var isCompleted = true;
// 2. Number 
var age = 30;
var price = 9.99;
// 3. String 
var nam = "John Doe";
var message = "Hello, ".concat(nam, "!");
// 4. Array 
var numbers = [1, 2, 3, 4, 5];
var fruits = ["apple", "banana", "orange"];
// 5. Object
var person = { name: "Alice", age: 25 };
// 6. Tuple 
var coordinate = [10, 20];
// 7. Enum
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var selectedColor = Color.Red;
// 8. Void
function logMessage(message) {
    console.log(message);
}
// 9. Any
var dynamicValue = "I can be any type!";
dynamicValue = 42;
dynamicValue = { key: "value" };
// 10. Null and Undefined:
var nullValue = null;
var undefinedValue = undefined;
// 11. Union Type
var numberOrString = 42;
numberOrString = "Hello";
var point = { x: 10, y: 20 };
function add(x, y) {
    return x + y;
}
var operation = add;
var employeeInfo = {
    name: "John Doe",
    age: 30,
    empID: 12345,
    department: "HR"
};
var person2 = {
    name: "John Doe",
    age: 30,
    sayHello: function () {
        console.log("Hello!");
    }
};
// Generic functions 
//   function functionName<TypeParameter>(arg: TypeParameter): ReturnType {
//     // Function implementation
//   }
// EX-1
function identity(arg) {
    return arg;
}
var result1 = identity(42); // result1 is of type 'number'
var result2 = identity("Hello"); // result2 is of type 'string'
//   EX-2
function getArrayLength(arr) {
    return arr.length;
}
var number = [1, 2, 3, 4, 5];
var names = ["Alice", "Bob", "Charlie"];
var length1 = getArrayLength(numbers); // length1 is of type 'number'
var length2 = getArrayLength(names); // length2 is of type 'number'
//   EX-3
function createPair(first, second) {
    return [first, second];
}
var pair1 = createPair(42, "Hello"); // pair1 is of type '[number, string]'
var pair2 = createPair("Alice", true); // pair2 is of type '[string, boolean]'
//# sourceMappingURL=index.js.map