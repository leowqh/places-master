import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Result from './Result';

class Form extends Component {
  constructor(){
    super();
    this.state={
      addr: '',
      name: '',
      result: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit(e){

    const newQuery ={
      name: this.state.name,

    };
    e.preventDefault();
    axios.post('/getplaces',qs.stringify(newQuery))
    .then((result) =>{
       this.setState({result: result.data});
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  render() {
    return (
      <div>
      <div className="jumbotron text-center">
        <h1>Search Your Heroes with NUMBERS!!!</h1>
        <p>heroes from any kind of comics!!</p>
      </div>

      <div className="row container text-center">

          <div className="col-sm-12">
             <form onSubmit={this.onSubmit}>
               <div className="form-group">
                 <label htmlFor="addr">Enter Number:</label>
                 <input id="name" name="name" className="form-control" type="text" placeholder="enter from 1 to 731 " value={this.state.name}
                 onChange={this.onChange}/>
                 <p></p>

                 <input type="submit" value="Send" />
               </div>

             </form>
          </div>


      </div>
      <Result list={this.state.result} />
</div>
    );
  }
}

export default Form;
