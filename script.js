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
      data: $(this).serialize(),
    })
      .done(() => {
        $message.addClass("message_success");
      })
      .fail(() => {
        $message.addClass("message_error");
      })
      .always(() => {
        $form.addClass("form_hidden");
        $(this).trigger("reset");
      });

    return false;
  });
});
