const buttons = [
  { id: "clear", text: "AC" },
  { id: "divide", text: "/" },
  { id: "multiply", text: "*" },
  { id: "seven", text: "7" },
  { id: "eight", text: "8" },
  { id: "nine", text: "9" },
  { id: "subtract", text: "-" },
  { id: "four", text: "4" },
  { id: "five", text: "5" },
  { id: "six", text: "6" },
  { id: "add", text: "+" },
  { id: "one", text: "1" },
  { id: "two", text: "2" },
  { id: "three", text: "3" },
  { id: "zero", text: "0" },
  { id: "decimal", text: "." },
  { id: "equals", text: "=" },
];

const isOperator = /[+\-*/]/;

function App() {
  const [input, setInput] = React.useState("0");
  const [formula, setFormula] = React.useState("");
  const [evaluated, setEvaluated] = React.useState(false);

  const handleClick = (text) => {
    if (text === "AC") {
      setInput("0");
      setFormula("");
      setEvaluated(false);
      return;
    }

    if (text === "=") {
      let expr = formula;
      if (isOperator.test(expr.slice(-1))) {
        expr = expr.slice(0, -1);
      }
      try {
        let result = eval(expr).toString();
        setInput(result);
        setFormula(expr + "=" + result);
        setEvaluated(true);
      } catch (err) {
        setInput("Error");
        setFormula("");
      }
      return;
    }

    if (text === ".") {
      if (evaluated) {
        setInput("0.");
        setFormula("0.");
        setEvaluated(false);
        return;
      }

      if (input.includes(".")) return;

      setInput(input + ".");
      setFormula(formula + ".");
      return;
    }

    if (!isNaN(text)) {
      if (evaluated) {
        setInput(text);
        setFormula(text);
        setEvaluated(false);
        return;
      }

      if (input === "0" || isOperator.test(input)) {
        setInput(text);
      } else {
        setInput(input + text);
      }

      setFormula(
        formula === "" || formula === "0"
          ? text
          : formula + text
      );
      return;
    }

    // Operator logic
    if (isOperator.test(text)) {
      if (evaluated) {
        setFormula(input + text);
        setInput(text);
        setEvaluated(false);
        return;
      }

      if (isOperator.test(formula.slice(-1))) {
        if (
          text === "-" &&
          !formula.slice(-2).includes("-")
        ) {
          setFormula(formula + text);
        } else {
          const updatedFormula = formula.replace(/[*+/\-]+$/, "") + text;
          setFormula(updatedFormula);
        }
      } else {
        setFormula(formula + text);
      }

      setInput(text);
    }
  };

  return (
    <div className="calculator">
      <div id="display" className="display">
        {input}
      </div>
      <div className="buttons">
        {buttons.map(({ id, text }) => (
          <button
            id={id}
            key={id}
            onClick={() => handleClick(text)}
            className="btn"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
