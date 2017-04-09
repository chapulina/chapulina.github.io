var filter = [];

$(document).ready(function () {

  // first time user touches the screen
  document.addEventListener('touchstart', function addtouchclass(e){
    // add "can-touch" class to document root using classList API
    document.documentElement.classList.add('can-touch')
    // de-register touchstart event
    document.removeEventListener('touchstart', addtouchclass, false)
  }, false)

  // Init Isotope
  let $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    sortBy : 'random',
    masonry: {
      columnWidth: 30,
    }
  })

  // Layout Isotope after each image loads
  $grid.imagesLoaded().progress(function() {
    $grid.isotope('layout');
  });

  // On checkbox change
  $('#options').on('change', function(jQEvent) {
    var $checkbox = $(jQEvent.target);

    manageCheckbox($checkbox);

    var join = filter.join('')
    $grid.isotope({ filter: join });
  });

  // Check / uncheck boxes and fill filter
  function manageCheckbox($checkbox) {
    var checkbox = $checkbox[0];

    // All
    var isAll = $checkbox.hasClass('all');
    if (isAll) {
      // Reset filter
      filter = []

      // Check if unchecked, never uncheck
      $checkbox.prop('checked', true)
      $checkbox.parent().addClass('active');

      // Uncheck all others
      $checkbox.parent().siblings().children('input').prop('checked', false);
      $checkbox.parent().siblings('label').removeClass('active');
    }

    // Check if it's already in the filter
    var index = $.inArray(checkbox.value, filter);

    // Not all
    if (!isAll) {

      if (checkbox.checked) {

        // Check this
        $checkbox.parent().addClass('active');

        // Uncheck all
        $checkbox.parent().siblings().children('input.all').prop('checked', false);
        $checkbox.parent().siblings('label.all').removeClass('active');

        // Add to filter
        if (index === -1) {
          filter.push(checkbox.value);
        }
      }
      else {

        // Uncheck this
        $checkbox.parent().removeClass('active');

        // Remove from filter
        filter.splice(index, 1);

        // If unchecked the last box, check all
        let others = $checkbox.parent().siblings('label').children()
        for (var i =0; i < others.length; ++i) {
          if (others[i].checked)
            return
        }

        $checkbox.parent().siblings().children('input.all').prop('checked', true);
        $checkbox.parent().siblings('label.all').addClass('active');
      }
    }
  }
})
