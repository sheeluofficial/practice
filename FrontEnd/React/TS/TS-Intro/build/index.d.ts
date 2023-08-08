declare let isCompleted: boolean;
declare let age: number;
declare let price: number;
declare let nam: string;
declare let message: string;
declare let numbers: number[];
declare let fruits: Array<string>;
declare let person: {
    name: string;
    age: number;
};
declare let coordinate: [number, number];
declare enum Color {
    Red = 0,
    Green = 1,
    Blue = 2
}
declare let selectedColor: Color;
declare function logMessage(message: string): void;
declare let dynamicValue: any;
declare let nullValue: null;
declare let undefinedValue: undefined;
declare let numberOrString: number | string;
type Point = {
    x: number;
    y: number;
};
declare let point: Point;
type MathOperation = (x: number, y: number) => number;
declare function add(x: number, y: number): number;
declare let operation: MathOperation;
type Person = {
    name: string;
    age: number;
};
type Employee = {
    empID: number;
    department: string;
};
type EmployeeWithPersonInfo = Person & Employee;
declare const employeeInfo: EmployeeWithPersonInfo;
interface Person1 {
    name: string;
    age: number;
    sayHello: () => void;
}
declare const person2: Person1;
interface Employee1 extends Person1 {
    empID: number;
    department: string;
}
declare function identity<T>(arg: T): T;
declare let result1: number;
declare let result2: string;
declare function getArrayLength<T>(arr: T[]): number;
declare let number: number[];
declare let names: string[];
declare let length1: number;
declare let length2: number;
declare function createPair<T, U>(first: T, second: U): [T, U];
declare let pair1: [number, string];
declare let pair2: [string, boolean];
