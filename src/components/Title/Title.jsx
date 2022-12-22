import React from 'react';

function Title(props) {
  return (
    <div className="bg-gray-700 text-white font-bold p-7 text-center text-3xl">
      {props.title}
    </div>
  );
}

export default Title;
