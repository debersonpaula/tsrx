import EnvironmentConfigurator from '../src/tools/EnvironmentConfigurator';

class Config {
  ParamAny: any;
  ParamNumber: number;
  ParamText: string;
  ParamBoolean1: boolean;
  ParamBoolean2: boolean;
  ParamObject = { label: '', value: '' };
  ParamMethod() {
    return 'Value from ParamMethod';
  }
  ParamMethodArrow = () => {
    return 'Value from ParamMethodArrow';
  };

  AnotherParam: boolean;
}

export default EnvironmentConfigurator(Config);
