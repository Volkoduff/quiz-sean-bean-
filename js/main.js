'use strict';

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

  var
    KEY_TO_CHECK_LINK = '\n',
    FIRST_QUESTION_INDEX = 0,
    CRUMP_MAX_LENGTH = 16,
    CRUMP_BEGIN_LENGTH = 8,

    BreadCrumpLength = {
      total: 16,
      startLength: 8,
      endLength: 8
    }

  var quizQuestionInit = function() {
    // window.handlers.removeDefaultButtonHandler();
    // window.handlers.removeRepeatButtonHandler();
    
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
      var questionString = this.data[this.indexOfCurrentStep].question;
      var linkMarker = this.isLinkInString(questionString);
      if (linkMarker) {
        quizTitle.textContent = this.getLinkInString(questionString)[0];
        var textContentForLink = this.getLinkInString(questionString)[1];
        var link = document.createElement('a');
        link.href = textContentForLink;
        link.textContent = textContentForLink;
        quizTitle.appendChild(link)
      } else {
        quizTitle.textContent = questionString;
      }
    },

    getLinkInString: function(string) {
      var stringWithLink;
      stringWithLink = string.split(KEY_TO_CHECK_LINK);
      return stringWithLink;
    },

    isLinkInString: function(string) {
      var cuttedWords = [];
      var isStringALink = false;
      this.splittedString = string.split(' ');
      this.splittedString.map(function(word) {
        cuttedWords.push(word.slice(0, KEY_TO_CHECK_LINK.length))
      })
      cuttedWords.forEach(function(word) {
        if (word === KEY_TO_CHECK_LINK) {
          isStringALink = true;
        }
      })
      return isStringALink;
    },

    getTransitionNextIdToCurrent: function() {
      this.getIdMap();
      this.reloadCrumbsDatasetArray();
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

    getIndexOfNextStep: function() {
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
      this.areThereAnswersInDataObj = this.data[this.indexOfCurrentStep].answers;
      if (this.areThereAnswersInDataObj !== undefined) {
        this.breadcrumbAppend(this.getCrumb());
      }
    },

    getCrumb: function() {
      this.getTextOfQuestion();
      var breadcrumb = templateForBreadcrumb.cloneNode(true);
      this.breadcrumpLink = breadcrumb.querySelector('.breadcrumb');
      if (this.crumbQuestion.length > BreadCrumpLength.total) {
        shortCrumb = this.crumbQuestion
          .slice(0, BreadCrumpLength.startLength)
          .concat(' ... ', this.crumbQuestion.slice(-BreadCrumpLength.endLength));
        this.breadcrumpLink.textContent = shortCrumb;
      } else {
        this.breadcrumpLink.textContent = this.crumbQuestion;
      }
      return breadcrumb;
    },

    breadcrumbAppend: function(breadcrumb) {
      var crumbIndex = this.breadcrumpLink.dataset.index = this.indexOfCurrentStep;
      var isCrumbsDuplicated = this.checkForNotToDuplicateCrumbs(crumbIndex);
      if (isCrumbsDuplicated) {
        breadcrumbsList.appendChild(breadcrumb);
      }
    },

    getTextOfQuestion: function() {
      this.crumbQuestion = this.data[this.indexOfCurrentStep].question;
    },

    checkForNotToDuplicateCrumbs: function(crumbIndex) {
      var crumbsIndexesArray = [];
      var allBreadcrumpLinks = document.querySelectorAll('.breadcrumb');
      var isCrumbNotReapeated = true;
      allBreadcrumpLinks.forEach(function(link, index) {
        crumbsIndexesArray.push(link.dataset.index);
        if (link.dataset.index == crumbIndex) {
          isCrumbNotReapeated = false;
          quizStep.removeExcessCrumb();
        }
      })
      return isCrumbNotReapeated;
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
    var isRadioChoosed = false;
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