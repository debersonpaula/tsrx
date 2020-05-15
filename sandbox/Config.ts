import EnvironmentConfigurator from 'tsrx/tools/EnvironmentConfigurator';

class Config {
  ParamAny: any = null;
  ParamNumber: number = 0;
  ParamText: string = '';
  ParamBoolean1: boolean = false;
  ParamBoolean2: boolean = true;
  ParamObject = { label: '', value: '' };

  ParamMethod() {
    return 'Value from ParamMethod';
  }
  ParamMethodArrow = () => {
    return 'Value from ParamMethodArrow';
  };
}

export default EnvironmentConfigurator(Config);
