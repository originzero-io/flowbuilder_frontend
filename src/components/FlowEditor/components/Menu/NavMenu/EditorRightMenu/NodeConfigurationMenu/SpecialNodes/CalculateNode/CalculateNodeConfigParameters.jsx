/* eslint-disable no-alert */
import { useEffect, useState } from "react";
import { EditableMathField, addStyles } from "react-mathquill";
import "./MathField.css";
import MathKeyboard from "./MathKeyboard";
import MathVariables from "./MathVariables";

addStyles();

export default function CalculateNodeConfigParameters({ node, dispatcher }) {
  const [latex, setLatex] = useState("");
  const [mathField, setMathField] = useState(null);

  useEffect(() => {
    setLatex(node.data.configParameters.formula);
  }, [node.data]);

  const handleChange = (mathFieldInstance) => {
    setLatex(mathFieldInstance.latex());
    setMathField(mathFieldInstance);
    dispatcher({
      type: "updateConfigParameters",
      payload: {
        name: "formula",
        value: mathFieldInstance.latex(),
      },
    });
  };

  return (
    <div>
      <EditableMathField
        className="math-textbox"
        latex={latex}
        onChange={(mathFieldInstance) => handleChange(mathFieldInstance)}
        value={latex}
      />

      <MathKeyboard mathField={mathField} />

      <MathVariables node={node} dispatcher={dispatcher} />

      {/* <div className="math-latex" id="latex" value={latex}>
        {latex}
      </div> */}
    </div>
  );
}
