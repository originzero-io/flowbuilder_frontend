import React, { useState, useEffect } from "react";
import { addStyles, EditableMathField } from "react-mathquill";
import "./MathField.css";
import MathKeyboard from "./MathKeyboard";

addStyles();

export default function CalculateNodeConfigParameters({ node, dispatcher }) {
  const [latex, setLatex] = useState("");
  const [mathField, setMathField] = useState(null);

  useEffect(() => {
    setLatex(node.data.configParameters.formula);
  }, [node]);

  const handleChange = (mathFieldInstance) => {
    setLatex(mathFieldInstance.latex());
    setMathField(mathFieldInstance);
    dispatcher({
      type: "updateConfigParameters",
      payload: {
        target: {
          name: "formula",
          value: mathFieldInstance.latex(),
        },
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

      {/* <div className="math-latex" id="latex" value={latex}>
        {latex}
      </div> */}
    </div>
  );
}
