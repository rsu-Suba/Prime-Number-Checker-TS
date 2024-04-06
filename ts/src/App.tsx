import React, { useState } from "react";
import "./App.css";

function App() {
   const [num, setNum] = useState<string>("");
   const [isDis, setIsDis] = useState<boolean>(true);
   const searchtext = document.getElementById("leftarea")!;
   const divisortext = document.getElementById("rightarea")!;
   let cachei: number = 0;
   let count: number = 1;
   let start: any;

   const submit = () => {
      console.log(`${num}`);
      if (parseInt(num) < 2 || num == "") {
         document.getElementById("valueBalloon")!.style.display = "block";
      } else {
        start = performance.now();
        searchtext.textContent = '';
        divisortext.textContent = '';
        document.getElementById('progressbar')!.style.animationPlayState = 'running';
         divide(parseInt(num));
      }
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setNum(e.target.value);
      if (e.target.value != "") {
         setIsDis(false);
         document.getElementById("valueBalloon")!.style.display = "none";
      } else {
         setIsDis(true);
      }
   };

   async function divide(searchnum: number) {
      searchtext.textContent += `[${searchnum}]\n`;
      for (let i = 2; ; i++) {
         if (i > 2 && i % 2 == 0) {
            continue;
         }
         if (i > Math.sqrt(searchnum)) {
            if (searchnum == parseInt(num)) {
               divisortext.textContent += `\n${num}は素数\n`;
            }
            if (i != searchnum) {
               searchtext.textContent += `\n${i} = X`;
            }
            searchtext.textContent += `\n${searchnum} = O`;
            if (cachei == searchnum) {
               count++;
               divisortext.textContent += `^${count}\n`;
            } else if (searchnum != parseInt(num)) {
               if (count > 1) {
                  divisortext.textContent += `^${count}`;
               }
               divisortext.textContent += `\n${searchnum}\n`;
            }
            const end = performance.now();
            divisortext.textContent += `\nFinish (${Math.round((end - start) * 100) / 100}ms)`;
            break;
         }
         if (searchnum % i == 0) {
            searchtext.textContent += `\n${i} = O\n\n`;
            if (cachei == i) {
               count++;
            } else {
               if (count > 1) {
                  divisortext.textContent += `^${count}`;
               }
               cachei = i;
               count = 1;
               divisortext.textContent += `\n${i}`;
            }
            await sleep(1);
            divide(searchnum / i);
            break;
         } else {
            searchtext.textContent += `\n${i} = X`;
            if (i < 100 || i % 40 == 1) {
               await sleep(1);
            }
         }
         searchtext.scrollTop = searchtext.scrollHeight;
         divisortext.scrollTop = divisortext.scrollHeight;
      }
      searchtext.scrollTop = searchtext.scrollHeight;
      divisortext.scrollTop = divisortext.scrollHeight;
   }

   function sleep(time: any) {
      return new Promise((resolve) => {
         setTimeout(resolve, time);
      });
   }

   return (
      <>
         <div className="window active canvas">
            <div className="title-bar">
               <div className="title-bar-text">Prime Num Check</div>
               <div className="title-bar-controls">
                  <button aria-label="Minimize"></button>
                  <button aria-label="Maximize"></button>
                  <button aria-label="Close"></button>
               </div>
            </div>
            <div className="window-body has-space main">
               <div className="inputForm">
                  <input
                     type="number"
                     min="1"
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                  ></input>
                  <button disabled={isDis} type="submit" id="submitBtn" onClick={submit}>
                     Start
                  </button>
               </div>
               <div role="tooltip" className="valueBalloon" id="valueBalloon">
                  Value must be greater than or equal to 2.
               </div>
               <div className="textarea">
                  <textarea id="leftarea" className="has-scrollbar" readOnly></textarea>
                  <textarea id="rightarea" className="has-scrollbar" readOnly></textarea>
               </div>
               <div role="progressbar" className="marquee" id="progressbar"></div>
            </div>
         </div>
      </>
   );
}

export default App;
