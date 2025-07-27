# Advanced Matrix Calculator

A powerful, responsive, and intuitive matrix calculator built with vanilla HTML, CSS, and JavaScript. This project provides a comprehensive tool for performing a wide range of matrix operations, from basic arithmetic to advanced linear algebra functions. It features an expression-based input system, matrix storage, and a fully responsive design that works on both desktop and mobile devices.

---

## ✨ Features

* **Expression-Based Input**: Type or click to build complex matrix expressions like `inv(A) * B + C * 2`.
* **Wide Range of Operations**: Supports over 20 distinct operations, including basic arithmetic, advanced functions (determinant, inverse, RREF), and element-wise calculations.
* **Matrix Storage**: Save matrices with custom names (`A`, `B`, `MyMatrix`, etc.) and recall them for use in future calculations.
* **Interactive UI**: A clean, two-column layout that logically separates input, output, and storage, with a dedicated calculator keypad.
* **Fully Responsive**: The layout fluidly adapts to any screen size, from large monitors to mobile phones.
* **Zero Dependencies**: Built with pure HTML, CSS, and JavaScript—no external libraries or frameworks needed.

---

## 🚀 Live Demo

You can try the live version of the calculator here:  
🔗 **[https://karthikeyan-a-s.github.io/MATCALC/](https://karthikeyan-a-s.github.io/MATCALC/)**

---

## 🛠️ Tech Stack

* **HTML5**: For the structure and content.
* **CSS3**: For styling, layout (CSS Grid), and responsiveness.
* **Vanilla JavaScript (ES6+)**: For all the logic, mathematical calculations, and DOM manipulation.

---

## ⚙️ How to Use

1. **Create a Matrix**: Click the **Create New Matrix** button. Define its dimensions, give it a name (e.g., `A`), fill in the values, and click **Save Matrix**.
2. **Build Your Expression**:
   * **Type directly** into the **Expression** panel.
   * Use the **calculator keypad** to enter numbers, operators, and functions.
   * Click on a saved matrix from the **Stored Matrices** list to insert its name into the expression.
3. **Calculate**: Press the **`=`** button on the keypad or hit **Enter** on your keyboard to see the result.
4. **Store a Result**: After a calculation, click the **Store Result** button to save the output as a new matrix.

---

## 📋 Supported Operations

The calculator supports a wide variety of functions and operators:

| Operation                 | Syntax Example         | Description                                                      |
|--------------------------|------------------------|------------------------------------------------------------------|
| **Basic Arithmetic**     |                        |                                                                  |
| Addition                 | `A + B`                | Adds two matrices of the same dimensions.                        |
| Subtraction              | `A - B`                | Subtracts two matrices of the same dimensions.                   |
| Multiplication           | `A * B`                | Performs standard matrix multiplication.                         |
| Scalar Multiplication    | `A * 2` or `2 * A`     | Multiplies every element of a matrix by a scalar.                |
| Scalar Division          | `A / 2`                | Divides every element of a matrix by a scalar.                   |
| **Element-wise (Hadamard)** |                     |                                                                  |
| Element-wise Multiply    | `A .* B`               | Multiplies elements of two matrices of the same dimensions.      |
| Element-wise Divide      | `A ./ B`               | Divides elements of two matrices of the same dimensions.         |
| Element-wise Power       | `A .^ 2`               | Raises each element of a matrix to a scalar power.               |
| **Advanced Functions**   |                        |                                                                  |
| Transpose                | `transpose(A)`         | Flips the matrix over its diagonal.                              |
| Determinant              | `det(A)`               | Calculates the determinant of a square matrix.                   |
| Inverse                  | `inv(A)`               | Finds the inverse of a square matrix (if it exists).             |
| Adjoint (Adjugate)       | `adj(A)`               | Calculates the adjugate of a square matrix.                      |
| Matrix Power             | `power(A, 3)`          | Raises a square matrix to an integer power (`A * A * A`).        |
| **Linear Algebra**       |                        |                                                                  |
| Row Echelon Form         | `ref(A)`               | Converts a matrix to its Row Echelon Form.                       |
| Reduced Row Echelon Form | `rref(A)`              | Converts a matrix to its Reduced Row Echelon Form.               |
| Rank                     | `rank(A)`              | Computes the rank of a matrix.                                   |
| Trace                    | `trace(A)`             | Calculates the sum of the diagonal elements of a square matrix.  |
| Dot Product              | `dot(v1, v2)`          | Calculates the dot product of two vectors.                       |
| Kronecker Product        | `kron(A, B)`           | Computes the Kronecker (tensor) product of two matrices.         |
| **Matrix Generators**    |                        |                                                                  |
| Identity Matrix          | `identity(3)`          | Creates a 3x3 identity matrix.                                   |
| Zero Matrix              | `zeros(2, 3)`          | Creates a 2x3 matrix of all zeros.                               |
