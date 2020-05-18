import React from 'react'

const WORDS1 = ['アツアツの', 'ひきたて', 'ホクホクの', 'パラパラの', 'ホカホカの']
const WORDS2 = ['ゴハン', 'コーヒー', 'イモ', 'ココア', 'チャーハン']

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        1: {
          words: WORDS1,
          word: WORDS1[0],
          charactor: WORDS1[0][0],
          wordInput: ''
        },
        2: {
          words: WORDS2,
          word: WORDS2[0],
          charactor: WORDS2[0][0],
          wordInput: ''
        }
      }
    }
  }

  render() {
    return (
      <div className="container mt-3">
        <div className='row'>
          <div className="col-md-8">
            <h2 className="mb-3 site-title">ゴツゴツのアハン<br /><span>ジェネレーター</span></h2>
            <Result data={ this.state.data }/>
            <div className='row input-form mb-2'>
              <div className='col-6'>
                <p className='input-form__title'>単語1</p>
                <div className='mb-2'>
                  <WordSelect
                    words={ this.state.data[1].words }
                    onChange={ (e) => this.handleWordChange(e, 1) }
                    value={ this.state.data[1].word }
                  />
                </div>
                <div className='form-row mb-2 input-form__charactor'>
                  <div className='col-7'>
                    <CharactorSelect
                      word={ this.state.data[1].word }
                      onChange={ (e) => this.handleCharactorChange(e, 1) }
                      value={ this.state.data[1].charactor }
                    />
                  </div>
                  <div className='col-5 text-center col-form-label'>
                    <span>交換→</span>
                  </div>
                </div>
                <form
                  className='form-row input-form__charactor'
                  onSubmit={ (e) => this.handleWordSubmit(e, 1) }
                >
                  <div className='col-sm-9 mb-2'>
                    <input
                      type='text'
                      className='form-control'
                      value={ this.state.data[1].wordInput }
                      onChange={ (e) => this.handleTextInput(e, 1) }
                    />
                  </div>
                  <div className='col-sm-3 col-form-label'>
                    <input
                      type='submit'
                      value='追加'
                      className='btn btn-secondary btn-sm'
                    />
                  </div>
                </form>
              </div>
              <div className='col-6'>
                <p className='input-form__title'>単語2</p>
                <div className='mb-2'>
                  <WordSelect
                    words={ this.state.data[2].words }
                    onChange={ (e) => this.handleWordChange(e, 2) }
                    value={ this.state.data[2].word }
                  />
                </div>
                <div className='form-row mb-2 input-form__charactor'>
                  <div className='col-5 text-center col-form-label'>
                    <span>←交換</span>
                  </div>
                  <div className='col-7'>
                    <CharactorSelect
                      word={ this.state.data[2].word }
                      onChange={ (e) => this.handleCharactorChange(e, 2) }
                      value={ this.state.data[2].charactor }
                    />
                  </div>
                </div>
                <form
                  className='form-row input-form__charactor'
                  onSubmit={ (e) => this.handleWordSubmit(e, 2) }
                >
                  <div className='col-sm-9 mb-2'>
                    <input
                      type='text'
                      className='form-control'
                      value={ this.state.data[2].wordInput }
                      onChange={ (e) => this.handleTextInput(e, 2) }
                    />
                  </div>
                  <div className='col-sm-3 col-form-label'>
                    <input
                      type='submit'
                      value='追加'
                      className='btn btn-secondary btn-sm'
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className='tweet-button mb-2'>
              <TweetButton data={ this.state.data }/>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleWordChange(event, updateKey) {
    const newData = {}
    Object.keys(this.state.data).forEach((key) => {
      if(key == updateKey) {
        newData[key] = {
          words: this.state.data[key].words,
          word: event.target.value,
          charactor: splitWord(event.target.value)[0],
          wordInput: this.state.data[key].wordInput
        }
      } else {
        newData[key] = this.state.data[key]
      }
    })
    this.setState({ data: newData })
  }

  handleCharactorChange(event, updateKey) {
    const newData = {}
    Object.keys(this.state.data).forEach((key) => {
      if(key == updateKey) {
        newData[key] = {
          words: this.state.data[key].words,
          word: this.state.data[key].word,
          charactor: event.target.value,
          wordInput: this.state.data[key].wordInput
        }
      } else {
        newData[key] = this.state.data[key]
      }
    })
    this.setState({ data: newData })
  }

  handleTextInput(event, updateKey) {
    const newData = {}
    Object.keys(this.state.data).forEach((key) => {
      if(key == updateKey) {
        newData[key] = {
          words: this.state.data[key].words,
          word: this.state.data[key].word,
          charactor: this.state.data[key].charactor,
          wordInput: event.target.value
        }
      } else {
        newData[key] = this.state.data[key]
      }
    })
    this.setState({ data: newData })
  }

  handleWordSubmit(_event, updateKey) {
    event.preventDefault()
    const newData = {}
    const newWord = filterKana(this.state.data[updateKey].wordInput)
    Object.keys(this.state.data).forEach((key) => {
      if(key == updateKey) {
        newData[key] = {
          words:
            newWord.length == 0 || this.state.data[key].words.includes(newWord) ?
              this.state.data[key].words : this.state.data[key].words.concat([newWord]),
          word:
            newWord.length == 0 || this.state.data[key].words.includes(newWord) ?
            this.state.data[key].word : newWord,
          charactor:
            newWord.length == 0 || this.state.data[key].words.includes(newWord) ?
              this.state.data[key].charactor : splitWord(newWord)[0],
          wordInput: ''
        }
      } else {
        newData[key] = this.state.data[key]
      }
    })
    this.setState({ data: newData })
  }
}

const WordSelect = (props) => {
  return (
    <select
      className='custom-select'
      onChange={ props.onChange }
      value={ props.value }
    >
      { props.words.map((e, i) => (<option value={ e } key={ i }>{ e }</option>)) }
    </select>
  )
}

const CharactorSelect = (props) => {
  return (
    <select
      className='custom-select'
      onChange={ props.onChange }
      value={ props.value }
    >
      { splitWord(props.word).map((e, i) => (<option value={ e } key={ i }>{ e }</option>)) }
    </select>
  )
}

const Result = (props) => {
  return (
    <div className="result my-3 mx-auto">
      <div className="result__text1">
        <span>
          {
            props.data[1].word.replace(new RegExp(props.data[1].charactor, 'g'), props.data[2].charactor)
          }
        </span>
      </div>
      <div className="result__text2">
        <span>
          {
            props.data[2].word.replace(new RegExp(props.data[2].charactor, 'g'), props.data[1].charactor)
          }
        </span>
      </div>
    </div>
  )
}

const splitWord = (word) => {
  const komoji = /[ぁぃぅぇぉゃゅょァィゥェォャュョ]/
  const muon = /[っッんンー〜!！?？]/
  return [...word].map((e, i, array) => {
      if(array[i].match(komoji) || array[i].match(muon)) {
        return
      } else if(i == array.length - 1 || !array[i + 1].match(komoji)) {
        return e
      } else {
        return e + array[i + 1]
      }
    })
    .filter((e) => { return e })
    .filter((e, i, self) => self.indexOf(e) === i)
}

const filterKana = (string) => {
  return string.replace(/[^ぁ-んァ-ンー〜!！?？]/g, '')
}

const resultText = (data) => {
  return (
    data[1].word.replace(new RegExp(data[1].charactor, 'g'), data[2].charactor) +
    data[2].word.replace(new RegExp(data[2].charactor, 'g'), data[1].charactor)
  )
}

const TweetButton = (props) => {
  const text =
    props.data[1].word + '%2B' + props.data[2].word + '%0A↓%0A' +
    resultText(props.data) + '%0A' + window.location + '%0A%23ゴツゴツのアハン'
  return (
    <a
      target='_blank'
      rel='nofollow noopener'
      href={ `https://twitter.com/intent/tweet?text=${text}` }
    >
      <i className="fab fa-twitter"></i><span>Tweet</span>
    </a>
  )
}

export default App
