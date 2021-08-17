import React from 'react';

const decorator = (): ClassDecorator => {
  return (target) => {
    target.prototype.method = () => 'From Decorator';
  };
};

@decorator()
export class DecoratorApp extends React.Component {
  render() {
    return (
      <div>
        <h4>Testing decorator</h4>
        <div>{this.method()}</div>
      </div>
    );
  }

  method() {
    return 'From Component';
  }
}
