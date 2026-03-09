# B13-Assignment-05
<h2> Questions and Answers </h2> <br>
1. What is the difference between var, let, and const?<br>
Ans: Difference beteen var, let, and const: <br>
i. var: var is the old way of declaring variables <br>
<ul>
    <li>It is function scoped, not block scoped.</li>
    <li>We can redeclare and update it.</li>
</ul> <br>

ii. let: let was introduced in ES6 and is more modern. <br>
<ul>
    <li>It is block scoped</li>
    <li>We can update it</li>
    <li>But we cannot redeclare it in the same scope.</li>
</ul> <br>
iii. const: const is used when the value should not change <br>
<ul>
    <li>It is also block scoped.</li>
    <li>We cannot update or redeclare it.</li>
    <li>Must be initialized when declared.</li>
</ul>

<br> <br>

2. What is the spread operator (...)? <br>
Ans: The spread operator (...) in JavaScript is used to expand or unpack elements from an array or object. <br>
In simple words, it takes items from a list and spreads them out. <br>
Example: <br>
const numbers = [1, 2, 3]; <br>
const newNumbers = [...numbers, 4, 5]; <br>

console.log(newNumbers); <br>
Output: [1, 2, 3, 4, 5]

<br> <br>


3.  What is the difference between map(), filter(), and forEach()? <br>
Ans: map(), filter(), and forEach() are array methods in JavaScript used to work with array elements. The main difference is what they return and why we use them. <br>

i. map(): map() is used when you want to change every element of an array and create a new array. <br>
<ul>
    <li>It returns a new array</li>
    <li>The length stays the same</li>
</ul> <br>

ii. filter(): filter() is used when you want to select some elements based on a condition. <br>

<ul>
    <li>It returns a new array</li>
    <li>The length may be smaller</li>
</ul>
<br>

iii. forEach(): forEach() is used to loop through an array and perform an action. <br>
<ul>
    <li>It does not return a new array</li>
    <li>Mostly used for side effects (printing, updating UI, etc.)</li>
</ul>

<br><br>

4.  What is an arrow function? <br>
Ans: An arrow function is a short and modern way to write a function in JavaScript. It was introduced in ES6 to make code shorter and cleaner. <br>

Normal Function: <br>
function add(a, b) { <br>
  return a + b; <br>
} <br>

Arrow Function: <br>
const add = (a, b) => a + b;
<br><br>

5. What are template literals? <br>
Ans: Template literals are a modern way to write strings in JavaScript. They make it easier to add variables and write multi-line text. <br>
Instead of using single quotes ' ' or double quotes " ", template literals use backticks ` `.
<br>
Example: <br>
const name = "Shimu"; <br>
const message = `Hello ${name}`; <br>

console.log(message); <br>
Output: Hello Shimu
