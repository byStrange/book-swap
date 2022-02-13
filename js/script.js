const pickerOpts = {
  types: [
    {
      description: "Images",
      accept: {
        "image/*": [".png", ".gif", ".jpeg", ".jpg", ".svg"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};
class MessageBox {
  constructor(title, text, isDone) {
    this.title = title;
    this.text = text;
    this.isDone = isDone;
    this.isError = isDone;
    this.domElement = "";
    this.del = function () {
      try {
        let tl = anime
          .timeline({
            targets: this.domElement,
          })
          .add({
            translateX: [0, 400],
            opacity: [1, 0],
          })
          .finished(() => {
            el.remove();
          });
      } catch (er) {
        console.log("animation deleted with other way");
      }
    };
    this.close = `let el = this.parentElement.parentElement.parentElement;let tl = anime.timeline({targets: el}).add({translateX: [0, 400], opacity: [1, 0]}).finished.then(function () {el.remove()})`;
  }
  shortStr(str, len) {
    if (str.length < len) {
      return str;
    } else {
      return str.slice(0, len) + "...";
    }
  }
  makeTemplate() {
    let render = `
        <div class="message" isDone="${this.isDone}">
          <div class="icon" ${!this.isError
        ? 'style="background:rgba(255,0,0,.2)"'
        : 'style="background: rgba(0,255,0,.2)"'
      }>
            ${this.isError
        ? '<i class="fas fa-check-circle" style="color:#2d8217"></i>'
        : '<i class="fas fa-times-circle" style="color: red"></i>'
      }
          </div>
          <div class="content">
            <div class="title">
              <span>${this.title}<span>
            </div> 
            <div class="text">
              <span>${this.shortStr(this.text, 60)}</span>
            </div>
          </div>
          <div class="close">
            <i class="fas fa-times" onclick="${this.close}"></i>
          </div>
        </div> 
      `;
    this.template = render;
  }
  show() {
    this.makeTemplate();
    let container = document.createElement("section");
    container.className = "message-container";
    container.innerHTML = this.template;
    document.body.appendChild(container);
    anime({
      targets: container,
      translateX: [300, 0],
      opacity: [0, 1],
    });
    this.domElement = container;
  }
}

let userNameInput = document.querySelector('#userName'),
  password = document.querySelector('#password'),
  next = document.querySelector('#next')
if (userNameInput && password && next) {
  next.onclick = function () {
    if (userNameInput.value == '' || password.value == '') {
      let msgbox = new MessageBox('Ogohlantirish', 'Username va Parolni kiriting', false)
      msgbox.show()
      setTimeout(() => {
        msgbox.del()
      }, 2500)
    } else {
      window.open('advertisement.html?name=' + userNameInput.value)
    }
  }
}

function toggleAppearancePassword(el) {
  el.forEach(
    e => {
      e.onclick = function () {
        let isPassword = e.previousElementSibling.type == 'password' ? true : false
        if (isPassword) {
          e.previousElementSibling.type = 'text';
          e.className = "fas fa-eye-slash"
        } else {
          e.previousElementSibling.type = 'password'
          e.className = 'fas fa-eye'
        }
      }
    }
  )
}
toggleAppearancePassword(document.querySelectorAll('#toggleEye'))

let heartImgs = document.querySelectorAll('a  .top-img-header')
if (heartImgs) {
  heartImgs.forEach(heart => {
    heart.onclick = function () {
      let isLiked = this.src.includes('23') ? true : false
      if (isLiked) {
        this.src = 'image/Vector (31).png'
      } else {
        heartAnimation(heart.parentElement.parentElement.querySelector('.heart'))
        this.src = 'image/Vector (23).png';
      }
    }
  })
}
function heartAnimation(el) {
  let isLiked = el.parentElement.querySelector('.top-img-header').src.includes('23') ? true : false;
  if (isLiked) {
    el.parentElement.querySelector('.top-img-header').src = 'image/Vector (31).png'
    let msgbox = new MessageBox(
      "Eslatma",
      "Kitob sevimli kitoblar ro'yxatidan olib tashlandi",
      true
    );
    setTimeout(() => {
      msgbox.del();
    }, 6000);
    msgbox.show();
    el.parentElement.classList.remove("liked");
  } else {
    el.parentElement.querySelector('.top-img-header').src = 'image/Vector (23).png'
    let msgbox = new MessageBox(
      "Eslatma",
      "Kitob sevimli kitoblar ro'yxatiga qo'shildi",
      true
    );
    setTimeout(() => {
      msgbox.del();
    }, 6000);
    msgbox.show();
    el.parentElement.classList.add("liked");
    let animation = anime
      .timeline({
        targets: el,
      })
      .add({
        scale: [0, 1],
        opacity: [0, 1],
      });
    animation.finished.then(function () {
      el.style.opacity = 0;
    });
  }
}
let cardBooks = document.querySelectorAll('.card-wr');
if (cardBooks) {
  cardBooks.forEach(card => {
    card.ondblclick = function () {
      heartAnimation(this.querySelector('.heart'))
    }
  })
}


async function upload(e, bgimg = false) {
  [file] = await window.showOpenFilePicker(pickerOpts);
  let img = await file.getFile();
  let fr = new FileReader();
  fr.readAsDataURL(img);
  fr.onloadend = function (r) {
    if (bgimg) {
      e.style.backgroundColor = "";
      e.style.backgroundImage = `url(${fr.result})`;
    }
    e.src = fr.result;
  };
}
let anchors = document.querySelectorAll(".navbar-nav .nav-item .nav-link");
if (anchors) {
  let move_tag = document.querySelector(".navbar-nav .move");
  anchors.forEach((link) => {
    link.onmouseenter = function () {
      move_tag.style.left = this.offsetLeft + 8 + "px";
      move_tag.style.opacity = 1;
      move_tag.style.width = this.getBoundingClientRect().width - 8 * 2 + "px";
    };
    link.onmouseleave = function () {
      move_tag.style.opacity = 0;
    };
  });
}
function setMore() {
  let cardNoA = document.querySelectorAll('.card-wr .card-text-wr a:nth-of-type(1)')
  let cards = document.querySelectorAll('.card-wr .card-text-wr')
  if (cards) {
    cards.forEach(card => {
      let more = document.createElement('a')
      more.className = 'hover';
      more.innerHTML = 'Batafsil <i class="fas fa-arrow-right"></i>';
      more.href = 'reworkbook.html'
      card.appendChild(more)
    })
  }
  if (cardNoA) {
    cardNoA.forEach(a => {
      a.className = 'hover-no'
    })
  }
}
setMore()

let dropBtn = document.querySelectorAll(".dropdown .dropdown-toggle");
let links = document.querySelectorAll(".dropdown-menu .dropdown-item");
if (dropBtn) {
  dropBtn.forEach((btn) => {
    btn.onclick = function (e) {
      this.parentElement
        .querySelector("#" + this.getAttribute("data-toggle"))
        .classList.toggle("show");
    };
  });
}

if (links) {
  links.forEach((item) => {
    item.onclick = function (e) {
      let inp = this.parentElement.parentElement.querySelector("#data");
      inp.value = this.getAttribute("value")
        ? this.getAttribute("value")
        : this.innerText;
      this.parentElement.parentElement.querySelector("#text").innerText =
        inp.value;
    };
  });
}