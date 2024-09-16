let tbody = document.getElementsByTagName("tbody")[0];
let btnAdd = document.getElementById("addSub");
let gradeSub = document.getElementById("gradeSub");
let nameSub = document.getElementById("nameSub");
let hoursSub = document.getElementById("hoursSub");
let calc = document.getElementById("calc");
let gpaAlert = document.getElementById("gpaAlert");
let gpa = document.getElementById("gpa");
let percentBd = document.getElementById("percentBd");

let grades = {
  "A+": 4,
  A: 3.85,
  "A-": 3.7,
  "B+": 3.3,
  B: 3,
  "C+": 2.7,
  C: 2.3,
  "D+": 2,
  F: 0,
};

Object.keys(grades).forEach(function (e) {
  let option = document.createElement("option");
  gradeSub.append(option);
  option.value = grades[e];
  option.textContent = e;
});

let gradesBeforeCalc = [];

let allHours = [];

let degrees = [];
// localStorage.clear();
if (localStorage.getItem("gpaTable")) {
  tbody.innerHTML = localStorage.getItem("gpaTable");
}

// let constructedSelect = document.createElement("select");

// constructedSelect.classList.add("form-control");

// Object.keys(grades).forEach(function (e) {
//   let option = document.createElement("option");
//   option.value = grades[e];
//   option.textContent = e;
//   constructedSelect.append(option);
// });

// document.body.append(constructedSelect);

btnAdd.onclick = function () {
  if (nameSub.value && hoursSub.value) {
    let tr = document.createElement("tr");
    tbody.append(tr);

    let tdName = document.createElement("td");
    tdName.setAttribute("contenteditable", "true");
    tdName.textContent = nameSub.value;
    tr.append(tdName);

    let tdHours = document.createElement("td");
    tdHours.setAttribute("contenteditable", "true");
    tdHours.textContent = hoursSub.value;
    tr.append(tdHours);

    let tdGrades = document.createElement("td");
    tdGrades.append(gradeSub.cloneNode(true));
    tr.append(tdGrades);
    tdGrades.firstElementChild.setAttribute("value", gradeSub.value);
    tdGrades.firstElementChild.value = gradeSub.value;

    let tdDelete = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-danger", "delete");
    deleteBtn.textContent = "حذف";
    deleteBtn.onclick = function () {
      tr.remove();
    };
    tdDelete.append(deleteBtn);
    tr.append(tdDelete);

    localStorage.setItem("gpaTable", tbody.innerHTML);
    nameSub.focus();
    nameSub.value = "";
  }
};

setInterval(function () {
  localStorage.setItem("gpaTable", tbody.innerHTML);
}, 100);

calc.onclick = function () {
  tbody.querySelectorAll("tr").forEach(function (e) {
    console.log(
      e.lastElementChild.firstElementChild.value * e.children[1].textContent
    );
  });
};

if (document.getElementsByTagName("select").length != 0) {
  document.querySelectorAll("select").forEach(function (e, i) {
    if (i > 0) e.value = e.getAttribute("value");
    e.onchange = function () {
      e.setAttribute("value", e.value);
    };
  });
}

window.onload = function () {
  if (document.getElementsByClassName("delete").length != 0) {
    document.querySelectorAll(".delete").forEach(function (e) {
      e.onclick = function () {
        e.parentElement.parentElement.remove();
      };
    });
  }

  tbody.querySelectorAll("tr").forEach(function (e) {
    allHours.push(e.children[1].textContent);
  });

  sum = allHours.reduce(function (e, ac) {
    return Number(e) + +ac;
  });
  console.log(sum);
};

calc.onclick = function () {
  let checkFail = 0;
  this.remove();
  if (document.getElementsByTagName("tbody")[0].children != 0) {
    gpaAlert.style.display = "block";
    gpaAlert.scrollIntoView({ behavior: "smooth" });
    document
      .getElementsByTagName("tbody")[0]
      .querySelectorAll("tr")
      .forEach(function (e) {
        gradesBeforeCalc.push(
          e.children[1].textContent * e.children[2].firstElementChild.value
        );
        gpa.textContent = (
          gradesBeforeCalc.reduce(function (e, ac) {
            return +e + +ac;
          }) / sum
        ).toFixed(3);
        if (e.children[2].firstElementChild.value == 0) {
          checkFail++;
        }
      });

    // console.log((gpa.textContent / 4) * 100);
    percent = (gpa.textContent / 4) * 100;
    percentBd.textContent = percent.toFixed(3);
    if (percent > 95) {
      grade.textContent = `ممتاز مرتفع`;
    } else if ((percent >= 90) & (percent < 95)) {
      grade.textContent = `ممتاز`;
    } else if ((percent >= 85) & (percent < 90)) {
      grade.textContent = `ممتاز منخفض`;
    } else if ((percent >= 80) & (percent < 85)) {
      grade.textContent = `جيد جدا مرتفع`;
    } else if ((percent >= 75) & (percent < 80)) {
      grade.textContent = `جيد جدا`;
    } else if ((percent >= 70) & (percent < 75)) {
      grade.textContent = `جيد مرتفع`;
    } else if ((percent >= 65) & (percent < 70)) {
      grade.textContent = `جيد`;
    } else if ((percent >= 60) & (percent < 65)) {
      grade.textContent = `مقبول`;
    } else if (percent < 60) {
      grade.textContent = `_____`;
    }

    console.log(checkFail);
    if (checkFail != 0 && checkFail < 3) {
      grade.textContent += ` لكن راسب في ${checkFail} مادة`;
    }
  }
};
