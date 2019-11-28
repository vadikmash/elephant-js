(this["webpackJsonpelephant-js"]=this["webpackJsonpelephant-js"]||[]).push([[0],{28:function(e,t,a){e.exports=a(38)},33:function(e,t,a){},38:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(10),i=a.n(c),o=(a(33),a(9)),s=a(53),l=a(52),u=a(11),f=a(4),m=a(17),h=a(18),v=a(21),d=function(){function e(){Object(u.a)(this,e),this.state={}}return Object(f.a)(e,[{key:"setState",value:function(e){this.state=Object.assign(this.state,e)}}]),e}(),w=a(8),g=a(23),b=a(5),O=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(m.a)(this,Object(h.a)(t).call(this))).execute=function(t){t.trim().split("\n").forEach((function(t){var a,n,r,c=t.split(" ").filter((function(e){return e})),i=Object(g.a)(c),o=i[0],s=i.slice(1);if(o){if("C"===o){if(e.canvas)throw new Error("Canvas has already been created!");var l;(l=e).createCanvas.apply(l,Object(w.a)(s))}else if(!e.canvas)throw new Error("Cannot execute command ".concat(o,". \n              Create canvas (use 'C' command) before drawing!"));switch(o){case"C":break;case"L":(a=e).drawLine.apply(a,Object(w.a)(s));break;case"R":(n=e).drawRectangle.apply(n,Object(w.a)(s));break;case"B":(r=e).bucketFilling.apply(r,Object(w.a)(s));break;default:throw new Error("Command '".concat(o,"' was not found!"))}e.updateResult()}}))},e.createCanvas=function(t,a){e.checkArguments([t,a],"C","create canvas");var n=+a,r=+t,c=Array(r+2).fill(" ");c[0]="|",c[c.length-1]="|";var i=Array(r+2).fill("-"),o=new Array(n+2).fill().map((function(){return Object(w.a)(c)}));o[0]=i,o[o.length-1]=i,e.canvas={height:n,width:r,matrix:o}},e.isOutOfRange=function(t,a){var n=e.canvas,r=n.width,c=n.height;return+t<0||+a<0||+t>r||+a>c},e.drawLine=function(t,a,n,r){e.checkArguments([t,a,n,r],"L","draw line");var c=+t,i=+a,o=+n,s=+r;if(e.isOutOfRange(c,i)||e.isOutOfRange(o,s))throw new Error("Out of range!");if(i!==s){if(c!==o)throw new Error("Only vertical and horisintal lines are allowed!");for(var l=i<s?s:i,u=i<s?i:s;u<=l;++u)e.canvas.matrix[u][c]="x"}else for(var f=c<o?o:c,m=c<o?c:o;m<=f;++m)e.canvas.matrix[i][m]="x"},e.drawRectangle=function(t,a,n,r){if(e.checkArguments([t,a,n,r],"R","draw rectangle"),e.isOutOfRange(t,a)||e.isOutOfRange(n,r))throw new Error("Out of range!");e.drawLine(t,a,t,r),e.drawLine(t,a,n,a),e.drawLine(n,r,t,r),e.drawLine(n,r,n,a)},e.bucketFilling=function(t,a,n){var r=Object(b.a)(e).isOutOfRange;if(e.checkArguments([t,a],"B","paint bucket"),r(t,a))throw new Error("Out of range!");if(!n)throw new Error("No filling argument provided!");var c=+t,i=+a;n=n[0];var o=e.canvas.matrix[i][c];e.canvas.matrix[i][c]=n,function t(a,c,i){r(a,c)||i===e.canvas.matrix[c][a]||(r(a,c-1)||e.canvas.matrix[c-1][a]!==i||(e.canvas.matrix[c-1][a]=n,t(a,c-1,i)),r(a+1,c)||e.canvas.matrix[c][a+1]!==i||(e.canvas.matrix[c][a+1]=n,t(a+1,c,i)),r(a,c+1)||e.canvas.matrix[c+1][a]!==i||(e.canvas.matrix[c+1][a]=n,t(a,c+1,i)),r(a-1,c)||e.canvas.matrix[c][a-1]!==i||(e.canvas.matrix[c][a-1]=n,t(a-1,c,i)))}(c,i,o)},e.getResult=function(){if(e.canvas)return e.state.result;throw new Error("No result to return!")},e.canvas=null,e.state={isCanvasCreated:!1,result:""},e}return Object(v.a)(t,e),Object(f.a)(t,[{key:"checkArguments",value:function(e,t,a){e.forEach((function(n){if("number"!==typeof+n||isNaN(+n)||+n<0||!Number.isInteger(+n))throw new Error("Invalid arguments (".concat(e,") for command '").concat(t,"' - ").concat(a,"!"))}))}},{key:"updateResult",value:function(){this.state.result+=this.canvas.matrix.map((function(e){return e.join("")})).join("\n")+"\n"}}]),t}(d),p=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(m.a)(this,Object(h.a)(t).call(this))).execute=function(t){var a=new O;if(!t)throw new Error("No script to execute!");try{a.execute(t);var n=a.getResult();e.setState({result:n})}catch(r){throw r}},e.getResult=function(){return e.state.result},e.downloadResult=function(){var t=e.getResult(),a=document.createElement("a");a.download="drawing.txt";var n=new Blob([t],{type:"text/plain"});a.href=window.URL.createObjectURL(n),a.click()},e.state={script:"",result:""},e}return Object(v.a)(t,e),Object(f.a)(t,[{key:"loadFromFile",value:function(e,t){var a=this;if(e){var n=new FileReader;n.onloadend=function(e){if(e.target.readyState!==FileReader.DONE)throw new Error("A problem occured while reading file.");a.setState({script:e.target.result});try{a.execute(a.state.script)}catch(n){t&&t(n.message)}},n.readAsBinaryString(e)}}}]),t}(d),j=function(){var e=x(),t=Object(n.useRef)(),a=Object(n.useState)(""),c=Object(o.a)(a,2),i=c[0],l=c[1],u=Object(n.useState)(null),f=Object(o.a)(u,2),m=f[0],h=f[1],v=Object(n.useState)(""),d=Object(o.a)(v,2),w=d[0],g=d[1];Object(n.useEffect)((function(){return h(new p)}),[]);return r.a.createElement("div",{className:e.main},r.a.createElement("input",{id:"file-input",type:"file",name:"name",accept:".txt",style:{display:"none"},ref:t,onChange:function(e){g("");try{m.loadFromFile(e.target.files[0],g);var a=t.current.value;l(a)}catch(n){g(n.message)}}}),r.a.createElement("div",null,r.a.createElement("div",{className:e},r.a.createElement(s.a,{className:e.button,variant:"contained",color:"primary",onClick:function(){t.current.click()}},"Upload Script"),r.a.createElement(s.a,{className:e.button,variant:"contained",color:"secondary",onClick:function(){g("");try{m.downloadResult()}catch(e){g(e.message)}}},"Download Result")),r.a.createElement("div",null,"Chosen file: ",i),r.a.createElement("div",null,w)))},x=Object(l.a)((function(e){return{main:{height:"10vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"},button:{margin:"5px","&:hover":{transform:"scale(1.05)"},"&:active":{transform:"scale(1)"}},buttonContainer:{display:"flex"}}})),y=function(){var e=E(),t=Object(n.useState)(null),a=Object(o.a)(t,2),c=a[0],i=a[1],s=Object(n.useState)("The result is gonna be shown here"),l=Object(o.a)(s,2),u=l[0],f=l[1];Object(n.useEffect)((function(){return i(new p)}),[]);return r.a.createElement("div",{className:e.main},r.a.createElement("textarea",{className:e.textarea,onChange:function(e){f("");try{c&&c.execute(e.target.value),f(c.getResult())}catch(t){f(t.message)}},autoFocus:!0,defaultValue:"C 20 4\nL 1 2 6 2\nL 6 3 6 4 \nR 16 1 20 3\nB 10 3 o"}),r.a.createElement("textarea",{className:e.output,readOnly:!0,value:u}))},E=Object(l.a)((function(e){return{main:{height:"90vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"},textarea:{height:"80vh",flex:1,margin:"10px",padding:"10px",fontSize:"3vh",fontFamily:"Courier"},output:{height:"80vh",flex:1,margin:"10px",padding:"10px",fontSize:"3vh",lineHeight:"2.7vh",fontFamily:"Courier"}}})),R=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(j,null),r.a.createElement(y,null))},k=function(){return r.a.createElement(R,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[28,1,2]]]);
//# sourceMappingURL=main.4bf4acd6.chunk.js.map