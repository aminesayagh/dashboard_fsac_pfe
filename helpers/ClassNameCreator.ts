interface Style {
  readonly [key: string]: string;
}

export type TSecondaryClassName = (string | [string, string | null | undefined])[] | string;
export type TClassAdd = (classNameBase: string, classSecondes: TSecondaryClassName) => ({ className: string })

const classAdd = (style: Style) => (classNameBase: string, classSecondes? : TSecondaryClassName): { className: string } => {
  // init className resulted
  let classResult = '';
  const addStyle = (value: string) => !!style[value] ? style[value] : '';

  classResult += addStyle(classNameBase);

  if(!classSecondes) return { className: classResult };
  if(!Array.isArray(classSecondes)) {
    classResult += (' ' + addStyle(classNameBase + '_' + classSecondes));
    return { className: classResult };
  }
  classSecondes.map((cn) => {
    if(!Array.isArray(cn)){
      classResult += (' ' + addStyle(classNameBase + '_' + cn)); 
      return;
    }
    // class secondes is array of two col
    if(!!cn[1]) {
      classResult += (' ' + addStyle(classNameBase + '_' + cn[0] + '_' + cn[1]));
    }
  })


  return { className: classResult };
}

export default classAdd;