import React from 'react'

var Select
var Option
var Detail

// select data component
export class Selector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: props.title
    }
  }
  // invoked before render, get data before
  componentDidMount () {
    fetch('https://api.github.com/users/h02e56/followers')
      .then(response => response.json())
      .then(result => {
        this.setState({
          data: result
        })
      })
  }
  render () {
    return <Select {...this.state} />
  }
}

Selector.propTypes = { title: React.PropTypes.string }
Selector.defaultProps = { title: 'choose an option' }

// select view component
Select = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: -1
    }
    this.change = (e) => {
      this.setState ({
        selected: e.target.selectedIndex -1
      })
    }
  }

  render () {
    let data = this.props.data
    let selected = this.state.selected
    if (!data.length) return (<span>loading...</span>)

    // get all options
    var opt = data.map((item, i) => {
      return (<Option key={i} {...item} />)
    })
    return (<li>
      <h5>{this.props.about}</h5>
      <select onChange={this.change}>
        <option value='-1'>{this.props.title}</option>
        {opt}
      </select>
      <p>
        <Detail {...data[selected]} />
      </p>
    </li>
    )
  }
}

// select option component
Option = class extends React.Component {
  render () {
    return <option value={this.props.id} key={this.props.key}> {this.props.login}</option>
  }
}

// detail info component
Detail = class extends React.Component {
  render () {
    let data = this.props
    if (data.id) {
      return (<ul>{
          Object.keys(data).map(function (key) {
            return <li>{key}: <span>{data[key]}</span></li>
          })
        }</ul>
      )
    }
    else return (<span></span>)
  }
}

