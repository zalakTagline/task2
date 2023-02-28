import React from "react";
import {FaCopy } from 'react-icons/fa';
import {BiSelectMultiple } from 'react-icons/bi';
import useCopyToClipboard from "../utils/useCopyToClipboard";


export default function CopyButton({ code }) {
  const [isCopied, handleCopy] = useCopyToClipboard(5000);

  return (
    <button className="copy-btn" onClick={() => handleCopy(code)}>
      {isCopied ? <BiSelectMultiple /> : <FaCopy />}
    </button>
  );
}