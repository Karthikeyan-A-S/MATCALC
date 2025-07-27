document.addEventListener('DOMContentLoaded', () => {


    const matrixMath = {
        _error: (msg) => { throw new Error(msg); },
        _isSquare: (M) => M.length === M[0].length,
        _isSameDims: (A, B) => A.length === B.length && A[0].length === B[0].length,
        _clone: (M) => M.map(row => [...row]),

        add: (A, B) => {
            if (!matrixMath._isSameDims(A, B)) matrixMath._error("Matrices must have the same dimensions for addition.");
            return A.map((row, i) => row.map((val, j) => val + B[i][j]));
        },
        subtract: (A, B) => {
            if (!matrixMath._isSameDims(A, B)) matrixMath._error("Matrices must have the same dimensions for subtraction.");
            return A.map((row, i) => row.map((val, j) => val - B[i][j]));
        },
        multiply: (A, B) => { /* ... see full implementation below ... */ },
        divide: (A, B) => { /* ... see full implementation below ... */ },
        hadamard: (A, B, operation) => { /* ... see full implementation below ... */ },
        transpose: (M) => M[0].map((_, colIndex) => M.map(row => row[colIndex])),
        determinant: (M) => { /* ... see full implementation below ... */ },
        cofactor: (M, r, c) => Math.pow(-1, r + c) * matrixMath.determinant(matrixMath.minor(M, r, c)),
        minor: (M, r, c) => M.filter((_, ri) => ri !== r).map(row => row.filter((_, ci) => ci !== c)),
        adjoint: (M) => { /* ... see full implementation below ... */ },
        inverse: (M) => { /* ... see full implementation below ... */ },
        trace: (M) => { /* ... see full implementation below ... */ },
        power: (M, n) => { /* ... see full implementation below ... */ },
        rowEchelonForm: (M, reduced = false) => { /* ... see full implementation below ... */ },
        rank: (M) => { /* ... see full implementation below ... */ },
        identity: (n) => { /* ... see full implementation below ... */ },
        zeros: (r, c) => Array(r).fill(0).map(() => Array(c).fill(0)),
        dot: (A, B) => { /* ... see full implementation below ... */ },
    };
    
    // Full implementations of complex functions
    matrixMath.multiply = (A, B) => {
        const isAScalar = A.length === 1 && A[0].length === 1;
        const isBScalar = B.length === 1 && B[0].length === 1;
        if (isAScalar && !isBScalar) return B.map(row => row.map(val => A[0][0] * val));
        if (!isAScalar && isBScalar) return A.map(row => row.map(val => B[0][0] * val));
        if (isAScalar && isBScalar) return [[ A[0][0] * B[0][0] ]];
        if (A[0].length !== B.length) matrixMath._error("For matrix multiplication, cols of A must equal rows of B.");
        const res = matrixMath.zeros(A.length, B[0].length);
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < B[0].length; j++) {
                for (let k = 0; k < A[0].length; k++) {
                    res[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return res;
    };
    matrixMath.divide = (A, B) => {
        const isBScalar = B.length === 1 && B[0].length === 1;
        if (!isBScalar) matrixMath._error("Division is only supported for a matrix by a scalar.");
        const scalar = B[0][0];
        if (scalar === 0) matrixMath._error("Division by zero.");
        return A.map(row => row.map(val => val / scalar));
    };
    matrixMath.hadamard = (A, B, operation) => {
        if (!matrixMath._isSameDims(A, B)) matrixMath._error("Element-wise operations require matrices of the same dimensions.");
        return A.map((row, i) => row.map((val, j) => operation(val, B[i][j])));
    };
    matrixMath.determinant = (M) => {
        if (!matrixMath._isSquare(M)) matrixMath._error("Matrix must be square for determinant.");
        if (M.length === 1) return M[0][0];
        if (M.length === 2) return M[0][0] * M[1][1] - M[0][1] * M[1][0];
        let det = 0;
        for (let j = 0; j < M.length; j++) {
            det += M[0][j] * matrixMath.cofactor(M, 0, j);
        }
        return det;
    };
    matrixMath.adjoint = (M) => {
        if (!matrixMath._isSquare(M)) matrixMath._error("Matrix must be square for adjoint.");
        const cofactorMatrix = M.map((row, r) => row.map((_, c) => matrixMath.cofactor(M, r, c)));
        return matrixMath.transpose(cofactorMatrix);
    };
    matrixMath.inverse = (M) => {
        const det = matrixMath.determinant(M);
        if (det === 0) matrixMath._error("Matrix is singular (determinant is 0) and cannot be inverted.");
        const adj = matrixMath.adjoint(M);
        return adj.map(row => row.map(val => val / det));
    };
    matrixMath.trace = (M) => {
        if (!matrixMath._isSquare(M)) matrixMath._error("Matrix must be square for trace.");
        return M.reduce((sum, row, i) => sum + row[i], 0);
    };
    matrixMath.power = (M, n) => {
        if (!matrixMath._isSquare(M)) matrixMath._error("Matrix must be square for power operations.");
        if (n === 0) return matrixMath.identity(M.length);
        if (n < 0) return matrixMath.power(matrixMath.inverse(M), -n);
        let res = M;
        for (let i = 1; i < n; i++) res = matrixMath.multiply(res, M);
        return res;
    };
    matrixMath.rowEchelonForm = (M, reduced = false) => {
        let mat = matrixMath._clone(M);
        const [rows, cols] = [mat.length, mat[0].length];
        let lead = 0;
        for (let r = 0; r < rows; r++) {
            if (cols <= lead) break;
            let i = r;
            while (mat[i][lead] === 0) {
                i++;
                if (i === rows) {
                    i = r;
                    lead++;
                    if (cols === lead) return mat;
                }
            }
            [mat[i], mat[r]] = [mat[r], mat[i]]; // Swap rows
            let val = mat[r][lead];
            for (let j = 0; j < cols; j++) mat[r][j] /= val; // Scale row
            for (let i = 0; i < rows; i++) {
                if (i === r) continue;
                val = mat[i][lead];
                for (let j = 0; j < cols; j++) mat[i][j] -= val * mat[r][j];
            }
            if (!reduced) break; // If only REF is needed for this pivot
            lead++;
        }
        // clean up near-zero values
        return mat.map(row => row.map(val => (Math.abs(val) < 1e-10 ? 0 : val)));
    };
    matrixMath.rank = (M) => {
        const ref = matrixMath.rowEchelonForm(M);
        return ref.filter(row => row.some(val => val !== 0)).length;
    };
    matrixMath.identity = (n) => {
        const I = matrixMath.zeros(n, n);
        for (let i = 0; i < n; i++) I[i][i] = 1;
        return I;
    };
    matrixMath.dot = (A, B) => {
        const isAVector = A[0].length === 1 || A.length === 1;
        const isBVector = B[0].length === 1 || B.length === 1;
        if (!isAVector || !isBVector) matrixMath._error("Dot product requires vector inputs.");
        const vA = A.length === 1 ? matrixMath.transpose(A)[0] : A.map(r=>r[0]);
        const vB = B.length === 1 ? matrixMath.transpose(B)[0] : B.map(r=>r[0]);
        if (vA.length !== vB.length) matrixMath._error("Vectors must have the same length for dot product.");
        const res = vA.reduce((sum, val, i) => sum + val * vB[i], 0);
        return [[res]];
    };
    const expressionEvaluator = {
        toPostfix: (infix, tempScalarNames, functionArgCounts) => {
            const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '.*': 2, './': 2, '.^': 3, '^': 3 };
            const funcs = ['det','inv','transpose','adj','trace','power','ref','rref','rank','identity','zeros','dot','kron'];
            const operators = [];
            const output = [];
            let scalarCounter = 0;
            const tokens = infix.match(/[a-zA-Z_]\w*|\d+\.?\d*|\.\*|\.\/|\.\^|[+\-*/^(),]/g) || [];

            tokens.forEach(token => {
                if (!isNaN(token)) {
                    const scalarName = `__scalar_${scalarCounter++}`;
                    storedMatrices[scalarName] = [[parseFloat(token)]];
                    tempScalarNames.push(scalarName);
                    output.push(scalarName);
                } else if (funcs.includes(token)) {
                    operators.push(token);
                    functionArgCounts[token] = functionArgCounts[token] || [];
                    functionArgCounts[token].push(1); // Start with 1 argument
                } else if (token === ',') {
                    while (operators.length && operators[operators.length - 1] !== '(') {
                        output.push(operators.pop());
                    }
                    const lastFunc = operators.filter(op => funcs.includes(op)).pop();
                    if(lastFunc) functionArgCounts[lastFunc][functionArgCounts[lastFunc].length-1]++;
                } else if (token in storedMatrices) {
                    output.push(token);
                } else if (token === '(') {
                    operators.push(token);
                } else if (token === ')') {
                    while (operators.length && operators[operators.length - 1] !== '(') {
                        output.push(operators.pop());
                    }
                    operators.pop(); // Pop '('
                    if (funcs.includes(operators[operators.length - 1])) {
                        const func = operators.pop();
                        const argCount = functionArgCounts[func].pop();
                        output.push(`${func}:${argCount}`);
                    }
                } else { // Operator
                    while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                        output.push(operators.pop());
                    }
                    operators.push(token);
                }
            });

            while (operators.length) output.push(operators.pop());
            return output;
        },

        evaluatePostfix: (postfix) => {
            const stack = [];
            postfix.forEach(token => {
                if (token in storedMatrices) {
                    stack.push(storedMatrices[token]);
                } else if (token.includes(':')) { // It's a function call
                    const [func, argCountStr] = token.split(':');
                    const argCount = parseInt(argCountStr);
                    const args = stack.splice(stack.length - argCount);

                    if(argCount === 1) {
                        const M = args[0];
                        if (func === 'det') stack.push([[matrixMath.determinant(M)]]);
                        else if (func === 'inv') stack.push(matrixMath.inverse(M));
                        else if (func === 'transpose') stack.push(matrixMath.transpose(M));
                        else if (func === 'adj') stack.push(matrixMath.adjoint(M));
                        else if (func === 'trace') stack.push([[matrixMath.trace(M)]]);
                        else if (func === 'ref') stack.push(matrixMath.rowEchelonForm(M, false));
                        else if (func === 'rref') stack.push(matrixMath.rowEchelonForm(M, true));
                        else if (func === 'rank') stack.push([[matrixMath.rank(M)]]);
                        else if (func === 'identity') stack.push(matrixMath.identity(M[0][0]));
                    } else if (argCount === 2) {
                        const [A, B] = args;
                        const s = B[0][0]; // scalar argument
                        if (func === 'power') stack.push(matrixMath.power(A, s));
                        else if (func === 'zeros') stack.push(matrixMath.zeros(A[0][0], s));
                        else if (func === 'dot') stack.push(matrixMath.dot(A, B));
                    }
                } else { // Binary operator
                    const B = stack.pop();
                    const A = stack.pop();
                    if (!A || !B) matrixMath._error("Invalid expression.");
                    if (token === '+') stack.push(matrixMath.add(A, B));
                    else if (token === '-') stack.push(matrixMath.subtract(A, B));
                    else if (token === '*') stack.push(matrixMath.multiply(A, B));
                    else if (token === '/') stack.push(matrixMath.divide(A, B));
                    else if (token === '.*') stack.push(matrixMath.hadamard(A, B, (a,b) => a * b));
                    else if (token === './') stack.push(matrixMath.hadamard(A, B, (a,b) => a / b));
                    else if (token === '.^' || token === '^') stack.push(A.map(row => row.map(val => Math.pow(val, B[0][0]))));
                }
            });

            if (stack.length !== 1) matrixMath._error("Invalid expression syntax.");
            return stack[0];
        }
    };


    let storedMatrices = {};
    let lastResult = null;

    const expressionDisplay = document.getElementById('expression-display');
    const resultDisplay = document.getElementById('result-display');
    const keypad = document.querySelector('.keypad');
    const newMatrixBtn = document.getElementById('newMatrixBtn');
    const storeResultBtn = document.getElementById('storeResultBtn');
    
    const handleEvaluation = () => {
        const expression = expressionDisplay.textContent.replace(/Aⁿ/g, 'power').replace(/Aᵀ/g, 'transpose');
        const tempScalarNames = [];
        const functionArgCounts = {};
        try {
            const postfix = expressionEvaluator.toPostfix(expression, tempScalarNames, functionArgCounts);
            const result = expressionEvaluator.evaluatePostfix(postfix);
            displayResult(result);
        } catch (error) {
            displayResult(`Error: ${error.message}`);
        } finally {
            tempScalarNames.forEach(name => delete storedMatrices[name]);
        }
    };
    
    // Simplified displayResult, updateStoredMatricesList, and other DOM handlers...
    const displayResult = (matrix) => {
        resultDisplay.innerHTML = '';
        if (typeof matrix === 'string') {
             resultDisplay.innerHTML = `<p style="color:red;">${matrix}</p>`;
             lastResult = null;
             return;
        }
        if (typeof matrix === 'number' || (Array.isArray(matrix) && matrix.length === 1 && matrix[0].length === 1) ){
             const value = typeof matrix === 'number' ? matrix : matrix[0][0];
             resultDisplay.innerHTML = `<div class="matrix-grid-result"><span>${parseFloat(value.toFixed(4))}</span></div>`;
             lastResult = [[value]];
        } else if (Array.isArray(matrix)) {
            const grid = document.createElement('div');
            grid.className = 'matrix-grid-result';
            grid.style.gridTemplateColumns = `repeat(${matrix[0].length}, auto)`;
            matrix.forEach(row => {
                row.forEach(val => {
                    const cell = document.createElement('span');
                    cell.textContent = Number.isInteger(val) ? val : parseFloat(val.toFixed(4));
                    grid.appendChild(cell);
                });
            });
            resultDisplay.appendChild(grid);
            lastResult = matrix;
        } else {
             resultDisplay.innerHTML = `<p>Invalid result format.</p>`;
             lastResult = null;
        }
    };
    
    keypad.addEventListener('click', (e) => {
        const key = e.target.dataset.key;
        if (!key) return;
        if (key === '=') handleEvaluation();
        else if (key === 'C') {
            expressionDisplay.textContent = '';
            resultDisplay.innerHTML = '<p>Your result will appear here.</p>';
            lastResult = null;
        } else {
            expressionDisplay.textContent += key;
        }
    });
    
    expressionDisplay.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleEvaluation();
        }
    });

    const storedMatricesList = document.getElementById('stored-matrices-list');
    const updateStoredMatricesList = () => {
        storedMatricesList.innerHTML = '';
        if(Object.keys(storedMatrices).filter(k=>!k.startsWith('__')).length === 0){
            storedMatricesList.innerHTML = '<p>No matrices saved yet.</p>';
            return;
        }
        Object.keys(storedMatrices).sort().forEach(name => {
            if (name.startsWith('__')) return;
            const item = document.createElement('div');
            item.className = 'stored-matrix-item';
            const Name = document.createElement('div');
            Name.className = 'stored-matrix-name';
            Name.textContent = name;
            Name.addEventListener('click', () => expressionDisplay.textContent += name );

             const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-matrix-btn';
            deleteBtn.textContent = '×';
            deleteBtn.dataset.name = name;
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent container click event
                const nameToDelete = e.target.dataset.name;
                if (confirm(`Are you sure you want to delete matrix "${nameToDelete}"?`)) {
                    delete storedMatrices[nameToDelete];
                    updateStoredMatricesList(); // Refresh the list
                }
            });
            item.appendChild(Name);
            item.appendChild(deleteBtn);
            storedMatricesList.appendChild(item);


        });
    };
    const modal = document.getElementById('matrixEditorModal');
    const openModal = () => { modal.style.display = 'flex'; };
    const closeModal = () => { modal.style.display = 'none'; /*...*/ };
    newMatrixBtn.addEventListener('click', openModal);
    document.querySelector('.close-btn').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    // ... logic for createGridBtn, saveMatrixBtn, storeResultBtn ...
    document.getElementById('createGridBtn').addEventListener('click', () => {
        const rows = parseInt(document.getElementById('matrixRowsInput').value);
        const cols = parseInt(document.getElementById('matrixColsInput').value);
        const container = document.getElementById('matrixGridContainer');
        if (rows > 0 && cols > 0) {
            container.innerHTML = '';
            container.style.gridTemplateColumns = `repeat(${cols}, 50px)`;
            for(let i=0; i<rows*cols; i++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.placeholder = '0';
                container.appendChild(input);
            }
        }
    });
    document.getElementById('saveMatrixBtn').addEventListener('click', () => {
        const name = document.getElementById('matrixNameInput').value.trim();
        const reserved = ['det','inv','transpose','adj','trace','power','ref','rref','rank','identity','zeros','dot'];
        if(!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name) || reserved.includes(name)){
            alert("Invalid name. Must start with a letter and contain only letters, numbers, or _. Cannot be a reserved keyword.");
            return;
        }
        const rows = parseInt(document.getElementById('matrixRowsInput').value);
        const cols = parseInt(document.getElementById('matrixColsInput').value);
        const inputs = [...document.getElementById('matrixGridContainer').children];
        const matrix = [];
        for(let i=0; i<rows; i++){
            const row = [];
            for(let j=0; j<cols; j++){
                row.push(parseFloat(inputs[i*cols + j].value) || 0);
            }
            matrix.push(row);
        }
        storedMatrices[name] = matrix;
        updateStoredMatricesList();
        closeModal();
    });
    storeResultBtn.addEventListener('click', () => {
        if(!lastResult) return alert("No valid result to store.");
        const name = prompt("Enter a name for the result matrix:");
        if(name && name.trim()){
            storedMatrices[name.trim()] = lastResult;
            updateStoredMatricesList();
        }
    });

    updateStoredMatricesList();
});