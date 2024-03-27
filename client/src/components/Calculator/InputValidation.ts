function validateInput(expression: string, type:string) : boolean {
    
    if(((expression.match(/\(/g) || []).length!==(expression.match(/\)/g) || []).length)) {return false}
      expression=expression.replace(/log\(|abs\(|pow\(|sqrt\(|nthRoot\(|exp\(|PI|cos\(|sin\(|tan\(|\*|\/|\-|\+|\^|\%|1|2|3|4|5|6|7|8|9|0|\(|\)/g, "")
    expression=expression.replace(/\s/g,"")
    if(type==="implicit"){ expression=expression.replace(/x|y/g,"")}
    if(type==="polar") {expression=expression.replace(/theta/g,"")}
    if(type==="parametric") {expression=expression.replace(/t/g,"")}
    if(type==="linear") {expression=expression.replace(/x/g,"")}
    expression=expression.replace(/\s/g,"")
    if(expression.length===0){return true}
  
    return false
}
export {validateInput}