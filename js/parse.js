(function() {

  window.data =
    [{
      "id": "user_age_question",
      "question": "Сколько вам лет?",
      "answers": [{
        "answer": "<18",
        "transition": "user_not_sean_bean_leaf"
      }, {
        "answer": "18-30",
        "transition": "user_not_sean_bean_leaf"
      }, {
        "answer": "30-60",
        "transition": "user_where_born"
      }, {
        "answer": ">60",
        "transition": "user_not_sean_bean_leaf"
      }]
    }, {
      "id": "user_where_born",
      "question": "Вы родились в Англии?",
      "answers": [{
        "answer": "Да, в Англии",
        "transition": "user_actor"
      }, {
        "answer": "Нет, не в Англии",
        "transition": "user_not_sean_bean_leaf"
      }]
    }, {
      "id": "user_actor",
      "question": "Вы актер?",
      "answers": [{
        "answer": "Да",
        "transition": "user_witch_actor"
      }, {
        "answer": "Нет",
        "transition": "user_not_sean_bean_leaf"
      }]
    }, {
      "id": "user_witch_actor",
      "question": "Где вы играете?",
      "answers": [{
        "answer": "В театре для взрослых=)",
        "transition": "user_game_sound"
      }, {
        "answer": "В кино",
        "transition": "user_game_sound"
      }, {
        "answer": "В ТЮЗе",
        "transition": "user_not_sean_bean_leaf"
      }]
    }, {
      "id": "user_game_sound",
      "question": " Озвучивали компьютерные игры?",
      "answers": [{
        "answer": "Да",
        "transition": "user_film_count"
      }, {
        "answer": "Нет",
        "transition": "user_not_sean_bean_leaf"
      }, {
        "answer": "Повторите предыдущий вопрос, пожалуйста",
        "transition": "user_witch_actor"
      }]
    }, {
      "id": "user_film_count",
      "question": "В скольких фильмах вас убили",
      "answers": [{
        "answer": " Ни в одном",
        "transition": "user_not_sean_bean_leaf"
      }, {
        "answer": "Точно не помню, но много",
        "transition": "user_cut_head"
      }, {
        "answer": "Не более 6ти",
        "transition": "user_not_sean_bean_leaf"
      }]
    }, {
      "id": "user_cut_head",
      "question": "Вам отрубали голову в одном из фильмов",
      "answers": [{
        "answer": "Да, в игре престолов, на глазах у собственной дочери моим собственным клинком!",
        "transition": "user_sean_bean"
      }, {
        "answer": "Вроде да",
        "transition": "user_name"
      }, {
        "answer": "Нет",
        "transition": "user_not_sean_bean_leaf"
      }]
    }, {
      "id": "user_name",
      "question": "Как вас зовут?",
      "answers": [{
        "answer": " Шон",
        "transition": "user_surname"
      }, {
        "answer": "Джон",
        "transition": "user_not_sean_bean_leaf"
      }, {
        "answer": "Иначе",
        "transition": "user_not_sean_bean_leaf"
      }]
    }, {
      "id": "user_surname",
      "question": " Какая у вас фамилия?",
      "answers": [{
        "answer": "Бин",
        "transition": "user_sean_bean"
      }, {
        "answer": "Бин, но скажите, что я не шон бин",
        "transition": "user_not_sean_bean_leaf"
      }, {
        "answer": "Петров",
        "transition": "user_not_sean_bean_leaf"
      }]
    }, {
      "id": "user_not_sean_bean_leaf",
      "question": "Вы не Шон Бин"
    }, {
      "id": "user_sean_bean",
      "question": "Поздравляю, вы Шон Бин! \n https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%BD,_%D0%A8%D0%BE%D0%BD  ",
    }]


})()