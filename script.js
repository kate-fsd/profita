$("document").ready(() => {
  const $modal = $(".modal");
  const $form = $(".form");
  const $message = $(".message");

  // ------- Slider --------------

  const splide = new Splide(".splide", {
    autoWidth: true,
    type: "loop",
    speed: 3000,
    arrows: false,
    pagination: false,
    drag: false,
    rewind: false,
  });

  splide.mount();

  document.addEventListener("wheel", (ev) => {
    const slides = Math.floor(Math.abs(ev.deltaY) / 120) || 1;
    const sign = ev.deltaY > 0 ? "+" : "+";
    splide.go(`${sign}${slides}`);
  });

  // ------- Modal --------------

  const openModal = () => $modal.addClass("modal_open");

  const closeModal = () => {
    $modal.removeClass("modal_open");
    $form.removeClass("form_hidden");
    $message.removeClass("message_success message_error");
  };

  const toggleModal = () => {
    if ($modal.hasClass("modal_open")) {
      closeModal();
    } else {
      openModal();
    }
  };

  $(".main__button").on("click", toggleModal);

  $modal.on("click", (ev) => {
    if ([...ev.target.classList].includes("modal_open")) {
      closeModal();
    }
  });

  $(".modal__close-button").on("click", closeModal);

  $(".message__button").on("click", closeModal);

  // ------- Form --------------

  $form.on("submit", (ev) => {
    ev.preventDefault();

    $.ajax({
      method: "POST",
      url: "api/mail",
      data: $form.serialize(),
    })
      .done(() => {
        $message.addClass("message_success");
        downloadFile("/profita.pdf", "profita.pdf");
      })
      .fail(() => {
        $message.addClass("message_error");
      })
      .always(() => {
        $form.addClass("form_hidden");
        $form.trigger("reset");
      });

    return false;
  });
});

function downloadFile(url, fileName) {
  fetch(url, { method: "get", mode: "no-cors", referrerPolicy: "no-referrer" })
    .then((res) => res.blob())
    .then((res) => {
      const aElement = document.createElement("a");
      aElement.setAttribute("download", fileName);
      const href = URL.createObjectURL(res);
      aElement.href = href;
      aElement.setAttribute("target", "_blank");
      aElement.click();
      URL.revokeObjectURL(href);
    });
}
