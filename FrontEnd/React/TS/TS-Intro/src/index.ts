// 1. Boolean

let isCompleted: boolean = true;

// 2. Number 

let age: number = 30;
let price: number = 9.99;

// 3. String 

let nam: string = "John Doe";
let message: string = `Hello, ${nam}!`;

// 4. Array 

let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: Array<string> = ["apple", "banana", "orange"];

// 5. Object

let person: { name: string, age: number } = { name: "Alice", age: 25 };

// 6. Tuple 

let coordinate: [number, number] = [10, 20];

// 7. Enum

enum Color {
    Red,
    Green,
    Blue
  }
  
  let selectedColor: Color = Color.Red;

  // 8. Void

  function logMessage(message: string): void {
    console.log(message);
  }

  // 9. Any

  let dynamicValue: any = "I can be any type!";
dynamicValue = 42;
dynamicValue = { key: "value" };


// 10. Null and Undefined:

let nullValue: null = null;
let undefinedValue: undefined = undefined;

// 11. Union Type

let numberOrString: number | string = 42;
numberOrString = "Hello";

// 12. Type Aliases:

type Point = { x: number; y: number };

let point: Point = { x: 10, y: 20 };

// 13. Function Types:

type MathOperation = (x: number, y: number) => number;

function add(x: number, y: number): number {
  return x + y;
}

let operation: MathOperation = add;

// 14. Intersection

type Person = {
    name: string;
    age: number;
  };
  
  type Employee = {
    empID: number;
    department: string;
  };
  
  type EmployeeWithPersonInfo = Person & Employee;
  
  const employeeInfo: EmployeeWithPersonInfo = {
    name: "John Doe",
    age: 30,
    empID: 12345,
    department: "HR"
  };

  
  // Interfaces

  interface Person1 {
    name: string;
    age: number;
    sayHello: () => void;
  }
  

  const person2: Person1 = {
    name: "John Doe",
    age: 30,
    sayHello: () => {
      console.log("Hello!");
    }
  };

  interface Employee1 extends Person1 {
    empID: number;
    department: string;
  }
  
  // Generic functions 

//   function functionName<TypeParameter>(arg: TypeParameter): ReturnType {
//     // Function implementation
//   }
  
// EX-1

function identity<T>(arg: T): T {
    return arg;
  }
  
  let result1 = identity<number>(42); // result1 is of type 'number'
  let result2 = identity<string>("Hello"); // result2 is of type 'string'

//   EX-2

function getArrayLength<T>(arr: T[]): number {
    return arr.length;
  }
  
  let number = [1, 2, 3, 4, 5];
  let names = ["Alice", "Bob", "Charlie"];
  
  let length1 = getArrayLength(numbers); // length1 is of type 'number'
  let length2 = getArrayLength<string>(names); // length2 is of type 'number'
  

//   EX-3

function createPair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
  }
  
  let pair1 = createPair<number, string>(42, "Hello"); // pair1 is of type '[number, string]'
  let pair2 = createPair("Alice", true); // pair2 is of type '[string, boolean]'
  