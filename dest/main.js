function debounce(func, delay) {
  let timeout;
  return function executedFunc(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, delay);
  };
}

let handleChangeHeader = () => {
  const header = document.querySelector(".header");
  const heading = document.querySelector(".--h1");
  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    const heightHeader = header.offsetHeight;
    let heightHeading = heading.offsetHeight;
    const getBoundingTop = heading.getBoundingClientRect();
    const content = getBoundingTop.top + heightHeading + heightHeader;
    if (content < scrollY) {
      header.classList.add("is-changebg");
    } else {
      header.classList.remove("is-changebg");
    }
  });
};
handleChangeHeader();

let handleProgressbar = () => {
  const progressbar = document.querySelector("body .progressbar");
  window.addEventListener("scroll", () => {
    const heightBody = document.body.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const pecentPages = (
      (scrollY / (heightBody - innerHeight)) *
      100
    ).toFixed();
    progressbar.style.width = `${pecentPages}%`;
  });
};

let handleBackToTop = () => {
  const bactotop = document.querySelector(".footer__bottom-backtotop");
  window.addEventListener("scroll", () => {
    const heightBody = document.body.offsetHeight / 2;
    const scrollY = window.scrollY;
    if (scrollY >= heightBody) {
      bactotop.classList.add("is-show");
    } else {
      bactotop.classList.remove("is-show");
    }
  });
  bactotop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};
handleBackToTop();

let handleMenuMobile = () => {
  const hambuger = document.querySelector(".header__hambuger");
  const navMenu = document.querySelector(
    ".header .header__left .header__left-nav"
  );
  const span = document.querySelector(".header__hambuger span");
  const blur = document.querySelector(".header__left-nav .blur");
  const noneBackToTop = document.querySelector(".footer__bottom-backtotop");
  hambuger.addEventListener("click", () => {
    navMenu.classList.toggle("is-openmenu");
    span.classList.toggle("is-active");
    blur.classList.toggle("is-blur");
    noneBackToTop.classList.toggle("is-none");
  });

  let handlResize = () => {
    window.addEventListener("resize", () => {
      let widthWindow = window.innerWidth;
      navMenu.style.transition = "0s";
      if (widthWindow >= 768) {
        navMenu.classList.remove("is-openmenu");
        span.classList.remove("is-active");
        blur.classList.remove("is-blur");
      }
    });
    window.addEventListener(
      "resize",
      debounce(() => {
        navMenu.style.transition = null;
      }, 500)
    );
  };
  handlResize();
};

let handlePopup = () => {
  const videoThumb = document.querySelector(".video__thumb");
  const iframe = document.querySelector(
    ".popup .popup__container .popup__container-video iframe"
  );
  const popup = document.querySelector(".popup");
  const close = document.querySelector(
    ".popup .popup__container .popup__container-video .close"
  );
  const popupContainer = document.querySelector(".popup__container");
  if (popup) {
    let handleDataVideo = () => {
      let getDataVideo = videoThumb.getAttribute("data-video");
      iframe.setAttribute(
        "src",
        `https://www.youtube.com/embed/${getDataVideo}?autoplay=1`
      );
    };
    let removePopup = () => {
      popup.classList.remove("is-open");
      iframe.setAttribute("src", "");
    };
    videoThumb.addEventListener("click", () => {
      popup.classList.add("is-open");
      handleDataVideo();
    });
    popup.addEventListener("click", () => {
      removePopup();
    });
    close.addEventListener("click", () => {
      removePopup();
    });
    popupContainer.addEventListener("click", (e) => e.stopPropagation());
  }
};
handleMenuMobile();
let handleSliderCard = () => {
  const cardList = document.querySelector(".card__list");
  if (cardList) {
    let flkty = new FlickityResponsive(cardList, {
      cellAlign: "center",
      contain: true,
      prevNextButtons: false,
      wrapAround: true,
      draggable: ">1",
      groupCells: 2,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            cellAlign: "left",
            groupCells: 1,
          },
        },
      ],
      on: {
        ready: function () {
          console.log("Flickity is ready");
          window.addEventListener("resize", () => {
            handleHeightCard();
          });
        },
        change: function () {
          console.log("Slide changed to");
        },
      },
    });
    // hàm sử lí chiều cao của card
  }
};
let handleHeightCard = () => {
  const desc = document.querySelectorAll(".card__list-item .desc");
  let highestHeight = 0;
  desc.forEach((items) => {
    let heightItems = items.offsetHeight; // Lấy chiều cao của từng đoạn văn bản
    if (heightItems > highestHeight) {
      highestHeight = heightItems;
    }
    items.style.height = `${highestHeight}px`;
  });
};
handleSliderCard();

let handleLoading = () => {
  let loadingCount = 0;
  const getBody = document.querySelector("body");
  const imgs = document.querySelectorAll("img").length;
  const imgLoaded = imagesLoaded(getBody);
  imgLoaded
    .on("progress", (instance) => {
      loadingCount++;
      let percent = ((loadingCount / imgs) * 100).toFixed();
      handlePercent(percent);
    })
    .on("always", (instance) => {
      console.log("always");
    })
    .on("fail", (instance) => {
      console.log(instance);
    })
    .on("done", (instance) => {
      console.log("done");
      handlePageLoading();
    });

  let handlePercent = (percent) => {
    let progress = document.querySelector(".loading .loading__progress");
    let loadingPercent = document.querySelector(
      ".loading .loading__page-percent"
    );
    progress.style.width = `${percent}%`;
    loadingPercent.innerHTML = `${percent}%`;
  };
  let handlePageLoading = () => {
    let loading = document.querySelector(".loading");
    loading.classList.add("--is-loaded");
    getBody.classList.add("--disable-scroll");
  };
};

let handleAccordion = () => {
  const question = document.querySelectorAll(
    ".accordion .accordion__list .accordion__list-question .content .content__question"
  );
  question.forEach((item, index) => {
    item.addEventListener("click", () => {
      question.forEach((item, _index) => {
        if (_index === index) return;
        item.classList.remove("active");
        item.nextElementSibling.style.maxHeight = null;
      });
      item.classList.toggle("active");
      let answer = item.nextElementSibling;
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
};
handleAccordion();

// hàn valitor
let handleValidateForm = () => {
  let Validator = (options) => {
    let validate = (input, rule) => {
      let message = input.parentElement.querySelector(options.errorSelector);
      let error = rule.test(input.value);
      if (error) {
        message.innerText = error;
        input.classList.add("invalid");
      } else {
        message.innerText = "";
        input.classList.remove("invalid");
      }
    };
    let form = document.querySelector(options.form.form_1);
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        options.rules.forEach((rule) => {
          let input = form.querySelector(rule.selector);
          validate(input, rule);
        });
      });
      options.rules.forEach((rule) => {
        let input = form.querySelector(rule.selector);
        let message = input.parentElement.querySelector(options.errorSelector);
        if (input) {
          input.addEventListener("blur", () => {
            validate(input, rule);
            input.classList.remove("changeborder");
          });
          // xử lí khi nhập
          input.addEventListener("input", () => {
            message.innerText = "";
            input.classList.remove("invalid");
            if (!input.value == "") {
              input.classList.add("changeborder");
            } else {
              input.classList.remove("changeborder");
            }
          });
        }
      });
    }
  };
  // Please fill in the correct format
  // định nghĩa các rulus nguyên tắc
  Validator.isRequired = function (selector) {
    return {
      selector: selector,
      test: function (value) {
        return value.trim() ? undefined : "Please fill in this field";
      },
    };
  };
  Validator.isEmail = function (selector) {
    return {
      selector: selector,
      test: function (value) {
        if (!value.trim()) {
          return "Please fill in this field";
        }
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // return regex.test(value) ? undefined : 'Please fill in this field';
        if (!regex.test(value)) {
          return "Please enter the correct format email";
        }
        // Trường hợp giá trị hợp lệ
        return undefined;
      },
    };
  };
  Validator({
    // form này là một form lớn
    // đây là cách check form có thể dùng lại với các form khác
    form: {
      form_1: "#form-1",
      form_2: "#form-2",
    },
    errorSelector: ".message",
    rules: [
      //isRequired: bắt buộc
      // #fullname, #email, #password là lấy ra các input
      Validator.isRequired("#fullname"),
      Validator.isEmail("#email"),
      Validator.isRequired("#company"),
      Validator.isRequired("#subject"),
    ],
  });

  let handleFormSub = () => {
    const form = document.querySelector(".subscribe__form");
    const input = document.querySelector(
      ".subscribe__form .subscribe__form-group .input"
    );
    const mess = document.querySelector(".subscribe__form .message");
    let isInvalidEmail = (value) => {
      const regexUsernam = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regexUsernam.test(value);
    };
    if (form) {
      let handleCheckEmail = () => {
        const valueEmail = input.value.trim();
        if (valueEmail == "") {
          mess.innerText = "Please fill in this field";
        } else if (!isInvalidEmail(valueEmail)) {
          mess.innerText = "Please enter the correct format email";
        } else {
          mess.innerText = "";
        }
      };
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleCheckEmail();
      });
    }
  };
  handleFormSub();
};
handleValidateForm();

let handleTabs = () => {
  const postsTab = document.querySelectorAll(".posts__tab-item");
  const newsList = document.querySelectorAll(".posts .wrapper .news__list");
  postsTab.forEach((item, index) => {
    item.addEventListener("click", () => {
      let getNewList = newsList[index];
      if (!getNewList.classList.contains("active")) {
        document
          .querySelector(".posts .wrapper .news__list.active")
          .classList.remove("active");
        getNewList.classList.add("active");
        document
          .querySelector(".posts__tab-item.is-tab-active")
          .classList.remove("is-tab-active");
        item.classList.add("is-tab-active");
      }
    });
  });
};
handleTabs();

let handlePagination = () => {
  const pagingItem = document.querySelectorAll(
    ".posts__pagination-paging li a"
  );
  const btnPrev = document.querySelector(".posts__pagination .--prev");
  const btnNext = document.querySelector(".posts__pagination .--next");
  const postsPagination = document.querySelector(".posts__pagination");
  let currentIndex = 0;
  if (postsPagination) {
    pagingItem.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        if (!item.classList.contains("is-active")) {
          document
            .querySelector(".posts__pagination-paging li a.is-active")
            .classList.remove("is-active");
          item.classList.add("is-active");
          currentIndex = index;
        }
        updateBtn();
      });
    });
    btnPrev.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updatePagination();
      }
    });
    btnNext.addEventListener("click", () => {
      if (currentIndex < pagingItem.length - 1) {
        currentIndex++;
        updatePagination();
      }
    });
    function updatePagination() {
      document
        .querySelector(".posts__pagination-paging li a.is-active")
        .classList.remove("is-active");
      pagingItem[currentIndex].classList.add("is-active");
      updateBtn();
    }
    function updateBtn() {
      btnPrev.classList.toggle("is-disable", currentIndex === 0);
      btnNext.classList.toggle(
        "is-disable",
        currentIndex === pagingItem.length - 1
      );
    }
  }
};
window.addEventListener("load", () => {
  handleLoading();
  handleSliderCard();
  handleProgressbar();
  handlePopup();
  handlePagination();
});
