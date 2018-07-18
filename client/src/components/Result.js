import React from 'react';


const Result = props => {
  //console.log(props.list.length);

  return (
    <div className="row container-fluid">
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Aliases</th>
            <th>Publisher</th>
            <th>Gender</th>
            <th>Race</th>
            <th>Image</th>
          </tr>
          {props.list.map(result => {
            return (
              <tr key={result.name}>
                <td>{result.name}</td>
                <td>{result.aliases}</td>
                <td>{result.publisher}</td>
                <td>{result.gender}</td>
                <td>{result.race}</td>
                <td>
                <img src={result.image} width="100px" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
