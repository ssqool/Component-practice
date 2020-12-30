import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {

  state = {
    results: {}, // {[id]: succes error}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'succes' 'error' } храним информацию о текущем клике пользователя
    quiz: [
      {
        question: 'Какого цвета небо?',
        rightAnswerId: 2,
        id: 1,
        answers: [
          {text: 'Черный', id: 1},
          {text: 'Синий', id: 2},
          {text: 'Красный', id: 3},
          {text: 'Зеленый', id: 4}
        ]
      },
      {
        question: 'В каком году основан Киев',
        rightAnswerId: 1,
        id: 2,
        answers: [
          {text: 482, id: 1},
          {text: 331, id: 2},
          {text: 525, id: 3},
          {text: 679, id: 4}
        ]
      }
    ]
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if(!results[question.id]) {
        results[question.id] = 'success'

        this.setState({
          answerState: {[answerId]: 'success'},
          results
        })
      }

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results // results: results
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  buttonOnRetry = () => {
    this.setState({
      isFinished: false,
      results: {},
      activeQuestion: 0,
      answerState: null,
    })

  }

  render() {
    return (
      <div className={classes.Quiz} >
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {
            this.state.isFinished
              ? <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.buttonOnRetry}
                />
              : <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
          }
        </div>
      </div>
    )
  }
}

export default Quiz
