<template>
  <div>
    <the-header/>
    <main>
      <div class="container">
        <div class="row">	
          <article class="col-sm-8">	
            <section>	
              <h2 class="quiz-question-h2">	
                <img	
                  class="quiz-question__logo"	
                  src="/images/what-is-mark.png"	
                />	
                第{{ state.quizNumber }}問	
              </h2>	
              <p>{{ state.title }}</p>	
              <div v-if="state.imageSrc">	
                <img	
                  class="img-responsive"	
                  id="quiz-image"	
                  :src="'/images/quiz/' + state.imageSrc"	
                />	
              </div>
              <div class="quiz-answer__list">	
                <ul>	
                  <li v-for="(answer, index) in state.answers" :key="index">
                  <a>
                    <button
                    @click="goAnswer(index + 1)"
                    :disabled="state.isAlreadyAnswered"
                    >{{ index + 1 }}
                    </button>
                  </a>
                  {{ answer }}
                </li>
              </ul>
            </div>
            <div class="text-right">カテゴリー: {{ state.categoryName }}</div>
          </section>
          <section>
            <h2 class="quiz-correct-h2">
              <img class="quiz-correct__logo" src="/images/correct-mark.png" />正解
            </h2>
            <p>
              <button class="quiz-correct-answer"
                v-show="state.isAlreadyAnswered"
                disabled
              >
              {{ state.correctAnswerNo }}
              </button>
            </p>
            <button class="quiz-show-answer" v-show="!state.isAlreadyAnswered">正解を表示する</button>
            <div class="alert alert-info" v-show="state.isCorrect">
              <strong>正解!</strong>
            </div>
            <div class="alert alert-danger" v-show="state.isMistake">
              <strong>不正解!</strong>
            </div>
          </section>
          <section>
            <h2 class="quiz-commentary-h2">
              <img class="quiz-commentary__logo" src="/images/commentary-mark.png" />解説
            </h2>
            <div
              class="quiz-commentary__text"
              v-show="state.isAlreadyAnswered"
            >
            {{ state.commentary }}
            </div>
            <button
              type="button"
              class="btn btn-primary d-block mx-auto quiz-next__button"
              v-if="!state.isQuizFinish"
            >
            次の問題へ
            </button>
            <button
              type="button"
              class="d-block mx-auto quiz-finish__button"
              data-bs-toggle="modal"
              data-bs-target="#modal-result"
              v-if="state.isQuizFinish"
            >
            結果を見る
            </button>
          </section>
          </article>
          <the-sidebar/>
        </div>
      </div>
    </main>
    <the-footer/>
  </div>
</template>

<script>
  import TheHeader from './layout/TheHeader';
  import TheFooter from './layout/TheFooter';
  import TheSidebar from './layout/TheSidebar';
  import { reactive, onMounted } from "@vue/composition-api";

  export default {
    components: {
      TheHeader,
      TheFooter,
      TheSidebar,
    },

    setup(props, context) {
      const state = reactive({
        quizData: [],
        title: "",
        imageSrc: "",
        answers: [],
        commentary: "",
        correctAnswerNo: 0,
        isCorrect: false, //正解かどうか
        isMistake: false, //間違いかどうか
        isAlreadyAnswered: false, //回答済みかどうか
        isQuizFinish: false, //クイズが終了したかどうか
        score: 0,
        quizNumber: 1,
        categoryName: "",
      });
      onMounted(() => {
        const router = context.root.$router;
        const categories = router.app.$route.query.categories;

        context.root.$http
          .get(`/api/quiz?categories=${categories}`)
          .then((response) => {
            state.quizData = response.data;
            findNextQuiz(0);
          });
      });

      const findNextQuiz = (quizNumber) => {
        state.title = state.quizData[quizNumber].title;
        state.answers = [
          state.quizData[quizNumber].answer.answer_1,
          state.quizData[quizNumber].answer.answer_2,
          state.quizData[quizNumber].answer.answer_3,
          state.quizData[quizNumber].answer.answer_4
        ];
        state.commentary = state.quizData[quizNumber].answer.commentary;
        state.correctAnswerNo = state.quizData[quizNumber].answer.correct_answer_no;
        state.categoryName = state.quizData[quizNumber].category.name;
      }
      return {
        state,
        findNextQuiz,
      };
    },
  };
</script>