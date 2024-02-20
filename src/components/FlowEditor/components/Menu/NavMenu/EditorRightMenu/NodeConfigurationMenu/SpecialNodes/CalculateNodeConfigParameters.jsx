import React, { useState, useEffect } from "react";
import { addStyles, EditableMathField } from "react-mathquill";
import "./style.css";

addStyles();

export default function CalculateNodeConfigParameters({ node, dispatcher }) {
  const [latex, setLatex] = useState("");
  // const [latex, setLatex] = useState("\\frac{\\partial }{\\partial:x}\\left(r\\cdot sinwx\\right)");

  useEffect(() => {
    setLatex(node.data.configParameters.formula);
  }, [node]);

  const handleChange = (mathField) => {
    setLatex(mathField.latex());
    dispatcher({
      type: "updateConfigParameters",
      payload: {
        target: {
          name: "formula",
          value: mathField.latex(),
        },
      },
    });
  };
  return (
    <div>
      <div className="math-input">
        <EditableMathField
          className="math-textbox"
          latex={latex}
          onChange={(mathField) => handleChange(mathField)}
          value={latex}
        />
      </div>
      <div className="math-latex" id="latex" value={latex}>
        {latex}
      </div>
    </div>
  );
}
