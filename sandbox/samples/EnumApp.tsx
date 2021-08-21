import React from 'react';

enum EnumCheck {
  TypeA = 1,
  TypeB = 2,
}

export default function EnumApp() {
  const check = EnumCheck.TypeA;
  return (
    <div>
      <h4>Testing enums</h4>

      <p>Enum Check = {check === EnumCheck.TypeA ? 1 : 2}</p>
    </div>
  );
}
