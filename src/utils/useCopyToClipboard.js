import copy from "copy-to-clipboard";
import { useState ,useEffect} from "react";

export default function useCopyToClipboard(resetInterval=null) {
    const [isCopied,setCopied] = useState(false)
    useEffect(() => {
        let timeout;
        if (isCopied && resetInterval) {
          timeout = setTimeout(() => setCopied(false), resetInterval);
        }
        return () => {
          clearTimeout(timeout);
        };
      }, [isCopied, resetInterval]);
    function handleCopy(text){
        
        if(typeof text === "string" || typeof text === "number"){
            copy(text.toString())
            setCopied(true)
        }else{
            console.error(
                `Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`
              );
        }
    }
    return [isCopied,handleCopy]
}