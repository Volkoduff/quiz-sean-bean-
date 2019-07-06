(function() {
  var form = document.querySelector('.radios-wrap');
  var backButton = document.querySelector('.button_back');
  var forwardButton = document.querySelector('.button_next');
  var nextButton = document.querySelector('.button_next');
  var breadcrumbsList = document.querySelector('.breadcrumbs__list');
  var BUTTON_BEGIN_TEXT = 'Начать снова';

  form.addEventListener('change', function() {
    var checkedValue = form.querySelector('input[name="answer"]:checked').value;
    window.main.quizStep.radioValue = checkedValue;
    window.main.quizStep.isRadioChoosed = true;
    nextButton.disabled = false;

  });

  var nextButtonFunctionalityToggle = {
    forwardFunctionalityOn: function() {
      removeRepeatButtonHandler();
      addDefaultNextButtonHandler();
    },
    initiallFunctionalityOn: function() {
      removeDefaultButtonHandler();
      addRepeatButtonHandler();
    }
  };

  var addDefaultNextButtonHandler = function() {
    forwardButton.addEventListener('click', renderNextQuestion);
  };

  var removeRepeatButtonHandler = function() {
    forwardButton.removeEventListener('click', renderFirstQuestion);
  };

  var removeDefaultButtonHandler = function() {
    forwardButton.removeEventListener('click', renderNextQuestion);
  };

  var addRepeatButtonHandler = function() {
    nextButton.textContent = BUTTON_BEGIN_TEXT;
    forwardButton.addEventListener('click', renderFirstQuestion);
  };

  var renderFirstQuestion = function() {
    window.main.quizStep.setCurrentIndexToDefault();
    breadcrumbsList.innerHTML = '';
    renderQuestion();
  };

  var renderNextQuestion = function() {
    window.main.quizStep.stepNext();
    window.main.quizStep.getTransitionIdToCurrent();
    renderQuestion();
  };

  backButton.addEventListener('click', function() {
    window.main.quizStep.stepBack();
    window.main.quizStep.removeExcessCrumb();
    window.main.quizStep.questionAppend();
    window.main.quizStep.radioInputsAppend();
  });

  var addHandlerToCrumbs = function() {
    var breadcrumbs = document.querySelectorAll('.breadcrumbs__element');
    breadcrumbs.forEach(function(el) {
      el.addEventListener('click', function(evt) {
        getTargetIndex(evt);
        initRenderAccordingTargetIndex();
      });
    })
  };

  var getTargetIndex = function(event) {
    var breadcrumbIndex = event.target.dataset.index;
    window.main.quizStep.indexOfCurrentStep = breadcrumbIndex;
  };

  var initRenderAccordingTargetIndex = function(argument) {
    window.main.quizStep.removeExcessCrumb();
    window.main.quizStep.questionAppend();
    window.main.quizStep.radioInputsAppend();
  };

  var renderQuestion = function() {
    window.main.quizQuestionInit();
    addHandlerToCrumbs()
  };

  window.handlers = {
    nextButtonFunctionalityToggle: nextButtonFunctionalityToggle
  };


})()