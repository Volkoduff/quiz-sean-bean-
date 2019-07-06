(function() {

  var form = document.querySelector('.radios-wrap');
  var quizTitle = document.querySelector('.quiz__question-text');
  var templateForAnswers = document.querySelector('#radio-answer-template')
    .content.querySelector('.radio-wrap');
  var breadcrumbsList = document.querySelector('.breadcrumbs__list');
  var templateForBreadcrumb = document.querySelector('#breadcrumb-link-template')
    .content.querySelector('.breadcrumbs__element');
  var nextButton = document.querySelector('.button_next');
  var backButton = document.querySelector('.button_back');

  var FIRST_QUESTION_INDEX = 0;
  var CRUMP_MAX_LENGTH = 16;
  var CRUMP_BEGIN_LENGTH = 8;

  var BreadCrumpLength = {
    total: 16,
    startLength: 8,
    endLength: 8
  }

  var quizQuestionInit = function() {
    quizStep.questionAppend();
    quizStep.radioInputsAppend();
    quizStep.breadcrumbRender();
  }

  var Quiz = function(data) {
    this.data = data;
    this.indexOfCurrentStep = FIRST_QUESTION_INDEX;
    this.isRadioChoosed = false;
  };

  Quiz.prototype = {
    radioInputsAppend: function() {
      this.answersFromData = this.data[this.indexOfCurrentStep].answers;
      this.backButtonToggle();
      if (this.answersFromData !== undefined) {
        answersAppend();
        nextButtonOn();
      } else {
        initiallyButtonOn();
      }
    },

    questionAppend: function() {
      quizTitle.textContent = this.data[this.indexOfCurrentStep].question;
    },

    getTransitionIdToCurrent: function() {
      this.getIdMap();
      this.reloadCrumbsDatasetArray()
      this.indexOfCurrentStep = this.idToIndex[this.indexOfNextStep];
    },

    reloadCrumbsDatasetArray: function() {
      var datasetIndexArray = [];
      this.breadcrumbLinks = breadcrumbsList.querySelectorAll('li a');
      this.breadcrumbLinks.forEach(function(el) {
        datasetIndexArray.push(el.dataset.index)
      })
    },

    getIdMap: function() {
      this.idToIndex = {};
      this.data.forEach((el, index) => this.idToIndex[el.id] = index);
    },

    stepNext: function() {
      var answersToCheck = this.data[this.indexOfCurrentStep].answers;
      if (answersToCheck !== undefined) {
        answersToCheck.forEach((it, index) => {
          if (it.answer === this.radioValue)
            this.indexOfChosenValue = index;
        });
        this.indexOfNextStep = answersToCheck[this.indexOfChosenValue].transition;
      }
    },

    setCurrentIndexToDefault: function() {
      this.indexOfCurrentStep = FIRST_QUESTION_INDEX;
    },

    stepBack: function(targetEvent) {
      this.crumbs = breadcrumbsList.querySelectorAll('.breadcrumbs__element')
      if (this.crumbs.length > 1) {
        var previousCrumbIndex = this.crumbs[this.crumbs.length - 2].childNodes[1].dataset.index;
      }
      this.indexOfCurrentStep = previousCrumbIndex;
    },

    breadcrumbRender: function() {
      var breadcrumb = templateForBreadcrumb.cloneNode(true);
      var breadcrumpLink = breadcrumb.querySelector('.breadcrumb');
      var crumbIndex = breadcrumpLink.dataset.index = this.indexOfCurrentStep;
      var crumbQuestion = this.data[this.indexOfCurrentStep].question;
      if (crumbQuestion.length > BreadCrumpLength.total) {
        shortCrumb = crumbQuestion
          .slice(0, BreadCrumpLength.startLength)
          .concat(' ... ', crumbQuestion.slice(-BreadCrumpLength.endLength));
        breadcrumpLink.textContent = shortCrumb;
      } else {
        breadcrumpLink.textContent = crumbQuestion;
      }
      if (crumbIndex < 9) {
        breadcrumbsList.appendChild(breadcrumb);
      }
    },

    removeExcessCrumb: function() {
      var crumbList = document.querySelectorAll('.breadcrumbs__element')
      crumbList.forEach(el => {
        if (el.childNodes[1].dataset.index > this.indexOfCurrentStep) {
          el.remove();
        }
      })
    },

    backButtonToggle: function() {
      if (this.indexOfCurrentStep == FIRST_QUESTION_INDEX) {
        backButton.disabled = true;
      } else {
        backButton.disabled = false;
      }
    },

    answersAppend: function(dataArray) {
      var fragment = document.createDocumentFragment();
      var answersData = dataArray[this.indexOfCurrentStep].answers;
      if (answersData) {
        var answerContent = dataArray[this.indexOfCurrentStep].answers
          .forEach(function(it) {
            form.innerHTML = '';
            var answer = templateForAnswers.cloneNode(true);
            var radioInput = answer.querySelector('.radio_button');
            var radioLabel = answer.querySelector('.radio-label');
            var answerText = answer.querySelector('.radio-text');
            var tempContent = it.answer;
            answerText.textContent = tempContent;
            radioLabel.htmlFor = tempContent;
            radioInput.value = tempContent;
            radioInput.id = tempContent;
            fragment.appendChild(answer);
          });
      }
      return fragment;
    }
  }

  var quizStep = new Quiz(window.data)

  var answersAppend = function() {
    form.appendChild(quizStep.answersAppend(quizStep.data));
  }

  var nextButtonOn = function() {
    nextButton.textContent = 'Далее';
    isRadioChoosed = false;
    if (!isRadioChoosed) {
      nextButton.disabled = true;
    }
    window.handlers.nextButtonFunctionalityToggle.forwardFunctionalityOn();
  }

  var initiallyButtonOn = function() {
    form.innerHTML = '';
    window.handlers.nextButtonFunctionalityToggle.initiallFunctionalityOn();
  }

  quizQuestionInit();

  window.main = {
    quizStep: quizStep,
    quizQuestionInit: quizQuestionInit
  }

})()