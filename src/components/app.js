import React from 'react'

const WORDS1 = ['アツアツの', 'ひきたて', 'ホクホクの', 'パラパラの', 'ホカホカの']
const WORDS2 = ['ゴハン', 'コーヒー', 'イモ', 'ココア', 'チャーハン']

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        1: {
          word: WORDS1[0],
          charactor: WORDS1[0][0]
        },
        2: {
          word: WORDS2[0],
          charactor: WORDS2[0][0]
        }
      }
    }
  }

  componentWillUpdate() {
    console.log(this.state)
  }

  render() {
    return (
      <div className="container mt-3">
        <div className='row'>
          <div className="col-md-8">
            <h2 className="mb-3 site-title">ゴツゴツのアハン<br /><span>ジェネレーター</span></h2>
            <Result data={ this.state.data }/>
            <div className='row input-form'>
              <div className='col-6 mb-3'>
                <p className='input-form__title'>単語1</p>
                <div className='mb-2'>
                  <WordSelect
                    words={ WORDS1 }
                    onChange={ (e) => this.handleWordChange(e, 1) }
                  />
                </div>
                <div className='form-row mb-2 input-form__charactor1'>
                  <div className='col'>
                    <CharactorSelect
                      word={ this.state.data[1].word }
                      onChange={ (e) => this.handleCharactorChange(e, 1) }
                      value={ this.state.data[1].charactor }
                    />
                  </div>
                  <div className='col text-center col-form-label'>
                    <span>交換→</span>
                  </div>
                </div>
              </div>
              <div className='col-6'>
                <p className='input-form__title'>単語2</p>
                <div className='mb-2'>
                  <WordSelect
                    words={ WORDS2 }
                    onChange={ (e) => this.handleWordChange(e, 2) }
                  />
                </div>
                <div className='form-row mb-2 input-form__charactor1'>
                  <div className='col text-center col-form-label'>
                    <span>←交換</span>
                  </div>
                  <div className='col'>
                    <CharactorSelect
                      word={ this.state.data[2].word }
                      onChange={ (e) => this.handleCharactorChange(e, 2) }
                      value={ this.state.data[2].charactor }
                    />
                  </div>
                </div>
              </div>
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
          word: event.target.value,
          charactor: splitWord(event.target.value)[0]
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
          word: this.state.data[key].word,
          charactor: event.target.value
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
  const youon = ['ゃ', 'ゅ', 'ょ', 'ャ', 'ュ', 'ョ']
  return [...word].map((e, i, array) => {
      if(youon.includes(array[i])) {
        return
      } else if(i == array.length || !youon.includes(array[i + 1])) {
        return e
      } else {
        return e + array[i + 1]
      }
    })
    .filter((e) => { return e })
    .filter((e, i, self) => self.indexOf(e) === i)
}

export default App
