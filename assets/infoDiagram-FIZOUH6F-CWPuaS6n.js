import{p as o}from"./gitGraph-YCYPL57B-MEVJTYR7-CWFrVLcQ.js";import{m as e,t as s,aT as n,C as d,aU as p}from"./mermaid.esm.min-Dk7ELP4U.js";import"./chunk-5ZJXQJOJ-B8pkc6hn.js";import"./app-CY5as1Zw.js";var m={parse:e(async r=>{let a=await o("info",r);s.debug(a)},"parse")},g={version:p},v=e(()=>g.version,"getVersion"),f={getVersion:v},l=e((r,a,i)=>{s.debug(`rendering info diagram
`+r);let t=n(a);d(t,100,400,!0),t.append("g").append("text").attr("x",100).attr("y",40).attr("class","version").attr("font-size",32).style("text-anchor","middle").text(`v${i}`)},"draw"),x={draw:l},w={parser:m,db:f,renderer:x};export{w as diagram};
