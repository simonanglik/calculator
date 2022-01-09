// See https://medium.com/@shuseel/how-to-create-a-simple-calculator-using-html-and-javascript-50a83cb2b90e

export function do_calculate(currentState, keyPressed) {
    let newState = {};
    let isValidFormula = true;

    switch (keyPressed) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case ".":
        case "(":
        case ")":
            try {
                eval((currentState.isResult ? "" : currentState.display) + keyPressed);
            } catch {
                //  (e instanceof SyntaxError) do we want to test for SyntaxErrors ?
                newState.isValidFormula = false;
            }
            newState.display =
                (currentState.isResult ? "" : currentState.display) + keyPressed;
            newState.isValidFormula = isValidFormula;
            newState.isResult = false;
            break;
        case "+/-":
            if (currentState.display === eval(currentState.display)) {
                this.setState((state) => ({
                    display: -state.display,
                    isValidFormula: true,
                }));
            }
            break;
        case "C":
            if (currentState.display.length === 0) {
                newState.history = currentState.history.slice(0, 0);
            }
            newState.display = "";
            newState.isValidFormula = true;
            newState.isResult = false;
            break;
        case "BS":
            try {
                eval(currentState.display.slice(0, -1));
            } catch {
                //  (e instanceof SyntaxError) do we want to test for SyntaxErrors ?
                newState.isValidFormula = false;
            }
            newState.display = currentState.display.slice(0, -1);
            newState.isValidFormula = isValidFormula;
            newState.isResult = false;
            break;
        case "/":
        case "%":
        case "*":
        case "-":
        case "+":
            try {
                eval(currentState.display + keyPressed);
            } catch {
                //  (e instanceof SyntaxError) do we want to test for SyntaxErrors ?
                newState.isValidFormula = false;
            }
            newState.display = currentState.display + keyPressed;
            newState.isValidFormula = isValidFormula;
            newState.isResult = false;
            break;
        case "x²":
            try {
                eval(currentState.display);
                newState.history = currentState.history.concat([
                    currentState.display +
                    "^2=" +
                    eval(currentState.display) * eval(currentState.display),
                ]);
                newState.display = String(
                    eval(currentState.display) * eval(currentState.display)
                );
                newState.isValidFormula = true;
                newState.isResult = true;
            } catch {
                newState.isValidFormula = false;
            }
            break;
        case "√":
            try {
                eval(currentState.display);
                newState.history = currentState.history.concat([
                    "√" +
                    currentState.display + "=" +
                    Math.sqrt(eval(currentState.display)),
                ]);
                newState.display = String(Math.sqrt(eval(currentState.display)));
                newState.isValidFormula = true;
                newState.isResult = true;
            } catch {
                newState.isValidFormula = false;
            }
            break;
        case "=":
            try {
                eval(currentState.display);
                newState.history = currentState.history.concat([
                    currentState.display + keyPressed + eval(currentState.display),
                ]);
                newState.display = String(eval(currentState.display));
                newState.isValidFormula = true;
                newState.isResult = true;
            } catch {
                newState.isValidFormula = false;
            }
            break;
        default:
            alert("default error");
            break;
    }

    return newState;
}