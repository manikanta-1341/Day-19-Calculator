var container = document.createElement("div");
container.className = "calculator";
container.innerHTML=`<table></table>`
var title = document.createElement("h1");
title.id = "title";
title.innerText = `Calculator`;
var description = document.createElement("p");
description.id = "description";
description.innerText = "For simple calculations";
document.body.append(title, description,container);
document.querySelector("table").innerHTML = `<table cellspacing="20" cellpadding="6" >
    <tr><td colspan="4"><input type="text" id="mini" maxlength="20"></td></tr>
    <tr><td colspan="4"><input type="text" class="main" id="result" maxlength="20" placeholder="0"></td></tr>
    <tr>
        <td><button id="clear" onclick="all_clear()" >C</button></td>
        <td><button  id="bs" onclick="backspace()">BS</button></td>
        <td><button  id="(" value="(" onclick="display(event.target.innerText)">(</button></td>
        <td><button  id=")" value=")" onclick="display(event.target.innerText)">)</button></td>
    </tr>
    <tr>
        <td><button id="7" value="7" onclick="display(event.target.innerText)">7</button></td>
        <td><button id="8" value="8" onclick="display(event.target.innerText)">8</button></td>
        <td><button id="9" value="9" onclick="display(event.target.innerText)">9</button></td>
        <td><button id="divison" onclick="divison()">/</button></td>
        
    </tr>
    <tr>
        <td><button id="4" value="4"  onclick="display(event.target.innerText)">4</button></td>
        <td><button id="5" value="5"  onclick="display(event.target.innerText)">5</button></td>
        <td><button id="6" value="6"  onclick="display(event.target.innerText)">6</button></td>
        <td><button id="multiplication" onclick="mul()">x</button></td>
        
    </tr>
    <tr>
        <td><button  id="1" value="1"  onclick="display(event.target.innerText)">1</button></td>
        <td><button  id="2" value="2"  onclick="display(event.target.innerText)">2</button></td>
        <td><button  id="3" value="3"  onclick="display(event.target.innerText)">3</button></td>
        <td><button id="subtract" onclick="subtract()">-</button></td>
        
    </tr>
    <tr>
        <td><button id="0" value="0"  onclick="display(event.target.innerText)">0</button></td>
        <td><button  id="." value="."  onclick="display(event.target.innerText)">▪️</button></td>
        <td><button  id="equal" value="="  onclick="equal()"  class="equal_btn">=</button></td>
        <td><button id="add" onclick="add()">+</button></td>
    </tr>`;
var main_display = document.querySelector(".main");
var mini_display = document.querySelector("#mini");

document.onkeydown = (event) => {
  // console.log(event.key,event.keyCode)
  if (
    (parseInt(event.key)>=0 && parseInt(event.key)<= 9) ||
    event.key == "." ||
    event.key == "(" ||
    event.key == ")") 
  {
    display(event.key);
  } else if (event.key == "*") {
    mul();
  } else if (event.key == "+") {
    add();
  } else if (event.key == "-") {
    subtract();
  } else if (event.key == "/") {
    divison();
  } else if (event.key == "Backspace") {
    backspace();
  } else if (event.key == "Escape") {
    all_clear();
  } else if (event.key == "Enter") {
    equal(main_display.value);
  }
  else {
    if(!event.key == "(" && !event.key == ")")
   return alert("Only Numbers are allowed");
  }
};

function display(code) {
  if (code == "▪️") {
    if(main_display.value.includes(".")){
      return
    }
    else{
    return (main_display.value += ".");}
  } else {
    console.log(code)
    return (main_display.value += code);
  }
}

function backspace() {
  let value = main_display.value;
  if (value.length < 0) return;
  if (value == "Cannot divide by zero") return (main_display.value = 0);
  value = value.split("");
  value.pop();
  main_display.value = value.join("");
}

function all_clear(value) {
  main_display.value = "";
  mini_display.value = "";
  main_display.placeholder = "0";
}

function add() {
  let str = main_display.value;
  let mini = mini_display.value;
  if (
    (mini[mini.length - 1] == "-" ||
      mini[mini.length - 1] == "*" ||
      mini[mini.length - 1] == "/") &&
    main_display.value == ""
  ) {
    mini = mini.split("");
    mini[mini.length - 1] = "+";
    return (mini_display.value = mini.join(""));
  }
  main_display.value += "+";
  if (str.includes("(")) {
    return;
  } else {
    if (mini_display.value != "") {
      main_display.value = "";
      let num = mini_display.value + str;
      for (var i = 0; i < num.length; i++) {
        if (Number.isNaN(num[0]) || i > 0) {
          switch (num[i]) {
            case "+":
              num = num.split("+").map(Number);
              mini_display.value = num.reduce((acc, cv) => acc + cv) + "+";
              main_display.value = "";
              break;
            case "-":
              num = num.split("-").map(Number);
              mini_display.value = num.reduce((acc, cv) => acc - cv) + "+";
              main_display.value = "";
              break;
            case "*":
              num = num.split("*").map(Number);
              mini_display.value = num.reduce((acc, cv) => acc * cv) + "+";
              main_display.value = "";
              break;
            case "/":
              num = num.split("/").map(Number);

              if (num[1] == 0) {
                main_display.value = `Cannot divide by zero`;
                mini_display.value = "";
                break;
              } else {
                mini_display.value = num.reduce((acc, cv) => acc / cv) + "+";
                main_display.value = "";
                break;
              }
          }
        }
      }
    } else {
      mini_display.value += main_display.value;
      main_display.value = "";
    }
  }
}

function subtract() {
  let str = main_display.value;
  let mini = mini_display.value;
  if (
    (mini[mini.length - 1] == "+" ||
      mini[mini.length - 1] == "*" ||
      mini[mini.length - 1] == "/") &&
    main_display.value == ""
  ) {
    mini = mini.split("");
    mini[mini.length - 1] = "-";
    return (mini_display.value = mini.join(""));
  }
  main_display.value += "-";
  if (str.includes("(")) {
    return;
  } else {
    if (mini_display.value != "") {
      main_display.value = "";
      let num = mini_display.value + str;
      for (var i = 0; i < num.length; i++) {
        if (Number.isNaN(num[0]) || i > 0) {
          switch (num[i]) {
            case "+":
              num = num.split("+").map(Number);
              mini_display.value = num.reduce((acc, cv) => acc + cv) + "-";
              main_display.value = "";
              break;
            case "-":
              num = num.split("-").map(Number);

              mini_display.value = num.reduce((acc, cv) => acc - cv) + "-";
              main_display.value = "";
              break;
            case "*":
              num = num.split("*").map(Number);
              mini_display.value = num.reduce((acc, cv) => acc * cv) + "-";
              main_display.value = "";
              break;
            case "/":
              num = num.split("/").map(Number);
              if (num[1] == 0) {
                main_display.value = `Cannot divide by zero`;
                mini_display.value = "";
                break;
              } else {
                mini_display.value = num.reduce((acc, cv) => acc / cv) + "-";
                main_display.value = "";
                break;
              }
          }
        }
      }
    } else {
      mini_display.value += main_display.value;
      main_display.value = "";
    }
  }
}

function mul() {
  let str = main_display.value;
  let mini = mini_display.value;
  if (
    (mini[mini.length - 1] == "-" ||
      mini[mini.length - 1] == "+" ||
      mini[mini.length - 1] == "/") &&
    main_display.value == ""
  ) {
    mini = mini.split("");
    mini[mini.length - 1] = "*";
    return (mini_display.value = mini.join(""));
  }
  main_display.value += "*";
  if (str.includes("(")) {
    return;
  } else {
    if (mini_display.value != "") {
      main_display.value = "";
      let num = mini_display.value + str;
      for (var i = 0; i < num.length; i++) {
        if (Number.isNaN(num[0]) || i > 0) {
          switch (num[i]) {
            case "+":
              num = num.split("+").map(Number);
              mini_display.value = num.reduce((acc, cv) => acc + cv) + "*";
              main_display.value = "";
              break;
            case "-":
              num = num.split("-").map(Number);
              mini_display.value = num.reduce((acc, cv) => acc - cv) + "*";
              main_display.value = "";
              break;
            case "*":
              num = num.split("*").map(Number);
              mini_display.value = num.reduce((acc, cv) => acc * cv) + "*";
              main_display.value = "";
              break;
            case "/":
              num = num.split("/").map(Number);
              if (num[1] == 0) {
                main_display.value = `Cannot divide by zero`;
                mini_display.value = "";
                break;
              } else {
                mini_display.value = num.reduce((acc, cv) => acc / cv) + "*";
                main_display.value = "";
                break;
              }
          }
        }
      }
    } else {
      mini_display.value += main_display.value;
      main_display.value = "";
    }
  }
}

function divison() {
  let str = main_display.value;
  let mini = mini_display.value;
  if (
    (mini[mini.length - 1] == "-" ||
      mini[mini.length - 1] == "*" ||
      mini[mini.length - 1] == "*") &&
    main_display.value == ""
  ) {
    mini = mini.split("");
    mini[mini.length - 1] = "/";
    return (mini_display.value = mini.join(""));
  }
  main_display.value += "/";
  if (str.includes("(")) {
    return;
  } else {
    if (mini_display.value != "") {
      main_display.value = "";
      let num = mini_display.value + str;

      for (var i = 0; i < num.length; i++) {
        if (Number.isNaN(num[0]) || i > 0) {
          switch (num[i]) {
            case "+":
              num = num.split("+").map(Number);
              mini_display.value = num.reduce((acc, cv) => acc + cv) + "/";
              main_display.value = "";
              break;
            case "-":
              num = num.split("-").map(Number);
              mini_display.value = num.reduce((acc, cv) => acc - cv) + "/";
              main_display.value = "";
              break;
            case "*":
              num = num.split("*").map(Number);
              mini_display.value = num.reduce((acc, cv) => acc * cv) + "/";
              main_display.value = "";
              break;
            case "/":
              num = num.split("/").map(Number);
              if (num[1] == 0) {
                main_display.value = `Cannot divide by zero`;
                mini_display.value = "";
                break;
              } else {
                mini_display.value = num.reduce((acc, cv) => acc / cv) + "/";
                main_display.value = "";
                break;
              }
          }
        }
      }
    } else {
      mini_display.value += main_display.value;
      main_display.value = "";
    }
  }
}

function equal() {
  let str = main_display.value;
  if (str.includes("(")) {
    let value = main_display.value;
    main_display.value = evaluate(mini_display.value + str);
    mini_display.value += value;
  } else {
    if (mini_display.value != "") {
      main_display.value = "";
      let num = mini_display.value + str;
      for (var i = 0; i < num.length; i++) {
        if (Number.isNaN(num[0]) || i > 0) {
          switch (num[i]) {
            case "+":
              num = num.split("+").map(Number);
              main_display.value = num.reduce((acc, cv) => acc + cv);
              mini_display.value = "";
              break;
            case "-":
              num = num.split("-").map(Number);
              main_display.value = num.reduce((acc, cv) => acc - cv);
              mini_display.value = "";
              break;
            case "*":
              num = num.split("*").map(Number);
              main_display.value = num.reduce((acc, cv) => acc * cv);
              mini_display.value = "";
              break;
            case "/":
              num = num.split("/").map(Number);
              if (num[1] == 0) {
                main_display.value = `Cannot divide by zero`;
                mini_display.value = "";
                break;
              } else {
                main_display.value = num.reduce((acc, cv) => acc / cv);
                mini_display.value = "";
                break;
              }
          }
        }
      }
    }
  }
}

function evaluate(exp) {
  let str = exp.split("");
  let values = [];
  let opts = [];
  for (var i = 0; i < str.length; i++) {
    if (str[i] >= "0" && str[i] <= "9") {
      let sbuf = "";
      while (i < str.length && str[i] >= "0" && str[i] <= "9") {
        sbuf = sbuf + str[i++];
      }
      values.push(parseInt(sbuf, 10));
      i--;
    } else if (str[i] == "(") {
      opts.push(str[i]);
    } else if (str[i] == ")") {
      while (opts[opts.length - 1] != "(") {
        values.push(applyop(opts.pop(), values.pop(), values.pop()));
      }
      opts.pop();
    } else if (
      str[i] == "+" ||
      str[i] == "-" ||
      str[i] == "*" ||
      str[i] == "/"
    ) {
      while (
        opts.length > 0 &&
        Precedence(str[i]) <= Precedence(opts[opts.length - 1])
      ) {
        values.push(applyop(opts.pop(), values.pop(), values.pop()));
      }
      opts.push(str[i]);
    }
  }
  while (opts.length > 0) {
    values.push(applyop(opts.pop(), values.pop(), values.pop()));
  }

  return values.join("");
}

function Precedence(op) {
  if (op == "+" || op == "-") {
    return 1;
  } else if (op == "*" || op == "/") {
    return 2;
  }
}

function applyop(op, op2, op1) {
  switch (op) {
    case "+":
      return op1 + op2;
    case "-":
      return op1 - op2;
    case "*":
      return op1 * op2;
    case "/":
      if (op1 == "0") {
        return "Cannot divide by 0";
      } else {
        return op1 / op2;
      }
  }
}
