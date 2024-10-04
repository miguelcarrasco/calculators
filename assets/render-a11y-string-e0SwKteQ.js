import{k as A}from"./index-CFyxH9U7.js";var t={"(":"left parenthesis",")":"right parenthesis","[":"open bracket","]":"close bracket","\\{":"left brace","\\}":"right brace","\\lvert":"open vertical bar","\\rvert":"close vertical bar","|":"vertical bar","\\uparrow":"up arrow","\\Uparrow":"up arrow","\\downarrow":"down arrow","\\Downarrow":"down arrow","\\updownarrow":"up down arrow","\\leftarrow":"left arrow","\\Leftarrow":"left arrow","\\rightarrow":"right arrow","\\Rightarrow":"right arrow","\\langle":"open angle","\\rangle":"close angle","\\lfloor":"open floor","\\rfloor":"close floor","\\int":"integral","\\intop":"integral","\\lim":"limit","\\ln":"natural log","\\log":"log","\\sin":"sine","\\cos":"cosine","\\tan":"tangent","\\cot":"cotangent","\\sum":"sum","/":"slash",",":"comma",".":"point","-":"negative","+":"plus","~":"tilde",":":"colon","?":"question mark","'":"apostrophe","\\%":"percent"," ":"space","\\ ":"space","\\$":"dollar sign","\\angle":"angle","\\degree":"degree","\\circ":"circle","\\vec":"vector","\\triangle":"triangle","\\pi":"pi","\\prime":"prime","\\infty":"infinity","\\alpha":"alpha","\\beta":"beta","\\gamma":"gamma","\\omega":"omega","\\theta":"theta","\\sigma":"sigma","\\lambda":"lambda","\\tau":"tau","\\Delta":"delta","\\delta":"delta","\\mu":"mu","\\rho":"rho","\\nabla":"del","\\ell":"ell","\\ldots":"dots","\\hat":"hat","\\acute":"acute"},x={prime:"prime",degree:"degrees",circle:"degrees",2:"squared",3:"cubed"},E={"|":"open vertical bar",".":""},K={"|":"close vertical bar",".":""},M={"+":"plus","-":"minus","\\pm":"plus minus","\\cdot":"dot","*":"times","/":"divided by","\\times":"times","\\div":"divided by","\\circ":"circle","\\bullet":"bullet"},z={"=":"equals","\\approx":"approximately equals","≠":"does not equal","\\geq":"is greater than or equal to","\\ge":"is greater than or equal to","\\leq":"is less than or equal to","\\le":"is less than or equal to",">":"is greater than","<":"is less than","\\leftarrow":"left arrow","\\Leftarrow":"left arrow","\\rightarrow":"right arrow","\\Rightarrow":"right arrow",":":"colon"},j={"\\underleftarrow":"left arrow","\\underrightarrow":"right arrow","\\underleftrightarrow":"left-right arrow","\\undergroup":"group","\\underlinesegment":"line segment","\\utilde":"tilde"},c=(e,l,r)=>{if(e){var d;l==="open"?d=e in E?E[e]:t[e]||e:l==="close"?d=e in K?K[e]:t[e]||e:l==="bin"?d=M[e]||e:l==="rel"?d=z[e]||e:d=t[e]||e,/^\d+$/.test(d)&&r.length>0&&/^\d+$/.test(r[r.length-1])?r[r.length-1]+=d:d&&r.push(d)}},u=(e,l)=>{var r=[];e.push(r),l(r)},D=(e,l,r)=>{switch(e.type){case"accent":{u(l,a=>{o(e.base,a,r),a.push("with"),c(e.label,"normal",a),a.push("on top")});break}case"accentUnder":{u(l,a=>{o(e.base,a,r),a.push("with"),c(j[e.label],"normal",a),a.push("underneath")});break}case"accent-token":break;case"atom":{var{text:d}=e;switch(e.family){case"bin":{c(d,"bin",l);break}case"close":{c(d,"close",l);break}case"inner":{c(e.text,"inner",l);break}case"open":{c(d,"open",l);break}case"punct":{c(d,"punct",l);break}case"rel":{c(d,"rel",l);break}default:throw e.family,new Error('"'+e.family+'" is not a valid atom type')}break}case"color":{var h=e.color.replace(/katex-/,"");u(l,a=>{a.push("start color "+h),o(e.body,a,r),a.push("end color "+h)});break}case"color-token":break;case"delimsizing":{e.delim&&e.delim!=="."&&c(e.delim,"normal",l);break}case"genfrac":{u(l,a=>{var{leftDelim:b,rightDelim:n}=e;e.hasBarLine?(a.push("start fraction"),b&&c(b,"open",a),o(e.numer,a,r),a.push("divided by"),o(e.denom,a,r),n&&c(n,"close",a),a.push("end fraction")):(a.push("start binomial"),b&&c(b,"open",a),o(e.numer,a,r),a.push("over"),o(e.denom,a,r),n&&c(n,"close",a),a.push("end binomial"))});break}case"hbox":{o(e.body,l,r);break}case"kern":break;case"leftright":{u(l,a=>{c(e.left,"open",a),o(e.body,a,r),c(e.right,"close",a)});break}case"leftright-right":break;case"lap":{o(e.body,l,r);break}case"mathord":{c(e.text,"normal",l);break}case"op":{var{body:w,name:m}=e;w?o(w,l,r):m&&c(m,"normal",l);break}case"op-token":{c(e.text,r,l);break}case"ordgroup":{o(e.body,l,r);break}case"overline":{u(l,function(a){a.push("start overline"),o(e.body,a,r),a.push("end overline")});break}case"pmb":{l.push("bold");break}case"phantom":{l.push("empty space");break}case"raisebox":{o(e.body,l,r);break}case"rule":{l.push("rectangle");break}case"sizing":{o(e.body,l,r);break}case"spacing":{l.push("space");break}case"styling":{o(e.body,l,r);break}case"sqrt":{u(l,a=>{var{body:b,index:n}=e;if(n){var q=f(o(n,[],r)).join(",");if(q==="3"){a.push("cube root of"),o(b,a,r),a.push("end cube root");return}a.push("root"),a.push("start index"),o(n,a,r),a.push("end index");return}a.push("square root of"),o(b,a,r),a.push("end square root")});break}case"supsub":{var{base:s,sub:k,sup:p}=e,i=!1;if(s&&(o(s,l,r),i=s.type==="op"&&s.name==="\\log"),k){var v=i?"base":"subscript";u(l,function(a){a.push("start "+v),o(k,a,r),a.push("end "+v)})}p&&u(l,function(a){var b=f(o(p,[],r)).join(",");if(b in x){a.push(x[b]);return}a.push("start superscript"),o(p,a,r),a.push("end superscript")});break}case"text":{if(e.font==="\\textbf"){u(l,function(a){a.push("start bold text"),o(e.body,a,r),a.push("end bold text")});break}u(l,function(a){a.push("start text"),o(e.body,a,r),a.push("end text")});break}case"textord":{c(e.text,r,l);break}case"smash":{o(e.body,l,r);break}case"enclose":{if(/cancel/.test(e.label)){u(l,function(a){a.push("start cancel"),o(e.body,a,r),a.push("end cancel")});break}else if(/box/.test(e.label)){u(l,function(a){a.push("start box"),o(e.body,a,r),a.push("end box")});break}else if(/sout/.test(e.label)){u(l,function(a){a.push("start strikeout"),o(e.body,a,r),a.push("end strikeout")});break}else if(/phase/.test(e.label)){u(l,function(a){a.push("start phase angle"),o(e.body,a,r),a.push("end phase angle")});break}throw new Error("KaTeX-a11y: enclose node with "+e.label+" not supported yet")}case"vcenter":{o(e.body,l,r);break}case"vphantom":throw new Error("KaTeX-a11y: vphantom not implemented yet");case"hphantom":throw new Error("KaTeX-a11y: hphantom not implemented yet");case"operatorname":{o(e.body,l,r);break}case"array":throw new Error("KaTeX-a11y: array not implemented yet");case"raw":throw new Error("KaTeX-a11y: raw not implemented yet");case"size":break;case"url":throw new Error("KaTeX-a11y: url not implemented yet");case"tag":throw new Error("KaTeX-a11y: tag not implemented yet");case"verb":{c("start verbatim","normal",l),c(e.body,"normal",l),c("end verbatim","normal",l);break}case"environment":throw new Error("KaTeX-a11y: environment not implemented yet");case"horizBrace":{c("start "+e.label.slice(1),"normal",l),o(e.base,l,r),c("end "+e.label.slice(1),"normal",l);break}case"infix":break;case"includegraphics":throw new Error("KaTeX-a11y: includegraphics not implemented yet");case"font":{o(e.body,l,r);break}case"href":throw new Error("KaTeX-a11y: href not implemented yet");case"cr":throw new Error("KaTeX-a11y: cr not implemented yet");case"underline":{u(l,function(a){a.push("start underline"),o(e.body,a,r),a.push("end underline")});break}case"xArrow":throw new Error("KaTeX-a11y: xArrow not implemented yet");case"cdlabel":throw new Error("KaTeX-a11y: cdlabel not implemented yet");case"cdlabelparent":throw new Error("KaTeX-a11y: cdlabelparent not implemented yet");case"mclass":{var X=e.mclass.slice(1);o(e.body,l,X);break}case"mathchoice":{o(e.text,l,r);break}case"htmlmathml":{o(e.mathml,l,r);break}case"middle":{c(e.delim,r,l);break}case"internal":break;case"html":{o(e.body,l,r);break}default:throw e.type,new Error("KaTeX a11y un-recognized type: "+e.type)}},o=function e(l,r,d){if(r===void 0&&(r=[]),l instanceof Array)for(var h=0;h<l.length;h++)e(l[h],r,d);else D(l,r,d);return r},f=function e(l){var r=[];return l.forEach(function(d){d instanceof Array?r=r.concat(e(d)):r.push(d)}),r},U=function(l,r){var d=A.__parse(l,r),h=o(d,[],"normal");return f(h).join(", ")};export{U as default};
