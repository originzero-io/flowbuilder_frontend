import React from "react";
import PropTypes from "prop-types";

export default function DynamicSVG({ svgContent, color, size }) {
  const modifiedSVG = svgContent
    .replace(/(fill|stroke)="(?:[^"]*[^none"])"/g, `$1="${color || "red"}"`)
    .replace(/<svg[^>]*\s(?:width|height)=["'][^"']*["'][^>]*>/, (match) =>
      match.replace(/(width|height)=["'][^"']*["']/g, `$1="${size || 24}"`),
    );

  // console.log("svgContent: ", svgContent);
  // console.log("modifiedContent: ", modifiedSVG);
  return <div dangerouslySetInnerHTML={{ __html: modifiedSVG }} />;
}

DynamicSVG.propTypes = {
  svgContent: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};
